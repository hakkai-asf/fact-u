'use client';
import { useEffect, useRef, useState } from 'react';

interface Props {
  label: string; value: number; max?: number;
  color?: string; delay?: number; showValue?: boolean;
}

export default function ScoreBar({ label, value, max = 10, color = '#4f8ef7', delay = 0, showValue = true }: Props) {
  const [animated, setAnimated] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) setTimeout(() => setAnimated(true), delay); },
      { threshold: 0.3 }
    );
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, [delay]);

  const pct = (value / max) * 100;

  return (
    <div ref={ref} className="space-y-2">
      <div className="flex justify-between items-center">
        <span className="text-sm text-white/60 font-medium">{label}</span>
        {showValue && (
          <span className="text-xs font-bold tabular-nums"
            style={{ color, textShadow: `0 0 12px ${color}88` }}>
            {value}<span className="text-white/25">/{max}</span>
          </span>
        )}
      </div>
      <div className="relative h-1.5 rounded-full overflow-hidden" style={{ background: 'rgba(255,255,255,0.06)' }}>
        <div
          className="absolute inset-y-0 left-0 rounded-full"
          style={{
            width: animated ? `${pct}%` : '0%',
            background: `linear-gradient(90deg, ${color}, ${color}99)`,
            boxShadow: `0 0 12px ${color}88`,
            transition: `width 1.2s cubic-bezier(0.16,1,0.3,1) ${delay}ms`,
          }}
        />
        {/* Shine */}
        <div className="absolute inset-y-0 left-0 rounded-full overflow-hidden pointer-events-none"
          style={{ width: animated ? `${pct}%` : '0%', transition: `width 1.2s cubic-bezier(0.16,1,0.3,1) ${delay}ms` }}>
          <div className="absolute inset-0 opacity-40"
            style={{ background: 'linear-gradient(90deg,transparent 60%,rgba(255,255,255,0.8) 80%,transparent)' }} />
        </div>
      </div>
    </div>
  );
}
