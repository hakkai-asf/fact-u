'use client';
import { useEffect, useRef } from 'react';

interface Props {
  primaryColor?:   string;
  secondaryColor?: string;
  intensity?:      number;
}

export default function NebulaBackground({
  primaryColor   = '#1e3a8a',
  secondaryColor = '#4c1d95',
  intensity      = 0.9,
}: Props) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const starsRef  = useRef<{ x:number; y:number; r:number; a:number; twinkleSpeed:number; twinkleOffset:number }[]>([]);
  const rafRef    = useRef(0);
  const timeRef   = useRef(0);
  const p1Ref     = useRef(primaryColor);
  const p2Ref     = useRef(secondaryColor);

  useEffect(() => { p1Ref.current = primaryColor; }, [primaryColor]);
  useEffect(() => { p2Ref.current = secondaryColor; }, [secondaryColor]);

  useEffect(() => {
    const canvas = canvasRef.current!;
    const ctx    = canvas.getContext('2d')!;

    const resize = () => {
      canvas.width  = window.innerWidth;
      canvas.height = window.innerHeight;
      // Reinitialise stars on resize
      initStars();
    };

    const initStars = () => {
      const count = Math.floor((canvas.width * canvas.height) / 3000);
      starsRef.current = Array.from({ length: Math.min(count, 320) }, () => ({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        r: Math.random() * 1.4 + 0.2,
        a: Math.random() * 0.7 + 0.15,
        twinkleSpeed:  Math.random() * 0.015 + 0.004,
        twinkleOffset: Math.random() * Math.PI * 2,
      }));
    };

    resize();
    window.addEventListener('resize', resize, { passive: true });

    // Hex to RGB helper
    const hexToRgb = (hex: string): [number, number, number] => {
      const h = hex.replace('#', '');
      const n = parseInt(h.length === 3 ? h.split('').map(c => c+c).join('') : h, 16);
      return [(n >> 16) & 255, (n >> 8) & 255, n & 255];
    };

    const lerp = (a: number, b: number, t: number) => a + (b - a) * t;

    const draw = (ts: number) => {
      timeRef.current = ts * 0.0004;
      const t = timeRef.current;

      const W = canvas.width;
      const H = canvas.height;

      // Deep space base — very dark, slightly tinted
      ctx.fillStyle = '#03050d';
      ctx.fillRect(0, 0, W, H);

      const [r1, g1, b1] = hexToRgb(p1Ref.current);
      const [r2, g2, b2] = hexToRgb(p2Ref.current);

      // ── Nebula clouds (layered radial gradients) ──────────────────────
      const nebulae = [
        // Central glow — shifts with color
        { cx: W * 0.5 + Math.sin(t * 0.7) * W * 0.06,
          cy: H * 0.45 + Math.cos(t * 0.5) * H * 0.04,
          rx: W * 0.55, ry: H * 0.5,
          r: r1, g: g1, b: b1, a: 0.18 * intensity },
        // Secondary — offset
        { cx: W * 0.3 + Math.cos(t * 0.4) * W * 0.08,
          cy: H * 0.6  + Math.sin(t * 0.6) * H * 0.05,
          rx: W * 0.4, ry: H * 0.4,
          r: r2, g: g2, b: b2, a: 0.14 * intensity },
        // Top-right accent
        { cx: W * 0.78 + Math.sin(t * 0.3) * W * 0.04,
          cy: H * 0.22  + Math.cos(t * 0.45) * H * 0.04,
          rx: W * 0.3, ry: H * 0.28,
          r: lerp(r1, 100, 0.4), g: lerp(g1, 60, 0.4), b: lerp(b1, 220, 0.4), a: 0.12 * intensity },
        // Bottom-left accent
        { cx: W * 0.12 + Math.cos(t * 0.55) * W * 0.03,
          cy: H * 0.8   + Math.sin(t * 0.35) * H * 0.04,
          rx: W * 0.28, ry: H * 0.3,
          r: lerp(r2, 200, 0.3), g: lerp(g2, 50, 0.3), b: lerp(b2, 150, 0.3), a: 0.11 * intensity },
        // Deep magenta dust
        { cx: W * 0.65 + Math.sin(t * 0.2) * W * 0.05,
          cy: H * 0.7   + Math.cos(t * 0.28) * H * 0.05,
          rx: W * 0.35, ry: H * 0.38,
          r: 180, g: 40, b: lerp(b1, 200, 0.5), a: 0.09 * intensity },
      ];

      nebulae.forEach(n => {
        ctx.save();
        ctx.translate(n.cx, n.cy);
        ctx.scale(n.rx / n.ry, 1);
        const grad = ctx.createRadialGradient(0, 0, 0, 0, 0, n.ry);
        grad.addColorStop(0,   `rgba(${Math.round(n.r)},${Math.round(n.g)},${Math.round(n.b)},${n.a})`);
        grad.addColorStop(0.5, `rgba(${Math.round(n.r)},${Math.round(n.g)},${Math.round(n.b)},${n.a * 0.4})`);
        grad.addColorStop(1,   `rgba(${Math.round(n.r)},${Math.round(n.g)},${Math.round(n.b)},0)`);
        ctx.fillStyle = grad;
        ctx.beginPath();
        ctx.arc(0, 0, n.ry, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
      });

      // ── Dust bands ────────────────────────────────────────────────────
      for (let band = 0; band < 3; band++) {
        const bandY = H * (0.25 + band * 0.28) + Math.sin(t * 0.18 + band * 1.2) * H * 0.03;
        const grad  = ctx.createLinearGradient(0, bandY - 60, 0, bandY + 60);
        const alpha = (0.05 + band * 0.02) * intensity;
        grad.addColorStop(0,   'rgba(0,0,0,0)');
        grad.addColorStop(0.5, `rgba(${r1},${g1},${b1},${alpha})`);
        grad.addColorStop(1,   'rgba(0,0,0,0)');
        ctx.fillStyle = grad;
        ctx.fillRect(0, bandY - 60, W, 120);
      }

      // ── Stars ────────────────────────────────────────────────────────
      starsRef.current.forEach(s => {
        const twinkle = Math.sin(t * 60 * s.twinkleSpeed + s.twinkleOffset) * 0.3 + 0.7;
        const alpha   = s.a * twinkle;
        ctx.save();
        ctx.globalAlpha = alpha;
        ctx.shadowBlur  = s.r * 3;
        ctx.shadowColor = '#fff';
        ctx.fillStyle   = '#ffffff';
        ctx.beginPath();
        ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
      });

      // ── Bright cluster stars ─────────────────────────────────────────
      const clusters = [
        { x: W * 0.25, y: H * 0.3 },
        { x: W * 0.72, y: H * 0.55 },
        { x: W * 0.5,  y: H * 0.15 },
      ];
      clusters.forEach((c, ci) => {
        for (let i = 0; i < 12; i++) {
          const angle  = (i / 12) * Math.PI * 2 + t * 0.08 * (ci % 2 === 0 ? 1 : -1);
          const spread = 60 + ci * 30;
          const sx = c.x + Math.cos(angle) * spread * Math.random();
          const sy = c.y + Math.sin(angle) * spread * Math.random();
          const bright = 0.6 + Math.sin(t * 8 + i + ci * 3) * 0.3;
          ctx.save();
          ctx.globalAlpha = bright * 0.6;
          ctx.shadowBlur  = 4;
          ctx.shadowColor = `rgb(${r1},${g1},${b1})`;
          ctx.fillStyle   = '#fff';
          ctx.beginPath();
          ctx.arc(sx, sy, 0.8, 0, Math.PI * 2);
          ctx.fill();
          ctx.restore();
        }
      });

      // ── Subtle grid ───────────────────────────────────────────────────
      ctx.save();
      ctx.globalAlpha = 0.025;
      ctx.strokeStyle = `rgb(${r1},${g1},${b1})`;
      ctx.lineWidth   = 0.5;
      const gridSize  = 80;
      for (let gx = 0; gx < W; gx += gridSize) {
        ctx.beginPath(); ctx.moveTo(gx, 0); ctx.lineTo(gx, H); ctx.stroke();
      }
      for (let gy = 0; gy < H; gy += gridSize) {
        ctx.beginPath(); ctx.moveTo(0, gy); ctx.lineTo(W, gy); ctx.stroke();
      }
      ctx.restore();

      // ── Vignette ─────────────────────────────────────────────────────
      const vign = ctx.createRadialGradient(W/2, H/2, H * 0.2, W/2, H/2, H * 0.9);
      vign.addColorStop(0, 'rgba(0,0,0,0)');
      vign.addColorStop(1, 'rgba(3,5,13,0.65)');
      ctx.fillStyle = vign;
      ctx.fillRect(0, 0, W, H);

      rafRef.current = requestAnimationFrame(draw);
    };

    rafRef.current = requestAnimationFrame(draw);
    return () => {
      cancelAnimationFrame(rafRef.current);
      window.removeEventListener('resize', resize);
    };
  }, []); // runs once — color changes handled via refs

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none"
      style={{ zIndex: -1 }}
      aria-hidden="true"
    />
  );
}
