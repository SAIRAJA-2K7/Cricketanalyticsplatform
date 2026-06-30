import { Link } from 'react-router-dom';
import { useLiveMatches } from '../../hooks/useLiveMatches.js';
import { normalizeLiveMatch } from '../../utils/matches.js';

export function LiveTicker() {
  const { matches } = useLiveMatches();

  return (
    <div className="sticky top-16 z-40 border-b border-border bg-card/95 backdrop-blur">
      <div className="max-w-[1540px] mx-auto px-3 md:px-4 h-11 overflow-x-auto scrollbar-hide">
        <div className="min-w-max h-full flex items-center gap-2.5">
          {matches?.map((match) => {
            const normalizedMatch = normalizeLiveMatch(match);
            const team1Info = normalizedMatch?.teamInfo?.[0] || { shortname: 'T1' };
            const team2Info = normalizedMatch?.teamInfo?.[1] || { shortname: 'T2' };
            const score1 = normalizedMatch?.score?.[0] ? `${normalizedMatch.score[0].r}/${normalizedMatch.score[0].w}` : '';
            const score2 = normalizedMatch?.score?.[1] ? `${normalizedMatch.score[1].r}/${normalizedMatch.score[1].w}` : '';

            return (
              <Link
                key={normalizedMatch.id}
                to={`/match/${normalizedMatch.id}`}
                className="h-8 inline-flex items-center gap-2 rounded-md border border-border bg-background px-2.5 hover:bg-muted transition-colors"
              >
                <span className="h-1.5 w-1.5 rounded-full bg-primary animate-pulse" />
                <span className="text-[11px] font-semibold">{team1Info.shortname} {score1}</span>
                <span className="text-[11px] text-muted-foreground">vs {team2Info.shortname} {score2}</span>
                <span className="text-[10px] text-muted-foreground max-w-[150px] truncate">{normalizedMatch.status}</span>
              </Link>
            );
          })}
          {!matches?.length && <span className="text-xs text-muted-foreground">No live matches right now.</span>}
        </div>
      </div>
    </div>
  );
}

