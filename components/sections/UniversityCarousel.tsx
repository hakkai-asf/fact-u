'use client';
import {
  useRef, useState, useCallback, useEffect, MouseEvent, TouchEvent,
} from 'react';
import { useRouter } from 'next/navigation';
import { ChevronLeft, ChevronRight, ArrowRight, MapPin, Trophy } from 'lucide-react';
import { universities } from '@/lib/universities';

const N = universities.length;
// Campus image fallback colors per university (used as gradient bg until real images added)
const CAMPUS_GRADIENTS: Record<string, string> = {
  up:      'linear-gradient(160deg,#3d0a0b 0%,#7B1113 40%,#1a0505 100%)',
  ateneo:  'linear-gradient(160deg,#001a4d 0%,#003D8F 40%,#000d26 100%)',
  dlsu:    'linear-gradient(160deg,#002a18 0%,#006B3F 40%,#001510 100%)',
  ust:     'linear-gradient(160deg,#3d2e00 0%,#C8A400 40%,#1a1200 100%)',
  nu:      'linear-gradient(160deg,#001433 0%,#003087 40%,#000a1a 100%)',
  feu:     'linear-gradient(160deg,#002e1a 0%,#007A47 40%,#001710 100%)',
  adamson: 'linear-gradient(160deg,#001433 0%,#003DA5 40%,#000a1a 100%)',
  ue:      'linear-gradient(160deg,#330000 0%,#CC0000 40%,#1a0000 100%)',
};

function mod(n: number, m: number) { return ((n % m) + m) % m; }

export default function UniversityCarousel() {
  const router = useRouter();

  // Spring-based position: we track a float "position" that approaches integer "target"
  const [target, setTarget]   = useState(0);
  const posRef                = useRef(0);           // actual animated float position
  const [renderPos, setRPos]  = useState(0);         // drives re-render
  const rafRef                = useRef<number>(0);
  const dragging              = useRef(false);
  const dragStartX            = useRef(0);
  const dragStartPos          = useRef(0);
  const velocity              = useRef(0);
  const lastX                 = useRef(0);
  const lastTime              = useRef(0);
  const autoTimer             = useRef<NodeJS.Timeout>();
  const [isDragging, setIsDragging] = useState(false);

  // Spring animation loop
  useEffect(() => {
    let animTarget = target;
    const loop = (ts: number) => {
      const dt = Math.min(ts - (lastTime.current || ts), 50);
      lastTime.current = ts;

      if (!dragging.current) {
        // Spring toward target with bounce
        const dist   = animTarget - posRef.current;
        const spring = dist * 0.10;            // spring strength
        const damp   = velocity.current * 0.72; // damping
        velocity.current = (velocity.current + spring - damp);
        posRef.current  += velocity.current;

        // Snap when close enough
        if (Math.abs(dist) < 0.001 && Math.abs(velocity.current) < 0.001) {
          posRef.current   = animTarget;
          velocity.current = 0;
        }
      }
      setRPos(posRef.current);
      rafRef.current = requestAnimationFrame(loop);
    };
    rafRef.current = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(rafRef.current);
  }, []);

  // Keep animTarget in sync with target
  const targetRef = useRef(0);
  useEffect(() => { targetRef.current = target; }, [target]);

  // Override spring loop target tracking
  useEffect(() => {
    // patch the loop to read targetRef
  }, []);

  // Simpler approach: keep target as ref too and re-implement
  const springTarget = useRef(0);
  const go = useCallback((idx: number) => {
    const t = mod(idx, N);
    // find shortest path (wrap-aware)
    let diff = t - mod(Math.round(posRef.current), N);
    if (diff >  N / 2) diff -= N;
    if (diff < -N / 2) diff += N;
    springTarget.current = posRef.current + diff;
    setTarget(springTarget.current);
    velocity.current = 0;
  }, []);

  // Better spring loop using springTarget ref
  useEffect(() => {
    cancelAnimationFrame(rafRef.current);
    const loop = () => {
      if (!dragging.current) {
        const dist = springTarget.current - posRef.current;
        velocity.current = velocity.current * 0.75 + dist * 0.10;
        posRef.current  += velocity.current;
        if (Math.abs(dist) < 0.0008 && Math.abs(velocity.current) < 0.0008) {
          posRef.current   = springTarget.current;
          velocity.current = 0;
        }
      }
      setRPos(posRef.current);
      rafRef.current = requestAnimationFrame(loop);
    };
    rafRef.current = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(rafRef.current);
  }, []);

  // Auto-advance
  useEffect(() => {
    autoTimer.current = setInterval(() => {
      if (!isDragging) go(Math.round(posRef.current) + 1);
    }, 4500);
    return () => clearInterval(autoTimer.current);
  }, [go, isDragging]);

  // Drag / swipe handlers
  const startDrag = useCallback((clientX: number) => {
    clearInterval(autoTimer.current);
    dragging.current  = true;
    dragStartX.current  = clientX;
    dragStartPos.current = posRef.current;
    lastX.current       = clientX;
    velocity.current    = 0;
    setIsDragging(true);
  }, []);

  const moveDrag = useCallback((clientX: number) => {
    if (!dragging.current) return;
    const dx = (clientX - dragStartX.current) / 280;
    posRef.current = dragStartPos.current - dx;
    // track velocity
    velocity.current = (lastX.current - clientX) / 280 * 0.6;
    lastX.current    = clientX;
    setRPos(posRef.current);
  }, []);

  const endDrag = useCallback(() => {
    if (!dragging.current) return;
    dragging.current = false;
    setIsDragging(false);
    // snap to nearest with momentum
    const nearest = Math.round(posRef.current + velocity.current * 3);
    springTarget.current = nearest;
    setTarget(nearest);
  }, []);

  // Mouse events
  const onMouseDown = (e: MouseEvent) => startDrag(e.clientX);
  const onMouseMove = (e: MouseEvent) => moveDrag(e.clientX);
  const onMouseUp   = ()               => endDrag();

  // Touch events
  const onTouchStart = (e: TouchEvent) => startDrag(e.touches[0].clientX);
  const onTouchMove  = (e: TouchEvent) => moveDrag(e.touches[0].clientX);
  const onTouchEnd   = ()               => endDrag();

  const activeIdx = mod(Math.round(renderPos), N);
  const u = universities[activeIdx];

  // Visible offsets: -2 to +2
  const offsets = [-2, -1, 0, 1, 2];

  return (
    <section className="relative py-16 sm:py-24 px-4 overflow-hidden">
      {/* Dynamic bg */}
      <div className="absolute inset-0 pointer-events-none transition-all duration-1000"
        style={{ background: `radial-gradient(ellipse 60% 50% at 50% 50%, ${u.colors.primary}18, transparent 70%)` }}
      />

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Header */}
        <div className="text-center mb-12 sm:mb-16">
          <div
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-syne font-semibold tracking-widest uppercase mb-4"
            style={{ background: 'rgba(79,142,247,0.12)', border: '1px solid rgba(79,142,247,0.3)', color: '#93c5fd' }}
          >
            <span className="w-1.5 h-1.5 rounded-full bg-blue-400" style={{ animation: 'dotPulse 2s infinite' }} />
            8 Member Schools
          </div>
          <h2 className="font-syne font-extrabold text-3xl sm:text-4xl md:text-5xl tracking-tight mb-3 text-white">
            Find Your <span className="grad">University</span>
          </h2>
          <p className="text-white/60 text-sm sm:text-base">
            Drag, swipe, or let it scroll — discover every UAAP school up close
          </p>
        </div>

        {/* Active card tagline strip */}
        <div className="flex items-center justify-center gap-3 mb-6 h-7">
          <div
            className="flex items-center gap-2 px-4 py-1 rounded-full text-sm font-semibold transition-all duration-500"
            style={{ background: `${u.colors.primary}22`, border: `1px solid ${u.colors.primary}44`, color: u.colors.primary }}
          >
            <span className="w-1.5 h-1.5 rounded-full" style={{ background: u.colors.primary }} />
            {u.tagline}
          </div>
          <span className="text-white/35 text-xs flex items-center gap-1">
            <MapPin size={11} />{u.location.split(',')[1]?.trim() ?? u.location}
          </span>
        </div>

        {/* 3D Stage */}
        <div
          className="relative flex items-center justify-center select-none"
          style={{ height: 'clamp(340px, 55vw, 500px)', cursor: isDragging ? 'grabbing' : 'grab' }}
          onMouseDown={onMouseDown}
          onMouseMove={onMouseMove}
          onMouseUp={onMouseUp}
          onMouseLeave={onMouseUp}
          onTouchStart={onTouchStart}
          onTouchMove={onTouchMove}
          onTouchEnd={onTouchEnd}
        >
          {offsets.map((offset) => {
            const univIdx = mod(Math.round(renderPos) + offset, N);
            const univ    = universities[univIdx];

            // Fractional offset for smooth in-between states
            const fracOffset = renderPos - Math.round(renderPos);
            const realOffset = offset - fracOffset;
            const dist       = Math.abs(realOffset);

            // Geometry
            const isCenter = offset === 0;
            const maxW     = typeof window !== 'undefined' && window.innerWidth < 640 ? 240 : 300;
            const cardW    = Math.max(120, maxW * (1 - dist * 0.22));
            const cardH    = cardW * 1.38;
            const tx       = realOffset * (maxW * 0.72);
            const tz       = -dist * 60;
            const scale    = 1 - dist * 0.08;
            const opacity  = Math.max(0, 1 - dist * 0.42);
            const blur     = dist > 0.5 ? (dist - 0.5) * 1.8 : 0;
            const ry       = realOffset * -4;

            if (Math.abs(realOffset) > 2.6) return null;

            return (
              <div
                key={`slot-${offset}`}
                onClick={() => {
                  if (!isDragging && Math.abs(realOffset) < 0.3) {
                    router.push(`/universities/${univ.slug}`);
                  } else if (!isDragging) {
                    go(Math.round(renderPos) + offset);
                  }
                }}
                style={{
                  position: 'absolute',
                  width:  cardW,
                  height: cardH,
                  zIndex: Math.round(10 - dist * 3),
                  transform: `translateX(${tx}px) translateZ(${tz}px) rotateY(${ry}deg) scale(${scale})`,
                  opacity,
                  filter: blur > 0 ? `blur(${blur}px)` : 'none',
                  transition: dragging.current ? 'none' : 'none', // spring handles it
                  cursor: Math.abs(realOffset) < 0.4 ? 'pointer' : 'grab',
                  borderRadius: 20,
                  overflow: 'hidden',
                  boxShadow: dist < 0.4
                    ? `0 0 60px ${univ.colors.primary}44, 0 24px 60px rgba(0,0,0,0.65), inset 0 1px 0 rgba(255,255,255,0.12)`
                    : '0 8px 32px rgba(0,0,0,0.4)',
                  border: dist < 0.4
                    ? `1.5px solid ${univ.colors.primary}66`
                    : '1px solid rgba(255,255,255,0.07)',
                  willChange: 'transform, opacity',
                }}
              >
                {/* Campus image / gradient bg */}
                <div className="absolute inset-0" style={{ background: CAMPUS_GRADIENTS[univ.slug] ?? '#0a0a1a' }} />
                {/* Image overlay (shows if real image added) */}
                {univ.campusImage && (
                  <img
                    src={univ.campusImage}
                    alt={univ.name}
                    className="absolute inset-0 w-full h-full object-cover"
                    style={{ opacity: 0.55 }}
                    loading="lazy"
                    onError={e => { (e.currentTarget as HTMLImageElement).style.display = 'none'; }}
                  />
                )}
                {/* Gradient overlays */}
                <div className="absolute inset-0" style={{ background: 'linear-gradient(180deg, rgba(0,0,0,0.1) 0%, rgba(0,0,0,0.15) 40%, rgba(0,0,0,0.82) 100%)' }} />
                <div className="absolute inset-0" style={{ background: 'linear-gradient(135deg, rgba(255,255,255,0.05) 0%, transparent 50%)' }} />

                {/* Rank badge */}
                <div
                  className="absolute top-3 left-3 w-7 h-7 rounded-xl flex items-center justify-center text-xs font-syne font-extrabold"
                  style={{ background: univ.colors.primary, boxShadow: `0 0 12px ${univ.colors.primary}88` }}
                >
                  {universities.indexOf(univ) + 1}
                </div>

                {/* Short name top-right */}
                <div
                  className="absolute top-3 right-3 px-2.5 py-1 rounded-lg text-xs font-syne font-bold"
                  style={{ background: 'rgba(0,0,0,0.55)', border: '1px solid rgba(255,255,255,0.15)', color: '#fff', backdropFilter: 'blur(8px)' }}
                >
                  {univ.shortName}
                </div>

                {/* Bottom content */}
                <div className="absolute bottom-0 left-0 right-0 p-4">
                  {/* University name */}
                  <div className="font-syne font-extrabold text-white leading-tight mb-1"
                    style={{ fontSize: cardW < 220 ? '0.8rem' : '1rem' }}>
                    {univ.name}
                  </div>
                  <div className="text-white/50 text-xs mb-3" style={{ display: cardW < 220 ? 'none' : 'flex', alignItems: 'center', gap: 4 }}>
                    Est. {univ.founded}
                  </div>

                  {/* Show more on active card */}
                  {dist < 0.35 && (
                    <>
                      <p className="text-white/70 text-xs leading-relaxed mb-3 line-clamp-2">
                        {univ.description.slice(0, 90)}…
                      </p>
                      {/* Stats row */}
                      <div className="flex gap-3 mb-3">
                        {univ.highlights.slice(0, 3).map(h => (
                          <div key={h.label} className="text-center">
                            <div className="font-syne font-extrabold text-sm text-white">{h.value}</div>
                            <div className="text-white/40 text-[10px]">{h.label}</div>
                          </div>
                        ))}
                      </div>
                      {/* Tag pills */}
                      <div className="flex flex-wrap gap-1 mb-3">
                        {univ.academics.topPrograms.slice(0, 3).map(p => (
                          <span key={p.name} className="px-2 py-0.5 rounded-md text-[10px] font-medium"
                            style={{ background: `${univ.colors.primary}28`, color: univ.colors.primary, border: `1px solid ${univ.colors.primary}44` }}>
                            {p.name.split(' ')[0]}
                          </span>
                        ))}
                      </div>
                      {/* CTA */}
                      <button
                        className="w-full py-2.5 rounded-xl font-syne font-bold text-xs text-white flex items-center justify-center gap-1.5 transition-all"
                        style={{
                          background: `linear-gradient(135deg,${univ.colors.primary},${univ.colors.secondary})`,
                          boxShadow: `0 0 20px ${univ.colors.primary}55`,
                        }}
                        onClick={e => { e.stopPropagation(); router.push(`/universities/${univ.slug}`); }}
                      >
                        Explore {univ.shortName} <ArrowRight size={12} />
                      </button>
                    </>
                  )}

                  {/* Side card minimal info */}
                  {dist >= 0.35 && dist < 1.6 && cardW >= 180 && (
                    <div className="text-white/60 text-xs flex items-center gap-1 mt-1">
                      <Trophy size={10} style={{ color: univ.colors.primary }} />
                      {univ.sports.totalTitles}+ titles
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>

        {/* Controls */}
        <div className="flex items-center justify-center gap-4 mt-8">
          <button
            onClick={() => go(Math.round(posRef.current) - 1)}
            className="w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300 hover:scale-110"
            style={{ background: 'rgba(255,255,255,0.07)', border: '1px solid rgba(255,255,255,0.12)' }}
            aria-label="Previous"
          >
            <ChevronLeft size={18} className="text-white/70" />
          </button>

          {/* Dot indicators */}
          <div className="flex items-center gap-2">
            <span className="text-white/35 text-xs font-syne mr-1">{activeIdx + 1} / {N}</span>
            {universities.map((_, i) => (
              <button
                key={i}
                onClick={() => go(i)}
                className="rounded-full transition-all duration-500"
                style={{
                  width:  i === activeIdx ? 20 : 6,
                  height: 6,
                  background: i === activeIdx ? u.colors.primary : 'rgba(255,255,255,0.18)',
                  boxShadow: i === activeIdx ? `0 0 8px ${u.colors.primary}` : 'none',
                }}
                aria-label={`Go to ${universities[i].shortName}`}
              />
            ))}
          </div>

          <button
            onClick={() => go(Math.round(posRef.current) + 1)}
            className="w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300 hover:scale-110"
            style={{ background: 'rgba(255,255,255,0.07)', border: '1px solid rgba(255,255,255,0.12)' }}
            aria-label="Next"
          >
            <ChevronRight size={18} className="text-white/70" />
          </button>
        </div>
      </div>
    </section>
  );
}
