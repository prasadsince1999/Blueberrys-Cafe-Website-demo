import React from 'react';

const MARQUEE_TEXT = "Design & AI experiment — demo build, not the café's official website · All assets are publicly available · Built with Google AI Studio + Antigravity · ";

export function TopMarquee() {
  return (
    <aside 
      aria-label="Demo Disclaimer Banner"
      className="fixed top-0 left-0 right-0 z-50 h-9 bg-[#0c1f22] text-white/90 border-b border-white/10 overflow-hidden flex items-center select-none"
    >
      <div className="flex whitespace-nowrap will-change-transform animate-marquee">
        <div className="flex items-center text-[11px] sm:text-xs font-medium tracking-wider">
          <span>{MARQUEE_TEXT.repeat(4)}</span>
        </div>
        <div className="flex items-center text-[11px] sm:text-xs font-medium tracking-wider" aria-hidden="true">
          <span>{MARQUEE_TEXT.repeat(4)}</span>
        </div>
      </div>
    </aside>
  );
}
