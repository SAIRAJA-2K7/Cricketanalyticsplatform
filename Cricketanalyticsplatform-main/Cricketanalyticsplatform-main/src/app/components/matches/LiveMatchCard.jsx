import { ArrowRight, Bell } from 'lucide-react';
import { Link } from 'react-router-dom';

export function LiveMatchCard({ match }) {
  return (
    <div className="bg-card border border-border rounded-2xl shadow-md hover:shadow-lg transition-all overflow-hidden group">
      <div className="bg-secondary/5 px-6 py-3 border-b border-border flex justify-between items-center">
        <span className="text-xs font-bold text-primary uppercase">{match.tournament}</span>
        <span className="text-xs text-muted-foreground">{match.venue}</span>
      </div>
      <div className="p-6">
        <div className="flex items-center justify-between mb-8">
          <div className="flex flex-col items-center gap-3 w-1/3">
            <div className="w-16 h-16 rounded-full bg-muted flex items-center justify-center p-2 border-4 border-white shadow-sm">
              <img
                src={match.team1.flag}
                alt={match.team1.name}
                className="w-full h-auto rounded"
              />
            </div>
            <span className="font-bold text-sm">{match.team1.shortName}</span>
          </div>
          <div className="flex flex-col items-center gap-1">
            <span className="text-xs font-bold text-primary bg-primary/10 px-2 py-0.5 rounded uppercase">
              Live
            </span>
            <span className="text-3xl font-bold tracking-tighter">{match.team1.score}</span>
            <span className="text-xs text-muted-foreground font-medium">
              ({match.team1.overs} Ov)
            </span>
          </div>
          <div className="flex flex-col items-center gap-3 w-1/3">
            <div className="w-16 h-16 rounded-full bg-muted flex items-center justify-center p-2 border-4 border-white shadow-sm">
              <img
                src={match.team2.flag}
                alt={match.team2.name}
                className="w-full h-auto rounded"
              />
            </div>
            <span className="font-bold text-sm">{match.team2.shortName}</span>
          </div>
        </div>
        {match.matchInfo && (
          <div className="bg-muted/50 rounded-xl p-4 mb-6">
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground italic">{match.matchInfo}</span>
              {match.crr && match.rrr && (
                <span className="font-bold text-primary">
                  CRR: {match.crr} • RRR: {match.rrr}
                </span>
              )}
            </div>
          </div>
        )}
        {match.batting && match.bowling && (
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <p className="text-xs font-bold text-muted-foreground uppercase">Batting</p>
              {match.batting.map((batsman, idx) => (
                <div key={idx} className="flex justify-between text-sm">
                  <span>{batsman.name}</span>
                  <span className="font-bold">{batsman.score}</span>
                </div>
              ))}
            </div>
            <div className="space-y-2">
              <p className="text-xs font-bold text-muted-foreground uppercase">Bowling</p>
              {match.bowling.map((bowler, idx) => (
                <div key={idx} className="flex justify-between text-sm">
                  <span>{bowler.name}</span>
                  <span className="font-bold">{bowler.figures}</span>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
      <div className="p-4 bg-muted/30 border-t border-border flex gap-3">
        <Link
          to={`/match/${match.id}`}
          className="flex-1 bg-primary text-white font-bold py-2.5 rounded-xl hover:bg-primary/90 transition-all flex items-center justify-center gap-2"
        >
          Match Center
          <ArrowRight className="w-4 h-4" />
        </Link>
        <button className="px-4 bg-white border border-border text-foreground rounded-xl hover:bg-muted transition-all">
          <Bell className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}
