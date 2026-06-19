import { ArrowLeft, Share2 } from 'lucide-react';
import { useParams, Link } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { useState } from 'react';
import { api } from '../services/api.js';

export function MatchDetail() {
  const { id } = useParams();
  const [activeTab, setActiveTab] = useState('info');

  const { data: response, isLoading } = useQuery({
    queryKey: ['match', id],
    queryFn: () => api.getMatchInfo(id),
    enabled: !!id,
    refetchInterval: 60000, // Poll every minute
  });

  if (isLoading) {
    return <div className="min-h-screen flex items-center justify-center">Loading match details...</div>;
  }

  const match = response?.data;

  if (!match) {
    return <div className="min-h-screen flex items-center justify-center">Match not found</div>;
  }

  const team1 = match.teamInfo?.[0] || { name: match.teams?.[0] || 'Team 1', shortname: 'T1' };
  const team2 = match.teamInfo?.[1] || { name: match.teams?.[1] || 'Team 2', shortname: 'T2' };
  
  const score1 = match.score?.find(s => s.inning.includes(team1.name)) || { r: 0, w: 0, o: 0 };
  const score2 = match.score?.find(s => s.inning.includes(team2.name)) || { r: 0, w: 0, o: 0 };

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
            <button className="flex items-center gap-2 px-3 py-1.5 bg-primary rounded-lg text-xs font-bold hover:bg-primary/90 transition-all">
              <Share2 className="w-3 h-3" />
              Share
            </button>
          </div>
        </div>
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
        {activeTab !== 'info' && (
          <section className="lg:col-span-12 bg-card border border-border rounded-2xl p-6">
            <h3 className="text-lg font-bold capitalize mb-2">{activeTab}</h3>
            <p className="text-sm text-muted-foreground">
              {activeTab === 'scorecard' && 'Scorecard data can be expanded here using the /api/match/:id/scorecard endpoint.'}
              {activeTab === 'squads' && 'Squads data can be expanded here using the /api/match/:id/squad endpoint.'}
            </p>
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
