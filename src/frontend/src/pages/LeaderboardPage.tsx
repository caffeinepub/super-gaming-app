import { useNavigate } from '@tanstack/react-router';
import Leaderboard from '../components/Leaderboard';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';

export default function LeaderboardPage() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex flex-col">
      {/* Header */}
      <header className="flex items-center justify-between p-6">
        <div className="flex items-center gap-4">
          <img 
            src="/assets/generated/game-logo.dim_256x256.png" 
            alt="Game Logo" 
            className="h-12 w-12 drop-shadow-neon-cyan"
          />
          <h1 className="text-3xl font-bold text-neon-cyan drop-shadow-glow-cyan">
            LEADERBOARD
          </h1>
        </div>
        <Button
          onClick={() => navigate({ to: '/game' })}
          variant="outline"
          className="border-neon-magenta text-neon-magenta hover:bg-neon-magenta/20 hover:text-neon-magenta"
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Game
        </Button>
      </header>

      {/* Leaderboard Content */}
      <main className="flex-1 container mx-auto px-4 py-8">
        <Leaderboard />
      </main>

      {/* Footer */}
      <footer className="border-t border-neon-cyan/20 bg-black/40 backdrop-blur-sm py-4 text-center text-sm text-neon-cyan/60">
        <p>
          © {new Date().getFullYear()} • Built with love using{' '}
          <a
            href={`https://caffeine.ai/?utm_source=Caffeine-footer&utm_medium=referral&utm_content=${encodeURIComponent(window.location.hostname)}`}
            target="_blank"
            rel="noopener noreferrer"
            className="text-neon-magenta hover:text-neon-magenta/80 transition-colors"
          >
            caffeine.ai
          </a>
        </p>
      </footer>
    </div>
  );
}
