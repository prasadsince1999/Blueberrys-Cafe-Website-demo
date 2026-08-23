import React from 'react';
import { motion } from 'motion/react';
import { MapPin, Clock, Phone, ArrowRight, Utensils, Wifi, Car, Baby, CreditCard } from 'lucide-react';
import { ModernImage } from './ui/ModernImage';
import { useTransition } from '../context/TransitionContext';
import { FloralAccent } from './FloralAccent';

export function LocationSection() {
  const { navigateTo } = useTransition();

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    if (href.startsWith('#')) {
      e.preventDefault();
      navigateTo(href);
    }
  };

  return (
    <section className="py-24 md:py-32 bg-cafe-ivory border-t border-cafe-teal/10 relative overflow-hidden">
      <FloralAccent position="top-right" delay={0.2} className="w-48 h-48 md:w-96 md:h-96 -top-12 -right-12 md:-top-24 md:-right-24" imgSrc="/floral-petal-accent-5" />
      <FloralAccent position="bottom-left" delay={0.4} className="w-40 h-40 md:w-80 md:h-80 -bottom-10 -left-10 md:-bottom-24 md:-left-24" imgSrc="/floral-petal-accent-1" />
      
      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center">
          
          <div className="order-2 lg:order-1 relative aspect-square lg:aspect-auto lg:h-[600px] overflow-hidden rounded-t-full">
            <ModernImage src="/cafe-entrance-exterior" alt="Café Entrance" className="w-full h-full object-cover" />
          </div>

          <div className="order-1 lg:order-2 flex flex-col justify-center">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <h2 className="font-serif text-5xl md:text-6xl text-cafe-teal italic mb-12">
                Come Find Us.
              </h2>
              
              <div className="space-y-8 mb-12">
                <div className="flex items-start gap-4">
                  <MapPin className="text-cafe-pink mt-1 flex-shrink-0" size={24} strokeWidth={1.5} />
                  <div>
                    <h3 className="uppercase tracking-widest text-sm font-medium text-cafe-teal mb-2">Location</h3>
                    <p className="text-cafe-text/80 font-light leading-relaxed">
                      123 Floral Avenue, Garden District<br/>
                      City Name, State 12345
                    </p>
                    <a 
                      href="https://maps.google.com/?q=Blueberrys+Cafe+Bhubaneswar" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="inline-flex items-center text-sm font-medium text-cafe-blossom mt-2 hover:text-cafe-teal transition-colors"
                    >
                      Get Directions <ArrowRight size={14} className="ml-1" />
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <Clock className="text-cafe-pink mt-1 flex-shrink-0" size={24} strokeWidth={1.5} />
                  <div>
                    <h3 className="uppercase tracking-widest text-sm font-medium text-cafe-teal mb-2">Hours</h3>
                    <p className="text-cafe-text/80 font-light leading-relaxed">
                      Monday - Friday: 8:00 AM - 10:00 PM<br/>
                      Saturday - Sunday: 9:00 AM - 11:00 PM
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <Phone className="text-cafe-pink mt-1 flex-shrink-0" size={24} strokeWidth={1.5} />
                  <div>
                    <h3 className="uppercase tracking-widest text-sm font-medium text-cafe-teal mb-2">Contact</h3>
                    <p className="text-cafe-text/80 font-light leading-relaxed">
                      +91 98765 43210<br/>
                      hello@blueberryscafe.com
                    </p>
                  </div>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-4" id="order">
                <a 
                  href="https://www.swiggy.com" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="px-8 py-4 bg-cafe-teal text-cafe-ivory uppercase tracking-[0.15em] text-sm font-medium hover:bg-cafe-text transition-colors text-center w-full sm:w-auto"
                >
                  Order on Swiggy
                </a>
                <a 
                  href="#reserve" 
                  id="reserve" 
                  onClick={(e) => handleNavClick(e, '#reserve')}
                  className="px-8 py-4 border border-cafe-teal/30 text-cafe-teal uppercase tracking-[0.15em] text-sm font-medium hover:border-cafe-teal transition-colors text-center w-full sm:w-auto"
                >
                  Reserve Table
                </a>
              </div>
            </motion.div>
          </div>

        </div>
        
        {/* Service Options & Amenities - Repurposed from About */}
        <div className="mt-24 grid grid-cols-1 md:grid-cols-2 gap-8 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="bg-cafe-teal text-cafe-ivory rounded-3xl p-8 md:p-12 shadow-xl"
          >
            <Utensils size={24} className="mb-6 opacity-70" />
            <h3 className="font-serif text-3xl mb-8">Service Options</h3>
            <ul className="space-y-4">
              <li className="flex items-center gap-3">
                <div className="w-1.5 h-1.5 rounded-full bg-cafe-pink" />
                <span className="font-light">Dine-in & Seating</span>
              </li>
              <li className="flex items-center gap-3">
                <div className="w-1.5 h-1.5 rounded-full bg-cafe-pink" />
                <span className="font-light">Takeaway</span>
              </li>
              <li className="flex items-center gap-3">
                <div className="w-1.5 h-1.5 rounded-full bg-cafe-pink" />
                <span className="font-light">Delivery & No-contact</span>
              </li>
              <li className="flex items-center gap-3">
                <div className="w-1.5 h-1.5 rounded-full bg-cafe-pink" />
                <span className="font-light">Drive-through & Kerbside</span>
              </li>
            </ul>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="bg-white/95 border border-cafe-teal/10 rounded-3xl p-8 md:p-12 shadow-lg"
          >
            <h3 className="font-serif text-3xl text-cafe-teal mb-10">Amenities & Features</h3>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 text-center">
              <div className="flex flex-col items-center">
                <div className="w-12 h-12 rounded-full bg-white flex items-center justify-center text-cafe-teal mb-3 shadow-sm border border-cafe-teal/5">
                  <Wifi size={20} />
                </div>
                <span className="text-xs text-cafe-text/70 uppercase tracking-wider">Free Wi-Fi</span>
              </div>
              
              <div className="flex flex-col items-center">
                <div className="w-12 h-12 rounded-full bg-white flex items-center justify-center text-cafe-teal mb-3 shadow-sm border border-cafe-teal/5">
                  <Car size={20} />
                </div>
                <span className="text-xs text-cafe-text/70 uppercase tracking-wider">Free Parking</span>
              </div>
              
              <div className="flex flex-col items-center">
                <div className="w-12 h-12 rounded-full bg-white flex items-center justify-center text-cafe-teal mb-3 shadow-sm border border-cafe-teal/5">
                  <Baby size={20} />
                </div>
                <span className="text-xs text-cafe-text/70 uppercase tracking-wider">Family Friendly</span>
              </div>
              
              <div className="flex flex-col items-center">
                <div className="w-12 h-12 rounded-full bg-white flex items-center justify-center text-cafe-teal mb-3 shadow-sm border border-cafe-teal/5">
                  <CreditCard size={20} />
                </div>
                <span className="text-xs text-cafe-text/70 uppercase tracking-wider">NFC & Cards</span>
              </div>
            </div>
            
            <div className="mt-10 pt-8 border-t border-cafe-teal/10">
               <h4 className="text-sm uppercase tracking-widest text-cafe-teal mb-4 font-medium">Atmosphere</h4>
               <div className="flex flex-wrap gap-2">
                 {['Breakfast', 'Brunch', 'Lunch', 'Dinner', 'Dessert', 'Casual', 'Trendy', 'Solo Dining'].map(tag => (
                   <span key={tag} className="px-3 py-1 bg-white text-cafe-text/70 text-xs rounded-full border border-cafe-teal/10 shadow-sm">
                     {tag}
                   </span>
                 ))}
               </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
