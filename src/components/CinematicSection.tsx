import { motion, useScroll, useTransform } from 'motion/react';
import { useRef, ReactNode } from 'react';
import { cn } from '../lib/utils';

interface CinematicSectionProps {
  children: ReactNode;
  className?: string;
  id?: string;
}

export function CinematicSection({ children, className, id }: CinematicSectionProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  // Soft, natural entry and exit without locking the screen in heavy blur
  const opacity = useTransform(scrollYProgress, [0, 0.15, 0.85, 1], [0.85, 1, 1, 0.85]);
  const blur = useTransform(scrollYProgress, [0, 0.15, 0.85, 1], [2, 0, 0, 2]);

  return (
    <motion.section
      id={id}
      ref={containerRef}
      className={cn("relative", className)}
      style={{
        opacity,
        filter: useTransform(blur, v => `blur(${v}px)`)
      }}
    >
      {children}
    </motion.section>
  );
}
