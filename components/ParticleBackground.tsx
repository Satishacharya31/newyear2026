import React, { useEffect, useRef } from 'react';

const ParticleBackground: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
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

    // Sky Lanterns Configuration
    const lanterns: Lantern[] = [];
    const lanternCount = 70; // Slightly reduced count for better performance with complex gradients
    const zoomSpeed = 0.5;
    const riseSpeed = 0.4;

    class Lantern {
      x: number;
      y: number;
      z: number;
      baseColor: { r: number, g: number, b: number };
      wobbleOffset: number;
      wobbleSpeed: number;
      flickerOffset: number;
      flickerSpeed: number;

      constructor() {
        this.x = Math.random() * width * 3 - width;
        this.y = Math.random() * height * 3 - height;
        this.z = Math.random() * width;
        this.baseColor = this.randomColor();
        this.wobbleOffset = Math.random() * 100;
        this.wobbleSpeed = Math.random() * 0.01 + 0.005;
        this.flickerOffset = Math.random() * 100;
        this.flickerSpeed = Math.random() * 0.1 + 0.05;
      }

      randomColor() {
        // Strict Warm Palette for Lanterns
        const palettes = [
          { r: 255, g: 140, b: 0 },   // Deep Orange
          { r: 255, g: 180, b: 60 },  // Amber
          { r: 255, g: 100, b: 50 },  // Red-Orange
          { r: 255, g: 220, b: 100 }  // Warm Yellow
        ];
        return palettes[Math.floor(Math.random() * palettes.length)];
      }

      update() {
        this.z -= zoomSpeed;
        this.y -= riseSpeed;

        // Gentle Sway
        this.x += Math.sin(this.wobbleOffset) * 0.3;
        this.wobbleOffset += this.wobbleSpeed;

        // Flicker effect update
        this.flickerOffset += this.flickerSpeed;

        // Reset if it moves past the camera or flies too high
        // z <= 0 means it passed the "camera" position
        // y < -height * 1.5 means it flew way off the top (more above)
        if (this.z <= 0 || this.y < -height * 1.5) {
          this.z = width;
          this.x = Math.random() * width * 3 - width;
          this.y = height + Math.random() * 300;
        }
      }

      draw(ctx: CanvasRenderingContext2D) {
        const cx = width / 2;
        const cy = height / 2;
        const scale = 500 / Math.max(0.1, this.z);
        const x2d = this.x * scale + cx;
        const y2d = this.y * scale + cy;

        const baseSize = 6; // Slightly larger base size
        const size = Math.max(0.1, (1 - this.z / width) * baseSize * 5);

        // Depth-based opacity
        const depthAlpha = Math.min(1, Math.max(0, (1 - this.z / width) * 1.2));

        // Flicker intensity (0.8 to 1.2 multiplier)
        const flicker = 0.9 + Math.sin(this.flickerOffset) * 0.1;

        if (x2d >= -100 && x2d <= width + 100 && y2d >= -100 && y2d <= height + 100 && depthAlpha > 0.01) {

          ctx.save();
          ctx.globalAlpha = depthAlpha;

          // 1. Outer Glow (Atmosphere) - Enhanced
          // Increased size multiplier from 4 to 8 for bigger soft glow
          const glowGradient = ctx.createRadialGradient(x2d, y2d, 0, x2d, y2d, size * 8);
          glowGradient.addColorStop(0, `rgba(${this.baseColor.r}, ${this.baseColor.g}, ${this.baseColor.b}, ${0.15 * flicker})`);
          glowGradient.addColorStop(1, 'rgba(0,0,0,0)');
          ctx.fillStyle = glowGradient;
          ctx.beginPath();
          ctx.arc(x2d, y2d, size * 8, 0, Math.PI * 2);
          ctx.fill();

          // 2. Paper Shell (Body of the lantern)
          // Simulate the gradient from the flame at the bottom center
          const shellGradient = ctx.createRadialGradient(x2d, y2d + size * 0.2, 0, x2d, y2d, size);
          shellGradient.addColorStop(0, `rgba(255, 255, 220, 0.9)`); // Flame core
          shellGradient.addColorStop(0.4, `rgba(${this.baseColor.r}, ${this.baseColor.g}, ${this.baseColor.b}, 0.8)`); // Paper color
          shellGradient.addColorStop(1, `rgba(${this.baseColor.r - 30}, ${this.baseColor.g - 30}, ${this.baseColor.b - 30}, 0.4)`); // Darker edges

          ctx.fillStyle = shellGradient;
          ctx.beginPath();
          // Lantern shape: Ellipse slightly taller than wide
          ctx.ellipse(x2d, y2d, size * 0.75, size, 0, 0, Math.PI * 2);
          ctx.fill();

          // 3. Flame Core (Bright spot)
          ctx.fillStyle = `rgba(255, 255, 255, ${0.6 * flicker})`;
          ctx.beginPath();
          ctx.arc(x2d, y2d + size * 0.3, size * 0.25, 0, Math.PI * 2);
          ctx.fill();

          ctx.restore();
        }
      }
    }

    // Initialize lanterns
    for (let i = 0; i < lanternCount; i++) {
      lanterns.push(new Lantern());
    }

    // Animation Loop
    let animationFrameId: number;
    const animate = () => {
      // Clear canvas for transparent background (no trails/lines)
      ctx.clearRect(0, 0, width, height);

      lanterns.forEach(lantern => {
        lantern.update();
        lantern.draw(ctx);
      });

      animationFrameId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener('resize', resize);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed top-0 left-0 w-full h-full pointer-events-none z-0"
    />
  );
};

export default ParticleBackground;
