'use client';
import { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import { universities } from '@/lib/universities';
import AnimatedBackground from '@/components/ui/AnimatedBackground';
import { Search, Trophy, GraduationCap, MapPin, ArrowRight, SlidersHorizontal } from 'lucide-react';

const CAMPUS_GRADIENTS: Record<string, string> = {
  up:      'linear-gradient(160deg,#3d0a0b,#7B1113 60%,#1a0505)',
  ateneo:  'linear-gradient(160deg,#001a4d,#003D8F 60%,#000d26)',
  dlsu:    'linear-gradient(160deg,#002a18,#006B3F 60%,#001510)',
  ust:     'linear-gradient(160deg,#3d2e00,#C8A400 60%,#1a1200)',
  nu:      'linear-gradient(160deg,#001433,#003087 60%,#000a1a)',
  feu:     'linear-gradient(160deg,#002e1a,#007A47 60%,#001710)',
  adamson: 'linear-gradient(160deg,#001433,#003DA5 60%,#000a1a)',
  ue:      'linear-gradient(160deg,#330000,#CC0000 60%,#1a0000)',
};

const CATEGORIES = ['All', 'Business', 'Engineering', 'Sciences', 'Medicine', 'Arts', 'Law', 'Education'];
const LOCATIONS  = ['All Locations', 'Manila', 'Quezon City'];
const SORT_OPTS  = ['Ranking', 'Alphabetical', 'Titles'];

const CATEGORY_MAP: Record<string, string[]> = {
  Business:    ['dlsu','ateneo','feu'],
  Engineering: ['dlsu','up','adamson','ue'],
  Sciences:    ['up','ust','ue'],
  Medicine:    ['ust','up','ue'],
  Arts:        ['up','ust','ateneo'],
  Law:         ['ateneo','up','adamson'],
  Education:   ['up','ust','feu'],
};
const LOCATION_MAP: Record<string, string[]> = {
  'Manila':      ['dlsu','ust','feu','adamson','ue'],
  'Quezon City': ['up','ateneo','nu'],
};

export default function UniversitiesPage() {
  const [q,          setQ]          = useState('');
  const [category,   setCategory]   = useState('All');
  const [location,   setLocation]   = useState('All Locations');
  const [sort,       setSort]       = useState('Ranking');
  const [hoveredSlug,setHoveredSlug]= useState<string|null>(null);
  const [revealed,   setRevealed]   = useState<Set<number>>(new Set());
  const cardRefs = useRef<(HTMLAnchorElement|null)[]>([]);

  let filtered = universities.filter(u => {
    const mq  = !q || u.name.toLowerCase().includes(q.toLowerCase()) || u.shortName.toLowerCase().includes(q.toLowerCase());
    const mca = category === 'All' || (CATEGORY_MAP[category] ?? []).includes(u.slug);
    const mlo = location === 'All Locations' || (LOCATION_MAP[location] ?? []).includes(u.slug);
    return mq && mca && mlo;
  });
  if (sort === 'Alphabetical') filtered = [...filtered].sort((a,b) => a.name.localeCompare(b.name));
  if (sort === 'Titles')       filtered = [...filtered].sort((a,b) => b.sports.totalTitles - a.sports.totalTitles);

  useEffect(() => {
    const obs = new IntersectionObserver(entries => {
      entries.forEach(e => {
        const idx = cardRefs.current.indexOf(e.target as HTMLAnchorElement);
        if (e.isIntersecting && idx >= 0)
          setRevealed(prev => { const s = new Set(Array.from(prev)); s.add(idx); return s; });
      });
    }, { threshold: 0.08 });
    cardRefs.current.forEach(r => r && obs.observe(r));
    return () => obs.disconnect();
  }, [filtered.length]);

  const hovered = hoveredSlug ? universities.find(u => u.slug === hoveredSlug) : null;

  return (
    <main className="min-h-screen pt-20 pb-24">
      <AnimatedBackground
        primaryColor={hovered?.colors.primary ?? '#1e3a5f'}
        secondaryColor={hovered?.colors.secondary ?? '#312e81'}
        intensity={0.25}
      />

      {/* ── Page hero banner ── */}
      <div className="relative overflow-hidden" style={{ minHeight: 200 }}>
        <div className="absolute inset-0" style={{ background: 'linear-gradient(180deg,rgba(6,10,24,0.1) 0%,rgba(3,5,13,1) 100%)' }} />
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 pt-10 pb-6">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-syne font-semibold tracking-widest uppercase mb-4"
            style={{ background: 'rgba(79,142,247,0.15)', border: '1px solid rgba(79,142,247,0.3)', color: '#93c5fd' }}>
            <GraduationCap size={11} /> UAAP Member Schools
          </div>
          <h1 className="font-syne font-extrabold tracking-tight text-white mb-3"
            style={{ fontSize: 'clamp(2rem,5vw,3.8rem)' }}>
            Explore <span className="grad">Universities</span>
          </h1>
          <p className="text-white/55 text-sm sm:text-base max-w-lg leading-relaxed">
            Discover all 8 UAAP member universities. Compare programs, sports culture, campus life, and find your perfect match.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6">

        {/* ── Filters bar ── */}
        <div className="sticky top-16 z-30 py-3 -mx-4 sm:-mx-6 px-4 sm:px-6 mb-8"
          style={{ background: 'rgba(3,5,13,0.9)', backdropFilter: 'blur(20px)', borderBottom: '1px solid rgba(255,255,255,0.06)' }}>

          <div className="flex flex-col sm:flex-row gap-3 items-start sm:items-center justify-between">
            {/* Search */}
            <div className="relative w-full sm:w-64">
              <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-white/30" />
              <input
                value={q}
                onChange={e => setQ(e.target.value)}
                placeholder="Search universities..."
                className="w-full pl-9 pr-4 py-2.5 rounded-xl text-sm text-white placeholder-white/30 outline-none transition-all"
                style={{ background: 'rgba(255,255,255,0.07)', border: '1px solid rgba(255,255,255,0.12)', fontSize: 14 }}
              />
            </div>

            {/* Location pills */}
            <div className="flex gap-2 flex-wrap">
              {LOCATIONS.map(l => (
                <button key={l} onClick={() => setLocation(l)}
                  className="px-3 py-1.5 rounded-full text-xs font-semibold transition-all"
                  style={location === l
                    ? { background: 'rgba(79,142,247,0.2)', border: '1px solid rgba(79,142,247,0.5)', color: '#93c5fd' }
                    : { background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.1)', color: 'rgba(255,255,255,0.5)' }
                  }>{l}</button>
              ))}
            </div>

            {/* Sort */}
            <div className="flex items-center gap-2 ml-auto">
              <span className="text-white/35 text-xs hidden sm:block">Sort:</span>
              <select value={sort} onChange={e => setSort(e.target.value)}
                className="text-xs rounded-xl px-3 py-2 outline-none"
                style={{ background: 'rgba(255,255,255,0.08)', border: '1px solid rgba(255,255,255,0.12)', color: '#fff' }}>
                {SORT_OPTS.map(s => <option key={s} value={s} style={{ background: '#0a0f1e' }}>{s}</option>)}
              </select>
            </div>
          </div>

          {/* Category pills row */}
          <div className="flex gap-2 mt-3 overflow-x-auto no-scrollbar pb-1">
            {CATEGORIES.map(c => (
              <button key={c} onClick={() => setCategory(c)}
                className="px-3 py-1 rounded-full text-xs font-semibold whitespace-nowrap transition-all flex-shrink-0"
                style={category === c
                  ? { background: 'rgba(52,211,153,0.15)', border: '1px solid rgba(52,211,153,0.4)', color: '#6ee7b7' }
                  : { background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.08)', color: 'rgba(255,255,255,0.45)' }
                }>{c}</button>
            ))}
          </div>
        </div>

        {/* Count */}
        <p className="text-white/40 text-xs mb-6 font-syne">
          Showing <span className="text-white/70 font-semibold">{filtered.length}</span> {filtered.length === 1 ? 'university' : 'universities'}
        </p>

        {/* ── Cards grid ── */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
          {filtered.map((u, i) => (
            <Link
              key={u.slug}
              href={`/universities/${u.slug}`}
              ref={el => { cardRefs.current[i] = el; }}
              onMouseEnter={() => setHoveredSlug(u.slug)}
              onMouseLeave={() => setHoveredSlug(null)}
              className="group block rounded-2xl overflow-hidden transition-all duration-500"
              style={{
                border: `1px solid ${u.colors.primary}25`,
                boxShadow: hoveredSlug === u.slug ? `0 0 40px ${u.colors.primary}30, 0 16px 48px rgba(0,0,0,0.5)` : '0 4px 20px rgba(0,0,0,0.3)',
                opacity:   revealed.has(i) ? 1 : 0,
                transform: revealed.has(i) ? 'translateY(0)' : 'translateY(28px)',
                transition: `opacity 0.55s ${i * 0.06}s, transform 0.55s ${i * 0.06}s cubic-bezier(0.16,1,0.3,1), box-shadow 0.3s`,
                background: 'rgba(6,10,24,0.7)',
              }}
            >
              {/* Campus image area */}
              <div className="relative overflow-hidden" style={{ height: 160 }}>
                {/* Gradient bg fallback */}
                <div className="absolute inset-0" style={{ background: CAMPUS_GRADIENTS[u.slug] }} />
                {/* Real image */}
                {u.campusImage && (
                  <img
                    src={u.campusImage}
                    alt={u.name}
                    className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    style={{ opacity: 0.6 }}
                    loading="lazy"
                    onError={e => { (e.currentTarget as HTMLImageElement).style.display = 'none'; }}
                  />
                )}
                {/* Overlay */}
                <div className="absolute inset-0" style={{ background: 'linear-gradient(180deg, rgba(0,0,0,0.15) 0%, rgba(3,5,13,0.85) 100%)' }} />
                {/* Top accent bar */}
                <div className="absolute top-0 left-0 right-0 h-0.5" style={{ background: `linear-gradient(90deg,transparent,${u.colors.primary},transparent)` }} />

                {/* Rank badge */}
                <div className="absolute top-3 left-3 w-7 h-7 rounded-lg flex items-center justify-center text-xs font-syne font-extrabold"
                  style={{ background: u.colors.primary, boxShadow: `0 0 12px ${u.colors.primary}88`, color: '#fff' }}>
                  {universities.indexOf(u) + 1}
                </div>

                {/* Short name badge */}
                <div className="absolute top-3 right-3 px-2.5 py-1 rounded-lg text-xs font-syne font-bold"
                  style={{ background: 'rgba(0,0,0,0.6)', border: '1px solid rgba(255,255,255,0.15)', color: '#fff', backdropFilter: 'blur(8px)' }}>
                  {u.shortName}
                </div>

                {/* School name over image bottom */}
                <div className="absolute bottom-3 left-3 right-3">
                  <div className="text-white/60 text-[10px] font-medium italic">{u.tagline}</div>
                </div>
              </div>

              {/* Card body */}
              <div className="p-4">
                <h3 className="font-syne font-bold text-white text-sm leading-snug mb-1 group-hover:text-white transition-colors">
                  {u.name}
                </h3>
                <div className="flex items-center gap-1 text-white/45 text-xs mb-3">
                  <MapPin size={10} className="flex-shrink-0" />
                  {u.location}
                </div>

                {/* Description */}
                <p className="text-white/50 text-xs leading-relaxed mb-4 line-clamp-2">
                  {u.description.slice(0, 100)}...
                </p>

                {/* Stats row */}
                <div className="flex gap-3 mb-4">
                  <div>
                    <div className="font-syne font-extrabold text-xs text-white">{u.sports.totalTitles}+</div>
                    <div className="text-white/35 text-[10px]">Titles</div>
                  </div>
                  <div>
                    <div className="font-syne font-extrabold text-xs text-white">{u.founded}</div>
                    <div className="text-white/35 text-[10px]">Founded</div>
                  </div>
                  <div>
                    <div className="font-syne font-extrabold text-xs"
                      style={{ color: u.academics.qsRank.includes('Not') ? 'rgba(255,255,255,0.4)' : u.colors.primary }}>
                      {u.academics.qsRank.includes('Not') ? 'Local' : u.academics.qsRank}
                    </div>
                    <div className="text-white/35 text-[10px]">QS Rank</div>
                  </div>
                </div>

                {/* Explore link */}
                <div className="flex items-center justify-between">
                  <div className="flex gap-1 flex-wrap">
                    <span className="px-2 py-0.5 rounded-md text-[10px] font-medium"
                      style={{ background: `${u.colors.primary}18`, color: u.colors.primary, border: `1px solid ${u.colors.primary}35` }}>
                      {u.type === 'public' ? 'State Univ' : 'Private'}
                    </span>
                    <span className="px-2 py-0.5 rounded-md text-[10px] font-medium"
                      style={{ background: 'rgba(255,255,255,0.06)', color: 'rgba(255,255,255,0.45)', border: '1px solid rgba(255,255,255,0.1)' }}>
                      {u.sports.dominantSport}
                    </span>
                  </div>
                  <ArrowRight size={14} style={{ color: u.colors.primary }}
                    className="transition-transform duration-300 group-hover:translate-x-1" />
                </div>
              </div>
            </Link>
          ))}
        </div>

        {filtered.length === 0 && (
          <div className="text-center py-24 text-white/30">
            <GraduationCap size={40} className="mx-auto mb-4 opacity-20" />
            <p className="text-base">No universities match your filters.</p>
            <button onClick={() => { setQ(''); setCategory('All'); setLocation('All Locations'); }}
              className="mt-4 text-sm text-blue-400 underline">Clear filters</button>
          </div>
        )}
      </div>
    </main>
  );
}
