import React, { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { motion, AnimatePresence } from 'motion/react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { cn } from '../lib/utils';
import { FloralAccent, BackgroundFloralTree } from './FloralAccent';
import { MENU_SPREADS, MenuCategory } from '../data/menu';
import { Logo } from './Logo';

const duration = 0.5;

const leftPageVariants = {
  initial: (dir: number) => 
    dir === 1 
      ? { rotateY: 90, opacity: 0, zIndex: 10 } 
      : { rotateY: 0, opacity: 1, zIndex: 1 },
  animate: (dir: number) => 
    dir === 1 
      ? { 
          rotateY: 0, opacity: 1, zIndex: 10, 
          transition: { 
            rotateY: { delay: duration, duration: duration, ease: 'easeOut' }, 
            opacity: { delay: duration, duration: 0.01 } 
          } 
        } 
      : { 
          rotateY: 0, opacity: 1, zIndex: 1, 
          transition: { duration: duration * 2 } 
        },
  exit: (dir: number) => 
    dir === 1 
      ? { 
          opacity: 1, zIndex: 1, 
          transition: { duration: duration * 2 } 
        } 
      : { 
          rotateY: 90, opacity: 0, zIndex: 10, 
          transition: { 
            rotateY: { duration: duration, ease: 'easeIn' }, 
            opacity: { delay: duration, duration: 0.01 } 
          } 
        }
};

const rightPageVariants = {
  initial: (dir: number) => 
    dir === 1 
      ? { rotateY: 0, opacity: 1, zIndex: 1 } 
      : { rotateY: -90, opacity: 0, zIndex: 10 },
  animate: (dir: number) => 
    dir === 1 
      ? { 
          rotateY: 0, opacity: 1, zIndex: 1, 
          transition: { duration: duration * 2 } 
        } 
      : { 
          rotateY: 0, opacity: 1, zIndex: 10, 
          transition: { 
            rotateY: { delay: duration, duration: duration, ease: 'easeOut' }, 
            opacity: { delay: duration, duration: 0.01 } 
          } 
        },
  exit: (dir: number) => 
    dir === 1 
      ? { 
          rotateY: -90, opacity: 0, zIndex: 10, 
          transition: { 
            rotateY: { duration: duration, ease: 'easeIn' }, 
            opacity: { delay: duration, duration: 0.01 } 
          } 
        } 
      : { 
          opacity: 1, zIndex: 1, 
          transition: { duration: duration * 2 } 
        }
};

const hashString = (str: string) => {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    hash = str.charCodeAt(i) + ((hash << 5) - hash);
  }
  return Math.abs(hash);
};

const getImageForItem = (name: string) => {
  const n = name.toLowerCase();
  
  const categories = [
    { keys: ['pizza', 'margherita'], urls: [
      'https://images.unsplash.com/photo-1513104890138-7c749659a591?q=80&w=400&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?q=80&w=400&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1593560708920-61dd98c46a4e?q=80&w=400&auto=format&fit=crop'
    ]},
    { keys: ['pasta', 'aglio', 'alfredo'], urls: [
      'https://images.unsplash.com/photo-1473093295043-cdd812d0e601?q=80&w=400&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1621996346565-e3dbc646d9a9?q=80&w=400&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1551183053-bf91a1d81141?q=80&w=400&auto=format&fit=crop'
    ]},
    { keys: ['burger'], urls: [
      'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?q=80&w=400&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1550547660-d9450f859349?q=80&w=400&auto=format&fit=crop'
    ]},
    { keys: ['sandwich', 'croissant', 'stack', 'toast', 'bread'], urls: [
      'https://images.unsplash.com/photo-1528735602780-2552fd46c7af?q=80&w=400&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1481070555726-e2fe83477d15?q=80&w=400&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1509722747041-616f39b57569?q=80&w=400&auto=format&fit=crop'
    ]},
    { keys: ['maggie', 'noodles'], urls: [
      'https://images.unsplash.com/photo-1612929633738-8fe01f7c8d0f?q=80&w=400&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1585032226651-759b368d7246?q=80&w=400&auto=format&fit=crop'
    ]},
    { keys: ['cake', 'tiramisu', 'brownie', 'panna cotta', 'tres leches', 'vanilla delight', 'dessert'], urls: [
      'https://images.unsplash.com/photo-1578985545062-69928b1d9587?q=80&w=400&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1551024506-0bccd828d307?q=80&w=400&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1587314168485-3236d6710814?q=80&w=400&auto=format&fit=crop'
    ]},
    { keys: ['shake'], urls: [
      'https://images.unsplash.com/photo-1572490122747-3968b75cc699?q=80&w=400&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1553177595-4de2bb0842b9?q=80&w=400&auto=format&fit=crop'
    ]},
    { keys: ['mojito', 'fizz', 'lemonade', 'soda', 'twist', 'benefit', 'mocktail'], urls: [
      'https://images.unsplash.com/photo-1551538827-9c037cb4f32a?q=80&w=400&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1513558161293-cdaf765ed2fd?q=80&w=400&auto=format&fit=crop'
    ]},
    { keys: ['juice', 'detox'], urls: [
      'https://images.unsplash.com/photo-1621506289937-a8e4df240d0b?q=80&w=400&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1600271886742-f049cd451bba?q=80&w=400&auto=format&fit=crop'
    ]},
    { keys: ['soup'], urls: [
      'https://images.unsplash.com/photo-1547592166-23ac45744acd?q=80&w=400&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1604152135912-04a022e23696?q=80&w=400&auto=format&fit=crop'
    ]},
    { keys: ['ice tea'], urls: [
      'https://images.unsplash.com/photo-1556679343-c7306c1976bc?q=80&w=400&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1499961024600-ad094db305cc?q=80&w=400&auto=format&fit=crop'
    ]},
    { keys: ['tea'], urls: [
      'https://images.unsplash.com/photo-1576092768241-dec231879fc3?q=80&w=400&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1597481499750-3e6b2268d839?q=80&w=400&auto=format&fit=crop'
    ]},
    { keys: ['coffee', 'cappuccino', 'latte', 'espresso', 'frappe', 'mocha', 'americano', 'dark', 'calm', 'chocolate'], urls: [
      'https://images.unsplash.com/photo-1497935586351-b67a49e012bf?q=80&w=400&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1511920170033-f8396924c348?q=80&w=400&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1461023058943-0708e5223e71?q=80&w=400&auto=format&fit=crop'
    ]},
    { keys: ['bowl', 'elixer'], urls: [
      'https://images.unsplash.com/photo-1490645935967-10de6ba17061?q=80&w=400&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1511690656952-34342bb7c2f2?q=80&w=400&auto=format&fit=crop'
    ]},
    { keys: ['fries', 'nachos', 'wings', 'bite', 'extra', 'prawn', 'chicken', 'fish'], urls: [
      'https://images.unsplash.com/photo-1576107232684-1279f390859f?q=80&w=400&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1562967914-608f82629710?q=80&w=400&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1604908176997-125f25cc6f3d?q=80&w=400&auto=format&fit=crop'
    ]}
  ];

  for (const cat of categories) {
    if (cat.keys.some(k => n.includes(k))) {
      return cat.urls[hashString(n) % cat.urls.length];
    }
  }
  
  const fallbacks = [
    'https://images.unsplash.com/photo-1554118811-1e0d58224f24?q=80&w=400&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?q=80&w=400&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1495474472201-dce2d91b86d9?q=80&w=400&auto=format&fit=crop'
  ];
  return fallbacks[hashString(n) % fallbacks.length];
};

const renderPage = (categories: MenuCategory[], handleHover: (e: any, name: string) => void, handleLeave: () => void) => (
  <div className="flex flex-col gap-4">
    {categories.map((cat, idx) => (
      <div key={idx} className="w-full">
        <div className="flex justify-between items-end border-b border-cafe-teal/20 pb-1 mb-2">
          <span className="bg-cafe-teal text-cafe-ivory px-2.5 py-0.5 text-[10px] md:text-xs font-bold uppercase tracking-wider rounded-sm shadow-sm">
            {cat.title}
          </span>
          {cat.labels && (
            <div className="flex gap-2">
              {cat.labels.map(l => (
                <span key={l} className="w-8 text-center text-[8px] md:text-[10px] font-bold text-cafe-teal tracking-widest">{l}</span>
              ))}
            </div>
          )}
        </div>
        <div className="space-y-1.5">
          {cat.items.map((item, i) => (
            <div 
              key={i} 
              className="flex justify-between items-baseline group relative"
              onMouseMove={(e) => handleHover(e, item.name)}
              onMouseLeave={handleLeave}
            >
              <div className="flex-1 pr-2">
                <span className="text-[9px] md:text-[11px] font-semibold text-cafe-teal uppercase group-hover:text-cafe-blossom transition-colors">
                  {item.name}
                </span>
                {item.desc && <p className="text-[8px] md:text-[9px] text-cafe-text/75 leading-[1.2] mt-0.5">{item.desc}</p>}
              </div>
              <div className="flex gap-2 items-end shrink-0">
                {item.prices.map((p, pIdx) => (
                  <span key={pIdx} className="text-[10px] md:text-xs font-serif text-cafe-text w-8 text-right">
                    {p || '-'}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    ))}
  </div>
);

export function MenuSection() {
  const [page, setPage] = useState(0);
  const [direction, setDirection] = useState(1);
  const [isFlipping, setIsFlipping] = useState(false);
  const [hoverState, setHoverState] = useState<{ url: string | null; x: number; y: number }>({ url: null, x: 0, y: 0 });

  const handleHover = (e: React.MouseEvent, itemName: string) => {
    setHoverState({
      url: getImageForItem(itemName),
      x: e.clientX,
      y: e.clientY
    });
  };

  const handleLeave = () => {
    setHoverState(prev => ({ ...prev, url: null }));
  };

  const paginate = (newDirection: number) => {
    if (isFlipping) return;
    const next = page + newDirection;
    if (next < 0 || next >= MENU_SPREADS.length) return;

    setIsFlipping(true);
    setDirection(newDirection);
    setPage(next);
    
    // Unlock pagination after flip animation completes
    setTimeout(() => {
      setIsFlipping(false);
    }, duration * 2000);
  };

  const currentSpread = MENU_SPREADS[page];

  return (
    <section id="menu" className="py-24 md:py-32 bg-cafe-ivory relative border-t border-cafe-teal/10 overflow-hidden">
      <BackgroundFloralTree opacity={0.03} />
      <FloralAccent position="top-right" delay={0.1} className="w-48 h-48 md:w-80 md:h-80 -top-4 -right-4 md:-top-10 md:-right-10" imgSrc="/floral-petal-accent-3" />
      <FloralAccent position="bottom-left" delay={0.3} className="w-48 h-48 md:w-72 md:h-72 -bottom-4 -left-4 md:-bottom-10 md:-left-10" imgSrc="/floral-petal-accent-4" />

      {/* Hover Image Popup Bubble */}
      {typeof window !== 'undefined' && createPortal(
        <AnimatePresence>
          {hoverState.url && (
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              transition={{ duration: 0.2, ease: "easeOut" }}
              className="fixed pointer-events-none z-[9999] w-32 h-32 md:w-48 md:h-48 rounded-full overflow-hidden shadow-2xl border-4 border-white hidden md:block"
              style={{
                left: hoverState.x,
                top: hoverState.y,
                x: '20px', 
                y: '-20px' 
              }}
            >
              <img src={hoverState.url} className="w-full h-full object-cover" alt="Recipe Preview" />
            </motion.div>
          )}
        </AnimatePresence>,
        document.body
      )}

      <div className="max-w-6xl mx-auto px-4 md:px-12 relative z-10">
        
        <div className="text-center mb-12 md:mb-16">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="font-serif text-4xl md:text-5xl lg:text-6xl text-cafe-teal italic"
          >
            Blueberrys Cafe Menu
          </motion.h2>
          <p className="mt-4 text-cafe-text/80 font-medium tracking-widest uppercase text-xs">Flip through our offerings</p>
        </div>

        {/* Flipbook Container */}
        <div className="relative w-full max-w-5xl mx-auto min-h-[1400px] md:min-h-[750px] perspective-[2500px] mb-12">
          
          {/* Outer Cover & Static Background */}
          <div className="absolute inset-0 bg-white shadow-2xl rounded-sm border-l-[12px] border-l-amber-700/20 border-y border-r border-cafe-teal/10 pointer-events-none">
            <div className="absolute inset-0 opacity-[0.03] mix-blend-multiply bg-[url('https://www.transparenttextures.com/patterns/cream-paper.png')] rounded-sm" />
            <div className="absolute inset-0 opacity-10 bg-gradient-to-br from-cyan-100 via-transparent to-amber-100 rounded-sm" />
            <div className="hidden md:block absolute top-0 bottom-0 left-1/2 w-[1px] bg-cafe-teal/10 z-0" />
          </div>

          <div className="absolute inset-y-0 right-0 left-0 md:left-[12px] pointer-events-none" style={{ transformStyle: 'preserve-3d' }}>
            <AnimatePresence custom={direction}>
              <motion.div
                key={page}
                custom={direction}
                initial="initial"
                animate="animate"
                exit="exit"
                className="absolute inset-0 pointer-events-none"
                style={{ transformStyle: 'preserve-3d' }}
              >
                {/* Left Page */}
                <motion.div
                  custom={direction}
                  variants={leftPageVariants}
                  style={{ transformOrigin: 'right center', backfaceVisibility: 'hidden', WebkitBackfaceVisibility: 'hidden' }}
                  className="absolute top-0 left-0 w-full md:w-1/2 h-1/2 md:h-full bg-white border-b md:border-b-0 border-cafe-teal/20 pointer-events-auto overflow-hidden cursor-pointer group/page select-none"
                  onClick={() => paginate(-1)}
                  onPanEnd={(e, info) => {
                    if (info.offset.x < -50) paginate(1);
                    if (info.offset.x > 50) paginate(-1);
                  }}
                >
                  <div className="absolute inset-0 opacity-[0.03] mix-blend-multiply bg-[url('https://www.transparenttextures.com/patterns/cream-paper.png')] pointer-events-none" />
                  <div className="absolute inset-0 opacity-10 bg-gradient-to-br from-cyan-100 via-transparent to-amber-100 pointer-events-none transition-opacity group-hover/page:opacity-20" />
                  <div className="hidden md:block absolute top-0 bottom-0 right-0 w-8 bg-gradient-to-l from-black/5 to-transparent pointer-events-none z-0" />
                  
                  <div className="p-6 md:p-8 relative z-10 h-full flex flex-col">
                    <div className="flex-1">
                      {renderPage(currentSpread.left, handleHover, handleLeave)}
                    </div>
                    <div className="mt-4 text-center text-xs font-serif text-cafe-teal/40">
                      {page * 2 + 1}
                    </div>
                  </div>
                </motion.div>

                {/* Right Page */}
                <motion.div
                  custom={direction}
                  variants={rightPageVariants}
                  style={{ transformOrigin: 'left center', backfaceVisibility: 'hidden', WebkitBackfaceVisibility: 'hidden' }}
                  className="absolute bottom-0 md:bottom-auto md:top-0 right-0 w-full md:w-1/2 h-1/2 md:h-full bg-white pointer-events-auto overflow-hidden cursor-pointer group/page select-none"
                  onClick={() => paginate(1)}
                  onPanEnd={(e, info) => {
                    if (info.offset.x < -50) paginate(1);
                    if (info.offset.x > 50) paginate(-1);
                  }}
                >
                  <div className="absolute inset-0 opacity-[0.03] mix-blend-multiply bg-[url('https://www.transparenttextures.com/patterns/cream-paper.png')] pointer-events-none" />
                  <div className="absolute inset-0 opacity-10 bg-gradient-to-br from-cyan-100 via-transparent to-amber-100 pointer-events-none transition-opacity group-hover/page:opacity-20" />
                  <div className="hidden md:block absolute top-0 bottom-0 left-0 w-8 bg-gradient-to-r from-black/5 to-transparent pointer-events-none z-0" />
                  
                  <div className="p-6 md:p-8 relative z-10 h-full flex flex-col">
                    <div className="flex-1">
                      {renderPage(currentSpread.right, handleHover, handleLeave)}
                    </div>
                    <div className="mt-4 text-center text-xs font-serif text-cafe-teal/40">
                      {page * 2 + 2}
                    </div>
                  </div>
                </motion.div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>

        {/* Book Controls */}
        <div className="flex items-center justify-center max-w-5xl mx-auto">
          <div className="flex gap-4">
            <button 
              onClick={() => paginate(-1)} 
              disabled={page === 0}
              className="p-4 border border-cafe-teal/20 text-cafe-teal rounded-full hover:bg-cafe-teal hover:text-cafe-ivory transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
              aria-label="Previous Page"
            >
              <ChevronLeft strokeWidth={1.5} size={20} />
            </button>
            <span className="flex items-center text-cafe-teal font-serif italic px-2">Page {page + 1} of {MENU_SPREADS.length}</span>
            <button 
              onClick={() => paginate(1)} 
              disabled={page === MENU_SPREADS.length - 1}
              className="p-4 border border-cafe-teal/20 text-cafe-teal rounded-full hover:bg-cafe-teal hover:text-cafe-ivory transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
              aria-label="Next Page"
            >
              <ChevronRight strokeWidth={1.5} size={20} />
            </button>
          </div>
        </div>

      </div>
    </section>
  );
}
