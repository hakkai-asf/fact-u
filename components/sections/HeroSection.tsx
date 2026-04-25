'use client';
import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import { ChevronRight, ArrowDown } from 'lucide-react';
import { universities } from '@/lib/universities';

const WORDS = ['Discover', 'Explore', 'Compare', 'Choose', 'Belong'];

export default function HeroSection() {
  const [mounted,  setMounted]  = useState(false);
  const [wordIdx,  setWordIdx]  = useState(0);
  const [visible,  setVisible]  = useState(true);
  const parallaxRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setMounted(true);

    const interval = setInterval(() => {
      setVisible(false);
      setTimeout(() => { setWordIdx(i => (i + 1) % WORDS.length); setVisible(true); }, 380);
    }, 2700);
    return () => clearInterval(interval);
  }, []);

  // Parallax — desktop only
  useEffect(() => {
    const isMobile = window.matchMedia('(pointer: coarse)').matches;
    if (isMobile || !parallaxRef.current) return;
    const handle = (e: MouseEvent) => {
      if (!parallaxRef.current) return;
      const cx = (e.clientX / window.innerWidth  - 0.5) * 26;
      const cy = (e.clientY / window.innerHeight - 0.5) * 18;
      parallaxRef.current.style.transform = `translate(${cx}px, ${cy}px)`;
    };
    window.addEventListener('mousemove', handle, { passive: true });
    return () => window.removeEventListener('mousemove', handle);
  }, []);

  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center text-center px-4 sm:px-6 pt-20 sm:pt-24 pb-16 overflow-hidden">

      {/* Floating university chips - desktop only */}
      {mounted && (
        <div ref={parallaxRef} className="hidden lg:block absolute inset-0 pointer-events-none"
          style={{ transition: 'transform 0.14s linear', willChange: 'transform' }}>
          {universities.map((u, i) => {
            const positions = [
              { top: '16%', left: '5%'  }, { top: '22%', right: '7%' },
              { top: '56%', left: '2%'  }, { top: '62%', right: '4%' },
              { top: '78%', left: '10%' }, { top: '80%', right: '9%' },
              { top: '40%', left: '1%'  }, { top: '43%', right: '2%' },
            ];
            const p = positions[i] || {};
            return (
              <div key={u.slug}
                className="absolute flex items-center gap-2 px-3 py-1.5 rounded-full glass"
                style={{
                  ...p,
                  border: `1px solid ${u.colors.primary}35`,
                  animation: `floatA ${5.5 + i * 0.65}s ease-in-out infinite ${i * 0.35}s`,
                  boxShadow: `0 0 16px ${u.colors.primary}18`,
                }}>
                <div className="w-4 h-4 rounded-full flex items-center justify-center text-[9px] font-bold"
                  style={{ background: u.colors.primary, color: '#fff' }}>
                  {u.shortName.slice(0, 1)}
                </div>
                <span className="text-[11px] font-syne font-semibold" style={{ color: 'rgba(220,228,255,0.5)' }}>
                  {u.shortName}
                </span>
              </div>
            );
          })}
        </div>
      )}

      {/* Glow rings - hidden on small screens */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none hidden sm:block"
        style={{ width: 560, height: 560 }}>
        {[0, 60, 120].map((inset, i) => (
          <div key={i} className="absolute rounded-full"
            style={{
              inset,
              border: `1px solid rgba(79,142,247,${0.07 - i * 0.02})`,
              animation: `softPulse ${5 + i * 2}s ease-in-out infinite ${i * 0.9}s`,
            }} />
        ))}
      </div>

      {/* Badge */}
      <div className="relative z-10 anim-fade-up">
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass-bright mb-6 sm:mb-8"
          style={{ border: '1px solid rgba(79,142,247,0.28)', boxShadow: '0 0 24px rgba(79,142,247,0.12)' }}>
          <span className="w-2 h-2 rounded-full bg-blue-400 dot-pulse" />
          <span className="text-xs font-syne font-semibold tracking-widest text-blue-300 uppercase">
            UAAP University Explorer
          </span>
          <ChevronRight size={12} className="text-blue-400/60" />
        </div>
      </div>

      {/* Headline */}
      <div className="relative z-10 anim-fade-up d1 w-full max-w-4xl">
        <h1 className="font-syne font-extrabold leading-tight tracking-tight px-2"
          style={{ fontSize: 'clamp(2.4rem, 7vw, 6.5rem)' }}>
          <span style={{
            display: 'inline-block',
            minWidth: '3.5ch',
            background: 'linear-gradient(135deg,#4f8ef7,#a78bfa 50%,#38bdf8)',
            WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text',
            opacity: visible ? 1 : 0,
            transform: visible ? 'translateY(0) scale(1)' : 'translateY(-14px) scale(0.93)',
            transition: 'opacity 0.38s cubic-bezier(0.16,1,0.3,1), transform 0.38s cubic-bezier(0.16,1,0.3,1)',
          }}>
            {WORDS[wordIdx]}
          </span>
          <br />
          <span style={{ color: '#e8eeff' }}>Your University</span>
        </h1>
      </div>

      {/* Subtext */}
      <p className="relative z-10 mt-5 sm:mt-6 text-base sm:text-lg max-w-lg leading-relaxed anim-fade-up d2 px-2"
        style={{ color: 'rgba(220,228,255,0.62)' }}>
        Explore all 8 UAAP universities — academics, sports legacy,
        campus life, and admissions in one platform.
      </p>

      {/* CTAs */}
      <div className="relative z-10 flex flex-wrap items-center justify-center gap-3 sm:gap-4 mt-8 sm:mt-10 anim-fade-up d3">
        <Link href="/universities" className="btn-primary">
          Explore Universities <ChevronRight size={15} />
        </Link>
        <Link href="/compare" className="btn-ghost">
          Compare Schools
        </Link>
      </div>

      {/* Uni avatar stack */}
      <div className="relative z-10 flex items-center gap-2 sm:gap-3 mt-10 sm:mt-14 anim-fade-up d4 flex-wrap justify-center px-4">
        <div className="flex -space-x-2">
          {universities.slice(0, 5).map(u => (
            <div key={u.slug}
              className="w-7 h-7 sm:w-8 sm:h-8 rounded-full flex items-center justify-center text-[9px] sm:text-[10px] font-bold ring-2 ring-[#03050d]"
              style={{ background: `linear-gradient(135deg,${u.colors.primary},${u.colors.secondary})`, color: '#fff' }}>
              {u.shortName.slice(0, 1)}
            </div>
          ))}
          <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-full glass flex items-center justify-center text-[9px] font-bold ring-2 ring-[#03050d]"
            style={{ border: '1px solid rgba(255,255,255,0.12)', color: 'rgba(255,255,255,0.45)' }}>
            +3
          </div>
        </div>
        <span className="text-xs sm:text-sm" style={{ color: 'rgba(220,228,255,0.38)' }}>
          8 universities · 500+ titles · 85+ years
        </span>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-6 sm:bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 z-10">
        <div className="w-5 h-9 rounded-full glass flex items-start justify-center pt-1.5"
          style={{ border: '1px solid rgba(255,255,255,0.15)' }}>
          <div className="w-1 h-2 rounded-full bg-blue-400 scroll-dot" />
        </div>
        <span style={{ fontSize: '9px', letterSpacing: '0.22em', color: 'rgba(255,255,255,0.22)', textTransform: 'uppercase', fontFamily: "'Syne',sans-serif" }}>Scroll</span>
      </div>
    </section>
  );
}
