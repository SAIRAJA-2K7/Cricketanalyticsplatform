import { Shield } from 'lucide-react';
import { useMemo } from 'react';
import { useLiveMatches } from '../hooks/useLiveMatches.js';
import { upcomingMatches } from '../data/mockData.js';

export function Teams() {
  const { matches } = useLiveMatches();

  const teams = useMemo(() => {
    const map = new Map();

    const collect = (team) => {
      if (!team?.name) return;
      if (!map.has(team.name)) {
        map.set(team.name, {
          name: team.name,
          shortName: team.shortName,
          flag: team.flag,
          liveMatches: 0,
        });
      }
    };

    matches.forEach((m) => {
      collect(m.team1);
      collect(m.team2);
      if (m.team1?.name && map.has(m.team1.name)) map.get(m.team1.name).liveMatches += 1;
      if (m.team2?.name && map.has(m.team2.name)) map.get(m.team2.name).liveMatches += 1;
    });

    upcomingMatches.forEach((m) => {
      collect(m.team1);
      collect(m.team2);
    });

    return [...map.values()].sort((a, b) => b.liveMatches - a.liveMatches || a.name.localeCompare(b.name));
  }, [matches]);

  return (
    <main className="flex-1 max-w-[1200px] mx-auto px-4 py-6 w-full space-y-6">
      <header>
        <h1 className="text-2xl font-semibold flex items-center gap-2">
          <Shield className="w-5 h-5 text-primary" />
          Teams
        </h1>
        <p className="text-sm text-muted-foreground mt-1">Live teams and tournament participants.</p>
      </header>

      <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {teams.map((team) => (
          <article key={team.name} className="bg-card border border-border rounded-xl p-4 flex items-center justify-between gap-3">
            <div className="flex items-center gap-3 min-w-0">
              <img src={team.flag} alt={team.name} className="w-10 h-10 rounded-full border border-border object-cover" />
              <div>
                <h2 className="text-sm font-semibold truncate">{team.name}</h2>
                <p className="text-xs text-muted-foreground">{team.shortName}</p>
              </div>
            </div>
            <div className="text-right">
              <p className="text-[11px] text-muted-foreground">Live</p>
              <p className="text-sm font-semibold">{team.liveMatches}</p>
            </div>
          </article>
        ))}
      </section>
    </main>
  );
}
