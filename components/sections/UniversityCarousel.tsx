'use client';
import { useRef, useState, useCallback, useEffect, MouseEvent } from 'react';
import { useRouter } from 'next/navigation';
import { ChevronLeft, ChevronRight, ArrowRight } from 'lucide-react';
import { universities } from '@/lib/universities';

const N = universities.length;

export default function UniversityCarousel() {
  const router = useRouter();
  const [active, setActive]     = useState(0);
  const [dragging, setDragging] = useState(false);
  const [tilt, setTilt]         = useState({ x: 0, y: 0 });
  const startX    = useRef(0);
  const startIdx  = useRef(0);
  const autoTimer = useRef<NodeJS.Timeout>();
  const sectionRef = useRef<HTMLElement>(null);
  const [bgVisible, setBgVisible] = useState(false);

  const go = useCallback((idx: number) => setActive(((idx % N) + N) % N), []);

  useEffect(() => {
    autoTimer.current = setInterval(() => { if (!dragging) go(active + 1); }, 4500);
    return () => clearInterval(autoTimer.current);
  }, [active, dragging, go]);

  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => setBgVisible(e.isIntersecting), { threshold: 0.2 });
    if (sectionRef.current) obs.observe(sectionRef.current);
    return () => obs.disconnect();
  }, []);

  const onMouseDown = (e: MouseEvent) => { setDragging(true); startX.current = e.pageX; startIdx.current = active; };
  const onMouseMove = (e: MouseEvent) => {
    if (!dragging) return;
    if (Math.abs(e.pageX - startX.current) > 55) {
      go(startIdx.current + (e.pageX < startX.current ? 1 : -1));
      setDragging(false);
    }
  };

  const onCardMouseMove = (e: MouseEvent<HTMLDivElement>, isActive: boolean) => {
    if (!isActive) return;
    const rect = (e.currentTarget as HTMLDivElement).getBoundingClientRect();
    setTilt({
      x: ((e.clientX - rect.left) / rect.width  - 0.5) * 20,
      y: ((e.clientY - rect.top)  / rect.height - 0.5) * 20,
    });
  };
  const onCardLeave = () => setTilt({ x: 0, y: 0 });

  const u = universities[active];

  return (
    <section ref={sectionRef} className="relative py-28 px-4 overflow-hidden">
      {/* Dynamic color bg bleed */}
      <div className="absolute inset-0 pointer-events-none"
        style={{
          background: bgVisible ? `radial-gradient(ellipse 70% 50% at 50% 50%, ${u.colors.primary}1a, transparent 70%)` : 'transparent',
          transition: 'background 1.4s cubic-bezier(0.16,1,0.3,1)',
        }}
      />

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Header */}
        <div className="text-center mb-20">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass-bright text-xs font-syne font-600 tracking-widest uppercase mb-5"
            style={{ border: '1px solid rgba(79,142,247,0.3)', color: '#93c5fd', boxShadow: '0 0 20px rgba(79,142,247,0.1)' }}>
            <span className="w-1.5 h-1.5 rounded-full bg-blue-400 dot-pulse" />
            8 Member Schools
          </div>
          <h2 className="font-syne font-800 text-5xl md:text-6xl tracking-tight mb-3">
            Explore <span className="grad">Universities</span>
          </h2>
          <p className="text-white/35 text-lg">Drag or swipe to browse. Click the active card to dive in.</p>
        </div>

        {/* 3D Stage */}
        <div className="relative flex items-center justify-center select-none"
          style={{ height: 480, perspective: '1200px', perspectiveOrigin: '50% 40%' }}
          onMouseDown={onMouseDown}
          onMouseMove={onMouseMove}
          onMouseUp={() => setDragging(false)}
          onMouseLeave={() => setDragging(false)}>

          {[-2, -1, 0, 1, 2].map(offset => {
            const univ  = universities[((active + offset) % N + N) % N];
            const isAct = offset === 0;
            const dist  = Math.abs(offset);

            const scale  = isAct ? 1 : dist === 1 ? 0.78 : 0.62;
            const tx     = offset * (isAct ? 0 : offset < 0 ? -310 : 310);
            const tz     = isAct ? 60 : dist === 1 ? -20 : -80;
            const ry     = offset * -8;
            const op     = isAct ? 1 : dist === 1 ? 0.55 : 0.22;
            const blur   = isAct ? 0 : dist * 1.5;

            return (
              <div key={`${univ.slug}-${offset}`}
                className="absolute rounded-3xl overflow-hidden"
                onMouseMove={e => onCardMouseMove(e, isAct)}
                onMouseLeave={onCardLeave}
                onClick={() => { if (isAct) router.push(`/universities/${univ.slug}`); else go(active + offset); }}
                style={{
                  width:  isAct ? 360 : dist === 1 ? 268 : 210,
                  height: isAct ? 460 : dist === 1 ? 340 : 260,
                  zIndex: 5 - dist,
                  cursor: 'none',
                  transform: `translateX(${tx}px) translateZ(${tz}px) rotateY(${ry}deg) scale(${scale}) ${isAct ? `rotateY(${tilt.x * 0.5}deg) rotateX(${-tilt.y * 0.5}deg)` : ''}`,
                  opacity: op,
                  filter: blur > 0 ? `blur(${blur}px)` : 'none',
                  background: `linear-gradient(155deg, ${univ.colors.primary}dd 0%, ${univ.colors.secondary}aa 60%, rgba(3,5,13,0.9) 100%)`,
                  border: isAct
                    ? `1px solid ${univ.colors.primary}66`
                    : '1px solid rgba(255,255,255,0.07)',
                  boxShadow: isAct
                    ? `0 0 80px ${univ.colors.primary}55, 0 30px 80px rgba(0,0,0,0.6), inset 0 1px 0 rgba(255,255,255,0.15)`
                    : '0 10px 40px rgba(0,0,0,0.4)',
                  transition: 'all 0.65s cubic-bezier(0.34,1.2,0.64,1)',
                  willChange: 'transform, opacity',
                }}>

                {/* Glass overlay */}
                <div className="absolute inset-0"
                  style={{ background: 'linear-gradient(160deg,rgba(255,255,255,0.08) 0%,transparent 50%,rgba(0,0,0,0.3) 100%)' }} />

                {/* Grid texture */}
                <div className="absolute inset-0 grid-overlay opacity-30" />

                {/* Glow sphere behind logo */}
                {isAct && (
                  <div className="absolute top-12 left-1/2 -translate-x-1/2 rounded-full"
                    style={{ width: 120, height: 120, background: `radial-gradient(circle,${univ.colors.primary}55,transparent)`, filter: 'blur(30px)' }} />
                )}

                {/* Content */}
                <div className="relative h-full flex flex-col items-center justify-center p-7 text-center gap-4">
                  {/* Logo */}
                  <div
                    className="rounded-2xl flex items-center justify-center font-syne font-800"
                    style={{
                      width: isAct ? 80 : 52,
                      height: isAct ? 80 : 52,
                      fontSize: isAct ? '1.4rem' : '0.85rem',
                      background: 'rgba(255,255,255,0.1)',
                      border: '1.5px solid rgba(255,255,255,0.22)',
                      boxShadow: isAct ? `0 0 40px ${univ.colors.primary}88, inset 0 1px 0 rgba(255,255,255,0.3)` : 'none',
                      transform: isAct ? 'translateZ(20px) translateY(-6px)' : 'none',
                      transition: 'all 0.65s cubic-bezier(0.34,1.2,0.64,1)',
                      backdropFilter: 'blur(10px)',
                    }}>
                    {univ.shortName.slice(0, 2)}
                  </div>

                  <div style={{ transform: isAct ? 'translateZ(10px)' : 'none', transition: 'transform 0.5s' }}>
                    <div className="font-syne font-800 text-white leading-tight"
                      style={{ fontSize: isAct ? '1.15rem' : '0.8rem' }}>
                      {isAct ? univ.name : univ.shortName}
                    </div>
                    {isAct && <div className="text-white/50 text-sm mt-1 italic">"{univ.tagline}"</div>}
                  </div>

                  {isAct && (
                    <div className="space-y-3 w-full">
                      <p className="text-white/55 text-xs leading-relaxed">
                        {univ.description.slice(0, 100)}…
                      </p>
                      {/* Badges */}
                      <div className="flex flex-wrap justify-center gap-1.5">
                        <span className="px-2.5 py-1 rounded-full text-[11px] font-semibold"
                          style={{ background: 'rgba(251,191,36,0.15)', color: '#fcd34d', border: '1px solid rgba(251,191,36,0.25)' }}>
                          🏆 {univ.sports.totalTitles}+ titles
                        </span>
                        <span className="px-2.5 py-1 rounded-full text-[11px] font-semibold"
                          style={{ background: 'rgba(79,142,247,0.15)', color: '#93c5fd', border: '1px solid rgba(79,142,247,0.25)' }}>
                          📚 {univ.type === 'public' ? 'State Univ' : 'Private'}
                        </span>
                        <span className="px-2.5 py-1 rounded-full text-[11px] font-semibold"
                          style={{ background: 'rgba(52,211,153,0.12)', color: '#6ee7b7', border: '1px solid rgba(52,211,153,0.2)' }}>
                          ⚡ {univ.sports.dominantSport}
                        </span>
                      </div>
                      <button className="flex items-center gap-1.5 mx-auto px-4 py-2 rounded-full text-xs font-semibold transition-all hover:scale-105 btn-magnetic"
                        style={{ background: 'rgba(255,255,255,0.1)', border: '1px solid rgba(255,255,255,0.2)' }}>
                        View Full Profile <ArrowRight size={11} />
                      </button>
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>

        {/* Controls */}
        <div className="flex items-center justify-center gap-5 mt-10">
          <button onClick={() => go(active - 1)}
            className="w-11 h-11 rounded-full glass-md flex items-center justify-center transition-all duration-300 hover:scale-110 hover:border-blue-500/50 btn-magnetic"
            style={{ border: '1px solid rgba(255,255,255,0.1)' }}>
            <ChevronLeft size={18} />
          </button>

          <div className="flex gap-2 items-center">
            {universities.map((_, i) => (
              <button key={i} onClick={() => go(i)}
                className="rounded-full transition-all duration-500"
                style={{
                  width:  i === active ? 28 : 6,
                  height: 6,
                  background: i === active ? u.colors.primary : 'rgba(255,255,255,0.15)',
                  boxShadow: i === active ? `0 0 10px ${u.colors.primary}88` : 'none',
                }}
              />
            ))}
          </div>

          <button onClick={() => go(active + 1)}
            className="w-11 h-11 rounded-full glass-md flex items-center justify-center transition-all duration-300 hover:scale-110 hover:border-blue-500/50 btn-magnetic"
            style={{ border: '1px solid rgba(255,255,255,0.1)' }}>
            <ChevronRight size={18} />
          </button>
        </div>

        {/* Active univ info strip */}
        <div className="text-center mt-8">
          <div className="text-xs text-white/30 tracking-widest uppercase font-syne">Now viewing</div>
          <div className="font-syne font-700 text-lg mt-1" style={{ color: u.colors.primary }}>
            {u.name}
          </div>
        </div>
      </div>
    </section>
  );
}
