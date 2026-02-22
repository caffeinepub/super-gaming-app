import { useLeaderboard } from '../hooks/useLeaderboard';
import { Trophy, Medal, Award } from 'lucide-react';
import { Skeleton } from '@/components/ui/skeleton';

export default function Leaderboard() {
  const { scores, isLoading, error } = useLeaderboard();

  if (isLoading) {
    return (
      <div className="max-w-4xl mx-auto space-y-4">
        {[...Array(10)].map((_, i) => (
          <Skeleton key={i} className="h-20 w-full bg-neon-cyan/10" />
        ))}
      </div>
    );
  }

  if (error) {
    return (
      <div className="max-w-4xl mx-auto text-center py-12">
        <p className="text-neon-magenta text-xl">Failed to load leaderboard</p>
        <p className="text-neon-cyan/60 mt-2">{error.message}</p>
      </div>
    );
  }

  if (!scores || scores.length === 0) {
    return (
      <div className="max-w-4xl mx-auto text-center py-12">
        <Trophy className="h-16 w-16 text-neon-cyan/40 mx-auto mb-4" />
        <p className="text-neon-cyan text-xl">No scores yet</p>
        <p className="text-neon-cyan/60 mt-2">Be the first to set a high score!</p>
      </div>
    );
  }

  const getRankIcon = (index: number) => {
    switch (index) {
      case 0:
        return <Trophy className="h-6 w-6 text-neon-yellow" />;
      case 1:
        return <Medal className="h-6 w-6 text-neon-cyan" />;
      case 2:
        return <Award className="h-6 w-6 text-neon-magenta" />;
      default:
        return <span className="text-neon-cyan/60 font-bold">#{index + 1}</span>;
    }
  };

  const getRankColor = (index: number) => {
    switch (index) {
      case 0:
        return 'border-neon-yellow bg-neon-yellow/5';
      case 1:
        return 'border-neon-cyan bg-neon-cyan/5';
      case 2:
        return 'border-neon-magenta bg-neon-magenta/5';
      default:
        return 'border-neon-cyan/30 bg-black/40';
    }
  };

  return (
    <div className="max-w-4xl mx-auto">
      <div className="space-y-3">
        {scores.map((entry, index) => (
          <div
            key={`${entry.player.toString()}-${index}`}
            className={`flex items-center justify-between p-6 rounded-lg border-2 backdrop-blur-sm transition-all hover:scale-[1.02] ${getRankColor(index)}`}
          >
            <div className="flex items-center gap-6">
              <div className="flex items-center justify-center w-12">
                {getRankIcon(index)}
              </div>
              <div>
                <div className="text-sm text-neon-cyan/60">PLAYER</div>
                <div className="text-lg font-mono text-neon-cyan">
                  {entry.player.toString().slice(0, 8)}...{entry.player.toString().slice(-6)}
                </div>
              </div>
            </div>
            <div className="text-right">
              <div className="text-sm text-neon-cyan/60">SCORE</div>
              <div className="text-3xl font-bold text-neon-cyan drop-shadow-glow-cyan">
                {Number(entry.score).toString().padStart(6, '0')}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
