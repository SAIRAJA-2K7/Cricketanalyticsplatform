import { useQuery } from '@tanstack/react-query';
import { api } from '../services/api.js';
import { liveMatches } from '../data/mockData.js';
import { normalizeLiveMatch } from '../utils/matches.js';

export function useLiveMatches() {
  const { data, isLoading, error } = useQuery({
    queryKey: ['live-matches'],
    queryFn: () => api.getCurrentMatches(0),
    refetchInterval: 60000, // Poll every minute
    staleTime: 30000,
    refetchOnWindowFocus: false,
  });

  // Extract the matches array from the API response
  // Assuming CricAPI responds with { data: [...] } for this endpoint.
  const matches = (data?.data?.length ? data.data : liveMatches)
    .map(normalizeLiveMatch)
    .filter(Boolean);

  return {
    matches,
    isLoading,
    error,
  };
}

