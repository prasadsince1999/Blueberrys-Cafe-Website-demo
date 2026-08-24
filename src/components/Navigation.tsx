import React, { useState, useEffect } from 'react';
import { cn } from '../lib/utils';
import { useTransition } from '../context/TransitionContext';
import { Logo } from './Logo';

export function Navigation() {
  const [isScrolled, setIsScrolled] = useState(false);
  const { navigateTo } = useTransition();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    navigateTo(href);
  };

  return (
    <header
      className={cn(
        'fixed top-0 left-0 right-0 z-50 transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)]',
        isScrolled ? 'bg-cafe-cream/90 backdrop-blur-md shadow-sm py-3 md:py-4' : 'bg-transparent py-6 md:py-8'
      )}
    >
      <div className="max-w-7xl mx-auto px-6 md:px-12 flex items-center justify-between">
        
        {/* Logo */}
        <div className="flex items-center">
          <a 
            href="#" 
            onClick={(e) => handleNavClick(e, '#')}
            className="flex items-center gap-2.5 md:gap-3 hover:opacity-90 transition-opacity group"
            aria-label="Blueberrys Café Home"
          >
            <div className="w-10 h-10 md:w-12 md:h-12 flex-shrink-0 drop-shadow-sm">
              <Logo />
            </div>
            <span className="font-serif tracking-tight text-cafe-teal whitespace-nowrap text-xl sm:text-2xl md:text-[26px] font-bold inline-block drop-shadow-[0_1px_2px_rgba(255,255,255,0.8)]">
              Blueberrys <span className="font-serif font-bold text-cafe-teal">Café</span>
            </span>
          </a>
        </div>

        {/* Reserve Action */}
        <div className="flex items-center">
          <a 
            href="#reserve" 
            onClick={(e) => handleNavClick(e, '#reserve')}
            className="px-5 py-2.5 md:px-6 md:py-3 border-2 border-cafe-teal text-cafe-teal text-xs md:text-[15px] uppercase tracking-[0.15em] font-bold hover:bg-cafe-teal hover:text-cafe-ivory hover:[text-shadow:none] transition-all [text-shadow:-1px_1px_0px_var(--color-cafe-pink)] focus-visible:outline-2 focus-visible:outline-cafe-teal shadow-sm"
          >
            Reserve
          </a>
        </div>

      </div>
    </header>
  );
}
