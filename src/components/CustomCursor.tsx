import { useEffect, useRef } from 'react';

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  life: number;
  maxLife: number;
  size: number;
  color: string;
  angle: number;
  spin: number;
}

export function CustomCursor() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  
  // Particle trail effect
  useEffect(() => {
    // Disable on touch devices to save battery
    if (window.matchMedia && window.matchMedia('(pointer: coarse)').matches) {
      return;
    }

    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let particles: Particle[] = [];
    let animationFrameId: number;
    let lastX = 0;
    let lastY = 0;

    // Premium blossom pinks and whites for the sparkles
    const colors = ['#FFB7C5', '#FFC0CB', '#FFF0F5', '#E98FA7'];

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    
    window.addEventListener('resize', resizeCanvas);
    resizeCanvas();

    const addParticle = (x: number, y: number) => {
      particles.push({
        x,
        y,
        vx: (Math.random() - 0.5) * 2, // Smooth outward spread
        vy: (Math.random() - 0.5) * 2 + 0.5, // Slight downward drift
        life: 1,
        maxLife: Math.random() * 0.6 + 0.4,
        size: Math.random() * 3 + 1.5,
        color: colors[Math.floor(Math.random() * colors.length)],
        angle: Math.random() * Math.PI * 2,
        spin: (Math.random() - 0.5) * 0.15
      });
    };

    const handleMouseMoveTrail = (e: MouseEvent) => {
      const dist = Math.hypot(e.clientX - lastX, e.clientY - lastY);
      
      // Spawn particles on movement
      if (dist > 4) {
        addParticle(e.clientX, e.clientY);
        if (Math.random() > 0.4) addParticle(e.clientX, e.clientY); // Denser trail
        lastX = e.clientX;
        lastY = e.clientY;
      }
    };

    window.addEventListener('mousemove', handleMouseMoveTrail);

    const render = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      // Makes overlapping sparkles glow together brightly
      // Removed screen operation for better performance 

      for (let i = particles.length - 1; i >= 0; i--) {
        const p = particles[i];
        
        p.x += p.vx;
        p.y += p.vy;
        p.life -= 0.015;
        p.angle += p.spin;

        if (p.life <= 0) {
          particles.splice(i, 1);
          continue;
        }

        ctx.save();
        ctx.translate(p.x, p.y);
        ctx.rotate(p.angle);
        
        // Smooth fade out
        const opacity = Math.max(0, p.life / p.maxLife);
        ctx.globalAlpha = opacity;
        
        // Premium sparkle drawing (4-point star)
        ctx.shadowBlur = 12;
        ctx.shadowColor = p.color;
        ctx.fillStyle = p.color;

        ctx.beginPath();
        const spikeLen = p.size * 2.5;
        ctx.moveTo(0, -spikeLen);
        ctx.quadraticCurveTo(0, 0, spikeLen, 0);
        ctx.quadraticCurveTo(0, 0, 0, spikeLen);
        ctx.quadraticCurveTo(0, 0, -spikeLen, 0);
        ctx.quadraticCurveTo(0, 0, 0, -spikeLen);
        ctx.fill();
        
        // Center hot-spot core for the sparkle
        ctx.beginPath();
        ctx.arc(0, 0, p.size * 0.4, 0, Math.PI * 2);
        ctx.fillStyle = '#FFFFFF';
        ctx.fill();

        ctx.restore();
      }

      animationFrameId = requestAnimationFrame(render);
    };
    
    render();

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      window.removeEventListener('mousemove', handleMouseMoveTrail);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <canvas 
      ref={canvasRef} 
      className="fixed inset-0 pointer-events-none z-[9999]" 
    />
  );
}
