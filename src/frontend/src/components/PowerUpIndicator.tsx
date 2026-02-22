interface PowerUpIndicatorProps {
  active: boolean;
}

export default function PowerUpIndicator({ active }: PowerUpIndicatorProps) {
  if (!active) return null;

  return (
    <div className="rounded-lg border-2 border-neon-yellow bg-black/80 px-6 py-3 backdrop-blur-sm animate-pulse">
      <div className="flex items-center gap-3">
        <img 
          src="/assets/generated/powerup-icon.dim_128x128.png" 
          alt="Power Up" 
          className="h-10 w-10 drop-shadow-glow-yellow"
        />
        <div>
          <div className="text-sm text-neon-yellow/70">POWER-UP</div>
          <div className="text-xl font-bold text-neon-yellow drop-shadow-glow-yellow">
            INVINCIBLE
          </div>
        </div>
      </div>
    </div>
  );
}
