import { useQuery } from '@tanstack/react-query';
import { api } from '../services/api.js';
import { Link } from 'react-router-dom';
import { useState } from 'react';

export function MatchesList() {
  const [offset, setOffset] = useState(0);

  const { data: response, isLoading } = useQuery({
    queryKey: ['matches', offset],
    queryFn: () => api.getMatches(offset),
    keepPreviousData: true,
  });

  return (
    <main className="flex-1 w-full max-w-[1540px] mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-6">Historical & Recent Matches</h1>
      
      {isLoading ? (
        <div className="text-muted-foreground animate-pulse">Loading matches...</div>
      ) : (
        <div className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {response?.data?.map((match) => (
              <Link 
                to={`/match/${match.id}`} 
                key={match.id}
                className="bg-card border border-border rounded-xl p-4 hover:border-primary transition-colors flex flex-col justify-between h-full"
              >
                <div>
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-xs font-semibold text-primary uppercase">{match.matchType}</span>
                    <span className="text-[10px] text-muted-foreground">{new Date(match.date).toLocaleDateString()}</span>
                  </div>
                  <h3 className="font-bold mb-1">{match.name}</h3>
                  <p className="text-xs text-muted-foreground line-clamp-2">{match.status}</p>
                </div>
                <div className="mt-4 pt-4 border-t border-border flex justify-between text-xs font-medium">
                  <span>{match.venue}</span>
                </div>
              </Link>
            ))}
          </div>

          <div className="flex justify-center gap-4 mt-8">
            <button 
              onClick={() => setOffset(old => Math.max(0, old - 25))}
              disabled={offset === 0}
              className="px-4 py-2 border border-border rounded-md disabled:opacity-50 text-sm font-semibold hover:bg-muted"
            >
              Previous
            </button>
            <button 
              onClick={() => setOffset(old => old + 25)}
              disabled={!response?.data?.length}
              className="px-4 py-2 bg-primary text-primary-foreground rounded-md disabled:opacity-50 text-sm font-semibold hover:bg-primary/90"
            >
              Next Page
            </button>
          </div>
        </div>
      )}
    </main>
  );
}
