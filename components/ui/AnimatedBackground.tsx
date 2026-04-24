'use client';
import { useEffect, useRef } from 'react';

interface Props {
  primaryColor?: string;
  secondaryColor?: string;
  intensity?: number;
}

export default function AnimatedBackground({
  primaryColor = '#1e40af',
  secondaryColor = '#7c3aed',
  intensity = 0.35,
}: Props) {
  return (
    <div className="fixed inset-0 -z-10 overflow-hidden pointer-events-none">
      {/* Base */}
      <div className="absolute inset-0" style={{ background: '#060a12' }} />
      {/* Orbs */}
      <div
        className="absolute rounded-full"
        style={{
          width: 700, height: 700,
          top: -200, left: -200,
          background: `radial-gradient(circle, ${primaryColor}66, transparent 70%)`,
          filter: 'blur(80px)',
          opacity: intensity,
          animation: 'floatY 9s ease-in-out infinite',
          transition: 'background 1.5s ease',
        }}
      />
      <div
        className="absolute rounded-full"
        style={{
          width: 600, height: 600,
          bottom: -150, right: -150,
          background: `radial-gradient(circle, ${secondaryColor}66, transparent 70%)`,
          filter: 'blur(80px)',
          opacity: intensity,
          animation: 'floatY 7s ease-in-out infinite reverse',
          transition: 'background 1.5s ease',
        }}
      />
      <div
        className="absolute rounded-full"
        style={{
          width: 400, height: 400,
          top: '40%', left: '40%',
          transform: 'translate(-50%,-50%)',
          background: `radial-gradient(circle, ${primaryColor}33, transparent 70%)`,
          filter: 'blur(100px)',
          opacity: intensity * 0.6,
          animation: 'floatY 11s ease-in-out infinite 2s',
        }}
      />
      {/* Grid overlay */}
      <div
        className="absolute inset-0"
        style={{
          backgroundImage: 'linear-gradient(rgba(255,255,255,0.015) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.015) 1px, transparent 1px)',
          backgroundSize: '60px 60px',
        }}
      />
    </div>
  );
}
