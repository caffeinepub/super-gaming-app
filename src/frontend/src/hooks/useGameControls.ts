import { useState, useEffect, useCallback } from 'react';

interface KeyState {
  w: boolean;
  a: boolean;
  s: boolean;
  d: boolean;
  ArrowUp: boolean;
  ArrowDown: boolean;
  ArrowLeft: boolean;
  ArrowRight: boolean;
  space: boolean;
}

export function useGameControls() {
  const [keys, setKeys] = useState<KeyState>({
    w: false,
    a: false,
    s: false,
    d: false,
    ArrowUp: false,
    ArrowDown: false,
    ArrowLeft: false,
    ArrowRight: false,
    space: false,
  });

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      const key = e.key.toLowerCase();
      
      // Check if it's a valid game control key
      if (key === 'w' || key === 'a' || key === 's' || key === 'd' || key === ' ') {
        e.preventDefault();
        setKeys((prev) => ({ ...prev, [key === ' ' ? 'space' : key]: true }));
      } else if (e.key === 'ArrowUp' || e.key === 'ArrowDown' || e.key === 'ArrowLeft' || e.key === 'ArrowRight') {
        e.preventDefault();
        setKeys((prev) => ({ ...prev, [e.key]: true }));
      }
    };

    const handleKeyUp = (e: KeyboardEvent) => {
      const key = e.key.toLowerCase();
      
      // Check if it's a valid game control key
      if (key === 'w' || key === 'a' || key === 's' || key === 'd' || key === ' ') {
        e.preventDefault();
        setKeys((prev) => ({ ...prev, [key === ' ' ? 'space' : key]: false }));
      } else if (e.key === 'ArrowUp' || e.key === 'ArrowDown' || e.key === 'ArrowLeft' || e.key === 'ArrowRight') {
        e.preventDefault();
        setKeys((prev) => ({ ...prev, [e.key]: false }));
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('keyup', handleKeyUp);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('keyup', handleKeyUp);
    };
  }, []); // Empty dependency array is now safe because we don't reference keys in the handlers

  return { keys };
}
