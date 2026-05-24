import React, { useEffect } from 'react';
import confetti from 'canvas-confetti';

interface ConfettiProps {
  fire: boolean;
  onComplete?: () => void;
}

export const Confetti: React.FC<ConfettiProps> = ({ fire, onComplete }) => {
  useEffect(() => {
    if (fire) {
      const duration = 3000;
      const end = Date.now() + duration;

      const frame = () => {
        confetti({
          particleCount: 5,
          angle: 60,
          spread: 55,
          origin: { x: 0 },
          colors: ['#6366f1', '#8b5cf6', '#10b981', '#f59e0b', '#f43f5e']
        });
        confetti({
          particleCount: 5,
          angle: 120,
          spread: 55,
          origin: { x: 1 },
          colors: ['#6366f1', '#8b5cf6', '#10b981', '#f59e0b', '#f43f5e']
        });

        if (Date.now() < end) {
          requestAnimationFrame(frame);
        } else if (onComplete) {
          onComplete();
        }
      };
      
      frame();
    }
  }, [fire, onComplete]);

  return null;
};
