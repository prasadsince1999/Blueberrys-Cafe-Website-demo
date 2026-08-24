import { motion, useScroll, useTransform } from 'motion/react';
import { useRef } from 'react';
import { ModernImage } from './ui/ModernImage';

export function TheBlueberrysWorld() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  const y1 = useTransform(scrollYProgress, [0, 1], [0, -80]);
  const y2 = useTransform(scrollYProgress, [0, 1], [40, -40]);
  const y3 = useTransform(scrollYProgress, [0, 1], [80, -100]);

  return (
    <section className="py-24 md:py-32 bg-cafe-cream relative overflow-hidden" ref={containerRef}>
      
      {/* Decorative Text */}
      <div className="absolute top-0 left-0 w-full overflow-hidden pointer-events-none opacity-5 flex items-center justify-center pt-10" aria-hidden="true">
        <span className="font-serif text-[15vw] whitespace-nowrap text-cafe-teal select-none" aria-hidden="true">
          THE ATMOSPHERE
        </span>
      </div>

      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 md:gap-12 relative z-10 pt-20">
          
          {/* Column 1 */}
          <div className="md:col-span-5 flex flex-col gap-12 mt-12 md:mt-0">
            <motion.div style={{ y: y1 }} className="relative">
              <span className="absolute -top-6 left-0 text-[10px] tracking-widest text-cafe-teal uppercase">The Space</span>
              <ModernImage src="/cafe-interior-hall" alt="Café Dining Space" className="w-full aspect-[4/5] object-cover" />
            </motion.div>
            
            <motion.div style={{ y: y2 }} className="relative md:ml-12 w-3/4 self-end">
              <span className="absolute -top-6 left-0 text-[10px] tracking-widest text-cafe-teal uppercase">The Details</span>
              <ModernImage src="/cafe-interior-arch" alt="Architectural Arch or Chandelier" className="w-full aspect-square object-cover" />
            </motion.div>
            
          </div>

          {/* Column 2 */}
          <div className="md:col-span-7 flex flex-col gap-12 md:pt-10">
            <motion.div style={{ y: y2 }} className="relative w-2/3 md:w-3/5 max-w-sm self-end md:mr-10 z-10">
              <span className="absolute -top-6 left-0 text-[10px] tracking-widest text-cafe-teal uppercase">The Vibe</span>
              <ModernImage src="/cafe-interior-vibe" alt="The Vibe" className="w-full aspect-square object-cover rounded-full shadow-2xl" />
            </motion.div>

            <motion.div 
              style={{ y: y3 }} 
              animate={{ rotate: [-2, 2, -2], y: [0, -10, 0] }}
              transition={{ repeat: Infinity, duration: 6, ease: "easeInOut" }}
              className="relative w-2/3 md:w-3/5 max-w-sm md:-ml-24 lg:-ml-40 z-30 md:-mt-8"
            >
              <span className="absolute -top-6 left-0 text-[10px] tracking-widest text-cafe-teal uppercase bg-cafe-cream/80 px-2 py-1 rounded">The Flowers</span>
              <ModernImage src="/cherry-blossom-single-flower" alt="The Flowers" className="w-full h-auto object-contain drop-shadow-[0_25px_35px_rgba(0,0,0,0.25)]" />
            </motion.div>
            
            <motion.div style={{ y: y1 }} className="relative w-full md:w-3/4 self-end md:-mt-24 z-20">
              <span className="absolute -top-6 left-0 text-[10px] tracking-widest text-cafe-teal uppercase">The Moments</span>
              <ModernImage src="/cafe-customer-moments" alt="Customer Atmosphere" className="w-full shadow-xl object-cover" />
            </motion.div>
          </div>

        </div>
      </div>
    </section>
  );
}
