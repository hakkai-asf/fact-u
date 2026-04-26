'use client';
import { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import { universities } from '@/lib/universities';
import NebulaBackground from '@/components/ui/NebulaBackground';
import UnivLogo from '@/components/ui/UnivLogo';
import { Search, Trophy, GraduationCap, MapPin, ArrowRight } from 'lucide-react';

const CATEGORIES = ['All', 'Business', 'Engineering', 'Sciences', 'Medicine', 'Arts', 'Law', 'Education'];
const LOCATIONS   = ['All Locations', 'Manila', 'Quezon City'];
const SORT_OPTS   = ['Ranking', 'Alphabetical', 'Titles'];

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
  'Manila':      ['dlsu','ust','nu','feu','adamson','ue'],   // NU = Manila
  'Quezon City': ['up','ateneo'],
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
      <NebulaBackground
        primaryColor={hovered?.colors.primary ?? '#1e3a5f'}
        secondaryColor={hovered?.colors.secondary ?? '#312e81'}
        intensity={0.85}
      />

      {/* Page hero */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0" style={{ background: 'linear-gradient(180deg,rgba(6,10,24,0.1) 0%,rgba(3,5,13,1) 100%)' }} />
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 pt-10 pb-6">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-syne font-semibold tracking-widest uppercase mb-4"
            style={{ background: 'rgba(79,142,247,0.15)', border: '1px solid rgba(79,142,247,0.32)', color: '#93c5fd' }}>
            <GraduationCap size={11} /> UAAP Member Schools
          </div>
          <h1 className="font-syne font-extrabold tracking-tight text-white mb-3"
            style={{ fontSize: 'clamp(2rem,5vw,3.8rem)' }}>
            Explore <span className="grad">Universities</span>
          </h1>
          <p className="text-sm sm:text-base max-w-lg leading-relaxed"
            style={{ color: 'rgba(220,228,255,0.68)' }}>
            Discover all 8 UAAP member universities. Compare programs, sports culture, campus life, and find your perfect match.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        {/* Sticky filters */}
        <div className="sticky top-16 z-30 py-3 -mx-4 sm:-mx-6 px-4 sm:px-6 mb-8"
          style={{ background: 'rgba(3,5,13,0.92)', backdropFilter: 'blur(20px)', borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
          <div className="flex flex-col sm:flex-row gap-3 items-start sm:items-center justify-between">
            <div className="relative w-full sm:w-64">
              <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2" style={{ color: 'rgba(220,228,255,0.32)' }} />
              <input value={q} onChange={e => setQ(e.target.value)} placeholder="Search universities..."
                className="w-full pl-9 pr-4 py-2.5 rounded-xl text-sm text-white placeholder-white/30 outline-none transition-all"
                style={{ background: 'rgba(255,255,255,0.07)', border: '1px solid rgba(255,255,255,0.12)' }} />
            </div>
            <div className="flex gap-2 flex-wrap">
              {LOCATIONS.map(l => (
                <button key={l} onClick={() => setLocation(l)}
                  className="px-3 py-1.5 rounded-full text-xs font-semibold transition-all"
                  style={location === l
                    ? { background:'rgba(79,142,247,0.2)', border:'1px solid rgba(79,142,247,0.5)', color:'#93c5fd' }
                    : { background:'rgba(255,255,255,0.06)', border:'1px solid rgba(255,255,255,0.1)', color:'rgba(220,228,255,0.50)' }
                  }>{l}</button>
              ))}
            </div>
            <div className="flex items-center gap-2 ml-auto">
              <span className="text-xs hidden sm:block" style={{ color: 'rgba(220,228,255,0.38)' }}>Sort:</span>
              <select value={sort} onChange={e => setSort(e.target.value)}
                className="text-xs rounded-xl px-3 py-2 outline-none"
                style={{ background: 'rgba(255,255,255,0.08)', border: '1px solid rgba(255,255,255,0.12)', color: '#e8eeff' }}>
                {SORT_OPTS.map(s => <option key={s} value={s} style={{ background: '#0a0f1e' }}>{s}</option>)}
              </select>
            </div>
          </div>
          <div className="flex gap-2 mt-3 overflow-x-auto no-scrollbar pb-1">
            {CATEGORIES.map(c => (
              <button key={c} onClick={() => setCategory(c)}
                className="px-3 py-1 rounded-full text-xs font-semibold whitespace-nowrap transition-all flex-shrink-0"
                style={category === c
                  ? { background:'rgba(52,211,153,0.15)', border:'1px solid rgba(52,211,153,0.4)', color:'#6ee7b7' }
                  : { background:'rgba(255,255,255,0.05)', border:'1px solid rgba(255,255,255,0.08)', color:'rgba(220,228,255,0.50)' }
                }>{c}</button>
            ))}
          </div>
        </div>

        <p className="text-xs mb-6 font-syne" style={{ color: 'rgba(220,228,255,0.42)' }}>
          Showing <span className="font-semibold" style={{ color: 'rgba(220,228,255,0.72)' }}>{filtered.length}</span> {filtered.length === 1 ? 'university' : 'universities'}
        </p>

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
          {filtered.map((u, i) => (
            <Link key={u.slug} href={`/universities/${u.slug}`}
              ref={el => { cardRefs.current[i] = el; }}
              onMouseEnter={() => setHoveredSlug(u.slug)}
              onMouseLeave={() => setHoveredSlug(null)}
              className="group block rounded-2xl overflow-hidden transition-all duration-500"
              style={{
                border: `1px solid ${u.colors.primary}28`,
                boxShadow: hoveredSlug === u.slug ? `0 0 40px ${u.colors.primary}30, 0 16px 48px rgba(0,0,0,0.5)` : '0 4px 20px rgba(0,0,0,0.3)',
                background: 'rgba(6,10,24,0.75)',
                opacity:   revealed.has(i) ? 1 : 0,
                transform: revealed.has(i) ? 'translateY(0)' : 'translateY(28px)',
                transition: `opacity 0.55s ${i * 0.06}s, transform 0.55s ${i * 0.06}s cubic-bezier(0.16,1,0.3,1), box-shadow 0.3s`,
              }}>
              {/* Campus image */}
              <div className="relative overflow-hidden" style={{ height: 160 }}>
                <div className="absolute inset-0"
                  style={{ background: `linear-gradient(160deg,${u.colors.primary}55,${u.colors.secondary}33)` }} />
                <img src={u.campusImage} alt={`${u.name} campus`}
                  className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  style={{ opacity: 0.62 }} loading="lazy"
                  onError={e => { (e.currentTarget as HTMLImageElement).style.opacity = '0'; }} />
                <div className="absolute inset-0" style={{ background: 'linear-gradient(180deg,rgba(0,0,0,0.1) 0%,rgba(3,5,13,0.82) 100%)' }} />
                <div className="absolute top-0 left-0 right-0 h-0.5"
                  style={{ background: `linear-gradient(90deg,transparent,${u.colors.primary},transparent)` }} />

                {/* Rank badge */}
                <div className="absolute top-3 left-3 w-7 h-7 rounded-lg flex items-center justify-center text-xs font-syne font-extrabold text-white"
                  style={{ background: u.colors.primary, boxShadow: `0 0 10px ${u.colors.primary}88` }}>
                  {universities.indexOf(u) + 1}
                </div>

                {/* Real university logo top-right */}
                <div className="absolute top-3 right-3">
                  <UnivLogo slug={u.slug} name={u.shortName} color={u.colors.primary} size={36} rounded="lg" />
                </div>

                <div className="absolute bottom-3 left-3 right-10">
                  <div className="text-[10px] italic" style={{ color: 'rgba(220,228,255,0.55)' }}>{u.tagline}</div>
                </div>
              </div>

              {/* Card body */}
              <div className="p-4">
                <h3 className="font-syne font-bold text-sm leading-snug mb-1 text-white">{u.name}</h3>
                <div className="flex items-center gap-1 text-xs mb-3" style={{ color: 'rgba(220,228,255,0.50)' }}>
                  <MapPin size={10} className="flex-shrink-0" />{u.location}
                </div>
                <p className="text-xs leading-relaxed mb-4 line-clamp-2" style={{ color: 'rgba(220,228,255,0.58)' }}>
                  {u.description.slice(0, 100)}...
                </p>
                <div className="flex gap-4 mb-4">
                  {[
                    { val: `${u.sports.totalTitles}+`, lbl: 'Titles' },
                    { val: u.founded,                  lbl: 'Founded' },
                    { val: u.academics.qsRank.includes('Not') ? 'Local' : u.academics.qsRank, lbl: 'QS Rank' },
                  ].map(({ val, lbl }) => (
                    <div key={lbl}>
                      <div className="font-syne font-extrabold text-xs text-white">{val}</div>
                      <div style={{ fontSize: '10px', color: 'rgba(220,228,255,0.38)' }}>{lbl}</div>
                    </div>
                  ))}
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex gap-1 flex-wrap">
                    <span className="px-2 py-0.5 rounded-md text-[10px] font-medium"
                      style={{ background: `${u.colors.primary}18`, color: u.colors.primary, border: `1px solid ${u.colors.primary}35` }}>
                      {u.type === 'public' ? 'State Univ' : 'Private'}
                    </span>
                    <span className="px-2 py-0.5 rounded-md text-[10px] font-medium"
                      style={{ background: 'rgba(255,255,255,0.06)', color: 'rgba(220,228,255,0.55)', border: '1px solid rgba(255,255,255,0.1)' }}>
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
          <div className="text-center py-24">
            <GraduationCap size={40} className="mx-auto mb-4" style={{ color: 'rgba(220,228,255,0.22)' }} />
            <p className="text-base" style={{ color: 'rgba(220,228,255,0.38)' }}>No universities match your filters.</p>
            <button onClick={() => { setQ(''); setCategory('All'); setLocation('All Locations'); }}
              className="mt-4 text-sm" style={{ color: '#60a5fa' }}>Clear filters</button>
          </div>
        )}

        <footer className="py-8 px-0 text-center safe-bottom mt-16" style={{ borderTop: '1px solid rgba(255,255,255,0.05)' }}>
          <p style={{ color: 'rgba(220,228,255,0.22)', fontSize: '0.72rem' }}>All data for reference only.</p>
          <p style={{ color: 'rgba(147,197,253,0.42)', fontSize: '0.7rem', marginTop: 4, fontWeight: 600 }}>Developed by Harry Lagto</p>
        </footer>
      </div>
    </main>
  );
}
