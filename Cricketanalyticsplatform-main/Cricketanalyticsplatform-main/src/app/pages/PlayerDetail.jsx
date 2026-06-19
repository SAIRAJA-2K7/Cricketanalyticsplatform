import { useParams, Link } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { api } from '../services/api.js';
import { ArrowLeft } from 'lucide-react';

export function PlayerDetail() {
  const { id } = useParams();

  const { data: response, isLoading } = useQuery({
    queryKey: ['player', id],
    queryFn: () => api.getPlayerInfo(id),
    enabled: !!id,
  });

  if (isLoading) {
    return <div className="min-h-screen flex items-center justify-center">Loading player profile...</div>;
  }

  const player = response?.data;

  if (!player) {
    return <div className="min-h-screen flex items-center justify-center">Player not found. Note: Free tier might not return specific player details.</div>;
  }

  return (
    <main className="flex-1 w-full max-w-[1540px] mx-auto px-4 py-8">
      <Link to="/players" className="inline-flex items-center gap-2 text-sm font-semibold mb-6 hover:text-primary">
        <ArrowLeft className="w-4 h-4" /> Back to Players
      </Link>
      
      <div className="bg-card border border-border rounded-xl p-8 mb-8 flex flex-col md:flex-row items-center gap-8">
        <div className="w-32 h-32 bg-muted rounded-full flex items-center justify-center overflow-hidden shrink-0">
          {player.playerImg ? (
            <img src={player.playerImg} alt={player.name} className="w-full h-full object-cover" />
          ) : (
            <span className="text-4xl font-bold text-muted-foreground">{player.name.charAt(0)}</span>
          )}
        </div>
        <div>
          <h1 className="text-3xl font-bold mb-2">{player.name}</h1>
          <p className="text-muted-foreground text-lg">{player.country}</p>
          <div className="flex gap-4 mt-4 text-sm">
            <span className="bg-primary/10 text-primary px-3 py-1 rounded-full font-semibold">{player.role || 'Unknown Role'}</span>
            <span className="bg-secondary px-3 py-1 rounded-full font-semibold">{player.battingStyle || 'Unknown Batting'}</span>
            <span className="bg-secondary px-3 py-1 rounded-full font-semibold">{player.bowlingStyle || 'Unknown Bowling'}</span>
          </div>
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Placeholder for Stats (CricAPI free tier may not have full stats) */}
        <section className="bg-card border border-border rounded-xl p-6">
          <h2 className="text-xl font-bold mb-4">Player Details</h2>
          <div className="space-y-4 text-sm">
            <div className="flex justify-between border-b border-border pb-2">
              <span className="text-muted-foreground">Date of Birth</span>
              <span className="font-semibold">{player.dateOfBirth || 'N/A'}</span>
            </div>
            <div className="flex justify-between border-b border-border pb-2">
              <span className="text-muted-foreground">Place of Birth</span>
              <span className="font-semibold">{player.placeOfBirth || 'N/A'}</span>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}
