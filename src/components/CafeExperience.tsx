import { motion, useScroll, useTransform } from 'motion/react';
import { useRef } from 'react';
import { ModernImage } from './ui/ModernImage';

export function CafeExperience() {
  const containerRef = useRef<HTMLDivElement>(null);
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  // Smooth cinematic background zoom & subtle atmosphere
  const scale = useTransform(scrollYProgress, [0, 1], [1, 1.18]);
  const blur = useTransform(scrollYProgress, [0, 0.15, 0.8, 1], [6, 0, 0, 6]);
  const overlayOpacity = useTransform(scrollYProgress, [0, 0.2, 0.75, 1], [0.6, 0.25, 0.25, 0.7]);
  
  // Center Text - Enters cleanly and exits synchronously with the section
  const textOpacity = useTransform(scrollYProgress, [0.05, 0.22, 0.78, 0.95], [0, 1, 1, 0]);
  const textY = useTransform(scrollYProgress, [0.05, 0.22, 0.78, 0.95], [40, 0, 0, -40]);
  const textScale = useTransform(scrollYProgress, [0.1, 0.8], [0.96, 1.04]);

  // Floating Floral Arch Mirror (Left) - Smooth entrance and subtle floating parallax
  const detail1Opacity = useTransform(scrollYProgress, [0.08, 0.25, 0.75, 0.92], [0, 1, 1, 0]);
  const detail1Y = useTransform(scrollYProgress, [0.08, 0.92], [80, -80]);
  const detail1Scale = useTransform(scrollYProgress, [0.08, 0.5, 0.92], [0.88, 1.05, 0.95]);
  
  // Floating Cherry Blossom (Right) - Smooth entrance and gentle drift
  const detail2Opacity = useTransform(scrollYProgress, [0.1, 0.28, 0.75, 0.92], [0, 1, 1, 0]);
  const detail2Y = useTransform(scrollYProgress, [0.1, 0.92], [100, -100]);
  const detail2Scale = useTransform(scrollYProgress, [0.1, 0.5, 0.92], [0.85, 1.1, 0.92]);

  return (
    <section id="experience" ref={containerRef} className="h-[220vh] bg-[#0c1a1c] relative">
      <div className="sticky top-0 h-screen w-full overflow-hidden flex items-center justify-center">
        
        {/* Main Background Image - Deep Zoom & Blur */}
        <motion.div 
          className="absolute inset-0 origin-center" 
          style={{ 
            scale, 
            filter: useTransform(blur, v => `blur(${v}px)`),
            willChange: 'transform, filter'
          }}
        >
          <ModernImage 
            src="/cafe-night-experience" 
            alt="Cinematic Night Café Experience" 
            className="w-full h-full object-cover opacity-90"
          />
        </motion.div>
        
        {/* Darkening Overlay for mood */}
        <motion.div 
          className="absolute inset-0 bg-[#0c1a1c]" 
          style={{ opacity: overlayOpacity }}
        />

        {/* Floating Details (Parallaxing intensely) - Full Floral Arch Mirror (Left) */}
        <motion.div 
          className="absolute top-[12%] md:top-[15%] left-[3%] md:left-[8%] lg:left-[12%] w-[26vw] sm:w-[22vw] md:w-[18vw] max-w-[240px] aspect-[2/3] z-25 pointer-events-none"
          style={{ opacity: detail1Opacity, y: detail1Y, scale: detail1Scale, willChange: 'transform, opacity' }}
        >
          <ModernImage 
            src="/floral-arch-mirror" 
            alt="Floral Arch Mirror" 
            className="w-full h-full object-contain drop-shadow-[0_20px_35px_rgba(0,0,0,0.65)]" 
          />
        </motion.div>

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

        {/* Floating Blossom (Right) */}
        <motion.div 
          className="absolute bottom-[10%] md:bottom-[15%] right-[4%] md:right-[10%] lg:right-[14%] w-[24vw] sm:w-[20vw] md:w-[16vw] max-w-[190px] aspect-square z-25 pointer-events-none"
          style={{ opacity: detail2Opacity, y: detail2Y, scale: detail2Scale, willChange: 'transform, opacity' }}
        >
          <ModernImage 
            src="/cherry-blossom-single-flower" 
            alt="Floating Blossom" 
            className="w-full h-full object-contain drop-shadow-[0_20px_30px_rgba(0,0,0,0.45)]" 
          />
        </motion.div>

      </div>
    </section>
  );
}
