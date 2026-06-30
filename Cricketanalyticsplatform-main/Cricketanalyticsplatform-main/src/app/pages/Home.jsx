import { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import {
  Bell,
  ChevronRight,
  CircleAlert,
  Flame,
  Pin,
  Star,
  Trophy,
  Users,
} from 'lucide-react';
import { newsArticles, rankings, seriesList, upcomingMatches } from '../data/mockData.js';
import {
  fantasyInsights,
  injuryUpdates,
  livePoll,
  quickNotifications,
  tournamentShortcuts,
  trendingPlayers,
  trendingStats,
} from '../data/premiumData.js';
import { MatchCenterCard } from '../components/live/MatchCenterCard.jsx';
import { CommentaryFeed } from '../components/live/CommentaryFeed.jsx';
import { MomentumPanel } from '../components/live/MomentumPanel.jsx';
import { useLiveMatches } from '../hooks/useLiveMatches.js';
import { useWatchlist } from '../hooks/useWatchlist.js';
import { normalizeLiveMatch } from '../utils/matches.js';

function SidebarCard({ title, icon: Icon, children, compact = false }) {
  return (
    <section className="bg-card border border-border rounded-xl overflow-hidden">
      <header className={`px-3.5 border-b border-border bg-muted/30 flex items-center gap-2 ${compact ? 'h-10' : 'h-11'}`}>
        {Icon ? <Icon className="w-3.5 h-3.5 text-primary" /> : null}
        <h3 className="text-xs font-semibold uppercase tracking-wide">{title}</h3>
      </header>
      <div className="p-3.5">{children}</div>
    </section>
  );
}

export function Home() {
  const { matches, isLoading } = useLiveMatches();
  const { counts, isWatching, toggleItem } = useWatchlist();
  const [pinnedMatches, setPinnedMatches] = useState([]);

  const activeMatch = matches[0];

  const topNews = newsArticles.slice(0, 3);
  const rankRows = rankings.t20.slice(0, 5);

  const pollTotalVotes = useMemo(
    () => livePoll.options.reduce((total, option) => total + option.votes, 0),
    [],
  );

  const togglePin = (matchId) => {
    setPinnedMatches((prev) =>
      prev.includes(matchId) ? prev.filter((id) => id !== matchId) : [...prev, matchId],
    );
  };

  return (
    <main className="flex-1 w-full max-w-[1540px] mx-auto px-3 md:px-4 py-4 md:py-5 pb-24 lg:pb-6">
      {pinnedMatches.length > 0 && (
        <section className="mb-4 bg-card border border-border rounded-xl px-3 py-2.5 flex flex-wrap gap-2 items-center">
          <div className="inline-flex items-center gap-1.5 text-xs font-semibold text-primary">
            <Pin className="w-3.5 h-3.5" />
            Pinned Live
          </div>
          {matches
            .filter((match) => pinnedMatches.includes(match.id))
            .map((match) => (
              <Link
                key={match.id}
                to={`/match/${match.id}`}
                className="text-xs rounded-md border border-border px-2.5 h-8 inline-flex items-center gap-2 hover:bg-muted transition-colors"
              >
                <span className="font-semibold">
                  {match.teamInfo?.[0]?.shortname || match.teams?.[0] || 'T1'}
                  {match.score?.[0] ? ` ${match.score[0].r}/${match.score[0].w}` : ''}
                </span>
                <ChevronRight className="w-3.5 h-3.5 text-muted-foreground" />
              </Link>
            ))}
        </section>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-[260px_minmax(0,1fr)_320px] gap-4 lg:gap-5">
        <aside className="space-y-4">
          <SidebarCard title="Current Series" icon={Trophy} compact>
            <div className="space-y-2.5">
              {seriesList.slice(0, 4).map((series) => (
                <button
                  key={series.id}
                  type="button"
                  onClick={() => toggleItem('tournaments', series.name)}
                  className="w-full text-left rounded-lg border border-border px-2.5 py-2 hover:bg-muted transition-colors"
                >
                  <p className="text-xs font-semibold leading-tight">{series.name}</p>
                  <p className="text-[11px] text-muted-foreground mt-1">{series.status}</p>
                </button>
              ))}
            </div>
          </SidebarCard>

          <SidebarCard title="Rankings" icon={Users} compact>
            <div className="space-y-2">
              {rankRows.map((row) => (
                <div key={row.rank} className="grid grid-cols-[18px_1fr_auto] gap-2 text-xs items-center">
                  <span className="text-muted-foreground">{row.rank}</span>
                  <span className="font-medium">{row.team}</span>
                  <span className="font-semibold tabular-nums">{row.points}</span>
                </div>
              ))}
            </div>
          </SidebarCard>

          <SidebarCard title="Trending Players" icon={Flame}>
            <div className="space-y-2">
              {trendingPlayers.map((player) => (
                <div key={player.name} className="grid grid-cols-[1fr_auto] gap-2 items-center">
                  <div>
                    <p className="text-xs font-medium">{player.name}</p>
                    <p className="text-[11px] text-muted-foreground">{player.team} • Form {player.form}</p>
                  </div>
                  <button
                    type="button"
                    onClick={() => toggleItem('players', player.name)}
                    className={`h-7 w-7 rounded-md border inline-flex items-center justify-center ${
                      isWatching('players', player.name) ? 'border-primary text-primary bg-primary/10' : 'border-border'
                    }`}
                  >
                    <Star className="w-3.5 h-3.5" />
                  </button>
                </div>
              ))}
            </div>
          </SidebarCard>

          <SidebarCard title="Tournament Shortcuts">
            <div className="flex flex-wrap gap-2">
              {tournamentShortcuts.map((name) => (
                <button
                  type="button"
                  key={name}
                  onClick={() => toggleItem('tournaments', name)}
                  className={`h-7 px-2.5 rounded-md text-[11px] font-medium border ${
                    isWatching('tournaments', name)
                      ? 'border-primary bg-primary/10 text-primary'
                      : 'border-border hover:bg-muted'
                  }`}
                >
                  {name}
                </button>
              ))}
            </div>
          </SidebarCard>

          <SidebarCard title="Watchlist">
            <div className="grid grid-cols-2 gap-2 text-xs">
              <div className="border border-border rounded-md p-2">
                <p className="text-muted-foreground">Teams</p>
                <p className="font-semibold">{counts.teams}</p>
              </div>
              <div className="border border-border rounded-md p-2">
                <p className="text-muted-foreground">Players</p>
                <p className="font-semibold">{counts.players}</p>
              </div>
              <div className="border border-border rounded-md p-2">
                <p className="text-muted-foreground">Matches</p>
                <p className="font-semibold">{counts.matches}</p>
              </div>
              <div className="border border-border rounded-md p-2">
                <p className="text-muted-foreground">Series</p>
                <p className="font-semibold">{counts.tournaments}</p>
              </div>
            </div>
            <p className="text-[11px] text-muted-foreground mt-2">Local persistence enabled ({counts.total} tracked).</p>
          </SidebarCard>
        </aside>

        <section className="space-y-4 min-w-0">
          <header className="bg-card border border-border rounded-xl p-3.5 flex flex-wrap gap-3 items-center justify-between">
            <div>
              <h1 className="text-sm md:text-base font-semibold tracking-tight">Live Match Engine</h1>
              <p className="text-xs text-muted-foreground mt-1">
                Incremental realtime updates, stable layout, and match-pressure analytics.
              </p>
            </div>
            <div className="inline-flex items-center gap-2 text-xs">
              <span className="h-2 w-2 rounded-full bg-primary animate-pulse" />
              Live updates active
            </div>
          </header>

          {isLoading ? (
            <div className="rounded-xl border border-border bg-card p-6 text-sm text-muted-foreground">Loading live match engine...</div>
          ) : (
            <div className="space-y-4">
          {matches.map((rawMatch) => {
            const match = normalizeLiveMatch(rawMatch);
            return (
                <MatchCenterCard
                  key={match.id}
                  match={match}
                  pinned={pinnedMatches.includes(match.id)}
                  watching={isWatching('teams', match.team1?.name || match.teamInfo?.[0]?.name)}
                  onTogglePin={togglePin}
                  onToggleWatch={(teamName) => toggleItem('teams', teamName)}
                />
            );
          })}
            </div>
          )}

          <div className="grid grid-cols-1 xl:grid-cols-2 gap-4">
            <CommentaryFeed matchId={activeMatch?.id} />
            <MomentumPanel match={activeMatch} />
          </div>

          <section className="bg-card border border-border rounded-xl p-4">
            <h2 className="text-sm font-semibold mb-3">Upcoming Matches</h2>
            <div className="space-y-2.5">
              {upcomingMatches.slice(0, 3).map((match) => (
                <div key={match.id} className="rounded-md border border-border px-3 py-2 text-xs grid grid-cols-[1fr_auto] gap-2 items-center">
                  <div>
                    <p className="font-medium">{match.team1.shortName} vs {match.team2.shortName}</p>
                    <p className="text-muted-foreground">{match.tournament} • {match.venue}</p>
                  </div>
                  <p className="font-semibold">{match.date} {match.time}</p>
                </div>
              ))}
            </div>
          </section>
        </section>

        <aside className="space-y-4">
          <SidebarCard title="Latest News" icon={CircleAlert} compact>
            <div className="space-y-3">
              {topNews.map((article) => (
                <article key={article.id} className="border-b border-border pb-2.5 last:border-0 last:pb-0">
                  <h4 className="text-xs font-semibold leading-snug">{article.title}</h4>
                  <p className="text-[11px] text-muted-foreground mt-1">{article.publishedAt}</p>
                </article>
              ))}
            </div>
          </SidebarCard>

          <SidebarCard title="Injury Updates" icon={Bell}>
            <div className="space-y-2 text-xs">
              {injuryUpdates.map((item) => (
                <p key={item} className="rounded-md border border-border px-2.5 py-2 text-muted-foreground">{item}</p>
              ))}
            </div>
          </SidebarCard>

          <SidebarCard title="Fantasy Insights">
            <ul className="space-y-2 text-xs">
              {fantasyInsights.map((insight) => (
                <li key={insight} className="rounded-md border border-border px-2.5 py-2 text-muted-foreground">{insight}</li>
              ))}
            </ul>
          </SidebarCard>

          <SidebarCard title="Crivora Pro">
            <div className="space-y-2.5">
              <p className="text-xs text-muted-foreground">
                Deep player intelligence, predictive win models, saved analytics views, and advanced filters.
              </p>
              <Link to="/teams" className="h-8 w-full rounded-md bg-secondary text-secondary-foreground text-xs font-semibold inline-flex items-center justify-center">
                Explore Pro Analytics
              </Link>
            </div>
          </SidebarCard>

          <SidebarCard title="Trending Stats">
            <div className="space-y-2">
              {trendingStats.map((stat) => (
                <div key={stat.label} className="rounded-md border border-border px-2.5 py-2 flex items-center justify-between text-xs">
                  <span className="text-muted-foreground">{stat.label}</span>
                  <span className="font-semibold">{stat.value}</span>
                </div>
              ))}
            </div>
          </SidebarCard>

          <SidebarCard title="Live Poll">
            <p className="text-xs font-medium">{livePoll.question}</p>
            <div className="space-y-2 mt-2.5">
              {livePoll.options.map((option) => {
                const percent = Math.round((option.votes / pollTotalVotes) * 100);
                return (
                  <div key={option.label}>
                    <div className="flex items-center justify-between text-[11px] mb-1">
                      <span>{option.label}</span>
                      <span className="text-muted-foreground">{percent}%</span>
                    </div>
                    <div className="h-1.5 rounded-full bg-muted overflow-hidden">
                      <div className="h-full bg-primary" style={{ width: `${percent}%` }} />
                    </div>
                  </div>
                );
              })}
            </div>
          </SidebarCard>

          <SidebarCard title="Notifications">
            <div className="space-y-2">
              {quickNotifications.map((notification) => (
                <p key={notification} className="text-xs text-muted-foreground rounded-md border border-border px-2.5 py-2">
                  {notification}
                </p>
              ))}
            </div>
          </SidebarCard>
        </aside>
      </div>

    </main>
  );
}
