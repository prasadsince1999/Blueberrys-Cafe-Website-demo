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
    offset: ["start end", "center center"]
  });

  const { scrollYProgress: scrollOutProgress } = useScroll({
    target: containerRef,
    offset: ["center center", "end start"]
  });

  // Fade in and unblur as it enters, fade out and blur as it leaves
  const opacityIn = useTransform(scrollYProgress, [0, 0.4], [0.3, 1]);
  const blurIn = useTransform(scrollYProgress, [0, 0.4], [10, 0]);
  
  const opacityOut = useTransform(scrollOutProgress, [0.6, 1], [1, 0.3]);
  const blurOut = useTransform(scrollOutProgress, [0.6, 1], [0, 10]);

  // Combine transforms
  const opacity = useTransform(() => Math.min(opacityIn.get(), opacityOut.get()));
  const blur = useTransform(() => Math.max(blurIn.get(), blurOut.get()));

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
