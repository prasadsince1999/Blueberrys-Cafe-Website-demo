import { motion, useScroll, useTransform } from 'motion/react';
import React, { useRef, useState, useEffect } from 'react';
import { useLenis } from 'lenis/react';
import { useTransition } from '../context/TransitionContext';
import { Volume2, VolumeX } from 'lucide-react';

export function Hero() {
  const containerRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const { navigateTo } = useTransition();
  const [isPlayingSound, setIsPlayingSound] = useState(false);
  const userWantsAudioRef = useRef(true);
  const isScrolledOutRef = useRef(false);
  const fadeIntervalRef = useRef<number | null>(null);

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    navigateTo(href);
  };

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"]
  });

  // Smooth audio fade controller
  const setAudioState = (enable: boolean, smooth = true) => {
    const video = videoRef.current;
    if (!video) return;

    if (fadeIntervalRef.current) {
      clearInterval(fadeIntervalRef.current);
      fadeIntervalRef.current = null;
    }

    if (enable) {
      video.muted = false;
      if (smooth) {
        let vol = video.volume || 0.1;
        fadeIntervalRef.current = window.setInterval(() => {
          vol = Math.min(0.55, vol + 0.1);
          if (video) video.volume = vol;
          if (vol >= 0.55) {
            if (fadeIntervalRef.current) clearInterval(fadeIntervalRef.current);
            fadeIntervalRef.current = null;
          }
        }, 35);
      } else {
        video.volume = 0.55;
      }
      video.play().catch(() => {});
      setIsPlayingSound(true);
    } else {
      if (smooth) {
        let vol = video.volume;
        fadeIntervalRef.current = window.setInterval(() => {
          vol = Math.max(0, vol - 0.1);
          if (video) video.volume = vol;
          if (vol <= 0) {
            if (video) video.muted = true;
            if (fadeIntervalRef.current) clearInterval(fadeIntervalRef.current);
            fadeIntervalRef.current = null;
          }
        }, 35);
      } else {
        video.volume = 0;
        video.muted = true;
      }
      setIsPlayingSound(false);
    }
  };

  // Start audio immediately when the welcome/preloader screen finishes
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    // Start video playback muted while welcome screen is up
    video.volume = 0;
    video.muted = true;
    video.play().catch(() => {});

    // When welcome screen disappears, directly fade in the unmuted audio
    const startAudioOnWelcomeComplete = () => {
      const currentScroll = window.scrollY || document.documentElement.scrollTop || 0;
      if (userWantsAudioRef.current && currentScroll < 140) {
        setAudioState(true, true);
      }
    };

    window.addEventListener('welcome-complete', startAudioOnWelcomeComplete);

    // Also fallback if user taps anywhere
    const unlockOnFirstTouch = () => {
      const currentScroll = window.scrollY || document.documentElement.scrollTop || 0;
      if (userWantsAudioRef.current && currentScroll < 140) {
        setAudioState(true, true);
      }
      removeUnlockListeners();
    };

    const removeUnlockListeners = () => {
      window.removeEventListener('pointerdown', unlockOnFirstTouch);
      window.removeEventListener('touchstart', unlockOnFirstTouch);
      window.removeEventListener('click', unlockOnFirstTouch);
      window.removeEventListener('keydown', unlockOnFirstTouch);
    };

    window.addEventListener('pointerdown', unlockOnFirstTouch, { passive: true });
    window.addEventListener('touchstart', unlockOnFirstTouch, { passive: true });
    window.addEventListener('click', unlockOnFirstTouch, { passive: true });
    window.addEventListener('keydown', unlockOnFirstTouch, { passive: true });

    return () => {
      window.removeEventListener('welcome-complete', startAudioOnWelcomeComplete);
      removeUnlockListeners();
      if (fadeIntervalRef.current) clearInterval(fadeIntervalRef.current);
    };
  }, []);

  // Smooth scroll listener with hysteresis (fade out at >140px, fade in at <70px)
  useLenis(({ scroll }) => {
    const video = videoRef.current;
    if (!video) return;

    // Scroll Down Threshold
    if (scroll > 140 && !isScrolledOutRef.current) {
      isScrolledOutRef.current = true;
      if (userWantsAudioRef.current) {
        setAudioState(false, true);
      }
    } 
    // Scroll Back to Top Threshold
    else if (scroll < 70 && isScrolledOutRef.current) {
      isScrolledOutRef.current = false;
      if (userWantsAudioRef.current) {
        setAudioState(true, true);
      }
    }

    // Pause video when completely offscreen to preserve battery/GPU
    if (scroll > window.innerHeight * 1.1) {
      if (!video.paused) video.pause();
    } else {
      if (video.paused) video.play().catch(() => {});
    }
  });

  const toggleSound = (e: React.MouseEvent) => {
    e.stopPropagation();
    e.preventDefault();

    if (isPlayingSound) {
      // User explicitly wants Mute
      userWantsAudioRef.current = false;
      setAudioState(false, false);
    } else {
      // User explicitly wants Sound
      userWantsAudioRef.current = true;
      isScrolledOutRef.current = false;
      setAudioState(true, true);
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

      {/* Premium Sound Toggle Button */}
      <button 
        onClick={toggleSound}
        type="button"
        className="fixed bottom-6 right-6 sm:bottom-8 sm:right-8 z-40 flex items-center gap-2 px-3.5 py-2.5 bg-white/70 hover:bg-white/90 backdrop-blur-md rounded-full border border-white/80 text-cafe-teal shadow-[0_8px_30px_rgb(0,0,0,0.08)] transition-all duration-300 active:scale-95 group cursor-pointer"
        aria-label={isPlayingSound ? "Mute ambient café sounds" : "Play ambient café sounds"}
      >
        <div className="relative flex items-center justify-center w-5 h-5">
          {isPlayingSound ? (
            <div className="flex items-center gap-[2.5px] h-3.5">
              <span className="w-[2.5px] h-full bg-cafe-teal rounded-full animate-[pulse_0.8s_ease-in-out_infinite]" />
              <span className="w-[2.5px] h-2 bg-cafe-teal rounded-full animate-[pulse_1.1s_ease-in-out_infinite]" />
              <span className="w-[2.5px] h-3.5 bg-cafe-teal rounded-full animate-[pulse_0.6s_ease-in-out_infinite]" />
              <span className="w-[2.5px] h-1.5 bg-cafe-teal rounded-full animate-[pulse_0.9s_ease-in-out_infinite]" />
            </div>
          ) : (
            <VolumeX size={18} className="text-cafe-teal/70 group-hover:text-cafe-teal transition-colors" />
          )}
        </div>
        <span className="text-[11px] font-medium tracking-wider uppercase text-cafe-teal/90 pr-1 select-none">
          {isPlayingSound ? "Sound On" : "Sound Off"}
        </span>
      </button>
    </section>
  );
}
