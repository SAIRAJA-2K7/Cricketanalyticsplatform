require('dotenv').config();
const express = require('express');
const http = require('http');
const socketIo = require('socket.io');
const { createClient } = require('redis');
const cors = require('cors');
const axios = require('axios');

const app = express();
const server = http.createServer(app);
const io = socketIo(server, {
  cors: {
    origin: '*',
    methods: ['GET', 'POST'],
  },
});

app.use(cors());
app.use(express.json());

const redisUrl = process.env.REDIS_URL || 'redis://127.0.0.1:6379';
const redisClient = createClient({ url: redisUrl });
let redisReady = false;

redisClient.on('error', (error) => {
  redisReady = false;
  console.error('[redis] error', error.message);
});

redisClient.on('ready', () => {
  redisReady = true;
  console.log('[redis] connected');
});

redisClient.connect().catch((error) => {
  redisReady = false;
  console.error('[redis] unavailable, using memory cache only:', error.message);
});

const inMemoryCache = new Map();
const CACHE_WINDOW = {
  liveMs: 60 * 1000, // 1 minute for live matches
  historicalMs: 24 * 60 * 60 * 1000, // 24 hours for info
};

const putCache = async (key, data, ttlMs) => {
  const payload = {
    data,
    expiresAt: Date.now() + ttlMs,
  };
  inMemoryCache.set(key, payload);
  if (redisReady) {
    await redisClient.set(key, JSON.stringify(payload), {
      EX: Math.ceil(ttlMs / 1000),
    });
  }
};

const readCache = async (key) => {
  if (inMemoryCache.has(key)) {
    const cached = inMemoryCache.get(key);
    if (Date.now() < cached.expiresAt) {
      return cached.data;
    } else {
      inMemoryCache.delete(key);
    }
  }

  if (redisReady) {
    const raw = await redisClient.get(key);
    if (raw) {
      const parsed = JSON.parse(raw);
      if (Date.now() < parsed.expiresAt) {
        inMemoryCache.set(key, parsed);
        return parsed.data;
      }
    }
  }
  return null;
};

const API_KEY = process.env.CRICKETDATA_API_KEY;
const BASE_URL = 'https://api.cricapi.com/v1';

const fetchCricAPI = async (endpoint, params = {}, cacheTtl) => {
  if (!API_KEY) throw new Error("CRICKETDATA_API_KEY is not set in environment variables");
  
  const queryParams = new URLSearchParams({ apikey: API_KEY, ...params }).toString();
  const cacheKey = `cricapi:${endpoint}?${queryParams}`;
  
  const cachedData = await readCache(cacheKey);
  if (cachedData) {
    return cachedData;
  }

  try {
    const response = await axios.get(`${BASE_URL}${endpoint}?${queryParams}`);
    if (response.data && response.data.status === 'success') {
      await putCache(cacheKey, response.data, cacheTtl);
      return response.data;
    } else if (response.data && response.data.status === 'failure') {
      console.warn(`[CricAPI Failure]: ${response.data.reason}`);
      throw new Error(response.data.reason);
    }
    throw new Error('Unexpected API Response');
  } catch (error) {
    console.error(`[CricAPI Error] ${endpoint}:`, error.message);
    throw error;
  }
};

app.get('/api/current-matches', async (req, res) => {
  const offset = req.query.offset || 0;
  try {
    const data = await fetchCricAPI('/currentMatches', { offset }, CACHE_WINDOW.liveMs);
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: 'current_matches_failed', reason: error.message });
  }
});

app.get('/api/matches', async (req, res) => {
  const offset = req.query.offset || 0;
  try {
    const data = await fetchCricAPI('/matches', { offset }, CACHE_WINDOW.historicalMs);
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: 'matches_failed', reason: error.message });
  }
});

app.get('/api/series', async (req, res) => {
  const offset = req.query.offset || 0;
  try {
    const data = await fetchCricAPI('/series', { offset }, CACHE_WINDOW.historicalMs);
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: 'series_failed', reason: error.message });
  }
});

app.get('/api/series/:id', async (req, res) => {
  try {
    const data = await fetchCricAPI('/series_info', { id: req.params.id }, CACHE_WINDOW.historicalMs);
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: 'series_info_failed', reason: error.message });
  }
});

app.get('/api/match/:id', async (req, res) => {
  try {
    const data = await fetchCricAPI('/match_info', { id: req.params.id }, CACHE_WINDOW.liveMs);
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: 'match_info_failed', reason: error.message });
  }
});

app.get('/api/match/:id/scorecard', async (req, res) => {
  try {
    const data = await fetchCricAPI('/match_scorecard', { id: req.params.id }, CACHE_WINDOW.liveMs);
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: 'match_scorecard_failed', reason: error.message });
  }
});

app.get('/api/match/:id/squad', async (req, res) => {
  try {
    const data = await fetchCricAPI('/match_squad', { id: req.params.id }, CACHE_WINDOW.historicalMs);
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: 'match_squad_failed', reason: error.message });
  }
});

app.get('/api/players', async (req, res) => {
  const { offset = 0, search = '' } = req.query;
  const params = { offset };
  if (search) params.search = search;
  try {
    const data = await fetchCricAPI('/players', params, CACHE_WINDOW.historicalMs);
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: 'players_failed', reason: error.message });
  }
});

app.get('/api/player/:id', async (req, res) => {
  try {
    const data = await fetchCricAPI('/players_info', { id: req.params.id }, CACHE_WINDOW.historicalMs);
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: 'players_info_failed', reason: error.message });
  }
});

app.get('/api/countries', async (req, res) => {
  const offset = req.query.offset || 0;
  try {
    const data = await fetchCricAPI('/countries', { offset }, CACHE_WINDOW.historicalMs);
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: 'countries_failed', reason: error.message });
  }
});

io.on('connection', (socket) => {
  console.log('[socket] connected', socket.id);
  socket.on('disconnect', () => {
    console.log('[socket] disconnected', socket.id);
  });
});

const PORT = process.env.PORT || 3003;
server.listen(PORT, () => {
  console.log(`Crivora backend running on port ${PORT}`);
});
