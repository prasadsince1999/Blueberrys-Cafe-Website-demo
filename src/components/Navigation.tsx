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
        'fixed top-9 left-0 right-0 z-40 transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)]',
        isScrolled ? 'bg-cafe-cream/90 backdrop-blur-md shadow-sm py-3 md:py-4' : 'bg-transparent py-6 md:py-8'
      )}
    >
      <div className="max-w-7xl mx-auto px-6 md:px-12 flex items-center justify-between">
        
        {/* Logo */}
        <div className="flex items-center">
          <a 
            href="#" 
            onClick={(e) => handleNavClick(e, '#')}
            className="flex items-center gap-1.5 md:gap-2 hover:opacity-90 transition-opacity"
            aria-label="Blueberrys Café Home"
          >
            <Logo className="h-10 md:h-12 w-auto" />
            <span className="font-serif tracking-wide text-cafe-teal whitespace-nowrap text-xl sm:text-2xl md:text-3xl font-bold inline-block [text-shadow:-1.5px_1.5px_0px_var(--color-cafe-pink)]">
              Blueberrys<span className="italic text-cafe-pink ml-[0.15em] [text-shadow:-1.5px_1.5px_0px_var(--color-cafe-teal)]">Café</span>
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
