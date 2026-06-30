import { Bell, Pin, TrendingUp } from 'lucide-react';
import { Link } from 'react-router-dom';
import { normalizeLiveMatch } from '../../utils/matches.js';

const eventTone = {
  W: 'bg-destructive/15 text-destructive border-destructive/30',
  4: 'bg-primary/15 text-primary border-primary/30',
  6: 'bg-primary/15 text-primary border-primary/30',
};

function BallBadge({ value }) {
  const tone = eventTone[value] || 'bg-muted text-foreground border-border';

  return (
    <span
      className={`h-6 min-w-6 px-1 rounded-md border text-[11px] font-bold inline-flex items-center justify-center ${tone}`}
    >
      {value}
    </span>
  );
}

export function MatchCenterCard({ match, pinned, watching, onTogglePin, onToggleWatch }) {
  const normalizedMatch = normalizeLiveMatch(match);
  if (!normalizedMatch) return null;

  const team1Info = normalizedMatch.teamInfo[0];
  const team2Info = normalizedMatch.teamInfo[1];

  const team1Score = normalizedMatch.score[0] || { r: 0, w: 0, o: 0 };
  const team2Score = normalizedMatch.score[1] || { r: 0, w: 0, o: 0 };

  const tossText = normalizedMatch.tossWinner ? `${normalizedMatch.tossWinner} elected to ${normalizedMatch.tossChoice}` : 'Toss Info Unavailable';

  return (
    <article className="bg-card border border-border rounded-xl shadow-sm overflow-hidden">
      <header className="px-4 py-3 border-b border-border bg-muted/40 flex items-center justify-between gap-3">
        <div>
          <p className="text-[11px] font-semibold uppercase tracking-wide text-primary">{normalizedMatch.matchType || 'Match'}</p>
          <h3 className="text-sm font-semibold leading-tight truncate max-w-[200px]">{normalizedMatch.name}</h3>
          <p className="text-[11px] text-muted-foreground mt-0.5 truncate max-w-[200px]">{normalizedMatch.venue}</p>
        </div>
        <div className="text-right">
          <p className="text-[11px] font-semibold text-foreground">{tossText}</p>
        </div>
      </header>

      <div className="p-4 space-y-4">
        <div className="grid grid-cols-[1fr_auto] gap-2 items-center">
          <div className="space-y-2">
            <div className="flex items-center justify-between">
                <span className="font-semibold text-sm">{team1Info.shortname}</span>
                <span className="text-xl leading-none tabular-nums font-semibold">{team1Score.r}/{team1Score.w}</span>
              </div>
            <div className="flex items-center justify-between text-xs text-muted-foreground">
              <span>{team1Info.name}</span>
              <span>{team1Score.o} ov</span>
            </div>
            <div className="flex items-center justify-between mt-2">
              <span className="font-medium text-sm text-muted-foreground">{team2Info.shortname}</span>
              <span className="text-sm tabular-nums font-medium text-muted-foreground">{team2Score.r}/{team2Score.w}</span>
            </div>
          </div>
        </div>

        <p className="text-xs text-muted-foreground font-medium">{normalizedMatch.status}</p>
      </div>

      <footer className="px-4 py-3 border-t border-border bg-muted/30 flex items-center gap-2">
        <Link
          to={`/match/${normalizedMatch.id}`}
          className="flex-1 rounded-md bg-secondary text-secondary-foreground text-xs font-semibold h-9 inline-flex items-center justify-center"
        >
          Open Match Center
        </Link>
        <button
          type="button"
          onClick={() => onTogglePin(normalizedMatch.id)}
          className={`h-9 px-3 rounded-md border text-xs font-semibold inline-flex items-center gap-1 ${
            pinned ? 'border-primary text-primary bg-primary/10' : 'border-border'
          }`}
        >
          <Pin className="w-3.5 h-3.5" />
          Pin
        </button>
        <button
          type="button"
          onClick={() => onToggleWatch(team1Info.name)}
          className={`h-9 px-3 rounded-md border text-xs font-semibold inline-flex items-center gap-1 ${
            watching ? 'border-primary text-primary bg-primary/10' : 'border-border'
          }`}
        >
          <Bell className="w-3.5 h-3.5" />
          Alert
        </button>
      </footer>

      {pinned && (
        <div className="px-4 py-2 border-t border-border bg-primary/10 text-[11px] font-medium text-primary inline-flex items-center gap-1.5 w-full">
          <TrendingUp className="w-3.5 h-3.5" />
          Pinned to multi-match strip
        </div>
      )}
    </article>
  );
}

