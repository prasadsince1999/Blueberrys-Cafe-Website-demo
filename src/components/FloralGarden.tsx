import { motion, useScroll, useTransform } from 'motion/react';
import { useRef } from 'react';
import { ModernImage } from './ui/ModernImage';

export function FloralGarden() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  const bgY = useTransform(scrollYProgress, [0, 1], [-100, 100]);
  const fgY = useTransform(scrollYProgress, [0, 1], [100, -100]);

  return (
    <section className="py-24 md:py-40 bg-cafe-ivory relative overflow-hidden" ref={containerRef}>
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center">
          
          {/* Text Content */}
          <div className="order-2 lg:order-1 flex flex-col justify-center relative z-20">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
            >
              <h2 className="font-serif text-5xl md:text-7xl text-cafe-teal leading-tight mb-8">
                Step Into <br/>
                <span className="italic text-cafe-blossom">the Garden.</span>
              </h2>
              <p className="text-lg md:text-xl text-cafe-text/80 font-light leading-relaxed max-w-md">
                Surrounded by blooms and bathed in natural light. Every corner is designed to be a beautiful backdrop for your memories.
              </p>
            </motion.div>
          </div>

          {/* Image Composition */}
          <div className="order-1 lg:order-2 relative h-[70vh] min-h-[500px]">
            {/* Background Arch Image */}
            <motion.div 
              className="absolute right-0 top-0 w-3/4 h-[90%] clip-path-arch overflow-hidden"
              style={{ y: bgY }}
            >
              <ModernImage src="/floral-garden-wall" alt="Floral Garden Wall" className="w-full h-[120%] object-cover -mt-[10%]" />
            </motion.div>
            
            {/* Foreground Overlapping Image - 3D Breakout Effect */}
            <motion.div 
              className="absolute left-0 bottom-0 w-2/3 md:w-[70%] aspect-square z-20 pointer-events-none"
              style={{ y: fgY }}
            >
              {/* The physical 'album frame' */}
              <div className="absolute top-[20%] left-[10%] right-[10%] bottom-[10%] border-8 border-white bg-gradient-to-br from-[#f8f5f0] to-[#fceceb] shadow-[0_15px_40px_-10px_rgba(0,0,0,0.3)] rounded-sm z-0" />
              
              {/* The 3D element breaking out of the frame */}
              <ModernImage 
                src="/cherry-blossom-bonsai-tree"
                alt="Cherry Blossom Bonsai Tree"
                className="absolute inset-0 w-full h-full object-contain scale-[1.5] origin-bottom -translate-y-4 z-10 drop-shadow-[0_20px_20px_rgba(0,0,0,0.25)]"
              />
            </motion.div>

            {/* Decorative Aqua Arc */}
            <div className="absolute top-10 right-10 w-full h-[90%] border-t-2 border-r-2 border-cafe-blue/30 rounded-tr-[200px] pointer-events-none -z-10" />
          </div>

        </div>
      </div>
    </section>
  );
}
