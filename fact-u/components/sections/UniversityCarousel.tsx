'use client';
import { useRef, useState, useCallback, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { ChevronLeft, ChevronRight, ArrowRight } from 'lucide-react';
import { universities } from '@/lib/universities';

export default function UniversityCarousel() {
  const router = useRouter();
  const [activeIdx, setActiveIdx] = useState(0);
  const [dragging, setDragging] = useState(false);
  const startX = useRef(0);
  const scrollLeft = useRef(0);
  const trackRef = useRef<HTMLDivElement>(null);
  const autoRef = useRef<NodeJS.Timeout>();

  const go = useCallback((idx: number) => {
    setActiveIdx((idx + universities.length) % universities.length);
  }, []);

  // Auto scroll
  useEffect(() => {
    autoRef.current = setInterval(() => {
      if (!dragging) go(activeIdx + 1);
    }, 4000);
    return () => clearInterval(autoRef.current);
  }, [activeIdx, dragging, go]);

  const onMouseDown = (e: React.MouseEvent) => {
    setDragging(true);
    startX.current = e.pageX;
    scrollLeft.current = activeIdx;
  };
  const onMouseMove = (e: React.MouseEvent) => {
    if (!dragging) return;
    const delta = e.pageX - startX.current;
    if (Math.abs(delta) > 50) {
      go(scrollLeft.current + (delta < 0 ? 1 : -1));
      setDragging(false);
    }
  };
  const onMouseUp = () => setDragging(false);

  const active = universities[activeIdx];

  // Visible cards: prev2, prev1, active, next1, next2
  const getCard = (offset: number) =>
    universities[(activeIdx + offset + universities.length) % universities.length];

  const offsets = [-2, -1, 0, 1, 2];

  return (
    <section className="relative py-24 px-4 overflow-hidden">
      {/* Dynamic BG bleed */}
      <div
        className="absolute inset-0 pointer-events-none transition-all duration-1000"
        style={{
          background: `radial-gradient(ellipse 80% 60% at 50% 50%, ${active.colors.primary}22, transparent 70%)`,
        }}
      />

      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-sm font-medium mb-4"
            style={{ background: 'rgba(59,130,246,0.1)', border: '1px solid rgba(59,130,246,0.3)', color: '#93c5fd' }}>
            <span className="w-1.5 h-1.5 rounded-full bg-blue-400 animate-pulse" />
            8 Member Universities
          </div>
          <h2 className="font-syne font-800 text-4xl md:text-5xl tracking-tight mb-3">
            Explore <span className="grad-text">Universities</span>
          </h2>
          <p className="text-white/40 text-lg">Drag, swipe, or click to browse. Click the active card to dive in.</p>
        </div>

        {/* Carousel track */}
        <div
          ref={trackRef}
          className="relative flex items-center justify-center gap-4 select-none cursor-grab active:cursor-grabbing"
          style={{ height: 420 }}
          onMouseDown={onMouseDown}
          onMouseMove={onMouseMove}
          onMouseUp={onMouseUp}
          onMouseLeave={onMouseUp}
        >
          {offsets.map((offset) => {
            const univ = getCard(offset);
            const isActive = offset === 0;
            const dist = Math.abs(offset);

            return (
              <div
                key={`${univ.slug}-${offset}`}
                onClick={() => {
                  if (isActive) router.push(`/universities/${univ.slug}`);
                  else go(activeIdx + offset);
                }}
                className="absolute transition-all duration-500 ease-out rounded-3xl overflow-hidden cursor-pointer"
                style={{
                  width: isActive ? 340 : dist === 1 ? 260 : 200,
                  height: isActive ? 400 : dist === 1 ? 320 : 240,
                  zIndex: 5 - dist,
                  transform: `translateX(${offset * (isActive ? 0 : offset < 0 ? -300 : 300)}px) scale(${isActive ? 1 : dist === 1 ? 0.85 : 0.7})`,
                  opacity: isActive ? 1 : dist === 1 ? 0.7 : 0.4,
                  filter: isActive ? 'none' : `blur(${dist}px)`,
                  background: `linear-gradient(135deg, ${univ.colors.primary}cc, ${univ.colors.secondary}cc)`,
                  border: isActive
                    ? `2px solid ${univ.colors.primary}88`
                    : '1px solid rgba(255,255,255,0.1)',
                  boxShadow: isActive
                    ? `0 0 60px ${univ.colors.primary}55, 0 0 120px ${univ.colors.primary}22`
                    : 'none',
                  backdropFilter: 'blur(10px)',
                }}
              >
                {/* Glassmorphism overlay */}
                <div className="absolute inset-0" style={{ background: 'rgba(0,0,0,0.35)' }} />
                <div className="absolute inset-0" style={{
                  background: 'linear-gradient(180deg,rgba(255,255,255,0.06) 0%, transparent 60%)',
                }} />

                {/* Content */}
                <div className="relative h-full flex flex-col items-center justify-center p-6 text-center gap-3">
                  {/* Logo placeholder / initials */}
                  <div
                    className="rounded-2xl flex items-center justify-center font-syne font-800 transition-all duration-500"
                    style={{
                      width: isActive ? 72 : 48,
                      height: isActive ? 72 : 48,
                      fontSize: isActive ? '1.5rem' : '1rem',
                      background: 'rgba(255,255,255,0.12)',
                      border: '2px solid rgba(255,255,255,0.2)',
                      boxShadow: isActive ? `0 0 30px ${univ.colors.secondary}66` : 'none',
                      transform: isActive ? 'translateY(-4px)' : 'none',
                    }}
                  >
                    {univ.shortName.slice(0, 2)}
                  </div>

                  <div>
                    <div className="font-syne font-700 text-white leading-tight"
                      style={{ fontSize: isActive ? '1.2rem' : '0.9rem' }}>
                      {isActive ? univ.name : univ.shortName}
                    </div>
                    {isActive && (
                      <div className="text-white/60 text-sm mt-1">{univ.tagline}</div>
                    )}
                  </div>

                  {isActive && (
                    <>
                      <p className="text-white/60 text-xs leading-relaxed max-w-xs">
                        {univ.description.slice(0, 110)}…
                      </p>
                      {/* Badges */}
                      <div className="flex flex-wrap justify-center gap-1.5 mt-1">
                        <span className="px-2 py-0.5 rounded-full text-xs font-medium"
                          style={{ background: 'rgba(255,255,255,0.12)', color: '#fcd34d' }}>
                          🏆 {univ.sports.totalTitles}+ Titles
                        </span>
                        <span className="px-2 py-0.5 rounded-full text-xs font-medium"
                          style={{ background: 'rgba(255,255,255,0.12)', color: '#86efac' }}>
                          🎓 {univ.academics.qsRank.includes('Not') ? 'Local Top' : univ.academics.qsRank}
                        </span>
                        <span className="px-2 py-0.5 rounded-full text-xs font-medium"
                          style={{ background: 'rgba(255,255,255,0.12)', color: '#c4b5fd' }}>
                          ⭐ {univ.type === 'public' ? 'State Univ' : 'Private'}
                        </span>
                      </div>
                      <button
                        className="mt-2 flex items-center gap-1.5 px-4 py-2 rounded-full text-xs font-semibold transition-all hover:scale-105"
                        style={{ background: 'rgba(255,255,255,0.15)', border: '1px solid rgba(255,255,255,0.25)' }}
                      >
                        Explore {univ.shortName} <ArrowRight size={12} />
                      </button>
                    </>
                  )}
                </div>
              </div>
            );
          })}
        </div>

        {/* Controls */}
        <div className="flex items-center justify-center gap-4 mt-8">
          <button
            onClick={() => go(activeIdx - 1)}
            className="w-10 h-10 rounded-full glass glass-hover flex items-center justify-center transition-all hover:scale-110"
          >
            <ChevronLeft size={18} />
          </button>

          <div className="flex gap-2">
            {universities.map((_, i) => (
              <button
                key={i}
                onClick={() => go(i)}
                className="transition-all duration-300 rounded-full"
                style={{
                  width: i === activeIdx ? 24 : 8,
                  height: 8,
                  background: i === activeIdx ? active.colors.primary : 'rgba(255,255,255,0.2)',
                }}
              />
            ))}
          </div>

          <button
            onClick={() => go(activeIdx + 1)}
            className="w-10 h-10 rounded-full glass glass-hover flex items-center justify-center transition-all hover:scale-110"
          >
            <ChevronRight size={18} />
          </button>
        </div>
      </div>
    </section>
  );
}
