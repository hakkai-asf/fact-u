'use client';
import { ReactNode } from 'react';

interface Props {
  children: ReactNode;
  className?: string;
  glowColor?: string;
  hover?: boolean;
  onClick?: () => void;
  style?: React.CSSProperties;
}

export default function GlassCard({ children, className = '', glowColor, hover = true, onClick, style }: Props) {
  return (
    <div
      onClick={onClick}
      className={`glass rounded-2xl transition-all duration-400 ${hover ? 'glass-hover cursor-pointer' : ''} ${className}`}
      style={{
        ...(glowColor ? { boxShadow: `0 0 30px ${glowColor}33, 0 0 60px ${glowColor}11` } : {}),
        ...style,
      }}
    >
      {children}
    </div>
  );
}
