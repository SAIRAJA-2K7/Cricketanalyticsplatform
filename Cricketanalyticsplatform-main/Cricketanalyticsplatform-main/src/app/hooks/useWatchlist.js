import { useCallback, useEffect, useMemo, useState } from 'react';

const STORAGE_KEY = 'crivora.watchlist.v1';

const defaultState = {
  teams: ['India', 'Australia'],
  players: ['V. Kohli'],
  matches: [],
  tournaments: ['ICC T20 World Cup'],
};

const safeJsonParse = (value, fallback) => {
  try {
    return JSON.parse(value);
  } catch {
    return fallback;
  }
};

export function useWatchlist() {
  const [watchlist, setWatchlist] = useState(() => {
    if (typeof window === 'undefined') {
      return defaultState;
    }

    const stored = window.localStorage.getItem(STORAGE_KEY);
    if (!stored) {
      return defaultState;
    }

    return {
      ...defaultState,
      ...safeJsonParse(stored, defaultState),
    };
  });

  useEffect(() => {
    if (typeof window !== 'undefined') {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(watchlist));
    }
  }, [watchlist]);

  const toggleItem = useCallback((bucket, value) => {
    setWatchlist((prev) => {
      const exists = prev[bucket].includes(value);
      return {
        ...prev,
        [bucket]: exists ? prev[bucket].filter((item) => item !== value) : [...prev[bucket], value],
      };
    });
  }, []);

  const isWatching = useCallback(
    (bucket, value) => {
      return watchlist[bucket].includes(value);
    },
    [watchlist],
  );

  const counts = useMemo(
    () => ({
      teams: watchlist.teams.length,
      players: watchlist.players.length,
      matches: watchlist.matches.length,
      tournaments: watchlist.tournaments.length,
      total:
        watchlist.teams.length +
        watchlist.players.length +
        watchlist.matches.length +
        watchlist.tournaments.length,
    }),
    [watchlist],
  );

  return {
    watchlist,
    counts,
    isWatching,
    toggleItem,
  };
}
