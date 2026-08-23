import React from 'react';
import { cn } from '../../lib/utils';

interface NicheProps {
  children?: React.ReactNode;
  className?: string;
  shape?: 1 | 2 | 3 | 4 | 5 | 6;
  innerClassName?: string;
}

export function Niche({ children, className, shape = 1, innerClassName }: NicheProps) {
  // Define different border-radius configurations for the organic blob shapes
  const getShapeRadius = (s: number) => {
    switch (s) {
      case 1: return '40% 60% 50% 40% / 50% 40% 60% 50%'; // Organic blob
      case 2: return '40% 60% 15% 15% / 50% 50% 15% 15%'; // Arch-like blob
      case 3: return '15% 45% 15% 45% / 45% 15% 45% 15%'; // Asymmetric
      case 4: return '30% 70% 60% 40% / 30% 30% 70% 70%'; // Slanted top
      case 5: return '60% 40% 40% 60% / 60% 50% 50% 40%'; // Smooth potato
      case 6: return '20% 60% 20% 20% / 20% 20% 20% 20%'; // Corner bias
      default: return '40% 60% 50% 40% / 50% 40% 60% 50%';
    }
  };

  return (
    <div 
      className={cn(
        "relative bg-[#f1b297] overflow-hidden", // Soft peachy terracotta
        "shadow-[inset_0_15px_30px_rgba(0,0,0,0.25),inset_0_4px_10px_rgba(0,0,0,0.3),0_2px_4px_rgba(0,0,0,0.05),inset_0_-3px_5px_rgba(255,255,255,0.3)]",
        className
      )}
      style={{ borderRadius: getShapeRadius(shape) }}
    >
      {/* Wall Texture Overlay */}
      <div className="absolute inset-0 opacity-[0.25] mix-blend-color-burn bg-[url('https://www.transparenttextures.com/patterns/white-wall.png')] pointer-events-none" />
      
      {/* Top Spotlight (Light Bulb Effect) */}
      <div 
        className="absolute top-0 left-1/2 -translate-x-1/2 w-[150%] h-[150%] pointer-events-none z-10"
        style={{
          background: 'radial-gradient(circle at 50% -15%, rgba(255,245,220,1) 0%, rgba(255,210,150,0.7) 25%, rgba(241,178,151,0) 60%)'
        }}
      />
      
      {/* Light Bulb Hotspot (The bulb itself) */}
      <div className="absolute top-[-8px] left-1/2 -translate-x-1/2 w-8 h-8 bg-[#fffcf5] rounded-full blur-[3px] opacity-90 pointer-events-none z-10 shadow-[0_0_25px_15px_rgba(255,230,180,0.9)]" />

      {/* Content Container */}
      <div className={cn("relative z-0 h-full w-full", innerClassName)}>
        {children}
      </div>
    </div>
  );
}
