import { Clock } from 'lucide-react';

export function UpcomingMatchCard({ match }) {
  return (
    <div className="bg-card border border-border rounded-2xl shadow-sm hover:shadow-md transition-all p-6">
      <div className="flex justify-between items-center mb-6">
        <span className="text-xs font-bold text-muted-foreground uppercase tracking-widest">
          Upcoming • {match.date}, {match.time}
        </span>
        <Clock className="w-4 h-4 text-muted-foreground" />
      </div>
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <img
            src={match.team1.flag}
            alt={match.team1.name}
            className="w-10 h-7 rounded shadow-sm"
          />
          <span className="font-bold">{match.team1.shortName}</span>
        </div>
        <div className="flex flex-col items-center">
          <span className="text-xs font-bold text-muted-foreground">VS</span>
        </div>
        <div className="flex items-center gap-4 flex-row-reverse">
          <img
            src={match.team2.flag}
            alt={match.team2.name}
            className="w-10 h-7 rounded shadow-sm"
          />
          <span className="font-bold">{match.team2.shortName}</span>
        </div>
      </div>
      <div className="mt-6 pt-6 border-t border-dashed border-border flex justify-between items-center">
        <p className="text-xs text-muted-foreground">{match.tournament} • {match.venue}</p>
        <button className="text-xs font-bold text-primary hover:underline">Match Info</button>
      </div>
    </div>
  );
}
