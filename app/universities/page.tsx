'use client';
import { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import { universities } from '@/lib/universities';
import AnimatedBackground from '@/components/ui/AnimatedBackground';
import { Search, Trophy, GraduationCap, MapPin, ArrowRight, Filter } from 'lucide-react';

export default function UniversitiesPage() {
  const [q, setQ]         = useState('');
  const [filter, setFilter] = useState<'all'|'public'|'private'>('all');
  const [hoveredSlug, setHoveredSlug] = useState<string|null>(null);
  const [revealed, setRevealed] = useState<Set<number>>(new Set());
  const cardRefs = useRef<(HTMLAnchorElement|null)[]>([]);

  const filtered = universities.filter(u => {
    const mq = u.name.toLowerCase().includes(q.toLowerCase()) || u.shortName.toLowerCase().includes(q.toLowerCase());
    const mf = filter === 'all' || u.type === filter;
    return mq && mf;
  });

  // Scroll reveal
  useEffect(() => {
    const obs = new IntersectionObserver(entries => {
      entries.forEach(e => {
        const idx = cardRefs.current.indexOf(e.target as HTMLAnchorElement);
        if (e.isIntersecting && idx >= 0) setRevealed(prev => { const s = new Set(Array.from(prev)); s.add(idx); return s; });
      });
    }, { threshold: 0.1 });
    cardRefs.current.forEach(r => r && obs.observe(r));
    return () => obs.disconnect();
  }, [filtered.length]);

  const hovered = hoveredSlug ? universities.find(u => u.slug === hoveredSlug) : null;

  return (
    <main className="min-h-screen pt-24 pb-24 px-6">
      <AnimatedBackground
        primaryColor={hovered?.colors.primary ?? '#1e3a5f'}
        secondaryColor={hovered?.colors.secondary ?? '#312e81'}
        intensity={0.3}
      />

      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16 pt-8">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass-bright text-xs font-syne font-600 tracking-widest uppercase mb-5"
            style={{ border: '1px solid rgba(79,142,247,0.3)', color: '#93c5fd' }}>
            <GraduationCap size={11} /> All Member Universities
          </div>
          <h1 className="font-syne font-800 leading-tight tracking-tight mb-4"
            style={{ fontSize: 'clamp(3rem,7vw,6rem)' }}>
            UAAP <span className="grad">Universities</span>
          </h1>
          <p className="text-white/35 text-lg max-w-md mx-auto">
            Explore all 8 member schools — history, academics, sports, and culture.
          </p>
        </div>

        {/* Search + filter */}
        <div className="flex flex-col sm:flex-row gap-3 mb-14 max-w-2xl mx-auto">
          <div className="relative flex-1">
            <Search size={15} className="absolute left-4 top-1/2 -translate-y-1/2 text-white/25" />
            <input value={q} onChange={e => setQ(e.target.value)}
              placeholder="Search university…"
              className="w-full pl-10 pr-4 py-3 rounded-2xl glass text-sm text-white placeholder-white/25 outline-none transition-all focus:border-blue-500/50"
              style={{ border: '1px solid rgba(255,255,255,0.1)' }}
            />
          </div>
          <div className="flex gap-2">
            {(['all','public','private'] as const).map(f => (
              <button key={f} onClick={() => setFilter(f)}
                className="px-4 py-2 rounded-xl text-xs font-syne font-600 uppercase tracking-wider transition-all btn-magnetic"
                style={filter === f
                  ? { background:'rgba(79,142,247,0.18)', border:'1px solid rgba(79,142,247,0.45)', color:'#93c5fd' }
                  : { background:'rgba(255,255,255,0.04)', border:'1px solid rgba(255,255,255,0.08)', color:'rgba(255,255,255,0.4)' }
                }>{f}</button>
            ))}
          </div>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
          {filtered.map((u, i) => (
            <Link key={u.slug} href={`/universities/${u.slug}`}
              ref={el => { cardRefs.current[i] = el; }}
              onMouseEnter={() => setHoveredSlug(u.slug)}
              onMouseLeave={() => setHoveredSlug(null)}
              className="glass rounded-3xl overflow-hidden group transition-all duration-500 hover:scale-[1.04] hover:-translate-y-2 neon-border"
              style={{
                border: `1px solid ${u.colors.primary}28`,
                boxShadow: hoveredSlug === u.slug ? `0 0 50px ${u.colors.primary}33, 0 20px 60px rgba(0,0,0,0.4)` : '',
                opacity: revealed.has(i) ? 1 : 0,
                transform: revealed.has(i) ? 'translateY(0)' : 'translateY(30px)',
                transition: `opacity 0.6s cubic-bezier(0.16,1,0.3,1) ${i * 0.07}s, transform 0.6s cubic-bezier(0.16,1,0.3,1) ${i * 0.07}s, box-shadow 0.4s`,
              }}>
              {/* Top gradient bar */}
              <div className="h-1" style={{ background: `linear-gradient(90deg,${u.colors.primary},${u.colors.secondary})` }} />

              {/* Glow on hover */}
              <div className="absolute inset-0 rounded-3xl pointer-events-none transition-opacity duration-500 opacity-0 group-hover:opacity-100"
                style={{ background: `radial-gradient(ellipse at top,${u.colors.primary}10,transparent 70%)` }} />

              <div className="relative p-6">
                <div className="flex items-start justify-between mb-5">
                  <div className="w-14 h-14 rounded-2xl flex items-center justify-center font-syne font-800 text-base transition-all duration-400 group-hover:scale-110 group-hover:shadow-lg"
                    style={{
                      background: `${u.colors.primary}25`,
                      color: u.colors.primary,
                      border: `1px solid ${u.colors.primary}45`,
                      boxShadow: hoveredSlug === u.slug ? `0 0 25px ${u.colors.primary}44` : '',
                    }}>
                    {u.shortName.slice(0,2)}
                  </div>
                  <span className="text-[10px] px-2 py-1 rounded-full uppercase tracking-wider font-syne"
                    style={{ background:'rgba(255,255,255,0.05)', color:'rgba(255,255,255,0.35)', border:'1px solid rgba(255,255,255,0.08)' }}>
                    {u.type}
                  </span>
                </div>

                <h3 className="font-syne font-700 text-sm leading-snug mb-1">{u.name}</h3>
                <p className="text-white/30 text-xs mb-5 italic">"{u.tagline}"</p>

                <div className="space-y-2 mb-5">
                  <div className="flex items-center gap-2 text-xs text-white/40">
                    <MapPin size={11} className="text-white/20 flex-shrink-0" />{u.location}
                  </div>
                  <div className="flex items-center gap-2 text-xs text-white/40">
                    <Trophy size={11} style={{ color: u.colors.primary }} />
                    {u.sports.totalTitles}+ titles · {u.sports.dominantSport}
                  </div>
                  <div className="flex items-center gap-2 text-xs text-white/40">
                    <GraduationCap size={11} className="text-indigo-400" />
                    {u.academics.qsRank.includes('Not') ? 'Local top' : `QS ${u.academics.qsRank}`}
                  </div>
                </div>

                <div className="flex items-center gap-1 text-xs font-syne font-600 transition-all duration-300 group-hover:gap-2"
                  style={{ color: u.colors.primary }}>
                  Explore <ArrowRight size={12} className="transition-transform duration-300 group-hover:translate-x-1" />
                </div>
              </div>
            </Link>
          ))}
        </div>

        {filtered.length === 0 && (
          <div className="text-center py-28 text-white/20">
            <GraduationCap size={44} className="mx-auto mb-4 opacity-20" />
            <p>No universities match your search.</p>
          </div>
        )}
      </div>
    </main>
  );
}
