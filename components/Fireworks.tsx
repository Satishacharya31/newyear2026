import React, { useEffect, useRef } from 'react';

const Fireworks: React.FC<{ active: boolean }> = ({ active }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (!active) return;
    
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let width = window.innerWidth;
    let height = window.innerHeight;

    const resize = () => {
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = width;
      canvas.height = height;
    };
    window.addEventListener('resize', resize);
    resize();

    // Firework physics
    const gravity = 0.05;
    const friction = 0.98;
    
    class Particle {
      x: number;
      y: number;
      vx: number;
      vy: number;
      alpha: number;
      color: string;
      size: number;
      decay: number;

      constructor(x: number, y: number, color: string, velocity: {x: number, y: number}) {
        this.x = x;
        this.y = y;
        this.vx = velocity.x;
        this.vy = velocity.y;
        this.alpha = 1;
        this.color = color;
        this.size = Math.random() * 2 + 1;
        this.decay = Math.random() * 0.015 + 0.005;
      }

      update() {
        this.vx *= friction;
        this.vy *= friction;
        this.vy += gravity;
        this.x += this.vx;
        this.y += this.vy;
        this.alpha -= this.decay;
      }

      draw(ctx: CanvasRenderingContext2D) {
        ctx.save();
        ctx.globalAlpha = this.alpha;
        ctx.fillStyle = this.color;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
      }
    }

    class Firework {
      x: number;
      y: number;
      targetY: number;
      vx: number;
      vy: number;
      color: string;
      exploded: boolean;
      particles: Particle[];
      trail: {x: number, y: number}[];

      constructor() {
        this.x = Math.random() * width;
        this.y = height;
        this.targetY = height * 0.2 + Math.random() * (height * 0.4); // Explode in top half
        this.vx = (Math.random() - 0.5) * 2;
        this.vy = -Math.random() * 4 - 8; // Initial launch speed
        
        const colors = ['#fbbf24', '#f43f5e', '#38bdf8', '#ffffff', '#a855f7'];
        this.color = colors[Math.floor(Math.random() * colors.length)];
        
        this.exploded = false;
        this.particles = [];
        this.trail = [];
      }

      update() {
        if (!this.exploded) {
          this.vy += gravity;
          this.x += this.vx;
          this.y += this.vy;
          
          this.trail.push({x: this.x, y: this.y});
          if (this.trail.length > 5) this.trail.shift();

          // Explode when reaching target height or slowing down
          if (this.vy >= -1 || this.y <= this.targetY) {
            this.explode();
          }
        } else {
          this.particles.forEach(p => p.update());
          this.particles = this.particles.filter(p => p.alpha > 0);
        }
      }

      explode() {
        this.exploded = true;
        const particleCount = 80;
        const angleStep = (Math.PI * 2) / particleCount;
        
        for (let i = 0; i < particleCount; i++) {
          const velocity = Math.random() * 6 + 1;
          const angle = Math.random() * Math.PI * 2;
          // Create burst
          this.particles.push(new Particle(
            this.x, 
            this.y, 
            this.color,
            {
              x: Math.cos(angle) * velocity * Math.random(),
              y: Math.sin(angle) * velocity * Math.random()
            }
          ));
        }
      }

      draw(ctx: CanvasRenderingContext2D) {
        if (!this.exploded) {
          ctx.beginPath();
          ctx.strokeStyle = this.color;
          ctx.lineWidth = 2;
          if (this.trail.length > 1) {
            ctx.moveTo(this.trail[0].x, this.trail[0].y);
            for(let point of this.trail) ctx.lineTo(point.x, point.y);
            ctx.stroke();
          }
        } else {
          this.particles.forEach(p => p.draw(ctx));
        }
      }
    }

    let fireworks: Firework[] = [];
    let animationId: number;
    let tick = 0;

    const loop = () => {
      // Semi-transparent clear for trail effect
      ctx.fillStyle = 'rgba(2, 6, 23, 0.2)'; 
      ctx.fillRect(0, 0, width, height);

      // Add new firework occasionally
      if (tick % 30 === 0 && Math.random() > 0.3) {
        fireworks.push(new Firework());
      }
      tick++;

      fireworks.forEach((fw, index) => {
        fw.update();
        fw.draw(ctx);
      });

      // Cleanup
      fireworks = fireworks.filter(fw => !fw.exploded || fw.particles.length > 0);

      animationId = requestAnimationFrame(loop);
    };

    loop();

    return () => {
      window.removeEventListener('resize', resize);
      cancelAnimationFrame(animationId);
      if(ctx) ctx.clearRect(0, 0, width, height);
    };
  }, [active]);

  if (!active) return null;

  return (
    <canvas 
      ref={canvasRef} 
      className="fixed top-0 left-0 w-full h-full pointer-events-none z-40 mix-blend-screen"
    />
  );
};

export default Fireworks;
