'use client';
import { useRef, useState, useCallback, useEffect, MouseEvent, TouchEvent } from 'react';
import { useRouter } from 'next/navigation';
import { ChevronLeft, ChevronRight, ArrowRight, Trophy, Volume2, VolumeX } from 'lucide-react';
import { universities } from '@/lib/universities';

const N = universities.length;
function mod(n: number, m: number) { return ((n % m) + m) % m; }

const CAMPUS_GRADIENTS: Record<string,string> = {
  up:      'linear-gradient(160deg,#2a0405 0%,#7B1113 55%,#0f0202 100%)',
  ateneo:  'linear-gradient(160deg,#000f33 0%,#003D8F 55%,#000515 100%)',
  dlsu:    'linear-gradient(160deg,#001208 0%,#006B3F 55%,#000a04 100%)',
  ust:     'linear-gradient(160deg,#1a1200 0%,#C8A400 55%,#0d0900 100%)',
  nu:      'linear-gradient(160deg,#000820 0%,#003087 55%,#000410 100%)',
  feu:     'linear-gradient(160deg,#001208 0%,#007A47 55%,#000a04 100%)',
  adamson: 'linear-gradient(160deg,#000820 0%,#003DA5 55%,#000410 100%)',
  ue:      'linear-gradient(160deg,#1a0000 0%,#CC0000 55%,#0a0000 100%)',
};

export default function UniversityCarousel() {
  const router = useRouter();

  // Spring physics
  const springTarget = useRef(0);
  const posRef       = useRef(0);
  const velRef       = useRef(0);
  const rafRef       = useRef(0);
  const [renderPos,  setRPos]     = useState(0);
  const [isDragging, setDragging] = useState(false);
  const dragging     = useRef(false);
  const dragStartX   = useRef(0);
  const dragStartPos = useRef(0);
  const lastX        = useRef(0);
  const velDrag      = useRef(0);

  // Audio
  const audioRef    = useRef<HTMLAudioElement | null>(null);
  const [muted,     setMuted]     = useState(false);
  const [canPlay,   setCanPlay]   = useState(false);
  const lastPlayed  = useRef(-1);

  const playChant = useCallback((idx: number) => {
    if (muted || idx === lastPlayed.current) return;
    lastPlayed.current = idx;
    const u = universities[mod(idx, N)];
    if (!u.chantUrl) return;
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
    }
    const audio = new Audio(u.chantUrl);
    audio.volume = 0.42;
    audio.play().catch(() => {}); // user may not have interacted yet
    audioRef.current = audio;
    // Auto stop after 6s
    setTimeout(() => { if (audioRef.current === audio) { audio.pause(); } }, 6000);
  }, [muted]);

  // Spring loop
  useEffect(() => {
    const loop = () => {
      if (!dragging.current) {
        const dist = springTarget.current - posRef.current;
        // Softer spring: strength 0.07, damping 0.78 → less bouncy, slower
        velRef.current = velRef.current * 0.78 + dist * 0.07;
        posRef.current += velRef.current;
        if (Math.abs(dist) < 0.0008 && Math.abs(velRef.current) < 0.0008) {
          posRef.current   = springTarget.current;
          velRef.current   = 0;
        }
      }
      setRPos(posRef.current);
      rafRef.current = requestAnimationFrame(loop);
    };
    rafRef.current = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(rafRef.current);
  }, []);

  const go = useCallback((idx: number) => {
    const t    = mod(idx, N);
    let   diff = t - mod(Math.round(posRef.current), N);
    if (diff >  N / 2) diff -= N;
    if (diff < -N / 2) diff += N;
    springTarget.current = posRef.current + diff;
    velRef.current = 0;
    const snapIdx = mod(Math.round(posRef.current + diff), N);
    playChant(snapIdx);
  }, [playChant]);

  // Drag
  const startDrag = useCallback((cx: number) => {
    dragging.current    = true;
    dragStartX.current  = cx;
    dragStartPos.current = posRef.current;
    lastX.current       = cx;
    velDrag.current     = 0;
    velRef.current      = 0;
    setDragging(true);
  }, []);
  const moveDrag = useCallback((cx: number) => {
    if (!dragging.current) return;
    const dx = (cx - dragStartX.current) / 300;
    posRef.current   = dragStartPos.current - dx;
    velDrag.current  = (lastX.current - cx) / 300 * 0.5;
    lastX.current    = cx;
    setRPos(posRef.current);
  }, []);
  const endDrag = useCallback(() => {
    if (!dragging.current) return;
    dragging.current = false;
    setDragging(false);
    const nearest = Math.round(posRef.current + velDrag.current * 2.5);
    springTarget.current = nearest;
    velRef.current       = velDrag.current * 0.4;
    const snapIdx = mod(nearest, N);
    playChant(snapIdx);
  }, [playChant]);

  const onMouseDown  = (e: MouseEvent) => { setCanPlay(true); startDrag(e.clientX); };
  const onMouseMove  = (e: MouseEvent) => moveDrag(e.clientX);
  const onMouseUp    = ()               => endDrag();
  const onTouchStart = (e: TouchEvent) => { setCanPlay(true); startDrag(e.touches[0].clientX); };
  const onTouchMove  = (e: TouchEvent) => moveDrag(e.touches[0].clientX);
  const onTouchEnd   = ()               => endDrag();

  const activeIdx = mod(Math.round(renderPos), N);
  const u         = universities[activeIdx];

  return (
    <section className="relative py-14 sm:py-20 px-4 overflow-hidden">
      {/* Dynamic nebula accent */}
      <div className="absolute inset-0 pointer-events-none transition-all duration-1200"
        style={{ background: `radial-gradient(ellipse 55% 45% at 50% 50%, ${u.colors.primary}18, transparent 70%)` }}
      />

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Header */}
        <div className="text-center mb-10 sm:mb-14">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass-bright text-xs font-syne font-semibold tracking-widest uppercase mb-4"
            style={{ border: '1px solid rgba(79,142,247,0.28)', color: '#93c5fd' }}>
            <span className="w-1.5 h-1.5 rounded-full bg-blue-400 dot-pulse" />
            8 Member Schools
          </div>
          <h2 className="font-syne font-extrabold text-3xl sm:text-4xl md:text-5xl tracking-tight mb-2" style={{ color: '#e8eeff' }}>
            Find Your <span className="grad">University</span>
          </h2>
          <p className="text-sm sm:text-base" style={{ color: 'rgba(220,228,255,0.55)' }}>
            Drag, swipe, or tap arrows to browse. Click the active card to explore.
          </p>
        </div>

        {/* Active school tagline */}
        <div className="flex items-center justify-center gap-3 mb-5 h-7">
          <div className="flex items-center gap-2 px-4 py-1 rounded-full text-sm font-semibold transition-all duration-500"
            style={{ background: `${u.colors.primary}20`, border: `1px solid ${u.colors.primary}40`, color: u.colors.primary }}>
            {u.name}
          </div>
          {/* Mute toggle */}
          {canPlay && (
            <button onClick={() => setMuted(m => !m)}
              className="flex items-center gap-1.5 px-3 py-1 rounded-full text-xs transition-all glass"
              style={{ border: '1px solid rgba(255,255,255,0.1)', color: 'rgba(220,228,255,0.45)' }}>
              {muted ? <VolumeX size={12} /> : <Volume2 size={12} />}
              {muted ? 'Unmute' : 'Mute'}
            </button>
          )}
        </div>

        {/* 3D Stage */}
        <div
          className="relative flex items-center justify-center select-none"
          style={{ height: 'clamp(320px,52vw,480px)', cursor: isDragging ? 'grabbing' : 'grab' }}
          onMouseDown={onMouseDown} onMouseMove={onMouseMove}
          onMouseUp={onMouseUp}    onMouseLeave={onMouseUp}
          onTouchStart={onTouchStart} onTouchMove={onTouchMove} onTouchEnd={onTouchEnd}
        >
          {[-2, -1, 0, 1, 2].map(offset => {
            const univIdx  = mod(Math.round(renderPos) + offset, N);
            const univ     = universities[univIdx];
            const frac     = renderPos - Math.round(renderPos);
            const realOff  = offset - frac;
            const dist     = Math.abs(realOff);
            const isCenter = dist < 0.35;

            const W   = typeof window !== 'undefined' && window.innerWidth < 640 ? 230 : 290;
            const cardW = Math.max(110, W * (1 - dist * 0.2));
            const cardH = cardW * 1.42;
            const tx    = realOff * W * 0.74;
            const tz    = -dist * 55;
            const scale = 1 - dist * 0.075;
            const opacity = Math.max(0, 1 - dist * 0.40);
            const blur    = dist > 0.6 ? (dist - 0.6) * 1.6 : 0;
            const ry      = realOff * -4;

            if (dist > 2.6) return null;

            return (
              <div
                key={`slot-${offset}`}
                onClick={() => {
                  setCanPlay(true);
                  if (!isDragging && isCenter) router.push(`/universities/${univ.slug}`);
                  else if (!isDragging) go(Math.round(renderPos) + offset);
                }}
                style={{
                  position: 'absolute',
                  width:  cardW, height: cardH,
                  zIndex: Math.round(10 - dist * 3),
                  transform: `translateX(${tx}px) translateZ(${tz}px) rotateY(${ry}deg) scale(${scale})`,
                  opacity,
                  filter: blur > 0 ? `blur(${blur}px)` : 'none',
                  cursor: isCenter ? 'pointer' : 'grab',
                  borderRadius: 20,
                  overflow: 'hidden',
                  boxShadow: isCenter
                    ? `0 0 55px ${univ.colors.primary}40, 0 20px 55px rgba(0,0,0,0.65), inset 0 1px 0 rgba(255,255,255,0.12)`
                    : '0 6px 28px rgba(0,0,0,0.45)',
                  border: isCenter
                    ? `1.5px solid ${univ.colors.primary}60`
                    : '1px solid rgba(255,255,255,0.07)',
                  willChange: 'transform, opacity',
                }}
              >
                {/* Campus gradient fallback */}
                <div className="absolute inset-0" style={{ background: CAMPUS_GRADIENTS[univ.slug] ?? '#0a0a1a' }} />
                {/* Real campus image */}
                <img
                  src={univ.campusImage}
                  alt={`${univ.name} campus`}
                  className="absolute inset-0 w-full h-full object-cover"
                  style={{ opacity: 0.60 }}
                  loading="lazy"
                  onError={e => { (e.currentTarget as HTMLImageElement).style.opacity = '0'; }}
                />
                {/* Gradient overlays */}
                <div className="absolute inset-0" style={{ background: 'linear-gradient(180deg,rgba(0,0,0,0.08) 0%,rgba(0,0,0,0.18) 35%,rgba(0,0,0,0.85) 100%)' }} />
                <div className="absolute inset-0" style={{ background: 'linear-gradient(135deg,rgba(255,255,255,0.04) 0%,transparent 50%)' }} />

                {/* Nebula overlay matching school color */}
                {isCenter && (
                  <div className="absolute inset-0 pointer-events-none"
                    style={{ background: `radial-gradient(ellipse at 50% 30%,${univ.colors.primary}22,transparent 70%)` }} />
                )}

                {/* Rank badge */}
                <div className="absolute top-3 left-3 w-7 h-7 rounded-xl flex items-center justify-center text-xs font-syne font-extrabold"
                  style={{ background: univ.colors.primary, color: '#fff', boxShadow: `0 0 10px ${univ.colors.primary}88` }}>
                  {univIdx + 1}
                </div>

                {/* University logo */}
                <div className="absolute top-3 right-3">
                  <img
                    src={univ.logo}
                    alt={`${univ.shortName} logo`}
                    className="rounded-lg object-contain"
                    style={{ width: isCenter ? 40 : 28, height: isCenter ? 40 : 28, background: 'rgba(0,0,0,0.5)', padding: 3, border: '1px solid rgba(255,255,255,0.15)' }}
                    onError={e => {
                      (e.currentTarget as HTMLImageElement).style.display = 'none';
                      const fb = (e.currentTarget as HTMLImageElement).nextElementSibling as HTMLElement;
                      if (fb) fb.style.display = 'flex';
                    }}
                  />
                  {/* Fallback text badge */}
                  <div className="rounded-lg items-center justify-center font-syne font-extrabold"
                    style={{ display: 'none', width: isCenter ? 40 : 28, height: isCenter ? 40 : 28,
                      background: `${univ.colors.primary}cc`, color: '#fff', fontSize: isCenter ? 10 : 8,
                      border: '1px solid rgba(255,255,255,0.15)', padding: 3 }}>
                    {univ.shortName.slice(0,2)}
                  </div>
                </div>

                {/* Bottom content */}
                <div className="absolute bottom-0 left-0 right-0 p-4">
                  <div className="font-syne font-extrabold leading-tight mb-0.5" style={{ color: '#e8eeff', fontSize: cardW < 210 ? '0.75rem' : '0.95rem' }}>
                    {univ.name}
                  </div>
                  <div className="text-xs mb-2" style={{ color: 'rgba(220,228,255,0.45)', display: cardW < 210 ? 'none' : 'block' }}>
                    Est. {univ.founded}
                  </div>

                  {isCenter && (
                    <>
                      <p className="text-xs leading-relaxed mb-3" style={{ color: 'rgba(220,228,255,0.65)' }}>
                        {univ.description.slice(0, 88)}…
                      </p>
                      <div className="flex gap-3 mb-3">
                        {univ.highlights.slice(0, 3).map(h => (
                          <div key={h.label} className="text-center">
                            <div className="font-syne font-extrabold text-sm" style={{ color: '#e8eeff' }}>{h.value}</div>
                            <div style={{ fontSize: '10px', color: 'rgba(220,228,255,0.40)' }}>{h.label}</div>
                          </div>
                        ))}
                      </div>
                      <div className="flex flex-wrap gap-1 mb-3">
                        {univ.academics.topPrograms.slice(0, 3).map(p => (
                          <span key={p.name} className="px-2 py-0.5 rounded-md text-[10px] font-medium"
                            style={{ background: `${univ.colors.primary}28`, color: univ.colors.primary, border: `1px solid ${univ.colors.primary}40` }}>
                            {p.name.split(' ')[0]}
                          </span>
                        ))}
                      </div>
                      <button
                        className="w-full py-2.5 rounded-xl font-syne font-bold text-xs text-white flex items-center justify-center gap-1.5 transition-all"
                        style={{
                          background: `linear-gradient(135deg,${univ.colors.primary},${univ.colors.secondary})`,
                          boxShadow: `0 0 16px ${univ.colors.primary}44`,
                        }}
                        onClick={e => { e.stopPropagation(); router.push(`/universities/${univ.slug}`); }}
                      >
                        Explore {univ.shortName} <ArrowRight size={11} />
                      </button>
                    </>
                  )}

                  {!isCenter && dist < 1.5 && cardW >= 170 && (
                    <div className="flex items-center gap-1 text-[10px]" style={{ color: 'rgba(220,228,255,0.45)' }}>
                      <Trophy size={9} style={{ color: univ.colors.primary }} />
                      {univ.sports.totalTitles}+ titles
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>

        {/* Controls */}
        <div className="flex items-center justify-center gap-4 mt-7">
          <button onClick={() => { setCanPlay(true); go(Math.round(posRef.current) - 1); }}
            className="w-10 h-10 rounded-full flex items-center justify-center transition-all hover:scale-110 glass"
            style={{ border: '1px solid rgba(255,255,255,0.12)' }} aria-label="Previous">
            <ChevronLeft size={18} style={{ color: 'rgba(220,228,255,0.70)' }} />
          </button>

          <div className="flex items-center gap-2">
            <span className="text-xs font-syne mr-1" style={{ color: 'rgba(220,228,255,0.32)' }}>{activeIdx + 1} / {N}</span>
            {universities.map((_, i) => (
              <button key={i} onClick={() => { setCanPlay(true); go(i); }}
                className="rounded-full transition-all duration-400"
                style={{
                  width:  i === activeIdx ? 20 : 6,
                  height: 6,
                  background: i === activeIdx ? u.colors.primary : 'rgba(255,255,255,0.18)',
                  boxShadow:  i === activeIdx ? `0 0 8px ${u.colors.primary}` : 'none',
                }}
                aria-label={`Go to ${universities[i].shortName}`}
              />
            ))}
          </div>

          <button onClick={() => { setCanPlay(true); go(Math.round(posRef.current) + 1); }}
            className="w-10 h-10 rounded-full flex items-center justify-center transition-all hover:scale-110 glass"
            style={{ border: '1px solid rgba(255,255,255,0.12)' }} aria-label="Next">
            <ChevronRight size={18} style={{ color: 'rgba(220,228,255,0.70)' }} />
          </button>
        </div>
      </div>
    </section>
  );
}
