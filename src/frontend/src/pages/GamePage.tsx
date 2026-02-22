import { useState, useEffect } from 'react';
import { useNavigate } from '@tanstack/react-router';
import Game3DScene from '../components/Game3DScene';
import GameControls from '../components/GameControls';
import PowerUpIndicator from '../components/PowerUpIndicator';
import { Button } from '@/components/ui/button';
import { useScoreSubmission } from '../hooks/useScoreSubmission';
import { Trophy, Play, RotateCcw } from 'lucide-react';

type GameStatus = 'menu' | 'playing' | 'paused' | 'gameover';

export default function GamePage() {
  const navigate = useNavigate();
  const [gameStatus, setGameStatus] = useState<GameStatus>('menu');
  const [score, setScore] = useState(0);
  const [hasPowerUp, setHasPowerUp] = useState(false);
  const { submitScore, isSubmitting } = useScoreSubmission();

  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && gameStatus === 'playing') {
        setGameStatus('paused');
      } else if (e.key === 'Escape' && gameStatus === 'paused') {
        setGameStatus('playing');
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [gameStatus]);

  const handleStartGame = () => {
    setScore(0);
    setHasPowerUp(false);
    setGameStatus('playing');
  };

  const handleGameOver = async (finalScore: number) => {
    setGameStatus('gameover');
    await submitScore(finalScore);
  };

  const handleScoreUpdate = (newScore: number) => {
    setScore(newScore);
  };

  return (
    <div className="relative h-screen w-full">
      {/* Header */}
      <header className="absolute top-0 left-0 right-0 z-50 flex items-center justify-between p-6">
        <div className="flex items-center gap-4">
          <img 
            src="/assets/generated/game-logo.dim_256x256.png" 
            alt="Game Logo" 
            className="h-12 w-12 drop-shadow-neon-cyan"
          />
          <h1 className="text-3xl font-bold text-neon-cyan drop-shadow-glow-cyan">
            NEON RUNNER
          </h1>
        </div>
        <Button
          onClick={() => navigate({ to: '/leaderboard' })}
          variant="outline"
          className="border-neon-magenta text-neon-magenta hover:bg-neon-magenta/20 hover:text-neon-magenta"
        >
          <Trophy className="mr-2 h-4 w-4" />
          Leaderboard
        </Button>
      </header>

      {/* Game Scene */}
      <div className="absolute inset-0">
        {gameStatus === 'playing' && (
          <Game3DScene
            onGameOver={handleGameOver}
            onScoreUpdate={handleScoreUpdate}
            onPowerUpCollected={() => setHasPowerUp(true)}
            onPowerUpExpired={() => setHasPowerUp(false)}
          />
        )}
      </div>

      {/* HUD Overlay */}
      {gameStatus === 'playing' && (
        <div className="absolute top-20 left-0 right-0 z-40 flex justify-between px-6">
          <div className="rounded-lg border-2 border-neon-cyan bg-black/80 px-6 py-3 backdrop-blur-sm">
            <div className="text-sm text-neon-cyan/70">SCORE</div>
            <div className="text-3xl font-bold text-neon-cyan drop-shadow-glow-cyan">
              {score.toString().padStart(6, '0')}
            </div>
          </div>
          <PowerUpIndicator active={hasPowerUp} />
        </div>
      )}

      {/* Menu Overlay */}
      {gameStatus === 'menu' && (
        <div className="absolute inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-md">
          <div className="text-center space-y-8">
            <img 
              src="/assets/generated/game-logo.dim_256x256.png" 
              alt="Game Logo" 
              className="mx-auto h-32 w-32 drop-shadow-neon-cyan animate-pulse"
            />
            <h1 className="text-6xl font-bold text-neon-cyan drop-shadow-glow-cyan">
              NEON RUNNER
            </h1>
            <p className="text-xl text-neon-magenta">
              Collect orbs • Avoid obstacles • Beat the high score
            </p>
            <Button
              onClick={handleStartGame}
              size="lg"
              className="bg-neon-cyan text-black hover:bg-neon-cyan/90 text-xl px-8 py-6 drop-shadow-glow-cyan"
            >
              <Play className="mr-2 h-6 w-6" />
              START GAME
            </Button>
            <GameControls />
          </div>
        </div>
      )}

      {/* Pause Overlay */}
      {gameStatus === 'paused' && (
        <div className="absolute inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-md">
          <div className="text-center space-y-6">
            <h2 className="text-5xl font-bold text-neon-yellow drop-shadow-glow-yellow">
              PAUSED
            </h2>
            <p className="text-xl text-neon-cyan">Press ESC to resume</p>
            <div className="flex gap-4 justify-center">
              <Button
                onClick={() => setGameStatus('playing')}
                size="lg"
                className="bg-neon-cyan text-black hover:bg-neon-cyan/90"
              >
                <Play className="mr-2 h-5 w-5" />
                Resume
              </Button>
              <Button
                onClick={() => setGameStatus('menu')}
                size="lg"
                variant="outline"
                className="border-neon-magenta text-neon-magenta hover:bg-neon-magenta/20"
              >
                Main Menu
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* Game Over Overlay */}
      {gameStatus === 'gameover' && (
        <div className="absolute inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-md">
          <div className="text-center space-y-6">
            <h2 className="text-5xl font-bold text-neon-magenta drop-shadow-glow-magenta">
              GAME OVER
            </h2>
            <div className="rounded-lg border-2 border-neon-cyan bg-black/80 px-8 py-4 backdrop-blur-sm">
              <div className="text-sm text-neon-cyan/70">FINAL SCORE</div>
              <div className="text-5xl font-bold text-neon-cyan drop-shadow-glow-cyan">
                {score.toString().padStart(6, '0')}
              </div>
            </div>
            {isSubmitting && (
              <p className="text-neon-yellow animate-pulse">Submitting score...</p>
            )}
            <div className="flex gap-4 justify-center">
              <Button
                onClick={handleStartGame}
                size="lg"
                className="bg-neon-cyan text-black hover:bg-neon-cyan/90"
              >
                <RotateCcw className="mr-2 h-5 w-5" />
                Play Again
              </Button>
              <Button
                onClick={() => navigate({ to: '/leaderboard' })}
                size="lg"
                variant="outline"
                className="border-neon-magenta text-neon-magenta hover:bg-neon-magenta/20"
              >
                <Trophy className="mr-2 h-5 w-5" />
                View Leaderboard
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
