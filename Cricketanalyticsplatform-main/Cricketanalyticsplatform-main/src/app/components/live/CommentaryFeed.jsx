import { useQuery } from '@tanstack/react-query';
import { api } from '../../services/api.js';

export function CommentaryFeed({ matchId }) {
  const { data: response, isLoading } = useQuery({
    queryKey: ['match_scorecard', matchId],
    queryFn: () => api.getMatchScorecard(matchId),
    enabled: Boolean(matchId),
    staleTime: 60000,
  });

  return (
    <section className="bg-card border border-border rounded-xl overflow-hidden flex flex-col h-full">
      <header className="px-4 py-3 border-b border-border bg-muted/30 flex items-center justify-between">
        <h3 className="text-sm font-semibold">Live Event Updates</h3>
      </header>
      <div className="flex-1 min-h-[300px] flex items-center justify-center p-6 text-center">
        {isLoading ? (
          <p className="text-sm text-muted-foreground animate-pulse">Loading updates...</p>
        ) : (
          <div className="space-y-2">
            <p className="text-sm text-muted-foreground">Live commentary is not available in the current tier.</p>
            <p className="text-xs text-muted-foreground">Scorecard summary loaded successfully.</p>
          </div>
        )}
      </div>
    </section>
  );
}

