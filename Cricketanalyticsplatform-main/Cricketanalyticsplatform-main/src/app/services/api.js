const API_BASE = 'http://localhost:3003/api';

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
    throw error;
  }
};

export const api = {
  getCurrentMatches: async (offset = 0) => safeFetch('/current-matches', { offset }),
  getMatches: async (offset = 0) => safeFetch('/matches', { offset }),
  getSeries: async (offset = 0) => safeFetch('/series', { offset }),
  getSeriesInfo: async (id) => safeFetch(`/series/${id}`),
  getMatchInfo: async (id) => safeFetch(`/match/${id}`),
  getMatchScorecard: async (id) => safeFetch(`/match/${id}/scorecard`),
  getMatchSquad: async (id) => safeFetch(`/match/${id}/squad`),
  getPlayers: async (offset = 0, search = '') => safeFetch('/players', { offset, search }),
  getPlayerInfo: async (id) => safeFetch(`/player/${id}`),
  getCountries: async (offset = 0) => safeFetch('/countries', { offset }),
};
