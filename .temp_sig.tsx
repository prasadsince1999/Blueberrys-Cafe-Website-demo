import { motion, useScroll, useTransform } from 'motion/react';
import { useRef } from 'react';
import { ModernImage } from './ui/ModernImage';
import { FloralAccent, BackgroundFloralTree } from './FloralAccent';
import { Coffee, UtensilsCrossed, Music } from 'lucide-react';

export function SignatureIntroduction() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  const imageY = useTransform(scrollYProgress, [0, 1], [50, -50]);

  return (
    <section id="our-cafe" ref={containerRef} className="py-24 md:py-40 bg-cafe-ivory relative overflow-hidden">
      <BackgroundFloralTree opacity={0.02} />
      
      <FloralAccent position="top-left" delay={0.2} className="w-48 h-48 md:w-64 md:h-64 -top-10 -left-10 md:-top-20 md:-left-20" imgSrc="/floral-petal-accent-1" />
      <FloralAccent position="bottom-right" delay={0.4} className="w-64 h-64 md:w-96 md:h-96 -bottom-16 -right-16 md:-bottom-32 md:-right-32" imgSrc="/floral-petal-accent-2" />
      
      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          
          <div className="lg:col-span-5 lg:col-start-1 relative z-10">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
            >
              <h2 className="font-serif text-5xl md:text-6xl lg:text-7xl text-cafe-teal mb-6 italic leading-tight">
                More than <br className="hidden md:block" />a café.
              </h2>
              <p className="text-xl text-cafe-text/90 font-light leading-relaxed text-balance mb-4">
                Welcome to Blueberrys Cafe, your perfect hangout destination for great coffee, delicious food, and unforgettable vibes.
              </p>
              <p className="text-cafe-text/70 font-light leading-relaxed mb-10 text-balance">
                Experience a cozy atmosphere with freshly brewed coffee, mouthwatering continental cuisine, refreshing beverages, and live music that makes every evening special. Whether you're catching up with friends, planning a casual date, working remotely, or simply relaxing, we offer the best place to celebrate birthdays in Bhubaneswar at an affordable price.
              </p>
              
              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-full border border-cafe-teal/20 flex items-center justify-center flex-shrink-0 text-cafe-teal bg-white/50">
                    <Coffee size={18} />
                  </div>
                  <div>
                    <h3 className="text-cafe-teal font-medium mb-1">Premium Beverages</h3>
                    <p className="text-sm text-cafe-text/70">Expertly crafted coffee & café drinks</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-full border border-cafe-teal/20 flex items-center justify-center flex-shrink-0 text-cafe-teal bg-white/50">
                    <UtensilsCrossed size={18} />
                  </div>
                  <div>
                    <h3 className="text-cafe-teal font-medium mb-1">Continental Cuisine</h3>
                    <p className="text-sm text-cafe-text/70">Delicious food for every craving</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-full border border-cafe-teal/20 flex items-center justify-center flex-shrink-0 text-cafe-teal bg-white/50">
                    <Music size={18} />
                  </div>
                  <div>
                    <h3 className="text-cafe-teal font-medium mb-1">Live Music</h3>
                    <p className="text-sm text-cafe-text/70">Live performances to elevate your evening</p>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>

          <div className="lg:col-span-7 lg:col-start-6 relative mt-12 lg:mt-0">
            {/* Decorative background shape */}
            <div className="absolute -inset-4 bg-cafe-cream -z-10 rounded-tl-full rounded-br-full opacity-60 mix-blend-multiply" />
            
            <motion.div 
              style={{ y: imageY }}
              className="relative w-full"
            >
              <ModernImage 
                src="/signature-interior-dining" 
                alt="Large Interior or Atmosphere" 
                className="w-full h-auto rounded-sm shadow-2xl shadow-cafe-teal/10"
              />
              
              {/* Overlapping small detail image */}
              <motion.div 
                className="absolute -bottom-8 -left-8 md:-bottom-12 md:-left-12 w-1/3 aspect-square hidden md:flex items-center justify-center z-20 pointer-events-none drop-shadow-[0_20px_25px_rgba(0,0,0,0.35)]"
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.8, delay: 0.3 }}
              >
                <ModernImage src="/signature-coffee-cup" alt="Coffee Cup Detail" className="w-full h-auto object-contain" />
              </motion.div>
            </motion.div>
          </div>

        </div>
      </div>
    </section>
  );
}
