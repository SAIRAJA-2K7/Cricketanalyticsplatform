import { Trophy } from 'lucide-react';
import { Link } from 'react-router-dom';
import { seriesList } from '../../data/mockData.js';

export function SeriesSidebar() {
  return (
    <div className="bg-card border border-border rounded-xl p-4 shadow-sm">
      <h2 className="text-sm font-bold text-foreground mb-4 flex items-center gap-2 uppercase tracking-wide">
        <Trophy className="w-4 h-4 text-primary" />
        Current Series
      </h2>
      <div className="space-y-2">
        {seriesList.map((series) => (
          <Link
            key={series.id}
            to="/series"
            className={`block p-3 rounded-lg ${
              series.active
                ? 'bg-muted border-l-4 border-primary'
                : 'hover:bg-muted border-l-4 border-transparent'
            } transition-all`}
          >
            <p className="text-sm font-semibold">{series.name}</p>
            <p className="text-xs text-muted-foreground mt-1">{series.status}</p>
          </Link>
        ))}
      </div>
      <Link to="/series" className="block text-center w-full mt-4 py-2 text-xs font-bold text-primary hover:underline">
        View All Series
      </Link>
    </div>
  );
}
