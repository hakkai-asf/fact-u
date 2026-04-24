'use client';
import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import { ArrowDown, ChevronRight, Trophy, Users, Star } from 'lucide-react';

const stats = [
  { icon: Trophy, label: 'Universities', value: '8' },
  { icon: Users, label: 'UAAP Sports', value: '15+' },
  { icon: Star, label: 'Championships', value: '500+' },
];

export default function HeroSection() {
  const [mounted, setMounted] = useState(false);
  const mouseRef = useRef({ x: 0, y: 0 });
  const heroRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setMounted(true);
    const handler = (e: MouseEvent) => {
      mouseRef.current = { x: e.clientX, y: e.clientY };
      if (heroRef.current) {
        const rect = heroRef.current.getBoundingClientRect();
        const cx = (e.clientX - rect.left - rect.width / 2) / rect.width;
        const cy = (e.clientY - rect.top - rect.height / 2) / rect.height;
        heroRef.current.style.setProperty('--mx', String(cx * 20));
        heroRef.current.style.setProperty('--my', String(cy * 20));
      }
    };
    window.addEventListener('mousemove', handler);
    return () => window.removeEventListener('mousemove', handler);
  }, []);

  return (
    <section
      ref={heroRef}
      className="relative min-h-screen flex flex-col items-center justify-center text-center px-6 pt-20 pb-12 overflow-hidden"
    >
      {/* Particle dots */}
      <div className="absolute inset-0 pointer-events-none">
        {mounted && Array.from({ length: 20 }).map((_, i) => (
          <div
            key={i}
            className="absolute rounded-full"
            style={{
              width: Math.random() * 4 + 1,
              height: Math.random() * 4 + 1,
              background: `rgba(${Math.random() > 0.5 ? '96,165,250' : '167,139,250'},${Math.random() * 0.5 + 0.2})`,
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animation: `floatY ${4 + Math.random() * 6}s ease-in-out infinite ${Math.random() * 4}s`,
            }}
          />
        ))}
      </div>

      {/* Badge */}
      <div
        className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium mb-8 fade-up"
        style={{ background: 'rgba(59,130,246,0.1)', border: '1px solid rgba(59,130,246,0.3)', color: '#93c5fd' }}
      >
        <span className="w-2 h-2 rounded-full bg-blue-400 animate-pulse" />
        The Ultimate UAAP University Explorer
        <ChevronRight size={14} />
      </div>

      {/* Headline */}
      <h1
        className="font-syne font-800 leading-[1.02] tracking-tight mb-6 fade-up fade-up-delay-1"
        style={{ fontSize: 'clamp(2.8rem,7vw,5.5rem)' }}
      >
        Find the University<br />
        <span className="grad-text">That Fits You</span>
      </h1>

      {/* Subtext */}
      <p
        className="text-lg text-white/50 max-w-xl leading-relaxed mb-10 fade-up fade-up-delay-2"
      >
        Explore all 8 UAAP universities — compare academics, sports legacy,
        programs, campus life, and tuition in one stunning platform.
      </p>

      {/* CTAs */}
      <div className="flex flex-wrap items-center justify-center gap-4 mb-16 fade-up fade-up-delay-3">
        <Link
          href="/universities"
          className="flex items-center gap-2 px-7 py-3.5 rounded-full font-semibold text-sm transition-all duration-300 hover:scale-105 hover:shadow-2xl"
          style={{
            background: 'linear-gradient(135deg,#2563eb,#7c3aed)',
            boxShadow: '0 0 30px rgba(99,102,241,0.35)',
          }}
        >
          Explore Universities
          <ChevronRight size={16} />
        </Link>
        <Link
          href="/compare"
          className="flex items-center gap-2 px-7 py-3.5 rounded-full font-semibold text-sm glass glass-hover transition-all duration-300 hover:scale-105"
          style={{ border: '1px solid rgba(255,255,255,0.15)' }}
        >
          Compare Schools
        </Link>
      </div>

      {/* Stats row */}
      <div className="flex flex-wrap justify-center gap-6 fade-up fade-up-delay-4">
        {stats.map(({ icon: Icon, label, value }) => (
          <div
            key={label}
            className="flex items-center gap-3 px-5 py-3 rounded-2xl glass"
            style={{ border: '1px solid rgba(255,255,255,0.1)' }}
          >
            <div className="w-8 h-8 rounded-lg flex items-center justify-center"
              style={{ background: 'rgba(59,130,246,0.15)' }}>
              <Icon size={16} className="text-blue-400" />
            </div>
            <div className="text-left">
              <div className="text-lg font-bold leading-tight">{value}</div>
              <div className="text-xs text-white/40">{label}</div>
            </div>
          </div>
        ))}
      </div>

      {/* Scroll cue */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-white/30 text-xs">
        <span>Scroll to explore</span>
        <ArrowDown size={16} className="animate-bounce" />
      </div>
    </section>
  );
}
