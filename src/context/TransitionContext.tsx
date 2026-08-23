import React, { createContext, useContext, useState, ReactNode } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { useLenis } from 'lenis/react';
import { Leaf } from 'lucide-react';
import { cn } from '../lib/utils';

type TransitionContextType = {
  navigateTo: (targetId: string) => void;
};

const TransitionContext = createContext<TransitionContextType | undefined>(undefined);

export function TransitionProvider({ children }: { children: ReactNode }) {
  const [isTransitioning, setIsTransitioning] = useState(false);
  const lenis = useLenis();

  const navigateTo = (targetId: string) => {
    if (isTransitioning) return;
    
    // External links or missing targets shouldn't trigger local page transition
    if (!targetId.startsWith('#')) {
      window.location.href = targetId;
      return;
    }

    setIsTransitioning(true);
    
    // Wait for the "page turn" to fully cover the screen (duration is 0.8s + 0.1s delay)
    setTimeout(() => {
      if (targetId === '#' || targetId === '#root') {
        if (lenis) {
          lenis.scrollTo(0, { immediate: true, force: true });
        } else {
          window.scrollTo({ top: 0, behavior: 'instant' });
        }
      } else {
        const id = targetId.replace('#', '');
        const element = document.getElementById(id);
        
        if (element) {
          if (lenis) {
            lenis.scrollTo(element, { immediate: true, force: true });
          } else {
            element.scrollIntoView({ behavior: 'instant' });
          }
        }
      }
      
      // Small pause before opening the new page
      setTimeout(() => {
        setIsTransitioning(false);
      }, 200);
    }, 900);
  };

  return (
    <TransitionContext.Provider value={{ navigateTo }}>
      {children}
      <AnimatePresence>
        {isTransitioning && <PageTransitionOverlay />}
      </AnimatePresence>
    </TransitionContext.Provider>
  );
}

function PageTransitionOverlay() {
  return (
    <div className="fixed inset-0 z-[9999] pointer-events-none flex">
      {/* Accent layer - deep pink sweep */}
      <motion.div
        className="absolute inset-0 bg-cafe-pink"
        initial={{ scaleX: 0, transformOrigin: 'right' }}
        animate={{ scaleX: 1 }}
        exit={{ scaleX: 0, transformOrigin: 'left' }}
        transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1] }}
      />
      
      {/* Main Paper Layer - mimics a floral journal page turning */}
      <motion.div
        className="absolute inset-0 bg-cafe-cream flex items-center justify-center overflow-hidden shadow-2xl"
        initial={{ scaleX: 0, transformOrigin: 'right' }}
        animate={{ scaleX: 1 }}
        exit={{ scaleX: 0, transformOrigin: 'left' }}
        transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1], delay: 0.1 }}
      >
        {/* Subtle paper texture overlay */}
        <div className="absolute inset-0 opacity-[0.05] mix-blend-multiply bg-[url('https://www.transparenttextures.com/patterns/cream-paper.png')]" />
        
        {/* Centerpiece graphic representing the pressed flower in the journal */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9, filter: 'blur(5px)' }}
          animate={{ opacity: 1, scale: 1, filter: 'blur(0px)' }}
          exit={{ opacity: 0, scale: 1.1, filter: 'blur(5px)' }}
          transition={{ duration: 0.4, delay: 0.4 }}
          className="relative flex flex-col items-center"
        >
          <div className="w-24 h-32 border border-cafe-teal/30 p-2 relative flex items-center justify-center bg-cafe-ivory/50">
            <Leaf className="text-cafe-teal/60 w-10 h-10 stroke-[1]" />
            <div className="absolute inset-0 border border-cafe-teal/10 m-1" />
          </div>
          <span className="mt-6 font-serif italic text-cafe-teal tracking-[0.2em] text-sm">Chapter</span>
        </motion.div>
      </motion.div>
    </div>
  );
}

export const useTransition = () => {
  const context = useContext(TransitionContext);
  if (!context) throw new Error('Must use within TransitionProvider');
  return context;
};
