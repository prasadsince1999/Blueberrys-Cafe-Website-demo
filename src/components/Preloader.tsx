import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { useLenis } from 'lenis/react';

const CornerBranch = ({ className, delay = 0, style }: { className?: string, delay?: number, style?: any }) => (
  <motion.svg 
    viewBox="0 0 200 200" 
    fill="none" 
    className={`absolute text-cafe-teal opacity-[0.15] ${className}`}
    style={style}
    initial={{ opacity: 0, scale: 0.8, rotate: -5 }}
    animate={{ opacity: 0.15, scale: 1, rotate: 0 }}
    transition={{ duration: 2, delay, ease: [0.16, 1, 0.3, 1] }}
  >
    <motion.path 
      d="M0 200 C 50 150, 80 80, 200 0" 
      stroke="currentColor" 
      strokeWidth="1"
      initial={{ pathLength: 0 }}
      animate={{ pathLength: 1 }}
      transition={{ duration: 2.5, delay, ease: "easeInOut" }}
    />
    <motion.path 
      d="M40 160 C 60 140, 90 120, 120 130 C 100 110, 60 120, 40 160 Z" 
      fill="currentColor"
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ duration: 1, delay: delay + 1 }}
    />
    <motion.path 
      d="M100 80 C 130 60, 160 50, 180 70 C 160 40, 120 40, 100 80 Z" 
      fill="currentColor"
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ duration: 1, delay: delay + 1.5 }}
    />
    <motion.path 
      d="M20 180 C 30 170, 50 160, 70 180 C 50 150, 20 160, 20 180 Z" 
      fill="currentColor"
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ duration: 1, delay: delay + 0.5 }}
    />
  </motion.svg>
);

interface PreloaderProps {
  onComplete?: () => void;
}

export function Preloader({ onComplete }: PreloaderProps) {
  const [isLoading, setIsLoading] = useState(true);
  const lenis = useLenis();

  const handleFinish = () => {
    setIsLoading(false);
    onComplete?.();
    window.dispatchEvent(new CustomEvent('welcome-complete'));
  };

  useEffect(() => {
    // Lock scrolling while the preloader is active
    if (lenis) {
      if (isLoading) {
        lenis.stop();
      } else {
        lenis.start();
      }
    }
  }, [lenis, isLoading]);

  useEffect(() => {
    // Lock body scroll as a fallback
    document.body.style.overflow = isLoading ? 'hidden' : 'auto';

    // Ensure we show the preloader for 2.2 seconds for the cinematic effect
    const minTime = new Promise(resolve => setTimeout(resolve, 2200));
    
    // Check if document is fully loaded
    const checkLoad = new Promise(resolve => {
      if (document.readyState === 'complete') {
        resolve(true);
      } else {
        window.addEventListener('load', () => resolve(true));
      }
    });

    // Wait for both the minimum time and the page to fully load
    Promise.all([minTime, checkLoad]).then(() => {
      handleFinish();
    });

    return () => {
      document.body.style.overflow = 'auto';
    };
  }, []);

  return (
    <AnimatePresence onExitComplete={() => window.dispatchEvent(new CustomEvent('welcome-complete'))}>
      {isLoading && (
        <motion.div
          onClick={handleFinish}
          className="fixed inset-0 z-[10000] bg-cafe-cream flex flex-col items-center justify-center overflow-hidden cursor-pointer"
          initial={{ opacity: 1 }}
          exit={{ y: "-100%", opacity: 1 }}
          transition={{ duration: 1.1, ease: [0.76, 0, 0.24, 1] }}
        >
          {/* Subtle background texture */}
          <div className="absolute inset-0 opacity-[0.05] mix-blend-multiply bg-[url('https://www.transparenttextures.com/patterns/cream-paper.png')]" />
          
          {/* Large Background Floral Tree Silhouette */}
          <motion.div 
            className="absolute inset-0 pointer-events-none opacity-5 mix-blend-multiply flex items-center justify-center"
            initial={{ scale: 1.1, filter: "blur(10px)" }}
            animate={{ scale: 1, filter: "blur(0px)" }}
            transition={{ duration: 4, ease: "easeOut" }}
          >
            <div className="w-[150vw] h-[150vh] bg-[url('https://images.unsplash.com/photo-1522748906645-95d8adfd52c7?q=80&w=2000&auto=format&fit=crop')] bg-cover bg-center grayscale rounded-full" />
          </motion.div>

          {/* Decorative Corner Branches */}
          <CornerBranch className="top-[-5%] left-[-5%] w-64 md:w-96 h-64 md:h-96" style={{ transformOrigin: 'top left' }} delay={0.2} />
          <CornerBranch className="bottom-[-5%] right-[-5%] w-64 md:w-96 h-64 md:h-96 rotate-180" style={{ transformOrigin: 'bottom right' }} delay={0.4} />

          <div className="relative z-10 flex flex-col items-center">
            {/* Animated Blue Badge Logo */}
            <motion.svg 
              viewBox="0 0 280 200" 
              fill="none" 
              xmlns="http://www.w3.org/2000/svg" 
              className="w-56 md:w-72 mb-2 drop-shadow-xl"
            >
              <style>
                {`
                  .logo-blue { fill: #0076F5; }
                  .logo-dark-blue { fill: #0012B5; }
                  .logo-white { fill: #FFFFFF; }
                  .logo-text { font-family: 'Nunito', 'Arial Rounded MT Bold', system-ui, -apple-system, sans-serif; font-weight: 900; font-style: italic; font-size: 26px; }
                `}
              </style>
              
              <defs>
                <clipPath id="circle-clip-animated">
                  <circle cx="140" cy="100" r="86" />
                </clipPath>
              </defs>

              {/* Outer border */}
              <motion.circle cx="140" cy="100" r="96" className="logo-dark-blue" initial={{ scale: 0, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }} />
              <motion.circle cx="140" cy="100" r="90" className="logo-white" initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ duration: 0.5, delay: 0.1, ease: [0.16, 1, 0.3, 1] }} />
              <motion.circle cx="140" cy="100" r="86" className="logo-blue" initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ duration: 0.5, delay: 0.2, ease: [0.16, 1, 0.3, 1] }} />

              {/* Stripes */}
              <g clipPath="url(#circle-clip-animated)">
                <motion.rect x="0" y="100" width="280" height="100" className="logo-white" initial={{ y: 100 }} animate={{ y: 0 }} transition={{ duration: 0.5, delay: 0.4, ease: "easeOut" }} />
                {/* Draw blue stripes */}
                {[55, 75, 95, 115, 135, 155, 175, 195, 215].map((x, i) => (
                  <motion.rect 
                    key={x} 
                    x={x} 
                    y="100" 
                    width="10" 
                    height="100" 
                    className="logo-blue" 
                    initial={{ y: 100 }} 
                    animate={{ y: 0 }} 
                    transition={{ duration: 0.4, delay: 0.5 + i * 0.05, ease: "easeOut" }} 
                  />
                ))}
              </g>

              {/* Horizontal banner */}
              <motion.g 
                initial={{ scaleX: 0 }} 
                animate={{ scaleX: 1 }} 
                transition={{ duration: 0.6, delay: 0.9, ease: [0.16, 1, 0.3, 1] }} 
                style={{ transformOrigin: "140px 100px" }}
              >
                <rect x="10" y="77" width="260" height="46" rx="8" className="logo-dark-blue" />
                <rect x="14" y="80" width="252" height="40" rx="5" className="logo-white" />
                <rect x="18" y="83" width="244" height="34" rx="3" className="logo-blue" />
              </motion.g>

              {/* Text */}
              <motion.text 
                x="140" 
                y="108" 
                className="logo-white logo-text" 
                textAnchor="middle" 
                letterSpacing="0"
                initial={{ opacity: 0, y: 5 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 1.3 }}
              >
                Blueberrys Cafe'
              </motion.text>

              {/* Coffee Cup */}
              <motion.g 
                transform="translate(140, 56)"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: 1.5, ease: "easeOut" }}
              >
                {/* Handle */}
                <path d="M14,-5 C25,-5 25,6 12,8" fill="none" stroke="#FFFFFF" strokeWidth="4" strokeLinecap="round" />
                {/* Cup Bowl */}
                <path d="M-18,-8 L18,-8 C18,12 -18,12 -18,-8 Z" className="logo-white" stroke="#FFFFFF" strokeWidth="2" strokeLinejoin="round" />
                {/* Steam 1 (Left) */}
                <motion.path 
                  d="M-4,-14 C-8,-18 -1,-24 -5,-30" 
                  fill="none" 
                  stroke="#FFFFFF" 
                  strokeWidth="3" 
                  strokeLinecap="round" 
                  initial={{ pathLength: 0, opacity: 0 }}
                  animate={{ pathLength: 1, opacity: 1 }}
                  transition={{ duration: 0.8, delay: 1.8 }}
                />
                {/* Steam 2 (Right) */}
                <motion.path 
                  d="M5,-12 C10,-18 3,-25 8,-32" 
                  fill="none" 
                  stroke="#FFFFFF" 
                  strokeWidth="3.5" 
                  strokeLinecap="round" 
                  initial={{ pathLength: 0, opacity: 0 }}
                  animate={{ pathLength: 1, opacity: 1 }}
                  transition={{ duration: 0.8, delay: 2.0 }}
                />
              </motion.g>
            </motion.svg>

            {/* Elegant Progress Line */}
            <div className="w-64 h-[1px] bg-cafe-teal/20 mt-6 overflow-hidden relative">
              <motion.div 
                className="absolute top-0 left-0 h-full bg-cafe-teal"
                initial={{ width: "0%" }}
                animate={{ width: "100%" }}
                transition={{ duration: 2, ease: [0.76, 0, 0.24, 1] }}
              />
            </div>
            
            {/* Status Text */}
            <motion.span 
              className="mt-8 uppercase tracking-[0.4em] text-[10px] text-cafe-teal/50 font-medium"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 1 }}
            >
              Preparing your experience
            </motion.span>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
