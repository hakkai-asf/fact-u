'use client';
import { useEffect, useRef } from 'react';

interface Props {
  primaryColor?: string;
  secondaryColor?: string;
  intensity?: number;
}

export default function AnimatedBackground({
  primaryColor = '#1e3a8a',
  secondaryColor = '#4c1d95',
  intensity = 0.4,
}: Props) {
  const orb1Ref = useRef<HTMLDivElement>(null);
  const orb2Ref = useRef<HTMLDivElement>(null);

  // Update colors on prop change
  useEffect(() => {
    if (orb1Ref.current) orb1Ref.current.style.background = `radial-gradient(circle, ${primaryColor}88, transparent 70%)`;
    if (orb2Ref.current) orb2Ref.current.style.background = `radial-gradient(circle, ${secondaryColor}88, transparent 70%)`;
  }, [primaryColor, secondaryColor]);

  return (
    <div className="fixed inset-0 -z-10 overflow-hidden pointer-events-none mesh-bg">
      {/* Grid */}
      <div className="absolute inset-0 grid-overlay opacity-100" />

      {/* Noise */}
      <div className="absolute inset-0 opacity-30"
        style={{
          backgroundImage: "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='200' height='200'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='200' height='200' filter='url(%23n)' opacity='0.04'/%3E%3C/svg%3E\")",
          backgroundRepeat: 'repeat',
        }}
      />

      {/* Orb 1 */}
      <div ref={orb1Ref}
        className="absolute rounded-full float-a"
        style={{
          width: 900, height: 900,
          top: -300, left: -200,
          background: `radial-gradient(circle, ${primaryColor}88, transparent 70%)`,
          filter: 'blur(100px)',
          opacity: intensity,
          transition: 'background 1.8s cubic-bezier(0.16,1,0.3,1)',
        }}
      />
      {/* Orb 2 */}
      <div ref={orb2Ref}
        className="absolute rounded-full float-b"
        style={{
          width: 700, height: 700,
          bottom: -200, right: -150,
          background: `radial-gradient(circle, ${secondaryColor}88, transparent 70%)`,
          filter: 'blur(90px)',
          opacity: intensity,
          transition: 'background 1.8s cubic-bezier(0.16,1,0.3,1)',
        }}
      />
      {/* Orb 3 - center */}
      <div
        className="absolute rounded-full float-c"
        style={{
          width: 500, height: 500,
          top: '35%', left: '45%',
          background: `radial-gradient(circle, ${primaryColor}44, transparent 70%)`,
          filter: 'blur(120px)',
          opacity: intensity * 0.5,
        }}
      />

      {/* Vignette */}
      <div className="absolute inset-0"
        style={{ background: 'radial-gradient(ellipse 80% 80% at 50% 50%, transparent 40%, #03050d 100%)' }}
      />
    </div>
  );
}
