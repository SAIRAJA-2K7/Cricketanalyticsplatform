import { mockApi } from './mockApi.js';

const API_BASE = import.meta.env.VITE_API_BASE || '/api';

const safeFetch = async (path, params = {}) => {
  try {
    const query = new URLSearchParams(params).toString();
    const url = query ? `${API_BASE}${path}?${query}` : `${API_BASE}${path}`;
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`Request failed: ${response.status}`);
    }
    return response.json();
  } catch (error) {
    console.error(`[API Fetch Error] ${path}:`, error.message);
    return null;
  }
};

export const api = {
  getCurrentMatches: async (offset = 0) => (await safeFetch('/current-matches', { offset })) || mockApi.getCurrentMatches(offset),
  getMatches: async (offset = 0) => (await safeFetch('/matches', { offset })) || mockApi.getMatches(offset),
  getSeries: async (offset = 0) => (await safeFetch('/series', { offset })) || mockApi.getSeries(offset),
  getSeriesInfo: async (id) => (await safeFetch(`/series/${id}`)) || mockApi.getSeriesInfo(id),
  getMatchInfo: async (id) => (await safeFetch(`/match/${id}`)) || mockApi.getMatchInfo(id),
  getMatchScorecard: async (id) => (await safeFetch(`/match/${id}/scorecard`)) || mockApi.getMatchScorecard(id),
  getMatchSquad: async (id) => (await safeFetch(`/match/${id}/squad`)) || mockApi.getMatchSquad(id),
  getPlayers: async (offset = 0, search = '') => (await safeFetch('/players', { offset, search })) || mockApi.getPlayers(offset, search),
  getPlayerInfo: async (id) => (await safeFetch(`/player/${id}`)) || mockApi.getPlayerInfo(id),
  getCountries: async (offset = 0) => (await safeFetch('/countries', { offset })) || mockApi.getCountries(offset),
};
