import { motion, useScroll, useTransform } from 'motion/react';
import React, { useRef, useState, useEffect } from 'react';
import { useLenis } from 'lenis/react';
import { useTransition } from '../context/TransitionContext';
import { Volume2, VolumeX } from 'lucide-react';

export function Hero() {
  const containerRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const { navigateTo } = useTransition();
  const [isMuted, setIsMuted] = useState(false);
  const hasInteractedRef = useRef(false);

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    navigateTo(href);
  };

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"]
  });

  // Attempt unmuted playback on load & register interaction listeners for browser unlock
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    video.volume = 0.5;

    // Try unmuted autoplay directly
    video.muted = false;
    const playPromise = video.play();
    if (playPromise !== undefined) {
      playPromise
        .then(() => {
          // Unmuted autoplay succeeded
          hasInteractedRef.current = true;
          setIsMuted(false);
        })
        .catch(() => {
          // Browser blocked unmuted autoplay: play muted first so visuals start immediately
          video.muted = true;
          setIsMuted(true);
          video.play().catch(() => {});
        });
    }

    // Global listener to unlock audio on the very first user interaction
    const unlockAudio = () => {
      hasInteractedRef.current = true;
      const currentScroll = window.scrollY || document.documentElement.scrollTop || 0;
      if (video && currentScroll < 60) {
        video.muted = false;
        video.volume = 0.5;
        setIsMuted(false);
        video.play().catch(() => {});
      }
      removeUnlockListeners();
    };

    const removeUnlockListeners = () => {
      window.removeEventListener('pointerdown', unlockAudio);
      window.removeEventListener('touchstart', unlockAudio);
      window.removeEventListener('click', unlockAudio);
      window.removeEventListener('keydown', unlockAudio);
      window.removeEventListener('wheel', unlockAudio);
    };

    window.addEventListener('pointerdown', unlockAudio, { passive: true });
    window.addEventListener('touchstart', unlockAudio, { passive: true });
    window.addEventListener('click', unlockAudio, { passive: true });
    window.addEventListener('keydown', unlockAudio, { passive: true });
    window.addEventListener('wheel', unlockAudio, { passive: true });

    return () => {
      removeUnlockListeners();
    };
  }, []);

  // Real-time smooth scroll handler via Lenis & fallback scroll event
  useLenis(({ scroll }) => {
    const video = videoRef.current;
    if (!video) return;

    // Auto-mute when user scrolls down past 50px
    if (scroll > 50) {
      if (!video.muted) {
        video.muted = true;
        setIsMuted(true);
      }
    } else {
      // Auto-unmute when scrolled back to the top (if audio has been enabled/interacted)
      if (video.muted && hasInteractedRef.current) {
        video.muted = false;
        video.volume = 0.5;
        setIsMuted(false);
        video.play().catch(() => {});
      }
    }

    // Pause video playback when far below the hero section to save resources
    if (scroll > window.innerHeight * 0.9) {
      if (!video.paused) {
        video.pause();
      }
    } else {
      if (video.paused) {
        video.play().catch(() => {});
      }
    }
  });

  const toggleSound = () => {
    const video = videoRef.current;
    if (!video) return;

    hasInteractedRef.current = true;
    if (video.muted || isMuted) {
      video.muted = false;
      video.volume = 0.5;
      video.play().catch(() => {});
      setIsMuted(false);
    } else {
      video.muted = true;
      setIsMuted(true);
    }
  };

  // Deep cinematic fly-through effect
  const bgScale = useTransform(scrollYProgress, [0, 1], [1, 1.3]);
  const bgOpacity = useTransform(scrollYProgress, [0, 1], [1, 0.4]);
  
  const textY = useTransform(scrollYProgress, [0, 1], [0, 150]);
  const textOpacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

  return (
    <section ref={containerRef} className="relative h-screen min-h-[700px] flex items-end justify-center overflow-hidden bg-cafe-ivory">
      
      {/* Background Layer */}
      <motion.div 
        className="absolute inset-0 z-0 origin-center"
        style={{ 
          scale: bgScale, 
          opacity: bgOpacity,
          willChange: 'transform, opacity'
        }}
      >
        <video 
          ref={videoRef}
          autoPlay 
          loop 
          playsInline
          disablePictureInPicture
          preload="auto"
          className="w-full h-full object-cover"
        >
          <source src="/hero-cinematic-leaves.webm" type="video/webm" />
          <source src="/hero-cinematic-leaves.mp4" type="video/mp4" />
          Your browser does not support the video tag.
        </video>
        <div className="absolute inset-0 bg-gradient-to-b from-cafe-ivory/50 via-transparent to-black/10" />
      </motion.div>

      {/* Main Content Area: Slimmer Architectural Glass Arch with Upper Negative Space */}
      <motion.div 
        className="relative z-20 text-center px-6 sm:px-10 md:px-12 pt-24 sm:pt-32 md:pt-40 lg:pt-44 pb-6 md:pb-8 w-[88vw] max-w-md sm:max-w-lg md:max-w-xl lg:max-w-[580px] mx-auto bg-white/85 backdrop-blur-md rounded-t-[160px] sm:rounded-t-[200px] md:rounded-t-[260px] rounded-b-none shadow-[0_-15px_50px_rgba(0,0,0,0.1)] border-t border-x border-white/80 flex flex-col justify-end"
        style={{ 
          opacity: textOpacity, 
          y: textY,
          willChange: 'transform, opacity'
        }}
      >
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
        >
          <h1 className="font-serif text-4xl sm:text-5xl md:text-6xl text-cafe-teal mb-3 leading-[1.05] tracking-tight">
            Where Every <br/>
            <span className="italic text-cafe-pink font-light tracking-normal text-2xl sm:text-3xl md:text-4xl block mt-1 md:mt-2">Moment Blooms.</span>
          </h1>
        </motion.div>

        <motion.p 
          className="text-cafe-text/80 text-sm sm:text-base md:text-lg font-light max-w-md mx-auto mb-6 md:mb-8 leading-relaxed"
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
        >
          Good food, beautiful spaces and little moments worth remembering.
        </motion.p>

        <motion.div 
          className="flex flex-col sm:flex-row items-center justify-center gap-3.5 sm:gap-4 mb-6"
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
        >
          <a 
            href="#our-cafe" 
            onClick={(e) => handleNavClick(e, '#our-cafe')}
            className="px-8 py-3.5 bg-cafe-teal text-cafe-ivory uppercase tracking-[0.18em] text-xs font-medium hover:bg-cafe-text transition-colors w-full sm:w-auto relative overflow-hidden group shadow-sm"
          >
            <span className="relative z-10">Explore the Café</span>
            <div className="absolute inset-0 bg-cafe-text transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-500" />
          </a>
          <a 
            href="#menu" 
            onClick={(e) => handleNavClick(e, '#menu')}
            className="px-8 py-3.5 border border-cafe-teal/30 text-cafe-teal uppercase tracking-[0.18em] text-xs font-medium hover:border-cafe-teal transition-all w-full sm:w-auto relative group overflow-hidden"
          >
            <span className="relative z-10 group-hover:text-cafe-ivory transition-colors duration-500">View Menu</span>
            <div className="absolute inset-0 bg-cafe-teal transform scale-y-0 group-hover:scale-y-100 transition-transform origin-bottom duration-500" />
          </a>
        </motion.div>

        {/* Scroll indicator */}
        <motion.div 
          className="flex flex-col items-center mix-blend-multiply pb-2"
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.6 }}
          transition={{ duration: 1, delay: 1.5 }}
        >
          <span className="text-[9px] uppercase tracking-[0.3em] text-cafe-teal mb-1.5">Scroll</span>
          <div className="w-[1px] h-8 bg-cafe-teal/20 overflow-hidden relative">
            <motion.div 
              className="absolute top-0 left-0 w-full h-1/2 bg-cafe-teal"
              animate={{ y: ["-100%", "200%"] }}
              transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
            />
          </div>
        </motion.div>
      </motion.div>

      {/* Sound Toggle Button */}
      <button 
        onClick={toggleSound}
        className="absolute bottom-8 right-8 z-30 p-3 bg-white/40 backdrop-blur-md rounded-full border border-white/60 text-cafe-teal hover:bg-white/70 transition-all shadow-lg active:scale-95"
        aria-label={isMuted ? "Unmute ambient audio" : "Mute ambient audio"}
      >
        {isMuted ? <VolumeX size={20} /> : <Volume2 size={20} />}
      </button>
    </section>
  );
}
