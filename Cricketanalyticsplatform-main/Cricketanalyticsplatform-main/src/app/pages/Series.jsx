import { Trophy } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { useState } from 'react';
import { api } from '../services/api.js';

export function Series() {
  const [offset, setOffset] = useState(0);

  const { data: response, isLoading } = useQuery({
    queryKey: ['series', offset],
    queryFn: () => api.getSeries(offset),
    keepPreviousData: true,
  });

  return (
    <main className="flex-1 max-w-[1200px] mx-auto px-4 py-6 w-full space-y-6">
      <header className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold flex items-center gap-2">
          <Trophy className="w-5 h-5 text-primary" />
          Cricket Series
        </h1>
      </header>

      {isLoading ? (
        <div className="text-muted-foreground animate-pulse">Loading series...</div>
      ) : (
        <>
          <section className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {response?.data?.map((series) => (
              <article key={series.id} className="bg-card border border-border rounded-xl p-4 space-y-3">
                <div>
                  <p className="text-xs text-primary font-semibold uppercase">Series</p>
                  <h2 className="text-lg font-semibold">{series.name}</h2>
                  <p className="text-sm text-muted-foreground">
                    {new Date(series.startDate).toLocaleDateString()} to {new Date(series.endDate).toLocaleDateString()}
                  </p>
                  <p className="text-xs mt-1 font-medium">{series.matches} Matches</p>
                </div>

                <Link to={`/series/${series.id}`} className="block text-center rounded-md border border-primary text-primary px-3 py-2 hover:bg-primary/10 transition-colors text-sm font-semibold">
                  View Series Info
                </Link>
              </article>
            ))}
          </section>

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
        </>
      )}
    </main>
  );
}

