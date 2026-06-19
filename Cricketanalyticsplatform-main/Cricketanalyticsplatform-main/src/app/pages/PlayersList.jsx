import { useQuery } from '@tanstack/react-query';
import { api } from '../services/api.js';
import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';

export function PlayersList() {
  const [offset, setOffset] = useState(0);
  const [search, setSearch] = useState('');
  const [debouncedSearch, setDebouncedSearch] = useState('');

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedSearch(search);
      setOffset(0); // Reset offset on new search
    }, 500);
    return () => clearTimeout(handler);
  }, [search]);

  const { data: response, isLoading } = useQuery({
    queryKey: ['players', offset, debouncedSearch],
    queryFn: () => api.getPlayers(offset, debouncedSearch),
    keepPreviousData: true,
  });

  return (
    <main className="flex-1 w-full max-w-[1540px] mx-auto px-4 py-8">
      <div className="flex flex-col md:flex-row md:items-center justify-between mb-6 gap-4">
        <h1 className="text-2xl font-bold">Players Database</h1>
        <input 
          type="text" 
          placeholder="Search players..." 
          className="bg-card border border-border rounded-md px-4 py-2 text-sm w-full md:w-64"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>
      
      {isLoading ? (
        <div className="text-muted-foreground animate-pulse">Loading players...</div>
      ) : (
        <div className="space-y-4">
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
            {response?.data?.map((player) => (
              <Link 
                to={`/player/${player.id}`} 
                key={player.id}
                className="bg-card border border-border rounded-xl p-4 hover:border-primary transition-colors flex flex-col items-center text-center h-full"
              >
                <div className="w-16 h-16 bg-muted rounded-full mb-3 flex items-center justify-center overflow-hidden">
                  <span className="text-xl font-bold text-muted-foreground">{player.name.charAt(0)}</span>
                </div>
                <h3 className="font-bold text-sm mb-1">{player.name}</h3>
                <p className="text-xs text-muted-foreground">{player.country}</p>
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
