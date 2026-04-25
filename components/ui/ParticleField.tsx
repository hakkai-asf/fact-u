'use client';
import { useEffect, useRef } from 'react';

interface Particle {
  x: number; y: number; vx: number; vy: number;
  size: number; opacity: number; color: string; life: number; maxLife: number;
}

export default function ParticleField({ count = 60, colors = ['#4f8ef7','#a78bfa','#38bdf8','#34d399'] }: {
  count?: number; colors?: string[];
}) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const particles = useRef<Particle[]>([]);
  const mouse     = useRef({ x: -1000, y: -1000 });
  const raf       = useRef<number>(0);

  useEffect(() => {
    const canvas = canvasRef.current!;
    const ctx    = canvas.getContext('2d')!;

    const resize = () => { canvas.width = window.innerWidth; canvas.height = window.innerHeight; };
    resize();
    window.addEventListener('resize', resize);

    const spawnParticle = (): Particle => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      vx: (Math.random() - 0.5) * 0.4,
      vy: (Math.random() - 0.5) * 0.4 - 0.2,
      size: Math.random() * 2 + 0.5,
      opacity: Math.random() * 0.5 + 0.1,
      color: colors[Math.floor(Math.random() * colors.length)],
      life: 0,
      maxLife: Math.random() * 300 + 200,
    });

    particles.current = Array.from({ length: count }, spawnParticle);

    const onMouse = (e: MouseEvent) => { mouse.current = { x: e.clientX, y: e.clientY }; };
    window.addEventListener('mousemove', onMouse);

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      particles.current.forEach((p, i) => {
        p.life++;
        if (p.life > p.maxLife) { particles.current[i] = spawnParticle(); return; }

        // Magnetic effect toward mouse
        const dx = mouse.current.x - p.x;
        const dy = mouse.current.y - p.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < 200) {
          p.vx += (dx / dist) * 0.015;
          p.vy += (dy / dist) * 0.015;
        }

        p.vx *= 0.99; p.vy *= 0.99;
        p.x  += p.vx; p.y  += p.vy;

        const lifeFrac = p.life / p.maxLife;
        const alpha    = p.opacity * (lifeFrac < 0.1 ? lifeFrac * 10 : lifeFrac > 0.8 ? (1 - lifeFrac) * 5 : 1);

        ctx.save();
        ctx.globalAlpha = alpha;
        ctx.fillStyle   = p.color;
        ctx.shadowBlur  = p.size * 4;
        ctx.shadowColor = p.color;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fill();

        // Connect nearby particles
        particles.current.forEach(q => {
          const qx = q.x - p.x, qy = q.y - p.y;
          const d  = Math.sqrt(qx * qx + qy * qy);
          if (d < 90 && d > 0) {
            ctx.globalAlpha = alpha * (1 - d / 90) * 0.15;
            ctx.strokeStyle = p.color;
            ctx.lineWidth   = 0.5;
            ctx.beginPath();
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(q.x, q.y);
            ctx.stroke();
          }
        });
        ctx.restore();
      });
      raf.current = requestAnimationFrame(draw);
    };
    raf.current = requestAnimationFrame(draw);

    return () => {
      window.removeEventListener('resize', resize);
      window.removeEventListener('mousemove', onMouse);
      cancelAnimationFrame(raf.current);
    };
  }, [count, colors]);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none"
      style={{ zIndex: 0, opacity: 0.6 }}
    />
  );
}
