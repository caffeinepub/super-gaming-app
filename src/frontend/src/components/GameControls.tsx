import { Keyboard } from 'lucide-react';

export default function GameControls() {
  return (
    <div className="inline-block rounded-lg border-2 border-neon-cyan/30 bg-black/60 p-6 backdrop-blur-sm">
      <div className="flex items-center gap-2 mb-4">
        <Keyboard className="h-5 w-5 text-neon-cyan" />
        <h3 className="text-lg font-bold text-neon-cyan">CONTROLS</h3>
      </div>
      <div className="grid grid-cols-2 gap-4 text-sm">
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <kbd className="px-2 py-1 bg-neon-cyan/20 border border-neon-cyan rounded text-neon-cyan font-mono">
              W
            </kbd>
            <span className="text-neon-cyan/70">Move Forward</span>
          </div>
          <div className="flex items-center gap-2">
            <kbd className="px-2 py-1 bg-neon-cyan/20 border border-neon-cyan rounded text-neon-cyan font-mono">
              S
            </kbd>
            <span className="text-neon-cyan/70">Move Back</span>
          </div>
        </div>
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <kbd className="px-2 py-1 bg-neon-cyan/20 border border-neon-cyan rounded text-neon-cyan font-mono">
              A
            </kbd>
            <span className="text-neon-cyan/70">Move Left</span>
          </div>
          <div className="flex items-center gap-2">
            <kbd className="px-2 py-1 bg-neon-cyan/20 border border-neon-cyan rounded text-neon-cyan font-mono">
              D
            </kbd>
            <span className="text-neon-cyan/70">Move Right</span>
          </div>
        </div>
      </div>
      <div className="mt-4 pt-4 border-t border-neon-cyan/20">
        <div className="flex items-center gap-2">
          <kbd className="px-2 py-1 bg-neon-magenta/20 border border-neon-magenta rounded text-neon-magenta font-mono">
            ESC
          </kbd>
          <span className="text-neon-cyan/70">Pause Game</span>
        </div>
      </div>
    </div>
  );
}
