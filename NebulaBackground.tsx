/**
 * components/ui/NebulaBackground.tsx — MODIFIED
 * Uses real nebula-bg.jpg as base layer (CSS backgroundImage).
 * Canvas layer adds twinkling stars + university-color glow orbs on top.
 * Very subtle — never overpowers UI text.
 */
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
  const starsRef  = useRef<{ x:number; y:number; r:number; a:number; ts:number; to:number }[]>([]);
  const rafRef    = useRef(0);
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
      initStars();
    };

    const initStars = () => {
      const count = Math.min(Math.floor((canvas.width * canvas.height) / 4000), 200);
      starsRef.current = Array.from({ length: count }, () => ({
        x:  Math.random() * canvas.width,
        y:  Math.random() * canvas.height,
        r:  Math.random() * 1.2 + 0.2,
        a:  Math.random() * 0.6 + 0.15,
        ts: Math.random() * 0.012 + 0.003,
        to: Math.random() * Math.PI * 2,
      }));
    };

    resize();
    window.addEventListener('resize', resize, { passive: true });

    const hexToRgb = (hex: string): [number, number, number] => {
      const h = hex.replace('#', '');
      const n = parseInt(h.length === 3 ? h.split('').map(c=>c+c).join('') : h, 16);
      return [(n>>16)&255, (n>>8)&255, n&255];
    };

    const draw = (ts: number) => {
      const t = ts * 0.0003;
      const W = canvas.width;
      const H = canvas.height;

      ctx.clearRect(0, 0, W, H);

      // Semi-transparent dark base so nebula image shows through
      ctx.fillStyle = 'rgba(3,5,13,0.52)';
      ctx.fillRect(0, 0, W, H);

      // University color glow orbs
      const [r1,g1,b1] = hexToRgb(p1Ref.current);
      const [r2,g2,b2] = hexToRgb(p2Ref.current);

      const orbs = [
        { cx: W*0.5 + Math.sin(t*0.6)*W*0.04, cy: H*0.45 + Math.cos(t*0.5)*H*0.03, rx: W*0.5, ry: H*0.45, r:r1, g:g1, b:b1, a: 0.15*intensity },
        { cx: W*0.25 + Math.cos(t*0.4)*W*0.05, cy: H*0.65 + Math.sin(t*0.55)*H*0.04, rx: W*0.35, ry: H*0.35, r:r2, g:g2, b:b2, a: 0.11*intensity },
      ];
      orbs.forEach(o => {
        ctx.save();
        ctx.translate(o.cx, o.cy);
        ctx.scale(o.rx / o.ry, 1);
        const grad = ctx.createRadialGradient(0,0,0, 0,0,o.ry);
        grad.addColorStop(0,   `rgba(${o.r},${o.g},${o.b},${o.a})`);
        grad.addColorStop(0.5, `rgba(${o.r},${o.g},${o.b},${o.a*0.3})`);
        grad.addColorStop(1,   `rgba(${o.r},${o.g},${o.b},0)`);
        ctx.fillStyle = grad;
        ctx.beginPath(); ctx.arc(0,0,o.ry,0,Math.PI*2); ctx.fill();
        ctx.restore();
      });

      // Twinkling stars
      starsRef.current.forEach(s => {
        const twinkle = Math.sin(t * 60 * s.ts + s.to) * 0.28 + 0.72;
        ctx.save();
        ctx.globalAlpha = s.a * twinkle;
        ctx.shadowBlur  = s.r * 3;
        ctx.shadowColor = '#fff';
        ctx.fillStyle   = '#ffffff';
        ctx.beginPath(); ctx.arc(s.x, s.y, s.r, 0, Math.PI*2); ctx.fill();
        ctx.restore();
      });

      // Vignette
      const vign = ctx.createRadialGradient(W/2,H/2,H*0.15, W/2,H/2,H*0.88);
      vign.addColorStop(0, 'rgba(0,0,0,0)');
      vign.addColorStop(1, 'rgba(3,5,13,0.70)');
      ctx.fillStyle = vign;
      ctx.fillRect(0,0,W,H);

      rafRef.current = requestAnimationFrame(draw);
    };

    rafRef.current = requestAnimationFrame(draw);
    return () => {
      cancelAnimationFrame(rafRef.current);
      window.removeEventListener('resize', resize);
    };
  }, []);

  return (
    <>
      {/* Real nebula image — deepest layer, very subtle */}
      <div
        className="fixed inset-0 pointer-events-none"
        style={{
          zIndex:                  -2,
          backgroundImage:         'url(/assets/backgrounds/nebula-bg.jpg)',
          backgroundSize:          'cover',
          backgroundPosition:      'center',
          backgroundAttachment:    'fixed',
          opacity:                 0.32,
          animation:               'nebulaBreath 30s ease-in-out infinite',
        }}
        aria-hidden="true"
      />
      {/* Canvas: stars + color glow */}
      <canvas
        ref={canvasRef}
        className="fixed inset-0 pointer-events-none"
        style={{ zIndex: -1 }}
        aria-hidden="true"
      />
    </>
  );
}
