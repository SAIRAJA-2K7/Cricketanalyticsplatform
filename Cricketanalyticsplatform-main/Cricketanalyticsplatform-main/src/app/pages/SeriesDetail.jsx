import { useParams, Link } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { api } from '../services/api.js';
import { ArrowLeft } from 'lucide-react';

export function SeriesDetail() {
  const { id } = useParams();

  const { data: response, isLoading } = useQuery({
    queryKey: ['series', id],
    queryFn: () => api.getSeriesInfo(id),
    enabled: !!id,
  });

  if (isLoading) {
    return <div className="min-h-screen flex items-center justify-center">Loading series info...</div>;
  }

  const series = response?.data?.info;
  const matchList = response?.data?.matchList || [];

  if (!series) {
    return <div className="min-h-screen flex items-center justify-center">Series not found. Note: Free tier might not return specific series details.</div>;
  }

  return (
    <main className="flex-1 w-full max-w-[1540px] mx-auto px-4 py-8">
      <Link to="/series" className="inline-flex items-center gap-2 text-sm font-semibold mb-6 hover:text-primary">
        <ArrowLeft className="w-4 h-4" /> Back to Series
      </Link>
      
      <div className="bg-card border border-border rounded-xl p-6 mb-8">
        <h1 className="text-2xl font-bold">{series.name}</h1>
        <p className="text-muted-foreground mt-2">
          {series.startdate} - {series.enddate}
        </p>
        <p className="text-sm mt-4 font-semibold">{series.matches} Matches in total</p>
      </div>

      <h2 className="text-xl font-bold mb-4">Matches in Series</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {matchList.map((match) => (
          <Link 
            to={`/match/${match.id}`} 
            key={match.id}
            className="bg-card border border-border rounded-xl p-4 hover:border-primary transition-colors flex flex-col justify-between"
          >
            <div>
              <span className="text-xs font-semibold text-primary uppercase block mb-1">{match.matchType}</span>
              <h3 className="font-bold text-sm mb-1">{match.name}</h3>
              <p className="text-xs text-muted-foreground">{new Date(match.date).toLocaleDateString()}</p>
            </div>
            <div className="mt-4 pt-3 border-t border-border">
              <span className="text-[11px] font-medium">{match.venue}</span>
            </div>
          </Link>
        ))}
      </div>
    </main>
  );
}
