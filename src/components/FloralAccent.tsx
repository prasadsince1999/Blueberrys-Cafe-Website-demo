import { motion } from 'motion/react';
import { cn } from '../lib/utils';
import { ModernImage } from './ui/ModernImage';

interface FloralAccentProps {
  className?: string;
  position: 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right' | 'custom';
  delay?: number;
  type?: 'branch' | 'leaves' | 'blossom';
  imgSrc?: string;
  rotation?: number;
}

export function FloralAccent({ className, position, delay = 0, type = 'branch', imgSrc, rotation }: FloralAccentProps) {
  const getTargetRotation = () => {
    if (rotation !== undefined) return rotation;
    switch (position) {
      case 'top-left': return 0;
      case 'top-right': return 90;
      case 'bottom-right': return 180;
      case 'bottom-left': return -90;
      default: return 0;
    }
  };

  const targetRotate = getTargetRotation();

  const getInitialPosition = () => {
    switch (position) {
      case 'top-left': return { x: -40, y: -40, opacity: 0, rotate: targetRotate - 15 };
      case 'top-right': return { x: 40, y: -40, opacity: 0, rotate: targetRotate + 15 };
      case 'bottom-left': return { x: -40, y: 40, opacity: 0, rotate: targetRotate - 15 };
      case 'bottom-right': return { x: 40, y: 40, opacity: 0, rotate: targetRotate + 15 };
      default: return { x: 0, y: 0, opacity: 0, rotate: targetRotate };
    }
  };

  const initial = getInitialPosition();

  // Create subtle, elegant SVG paths depending on the type
  const renderSVG = () => {
    if (imgSrc) {
      return (
        <ModernImage 
          src={imgSrc} 
          alt="Floral Accent" 
          className="w-full h-full object-contain mix-blend-multiply opacity-80" 
        />
      );
    }
    if (type === 'branch') {
      return (
        <svg viewBox="0 0 100 100" fill="none" className="w-full h-full text-cafe-teal opacity-20">
          <path d="M0,100 C20,70 50,40 100,0" stroke="currentColor" strokeWidth="0.5" />
          <path d="M20,70 C40,50 60,50 70,60 C50,60 30,70 20,70 Z" fill="currentColor" />
          <path d="M50,40 C70,20 90,20 100,30 C80,30 60,40 50,40 Z" fill="currentColor" />
          <path d="M30,80 C50,70 70,80 70,90 C50,90 30,80 30,80 Z" fill="currentColor" />
        </svg>
      );
    }
    
    // For blossom
    return (
      <svg viewBox="0 0 100 100" fill="none" className="w-full h-full text-cafe-pink opacity-20">
         <path d="M50,50 C50,20 80,20 80,50 C80,80 50,80 50,50 Z" fill="currentColor" transform="rotate(0 50 50)" />
         <path d="M50,50 C50,20 80,20 80,50 C80,80 50,80 50,50 Z" fill="currentColor" transform="rotate(72 50 50)" />
         <path d="M50,50 C50,20 80,20 80,50 C80,80 50,80 50,50 Z" fill="currentColor" transform="rotate(144 50 50)" />
         <path d="M50,50 C50,20 80,20 80,50 C80,80 50,80 50,50 Z" fill="currentColor" transform="rotate(216 50 50)" />
         <path d="M50,50 C50,20 80,20 80,50 C80,80 50,80 50,50 Z" fill="currentColor" transform="rotate(288 50 50)" />
      </svg>
    );
  };

  return (
    <motion.div
      className={cn("absolute pointer-events-none z-0", className)}
      initial={initial}
      whileInView={{ x: 0, y: 0, opacity: 1, rotate: targetRotate }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ 
        duration: 1.8, 
        delay, 
        ease: [0.16, 1, 0.3, 1] 
      }}
    >
      {renderSVG()}
    </motion.div>
  );
}

export function BackgroundFloralTree({ opacity = 0.03, className }: { opacity?: number, className?: string }) {
  return (
    <motion.div 
      className={cn("absolute inset-0 pointer-events-none flex items-center justify-center overflow-hidden z-0", className)}
      initial={{ opacity: 0, scale: 1.05 }}
      whileInView={{ opacity, scale: 1 }}
      viewport={{ once: true, margin: "0px" }}
      transition={{ duration: 3, ease: "easeOut" }}
    >
      <div 
        className="w-[120vw] h-[120vh] bg-[url('https://images.unsplash.com/photo-1522748906645-95d8adfd52c7?q=80&w=2000&auto=format&fit=crop')] bg-cover bg-center grayscale" 
        style={{ mixBlendMode: 'multiply' }}
      />
    </motion.div>
  );
}
