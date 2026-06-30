import { ArrowLeft, Share2 } from 'lucide-react';
import { useParams, Link } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { useState } from 'react';
import { api } from '../services/api.js';
import { normalizeLiveMatch } from '../utils/matches.js';

export function MatchDetail() {
  const { id } = useParams();
  const [activeTab, setActiveTab] = useState('info');
  const [shareMessage, setShareMessage] = useState('');

  const { data: response, isLoading } = useQuery({
    queryKey: ['match', id],
    queryFn: () => api.getMatchInfo(id),
    enabled: !!id,
    refetchInterval: 60000, // Poll every minute
  });

  const { data: scorecardResponse, isLoading: scorecardLoading } = useQuery({
    queryKey: ['match-scorecard', id],
    queryFn: () => api.getMatchScorecard(id),
    enabled: !!id && activeTab === 'scorecard',
    staleTime: 60000,
  });

  const { data: squadResponse, isLoading: squadLoading } = useQuery({
    queryKey: ['match-squad', id],
    queryFn: () => api.getMatchSquad(id),
    enabled: !!id && activeTab === 'squads',
    staleTime: 60000,
  });

  if (isLoading) {
    return <div className="min-h-screen flex items-center justify-center">Loading match details...</div>;
  }

  const match = normalizeLiveMatch(response?.data);

  if (!match) {
    return <div className="min-h-screen flex items-center justify-center">Match not found</div>;
  }

  const team1 = match.teamInfo?.[0] || { name: match.team1?.name || 'Team 1', shortname: match.team1?.shortName || 'T1' };
  const team2 = match.teamInfo?.[1] || { name: match.team2?.name || 'Team 2', shortname: match.team2?.shortName || 'T2' };

  const score1 = match.score?.[0] || { r: 0, w: 0, o: 0 };
  const score2 = match.score?.[1] || { r: 0, w: 0, o: 0 };
  const scorecard = scorecardResponse?.data?.scoreCard || scorecardResponse?.data?.scorecard || [];
  const squads = squadResponse?.data || [];

  const handleShare = async () => {
    const shareUrl = typeof window !== 'undefined' ? window.location.href : '';
    try {
      if (navigator.share) {
        await navigator.share({ title: match.name, url: shareUrl });
        setShareMessage('Match link shared.');
        return;
      }

      if (navigator.clipboard?.writeText) {
        await navigator.clipboard.writeText(shareUrl);
        setShareMessage('Match link copied to clipboard.');
        return;
      }
    } catch {
      setShareMessage('Share was cancelled.');
      return;
    }

    setShareMessage('Sharing is not available in this browser.');
  };

  return (
    <>
      {/* Top Navigation (Condensed) */}
      <div className="bg-secondary text-white border-b border-white/10">
        <div className="max-w-7xl mx-auto px-4 h-14 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Link to="/" className="hover:bg-white/10 p-2 rounded-full transition-colors">
              <ArrowLeft className="w-5 h-5" />
            </Link>
            <div className="flex flex-col">
              <span className="text-xs font-bold text-primary uppercase leading-none">
                Match Center
              </span>
              <span className="text-sm font-bold truncate">
                {match.name}
              </span>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <button type="button" onClick={handleShare} className="flex items-center gap-2 px-3 py-1.5 bg-primary rounded-lg text-xs font-bold hover:bg-primary/90 transition-all">
              <Share2 className="w-3 h-3" />
              Share
            </button>
          </div>
        </div>
        {shareMessage ? <p className="max-w-7xl mx-auto px-4 pb-3 text-[11px] text-white/70">{shareMessage}</p> : null}
      </div>

      {/* Match Summary Header */}
      <section className="bg-secondary text-white pb-8">
        <div className="max-w-7xl mx-auto px-4 pt-6">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-8">
            {/* Team A */}
            <div className="flex items-center gap-6">
              <div className="w-20 h-20 rounded-2xl bg-white/5 p-4 border border-white/10 flex items-center justify-center">
                {team1.img ? (
                  <img src={team1.img} alt={team1.name} className="w-full h-auto rounded" />
                ) : (
                  <span className="font-bold">{team1.shortname}</span>
                )}
              </div>
              <div>
                <h1 className="text-3xl font-bold tracking-tighter">{score1.r}/{score1.w}</h1>
                <p className="text-sm font-bold text-white/60">
                  {team1.name} ({score1.o} Ov)
                </p>
              </div>
            </div>

            {/* Match Status Central */}
            <div className="flex flex-col items-center gap-2">
              <span className="px-3 py-1 bg-primary text-white text-[10px] font-bold rounded-full uppercase animate-pulse">
                {match.matchType}
              </span>
              <p className="text-xs font-medium text-white/60 text-center">
                {match.status}
              </p>
            </div>

            {/* Team B */}
            <div className="flex flex-row-reverse md:flex-row items-center gap-6">
              <div className="text-right md:text-left">
                <h1 className="text-3xl font-bold tracking-tighter text-white/40">
                  {score2.r}/{score2.w}
                </h1>
                <p className="text-sm font-bold text-white/60">
                  {team2.name} ({score2.o} Ov)
                </p>
              </div>
              <div className="w-20 h-20 rounded-2xl bg-white/5 p-4 border border-white/10 flex items-center justify-center">
                {team2.img ? (
                  <img src={team2.img} alt={team2.name} className="w-full h-auto rounded" />
                ) : (
                  <span className="font-bold">{team2.shortname}</span>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Tabs Navigation */}
      <div className="bg-secondary text-white border-t border-white/10 sticky top-16 z-40">
        <div className="max-w-7xl mx-auto px-4 flex gap-8 overflow-x-auto scrollbar-hide">
          <button onClick={() => setActiveTab('info')} className={`py-4 text-sm font-bold whitespace-nowrap ${activeTab === 'info' ? 'text-primary border-b-2 border-primary' : 'text-white/60 hover:text-white transition-colors'}`}>
            Info
          </button>
          <button onClick={() => setActiveTab('scorecard')} className={`py-4 text-sm font-bold whitespace-nowrap ${activeTab === 'scorecard' ? 'text-primary border-b-2 border-primary' : 'text-white/60 hover:text-white transition-colors'}`}>
            Scorecard
          </button>
          <button onClick={() => setActiveTab('squads')} className={`py-4 text-sm font-bold whitespace-nowrap ${activeTab === 'squads' ? 'text-primary border-b-2 border-primary' : 'text-white/60 hover:text-white transition-colors'}`}>
            Squads
          </button>
        </div>
      </div>

      <main className="flex-1 max-w-7xl mx-auto px-4 py-8 w-full grid grid-cols-1 lg:grid-cols-12 gap-8">
        {activeTab === 'scorecard' && (
          <section className="lg:col-span-12 bg-card border border-border rounded-2xl p-6">
            <h3 className="text-lg font-bold capitalize mb-4">Scorecard</h3>
            {scorecardLoading ? (
              <p className="text-sm text-muted-foreground">Loading scorecard...</p>
            ) : scorecard.length ? (
              <div className="space-y-4">
                {scorecard.map((innings, index) => (
                  <article key={`${innings.innings || 'innings'}-${index}`} className="border border-border rounded-xl p-4">
                    <div className="flex items-center justify-between gap-3 mb-3">
                      <h4 className="font-semibold">{innings.innings || `Innings ${index + 1}`}</h4>
                      <span className="text-sm text-muted-foreground">
                        {innings.score || `${innings.r || 0}/${innings.w || 0}`}
                      </span>
                    </div>
                    <div className="overflow-x-auto">
                      <table className="w-full text-sm">
                        <thead>
                          <tr className="text-left text-muted-foreground border-b border-border">
                            <th className="py-2 pr-3">Batter</th>
                            <th className="py-2 pr-3">R</th>
                            <th className="py-2 pr-3">B</th>
                            <th className="py-2 pr-3">4s</th>
                            <th className="py-2">6s</th>
                          </tr>
                        </thead>
                        <tbody>
                          {(innings.batsman || innings.batting || []).map((player, playerIndex) => (
                            <tr key={`${player.name || player.batsman || 'player'}-${playerIndex}`} className="border-b border-border/60 last:border-0">
                              <td className="py-2 pr-3">{player.name || player.batsman || 'Unknown'}</td>
                              <td className="py-2 pr-3">{player.r ?? player.runs ?? 0}</td>
                              <td className="py-2 pr-3">{player.b ?? player.balls ?? 0}</td>
                              <td className="py-2 pr-3">{player['4s'] ?? player.fours ?? 0}</td>
                              <td className="py-2">{player['6s'] ?? player.sixes ?? 0}</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </article>
                ))}
              </div>
            ) : (
              <p className="text-sm text-muted-foreground">Detailed scorecard data is not available for this match right now.</p>
            )}
          </section>
        )}

        {activeTab === 'squads' && (
          <section className="lg:col-span-12 bg-card border border-border rounded-2xl p-6">
            <h3 className="text-lg font-bold capitalize mb-4">Squads</h3>
            {squadLoading ? (
              <p className="text-sm text-muted-foreground">Loading squads...</p>
            ) : squads.length ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {squads.map((team, index) => (
                  <article key={`${team.teamName || team.name || 'team'}-${index}`} className="border border-border rounded-xl p-4">
                    <h4 className="font-semibold mb-3">{team.teamName || team.name || `Team ${index + 1}`}</h4>
                    <div className="space-y-2 text-sm">
                      {(team.players || team.squad || []).map((player, playerIndex) => (
                        <p key={`${player.name || player}-${playerIndex}`} className="border border-border/60 rounded-md px-3 py-2">
                          {player.name || player}
                        </p>
                      ))}
                    </div>
                  </article>
                ))}
              </div>
            ) : (
              <p className="text-sm text-muted-foreground">Squad data is not available for this match right now.</p>
            )}
          </section>
        )}

        {activeTab === 'info' && (
          <div className="lg:col-span-12 space-y-8">
            <div className="bg-card border border-border rounded-2xl p-6 shadow-sm space-y-6">
              <h3 className="text-sm font-bold uppercase tracking-wide">Match Info</h3>
              <div className="space-y-4">
                <div className="flex justify-between border-b border-border pb-3">
                  <span className="text-xs text-muted-foreground">Match</span>
                  <span className="text-xs font-bold text-right">{match.name}</span>
                </div>
                <div className="flex justify-between border-b border-border pb-3">
                  <span className="text-xs text-muted-foreground">Venue</span>
                  <span className="text-xs font-bold text-right">{match.venue}</span>
                </div>
                <div className="flex justify-between border-b border-border pb-3">
                  <span className="text-xs text-muted-foreground">Date</span>
                  <span className="text-xs font-bold text-right">{new Date(match.date).toLocaleDateString()}</span>
                </div>
                <div className="flex justify-between border-b border-border pb-3">
                  <span className="text-xs text-muted-foreground">Toss</span>
                  <span className="text-xs font-bold text-right">{match.tossWinner ? `${match.tossWinner} elected to ${match.tossChoice}` : 'N/A'}</span>
                </div>
              </div>
            </div>
          </div>
        )}
      </main>
    </>
  );
}
