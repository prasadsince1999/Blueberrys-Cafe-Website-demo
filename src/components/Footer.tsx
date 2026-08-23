import { motion, useScroll, useTransform } from 'motion/react';
import React, { useRef } from 'react';
import { ModernImage } from './ui/ModernImage';
import { useTransition } from '../context/TransitionContext';
import { Logo } from './Logo';

export function Footer() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { navigateTo } = useTransition();

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    if (href.startsWith('#')) {
      e.preventDefault();
      navigateTo(href);
    }
  };

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end end"]
  });

  const titleY = useTransform(scrollYProgress, [0, 1], [100, 0]);
  const opacity = useTransform(scrollYProgress, [0, 0.5, 1], [0, 0.5, 1]);

  return (
    <footer ref={containerRef} className="bg-cafe-cream relative overflow-hidden pt-24 md:pt-40 pb-12 border-t border-cafe-teal/20">
      
      {/* Decorative Floral Background */}
      <div className="absolute right-0 bottom-0 w-1/2 h-[120%] pointer-events-none opacity-40 mix-blend-multiply">
        <ModernImage src="/floral-footer-corner-decor" alt="Floral Corner Decor" className="w-full h-full object-cover" />
      </div>

      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
        
        <motion.div 
          style={{ y: titleY, opacity }}
          className="mb-24 md:mb-40 max-w-3xl"
        >
          <span className="text-cafe-teal uppercase tracking-[0.3em] text-sm font-medium mb-6 block">
            Until the next cup
          </span>
          <h2 className="font-serif text-5xl md:text-7xl lg:text-8xl text-cafe-teal leading-tight">
            See you at <br/>
            <span className="italic text-cafe-pink">Blueberrys.</span>
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 md:gap-8 border-t border-cafe-teal/20 pt-12">
          
          <div className="md:col-span-1">
            <a 
              href="#top" 
              onClick={(e) => handleNavClick(e, '#top')}
              className="flex items-center gap-1.5 md:gap-2 hover:opacity-90 transition-opacity mb-6"
            >
              <Logo className="h-12 md:h-14 w-auto" />
              <span className="font-serif tracking-wide text-cafe-teal whitespace-nowrap text-2xl md:text-3xl">
                Blueberrys<span className="italic text-cafe-blossom ml-[0.15em]">Café</span>
              </span>
            </a>
            <p className="text-sm text-cafe-text/80 font-light leading-relaxed max-w-xs">
              A floral garden café designed for beautiful moments, good food, and perfect coffee.
            </p>
          </div>

          <div>
            <h3 className="uppercase tracking-widest text-xs font-semibold text-cafe-teal mb-6">Visit</h3>
            <ul className="space-y-3 text-sm text-cafe-text/80 font-light">
              <li>123 Floral Avenue</li>
              <li>Garden District</li>
              <li>Bhubaneswar, Odisha 751024</li>
              <li className="pt-2">
                <a 
                  href="https://maps.google.com/?q=Blueberrys+Cafe+Bhubaneswar" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-cafe-blossom font-medium hover:text-cafe-teal transition-colors"
                >
                  Get Directions
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="uppercase tracking-widest text-xs font-semibold text-cafe-teal mb-6">Contact</h3>
            <ul className="space-y-3 text-sm text-cafe-text/80 font-light">
              <li>+91 98765 43210</li>
              <li>hello@blueberryscafe.com</li>
              <li className="pt-2">
                <a 
                  href="#reserve" 
                  onClick={(e) => handleNavClick(e, '#reserve')}
                  className="text-cafe-blossom font-medium hover:text-cafe-teal transition-colors"
                >
                  Reserve a Table
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="uppercase tracking-widest text-xs font-semibold text-cafe-teal mb-6">Social</h3>
            <ul className="space-y-3 text-sm text-cafe-text/80 font-light">
              <li><a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="hover:text-cafe-blossom transition-colors">Instagram</a></li>
              <li><a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="hover:text-cafe-blossom transition-colors">Facebook</a></li>
              <li><a href="https://swiggy.com" target="_blank" rel="noopener noreferrer" className="hover:text-cafe-blossom transition-colors">Swiggy</a></li>
            </ul>
          </div>

        </div>

        <div className="mt-24 text-center md:text-left flex flex-col md:flex-row justify-between items-center text-xs text-cafe-text/75 font-normal uppercase tracking-wider">
          <p>&copy; {new Date().getFullYear()} Blueberrys Café. All rights reserved.</p>
          <div className="flex gap-6 mt-4 md:mt-0">
            <a href="#privacy" className="hover:text-cafe-teal transition-colors">Privacy Policy</a>
            <a href="#terms" className="hover:text-cafe-teal transition-colors">Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
