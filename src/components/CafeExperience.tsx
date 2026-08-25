import { motion, useScroll, useTransform } from 'motion/react';
import { useRef } from 'react';

export function CafeExperience() {
  const containerRef = useRef<HTMLDivElement>(null);
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  // Layer 1: Background Zoom & Subtle Dark Overlay
  const bgScale = useTransform(scrollYProgress, [0, 1], [1, 1.25]);
  const bgBlur = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [6, 0, 0, 6]);
  const overlayOpacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0.55, 0.35, 0.45, 0.65]);

  // Center Headline: Smooth reveal that stays readable through the scroll
  const textOpacity = useTransform(scrollYProgress, [0, 0.15, 0.85, 1], [0, 1, 1, 0]);
  const textY = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [40, 0, 0, -40]);
  const textScale = useTransform(scrollYProgress, [0, 0.8], [0.95, 1.05]);

  // Layer 2: Left Floating Parallax Cutout (Arch / Decor)
  const detail1Opacity = useTransform(scrollYProgress, [0.05, 0.2, 0.8, 0.95], [0, 1, 1, 0]);
  const detail1Y = useTransform(scrollYProgress, [0, 1], [140, -140]);
  const detail1Scale = useTransform(scrollYProgress, [0, 1], [0.9, 1.15]);

  // Layer 3: Right Floating Parallax Blossom
  const detail2Opacity = useTransform(scrollYProgress, [0.1, 0.25, 0.85, 1], [0, 1, 1, 0]);
  const detail2Y = useTransform(scrollYProgress, [0, 1], [120, -120]);
  const detail2Scale = useTransform(scrollYProgress, [0, 1], [0.85, 1.2]);

  return (
    <section id="experience" ref={containerRef} className="h-[280vh] md:h-[320vh] bg-[#0c1a1c] relative">
      <div className="sticky top-0 h-screen w-full overflow-hidden flex items-center justify-center">
        
        {/* Layer 1: Background Image */}
        <motion.div 
          className="absolute inset-0 origin-center" 
          style={{ 
            scale: bgScale, 
            filter: useTransform(bgBlur, v => `blur(${v}px)`),
            willChange: 'transform, filter'
          }}
        >
          <img 
            src="/cafe-night-experience.png" 
            alt="Cinematic Night Café Experience" 
            className="w-full h-full object-cover opacity-90"
            onError={(e) => {
              (e.target as HTMLImageElement).src = '/interior.png';
            }}
          />
        </motion.div>
        
        {/* Darkening Atmosphere Overlay */}
        <motion.div 
          className="absolute inset-0 bg-[#0c1a1c]" 
          style={{ opacity: overlayOpacity }}
        />

        {/* Center Typography */}
        <motion.div 
          className="relative z-20 text-center px-6 max-w-4xl pointer-events-none"
          style={{ opacity: textOpacity, y: textY, scale: textScale, willChange: 'transform, opacity' }}
        >
          <h2 className="font-serif text-5xl md:text-7xl lg:text-9xl text-cafe-ivory leading-[0.9] tracking-tight [text-shadow:0_4px_24px_rgba(0,0,0,0.6)]">
            Come for the food. <br/>
            <span className="italic text-cafe-pink font-light tracking-normal pr-4 [text-shadow:0_4px_24px_rgba(0,0,0,0.6)]">
              Stay for the atmosphere.
            </span>
          </h2>
        </motion.div>

        {/* Layer 2: Left Floating Parallax Cutout */}
        <motion.div 
          className="absolute top-[12%] md:top-[15%] left-[3%] md:left-[8%] lg:left-[12%] w-[26vw] sm:w-[22vw] md:w-[18vw] max-w-[240px] aspect-[2/3] z-25 pointer-events-none"
          style={{ opacity: detail1Opacity, y: detail1Y, scale: detail1Scale, willChange: 'transform, opacity' }}
        >
          <img 
            src="/floral-arch-mirror.png" 
            alt="Floral Arch Mirror" 
            className="w-full h-full object-contain drop-shadow-[0_20px_35px_rgba(0,0,0,0.65)]" 
            onError={(e) => {
              (e.target as HTMLImageElement).src = '/arch.png';
            }}
          />
        </motion.div>

        {/* Layer 3: Right Floating Parallax Blossom (Enlarged to match old frame size) */}
        <motion.div 
          className="absolute bottom-[8%] md:bottom-[12%] right-[3%] md:right-[8%] lg:right-[12%] w-[34vw] sm:w-[28vw] md:w-[22vw] lg:w-[19vw] max-w-[280px] md:max-w-[340px] aspect-square z-25 pointer-events-none"
          style={{ opacity: detail2Opacity, y: detail2Y, scale: detail2Scale, willChange: 'transform, opacity' }}
        >
          <img 
            src="/cherry-blossom-single-flower.png" 
            alt="Floating Blossom" 
            className="w-full h-full object-contain drop-shadow-[0_25px_40px_rgba(0,0,0,0.55)]" 
            onError={(e) => {
              (e.target as HTMLImageElement).src = '/cherry-blossom.png';
            }}
          />
        </motion.div>

      </div>
    </section>
  );
}
