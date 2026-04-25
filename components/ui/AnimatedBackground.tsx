'use client';
import { useEffect, useRef } from 'react';

interface Props {
  primaryColor?:   string;
  secondaryColor?: string;
  intensity?:      number;
}

// Optimised: no JS animation loop — pure CSS keyframes + transitions
export default function AnimatedBackground({
  primaryColor   = '#1e3a8a',
  secondaryColor = '#4c1d95',
  intensity      = 0.38,
}: Props) {
  const o1 = useRef<HTMLDivElement>(null);
  const o2 = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (o1.current) o1.current.style.background = `radial-gradient(circle, ${primaryColor}88, transparent 70%)`;
    if (o2.current) o2.current.style.background = `radial-gradient(circle, ${secondaryColor}88, transparent 70%)`;
  }, [primaryColor, secondaryColor]);

  return (
    <div className="fixed inset-0 -z-10 overflow-hidden pointer-events-none mesh-bg">
      {/* Grid */}
      <div className="absolute inset-0 grid-overlay" />

      {/* Orb 1 */}
      <div ref={o1}
        className="absolute rounded-full float-a"
        style={{
          width: 800, height: 800,
          top: -250, left: -200,
          background: `radial-gradient(circle, ${primaryColor}88, transparent 70%)`,
          filter: 'blur(90px)',
          opacity: intensity,
          transition: 'background 1.6s cubic-bezier(0.16,1,0.3,1)',
          willChange: 'transform',
        }}
      />
      {/* Orb 2 */}
      <div ref={o2}
        className="absolute rounded-full float-b"
        style={{
          width: 650, height: 650,
          bottom: -180, right: -160,
          background: `radial-gradient(circle, ${secondaryColor}88, transparent 70%)`,
          filter: 'blur(85px)',
          opacity: intensity,
          transition: 'background 1.6s cubic-bezier(0.16,1,0.3,1)',
          willChange: 'transform',
        }}
      />
      {/* Orb 3 */}
      <div
        className="absolute rounded-full float-c"
        style={{
          width: 420, height: 420,
          top: '35%', left: '45%',
          background: `radial-gradient(circle, ${primaryColor}33, transparent 70%)`,
          filter: 'blur(100px)',
          opacity: intensity * .45,
          willChange: 'transform',
        }}
      />
      {/* Vignette */}
      <div className="absolute inset-0"
        style={{ background: 'radial-gradient(ellipse 85% 85% at 50% 50%, transparent 35%, #03050d 100%)' }}
      />
    </div>
  );
}
