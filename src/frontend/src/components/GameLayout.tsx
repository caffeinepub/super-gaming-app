import { ReactNode } from 'react';

interface GameLayoutProps {
  children: ReactNode;
}

export default function GameLayout({ children }: GameLayoutProps) {
  return (
    <div className="relative min-h-screen overflow-hidden bg-gradient-to-br from-[#0a0015] via-[#1a0033] to-[#0f001a]">
      <div 
        className="absolute inset-0 opacity-20"
        style={{
          backgroundImage: `url(/assets/generated/game-background.dim_1920x1080.png)`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
        }}
      />
      <div className="absolute inset-0 bg-grid-pattern opacity-10" />
      <div className="relative z-10">{children}</div>
    </div>
  );
}
