'use client';
import { useEffect, useRef, useState } from 'react';

interface Props {
  count?: number;
  colors?: string[];
}

// Lightweight particle field — reduced count on mobile for performance
export default function ParticleField({
  count = 50,
  colors = ['#4f8ef7','#a78bfa','#38bdf8','#34d399'],
}: Props) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => { setMounted(true); }, []);

  useEffect(() => {
    if (!mounted) return;

    // Reduce count on mobile/low-power devices
    const isMobile = window.matchMedia('(pointer: coarse)').matches;
    const actualCount = isMobile ? Math.min(count, 25) : count;

    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let raf = 0;
    const mouse = { x: -9999, y: -9999 };

    const resize = () => {
      canvas.width  = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener('resize', resize, { passive: true });

    type P = { x:number; y:number; vx:number; vy:number; r:number; col:string; a:number; life:number; max:number };
    const spawn = (): P => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      vx: (Math.random() - .5) * .4,
      vy: (Math.random() - .5) * .4 - .15,
      r: Math.random() * 1.8 + .5,
      col: colors[Math.floor(Math.random() * colors.length)],
      a: Math.random() * .4 + .1,
      life: 0,
      max: Math.random() * 320 + 200,
    });

    const ps: P[] = Array.from({ length: actualCount }, spawn);

    const onMouse = (e: MouseEvent) => { mouse.x = e.clientX; mouse.y = e.clientY; };
    if (!isMobile) window.addEventListener('mousemove', onMouse, { passive: true });

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      for (let i = 0; i < ps.length; i++) {
        const p = ps[i];
        p.life++;
        if (p.life > p.max) { ps[i] = spawn(); continue; }

        // Mouse magnetism (desktop only)
        if (!isMobile) {
          const dx = mouse.x - p.x, dy = mouse.y - p.y, d = Math.hypot(dx, dy);
          if (d < 160) { p.vx += (dx / d) * .012; p.vy += (dy / d) * .012; }
        }
        p.vx *= .988; p.vy *= .988;
        p.x += p.vx; p.y += p.vy;

        const t = p.life / p.max;
        const alpha = p.a * (t < .1 ? t * 10 : t > .8 ? (1 - t) * 5 : 1);

        ctx.save();
        ctx.globalAlpha = alpha;
        ctx.shadowBlur  = p.r * 5;
        ctx.shadowColor = p.col;
        ctx.fillStyle   = p.col;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fill();

        // Connect — only on desktop, fewer connections
        if (!isMobile) {
          for (let j = i + 1; j < Math.min(i + 8, ps.length); j++) {
            const q = ps[j], qd = Math.hypot(q.x - p.x, q.y - p.y);
            if (qd < 80) {
              ctx.globalAlpha = alpha * (1 - qd / 80) * .1;
              ctx.strokeStyle = p.col;
              ctx.lineWidth   = .35;
              ctx.beginPath(); ctx.moveTo(p.x, p.y); ctx.lineTo(q.x, q.y); ctx.stroke();
            }
          }
        }
        ctx.restore();
      }
      raf = requestAnimationFrame(draw);
    };
    raf = requestAnimationFrame(draw);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener('resize', resize);
      if (!isMobile) window.removeEventListener('mousemove', onMouse);
    };
  }, [mounted, count, colors]);

  if (!mounted) return null;

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none"
      style={{ zIndex: 0, opacity: .55 }}
      aria-hidden="true"
    />
  );
}
