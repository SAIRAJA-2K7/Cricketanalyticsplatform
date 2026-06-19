import { Link } from 'react-router-dom';
import { CalendarClock } from 'lucide-react';
import { useLiveMatches } from '../hooks/useLiveMatches.js';
import { upcomingMatches } from '../data/mockData.js';

export function Schedule() {
  const { matches } = useLiveMatches();

  return (
    <main className="flex-1 max-w-[1200px] mx-auto px-4 py-6 w-full space-y-6">
      <header className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold flex items-center gap-2">
          <CalendarClock className="w-5 h-5 text-primary" />
          Match Schedule
        </h1>
        <Link to="/" className="text-sm text-primary font-semibold">Back to Live</Link>
      </header>

      <section className="bg-card border border-border rounded-xl p-4">
        <h2 className="text-sm font-semibold mb-3">Live Now</h2>
        <div className="space-y-2">
          {matches.map((match) => (
            <Link
              key={match.id}
              to={`/match/${match.id}`}
              className="rounded-md border border-border px-3 py-2.5 grid grid-cols-[1fr_auto] items-center gap-2 hover:bg-muted transition-colors"
            >
              <div>
                <p className="text-sm font-semibold">{match.team1.shortName} vs {match.team2.shortName}</p>
                <p className="text-xs text-muted-foreground">{match.tournament} • {match.venue}</p>
              </div>
              <div className="text-right">
                <p className="text-xs font-semibold text-primary">LIVE</p>
                <p className="text-xs text-muted-foreground">{match.matchInfo}</p>
              </div>
            </Link>
          ))}
          {!matches.length && <p className="text-sm text-muted-foreground">No live fixtures at this time.</p>}
        </div>
      </section>

      <section className="bg-card border border-border rounded-xl p-4">
        <h2 className="text-sm font-semibold mb-3">Upcoming</h2>
        <div className="space-y-2">
          {upcomingMatches.map((match) => (
            <div key={match.id} className="rounded-md border border-border px-3 py-2.5 grid grid-cols-[1fr_auto] items-center gap-2">
              <div>
                <p className="text-sm font-semibold">{match.team1.shortName} vs {match.team2.shortName}</p>
                <p className="text-xs text-muted-foreground">{match.tournament} • {match.venue}</p>
              </div>
              <p className="text-xs font-semibold">{match.date} {match.time}</p>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}
