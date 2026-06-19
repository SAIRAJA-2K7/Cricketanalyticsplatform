import { useQuery } from '@tanstack/react-query';
import { api } from '../services/api.js';

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
  const matches = data?.data || [];

  return {
    matches,
    isLoading,
    error,
  };
}

