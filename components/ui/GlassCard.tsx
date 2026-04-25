'use client';
import { useRef, MouseEvent, ReactNode } from 'react';

interface Props {
  children: ReactNode; className?: string; glowColor?: string;
  tilt?: boolean; onClick?: () => void; style?: React.CSSProperties;
}

export default function GlassCard({ children, className = '', glowColor, tilt = false, onClick, style }: Props) {
  const ref = useRef<HTMLDivElement>(null);

  const onMouseMove = (e: MouseEvent) => {
    if (!tilt || !ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width  - 0.5;
    const y = (e.clientY - rect.top)  / rect.height - 0.5;
    ref.current.style.transform = `perspective(800px) rotateY(${x * 12}deg) rotateX(${-y * 12}deg) translateZ(8px)`;
  };
  const onMouseLeave = () => {
    if (!tilt || !ref.current) return;
    ref.current.style.transform = 'perspective(800px) rotateY(0) rotateX(0) translateZ(0)';
  };

  return (
    <div ref={ref} onClick={onClick}
      onMouseMove={onMouseMove} onMouseLeave={onMouseLeave}
      className={`glass-md rounded-2xl transition-all duration-300 ${onClick ? 'cursor-none' : ''} ${className}`}
      style={{
        transformStyle: 'preserve-3d',
        transition: 'transform 0.15s ease, box-shadow 0.3s',
        ...(glowColor ? { boxShadow: `0 0 30px ${glowColor}33, 0 0 80px ${glowColor}11` } : {}),
        ...style,
      }}>
      {children}
    </div>
  );
}
