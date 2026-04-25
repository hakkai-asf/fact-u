'use client';
import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import { ArrowDown, ChevronRight, Zap } from 'lucide-react';
import { universities } from '@/lib/universities';

const WORDS = ['Discover', 'Explore', 'Compare', 'Choose', 'Belong'];

export default function HeroSection() {
  const [wordIdx, setWordIdx]   = useState(0);
  const [visible, setVisible]   = useState(true);
  const [mounted, setMounted]   = useState(false);
  const heroRef = useRef<HTMLDivElement>(null);
  const parallaxRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setMounted(true);
    const interval = setInterval(() => {
      setVisible(false);
      setTimeout(() => { setWordIdx(i => (i + 1) % WORDS.length); setVisible(true); }, 400);
    }, 2600);
    return () => clearInterval(interval);
  }, []);

  // Mouse parallax
  useEffect(() => {
    const handle = (e: MouseEvent) => {
      if (!parallaxRef.current) return;
      const cx = (e.clientX / window.innerWidth  - 0.5) * 30;
      const cy = (e.clientY / window.innerHeight - 0.5) * 20;
      parallaxRef.current.style.transform = `translate(${cx}px, ${cy}px)`;
    };
    window.addEventListener('mousemove', handle);
    return () => window.removeEventListener('mousemove', handle);
  }, []);

  return (
    <section ref={heroRef}
      className="relative min-h-screen flex flex-col items-center justify-center text-center px-6 pt-24 pb-20 overflow-hidden">

      {/* Parallax floating university chips */}
      <div ref={parallaxRef} className="absolute inset-0 pointer-events-none"
        style={{ transition: 'transform 0.15s linear', willChange: 'transform' }}>
        {mounted && universities.map((u, i) => {
          const positions = [
            { top: '15%', left: '6%' }, { top: '22%', right: '8%' },
            { top: '55%', left: '3%' }, { top: '62%', right: '5%' },
            { top: '78%', left: '12%' }, { top: '80%', right: '10%' },
            { top: '38%', left: '1%' }, { top: '40%', right: '2%' },
          ];
          const p = positions[i] || { top: '50%', left: '50%' };
          return (
            <div key={u.slug}
              className="absolute flex items-center gap-2 px-3 py-1.5 rounded-full glass shimmer"
              style={{
                ...p,
                border: `1px solid ${u.colors.primary}44`,
                animation: `floatA ${5 + i * 0.7}s ease-in-out infinite ${i * 0.4}s`,
                boxShadow: `0 0 20px ${u.colors.primary}22`,
              }}>
              <div className="w-4 h-4 rounded-full flex items-center justify-center text-[9px] font-bold"
                style={{ background: u.colors.primary }}>{u.shortName.slice(0,1)}</div>
              <span className="text-[11px] font-syne font-600 text-white/50">{u.shortName}</span>
            </div>
          );
        })}
      </div>

      {/* Glowing ring behind headline */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none"
        style={{ width: 600, height: 600 }}>
        <div className="absolute inset-0 rounded-full"
          style={{ border: '1px solid rgba(79,142,247,0.08)', boxShadow: '0 0 120px rgba(79,142,247,0.08)' }} />
        <div className="absolute inset-12 rounded-full"
          style={{ border: '1px solid rgba(167,139,250,0.06)' }} />
        <div className="absolute inset-24 rounded-full pulse-glow"
          style={{ border: '1px solid rgba(79,142,247,0.12)' }} />
      </div>

      {/* Badge */}
      <div className="anim-fade-up relative z-10">
        <div className="inline-flex items-center gap-2.5 px-5 py-2 rounded-full glass-bright mb-8"
          style={{ border: '1px solid rgba(79,142,247,0.3)', boxShadow: '0 0 30px rgba(79,142,247,0.15)' }}>
          <div className="w-2 h-2 rounded-full bg-blue-400 dot-pulse" />
          <span className="text-xs font-syne font-600 tracking-widest text-blue-300 uppercase">
            UAAP University Explorer
          </span>
          <ChevronRight size={13} className="text-blue-400 opacity-70" />
        </div>
      </div>

      {/* Headline */}
      <div className="relative z-10 anim-fade-up d1">
        <div className="font-display tracking-wider text-white/15 text-sm uppercase mb-2 tracking-[0.5em]">
          Find Your Future
        </div>
        <h1 className="font-syne font-800 leading-[0.95] tracking-tight"
          style={{ fontSize: 'clamp(3.5rem,9vw,8rem)' }}>
          <span style={{
            display: 'inline-block', minWidth: '4ch', textAlign: 'center',
            background: 'linear-gradient(135deg,#4f8ef7,#a78bfa 50%,#38bdf8)',
            WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text',
            transition: 'opacity 0.4s, transform 0.4s',
            opacity: visible ? 1 : 0,
            transform: visible ? 'translateY(0)' : 'translateY(-16px)',
          }}>
            {WORDS[wordIdx]}
          </span>
          <br />
          <span className="text-white">Your University</span>
        </h1>
      </div>

      {/* Sub */}
      <p className="relative z-10 mt-6 text-lg text-white/40 max-w-lg leading-relaxed anim-fade-up d2">
        Explore all 8 UAAP universities — academics, sports legacy, campus life,
        and admissions — in one immersive platform.
      </p>

      {/* CTAs */}
      <div className="relative z-10 flex flex-wrap items-center justify-center gap-4 mt-10 anim-fade-up d3">
        <Link href="/universities" className="btn-primary">
          Explore Universities <ChevronRight size={16} />
        </Link>
        <Link href="/compare" className="btn-ghost">
          Compare Schools
        </Link>
      </div>

      {/* University count strip */}
      <div className="relative z-10 flex items-center gap-1 mt-14 anim-fade-up d4">
        <div className="flex -space-x-2">
          {universities.slice(0,5).map(u => (
            <div key={u.slug}
              className="w-8 h-8 rounded-full flex items-center justify-center text-[10px] font-bold ring-2"
              style={{ background: `linear-gradient(135deg,${u.colors.primary},${u.colors.secondary})` }}>
              {u.shortName.slice(0,1)}
            </div>
          ))}
          <div className="w-8 h-8 rounded-full glass flex items-center justify-center text-[9px] text-white/50 font-bold ring-2"
            style={{ border: '1px solid rgba(255,255,255,0.12)' }}>
            +3
          </div>
        </div>
        <span className="ml-3 text-sm text-white/35">8 member universities · 500+ titles · 85+ years</span>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 z-10">
        <div className="w-5 h-9 rounded-full glass flex items-start justify-center pt-1.5"
          style={{ border: '1px solid rgba(255,255,255,0.15)' }}>
          <div className="w-1 h-2 rounded-full bg-blue-400 scroll-dot" />
        </div>
        <span className="text-[10px] text-white/25 tracking-[0.2em] uppercase font-syne">Scroll</span>
      </div>
    </section>
  );
}
