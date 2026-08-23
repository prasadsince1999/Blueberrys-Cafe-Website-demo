import { motion, useScroll, useTransform } from 'motion/react';
import { useRef } from 'react';
import { ModernImage } from './ui/ModernImage';

export function CafeExperience() {
  const containerRef = useRef<HTMLDivElement>(null);
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  const scale = useTransform(scrollYProgress, [0, 0.5, 1], [1, 1.4, 2]);
  const blur = useTransform(scrollYProgress, [0, 0.2, 0.4, 0.6, 1], [10, 0, 0, 5, 20]);
  
  const overlayOpacity = useTransform(scrollYProgress, [0, 0.2, 0.4, 0.6, 1], [0.8, 0.3, 0.3, 0.7, 1]);
  
  const textOpacity = useTransform(scrollYProgress, [0.1, 0.3, 0.6, 0.8], [0, 1, 1, 0]);
  const textY = useTransform(scrollYProgress, [0.1, 0.3, 0.6, 0.8], [50, 0, 0, -50]);
  const textScale = useTransform(scrollYProgress, [0.1, 0.8], [0.9, 1.1]);

  // Small detail images - floating past camera
  const detail1Opacity = useTransform(scrollYProgress, [0.3, 0.45, 0.6], [0, 1, 0]);
  const detail1Y = useTransform(scrollYProgress, [0.3, 0.6], [200, -200]);
  const detail1Scale = useTransform(scrollYProgress, [0.3, 0.6], [0.8, 1.5]);
  
  const detail2Opacity = useTransform(scrollYProgress, [0.4, 0.55, 0.7], [0, 1, 0]);
  const detail2Y = useTransform(scrollYProgress, [0.4, 0.7], [200, -200]);
  const detail2Scale = useTransform(scrollYProgress, [0.4, 0.7], [0.8, 1.5]);

  return (
    <section id="experience" ref={containerRef} className="h-[400vh] bg-[#0c1a1c] relative">
      <div className="sticky top-0 h-screen w-full overflow-hidden flex items-center justify-center">
        
        {/* Main Background Image - Deep Zoom & Blur */}
        <motion.div 
          className="absolute inset-0 origin-center" 
          style={{ 
            scale, 
            willChange: 'transform'
          }}
        >
          <ModernImage 
            src="/cafe-night-experience" 
            alt="Cinematic Night Café Experience" 
            className="w-full h-full object-cover opacity-80"
          />
        </motion.div>
        
        {/* Darkening Overlay for mood */}
        <motion.div 
          className="absolute inset-0 bg-[#0c1a1c] " 
          style={{ opacity: overlayOpacity }}
        />

        {/* Center Text */}
        <motion.div 
          className="relative z-20 text-center px-6 max-w-4xl"
          style={{ opacity: textOpacity, y: textY, scale: textScale, willChange: 'transform, opacity' }}
        >
          <h2 className="font-serif text-5xl md:text-7xl lg:text-9xl text-cafe-ivory leading-[0.9] tracking-tight">
            Come for the food. <br/>
            <span className="italic text-cafe-pink font-light tracking-normal pr-4">Stay for the atmosphere.</span>
          </h2>
        </motion.div>

        {/* Floating Details (Parallaxing intensely) - Full Floral Arch Mirror */}
        <motion.div 
          className="absolute top-[15%] left-[5%] md:left-[10%] lg:left-[14%] w-[28vw] max-w-[320px] aspect-[2/3] z-30 hidden md:block"
          style={{ opacity: detail1Opacity, y: detail1Y, scale: detail1Scale, willChange: 'transform, opacity' }}
        >
          <ModernImage 
            src="/floral-arch-mirror" 
            alt="Floral Arch Mirror" 
            className="w-full h-full object-contain drop-shadow-[0_25px_40px_rgba(0,0,0,0.6)]" 
          />
        </motion.div>

        <motion.div 
          className="absolute bottom-[20%] right-[10%] md:right-[18%] w-[22vw] max-w-xs aspect-square z-30 hidden md:block"
          style={{ opacity: detail2Opacity, y: detail2Y, scale: detail2Scale, willChange: 'transform, opacity' }}
        >
          <ModernImage 
            src="/cherry-blossom-single-flower" 
            alt="Floating Blossom" 
            className="w-full h-full object-contain drop-shadow-[0_25px_35px_rgba(0,0,0,0.4)]" 
          />
        </motion.div>

      </div>
    </section>
  );
}
