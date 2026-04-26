'use client';
import { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import { universities } from '@/lib/universities';
import NebulaBackground from '@/components/ui/NebulaBackground';
import UnivLogo from '@/components/ui/UnivLogo';
import { Trophy, Flame, Star, ArrowRight, Zap } from 'lucide-react';

const SPORTS = [
  {
    name: 'Basketball', id: 'bb', color: '#f97316', bg: '#7c2d12',
    overview: 'The crown jewel of UAAP. Basketball draws the biggest crowds, most national TV coverage, and the most intense school rivalries in Philippine sports history.',
    culture: 'The Ateneo-DLSU rivalry is the most-watched sporting event in the country. Alumni, celebrities, and students pack Smart Araneta Coliseum each game day.',
    dominance: [
      { slug: 'dlsu',    school: 'DLSU',    full: 'De La Salle University',        titles: 20, badge: 'All-time leader' },
      { slug: 'ue',      school: 'UE',      full: 'University of the East',        titles: 18, badge: 'Historic giant'  },
      { slug: 'ateneo',  school: 'ADMU',    full: 'Ateneo de Manila University',   titles: 12, badge: '4-peat dynasty'  },
      { slug: 'feu',     school: 'FEU',     full: 'Far Eastern University',        titles: 7,  badge: ''               },
      { slug: 'ust',     school: 'UST',     full: 'University of Santo Tomas',     titles: 7,  badge: ''               },
      { slug: 'up',      school: 'UP',      full: 'University of the Philippines', titles: 2,  badge: 'Back-to-back 22-23' },
    ],
    rivalries: [
      { a: 'Ateneo', b: 'La Salle', desc: 'The biggest rivalry in Philippine sports. Every matchup stops the nation.' },
      { a: 'FEU',    b: 'UE',       desc: 'The historic Manila derby — two schools, decades of fierce battles.' },
      { a: 'UP',     b: 'Everyone', desc: 'The underdog narrative — state scholars versus private school giants.' },
    ],
  },
  {
    name: 'Volleyball', id: 'vb', color: '#a855f7', bg: '#3b0764',
    overview: "UAAP Volleyball has exploded in popularity, now rivaling basketball. Women's volleyball draws massive crowds and has produced the Philippines' biggest sports celebrities.",
    culture: "NU Lady Bulldogs dominate headlines. The Alyssa Valdez era changed women's sports in the Philippines forever.",
    dominance: [
      { slug: 'nu',     school: 'NU',   full: 'National University',          titles: 9, badge: '4-peat dynasty' },
      { slug: 'dlsu',   school: 'DLSU', full: 'De La Salle University',       titles: 9, badge: 'Multiple eras' },
      { slug: 'ust',    school: 'UST',  full: 'University of Santo Tomas',    titles: 9, badge: 'Championship pedigree' },
      { slug: 'ateneo', school: 'ADMU', full: 'Ateneo de Manila University',  titles: 5, badge: '' },
    ],
    rivalries: [
      { a: 'NU',   b: 'UST',  desc: 'Current dynasty challenger matchup — always a finals rematch energy.' },
      { a: 'DLSU', b: 'ADMU', desc: 'Classic crosstown rivals bringing intensity every set.' },
    ],
  },
  {
    name: 'Cheerdance', id: 'cd', color: '#eab308', bg: '#713f12',
    overview: 'The UAAP Cheerdance Competition is the most spectacular non-athletic event in Philippine sports — elaborate 8-minute routines combining stunts, dance, and theatre.',
    culture: 'UST Pep Squad is synonymous with CDC supremacy. Schools train year-round. The CDC is taken as seriously as a championship basketball game.',
    dominance: [
      { slug: 'ust',    school: 'UST',  full: 'University of Santo Tomas',    titles: 13, badge: 'Untouchable dynasty' },
      { slug: 'ateneo', school: 'ADMU', full: 'Ateneo de Manila University',  titles: 4,  badge: 'Consistent contender' },
      { slug: 'dlsu',   school: 'DLSU', full: 'De La Salle University',       titles: 4,  badge: 'Artistic powerhouse' },
      { slug: 'up',     school: 'UP',   full: 'University of the Philippines', titles: 3, badge: 'Creative innovator' },
    ],
    rivalries: [
      { a: 'UST',    b: 'Everyone', desc: "Can anyone dethrone the Pep Squad? The only rivalry question that matters." },
      { a: 'Ateneo', b: 'La Salle', desc: 'The crosstown battle extends to the CDC floor too.' },
    ],
  },
  {
    name: 'Football', id: 'fb', color: '#22c55e', bg: '#052e16',
    overview: "Football is UAAP's fastest-growing sport. UP Fighting Maroons have emerged as the dominant force with a committed scholarship pipeline and top-quality coaching.",
    culture: "Football has a passionate growing niche. UP's dominance has brought the sport significantly more attention.",
    dominance: [
      { slug: 'up',     school: 'UP',   full: 'University of the Philippines',  titles: 6, badge: 'Modern dynasty' },
      { slug: 'ateneo', school: 'ADMU', full: 'Ateneo de Manila University',    titles: 4, badge: 'Technical excellence' },
      { slug: 'dlsu',   school: 'DLSU', full: 'De La Salle University',         titles: 3, badge: '' },
      { slug: 'feu',    school: 'FEU',  full: 'Far Eastern University',         titles: 2, badge: '' },
    ],
    rivalries: [
      { a: 'UP', b: 'Ateneo', desc: 'Academic rivals on the pitch — two elite programs battling for football supremacy.' },
    ],
  },
];

export default function SportsPage() {
  const [activeSport, setActiveSport] = useState(0);
  const sport = SPORTS[activeSport];
  const [revealed, setRevealed] = useState(false);
  const listRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setRevealed(false);
    const t = setTimeout(() => setRevealed(true), 80);
    return () => clearTimeout(t);
  }, [activeSport]);

  const sortedByTitles = [...universities].sort((a, b) => b.sports.totalTitles - a.sports.totalTitles);

  return (
    <main className="min-h-screen pt-20 sm:pt-24 pb-8">
      <NebulaBackground primaryColor={sport.bg} secondaryColor="#1c1917" intensity={0.9} />

      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        {/* Header */}
        <div className="text-center mb-12 sm:mb-16 pt-4 sm:pt-8">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass-bright text-xs font-syne font-semibold tracking-widest uppercase mb-4"
            style={{ border: '1px solid rgba(249,115,22,0.35)', color: '#fb923c' }}>
            <Trophy size={11} /> UAAP Sports Hub
          </div>
          <h1 className="font-syne font-extrabold leading-tight tracking-tight mb-3 text-white"
            style={{ fontSize: 'clamp(2.5rem,6vw,5.5rem)' }}>
            The Spirit of <span className="grad-warm">UAAP</span>
          </h1>
          <p className="text-base sm:text-lg max-w-md mx-auto" style={{ color: 'rgba(220,228,255,0.68)' }}>
            85+ years of athletic tradition, legendary rivalries, and championship dynasties.
          </p>
        </div>

        {/* Sport tabs */}
        <div className="flex flex-wrap justify-center gap-2 sm:gap-3 mb-10 sm:mb-14">
          {SPORTS.map((s, i) => (
            <button key={s.name} onClick={() => setActiveSport(i)}
              className="flex items-center gap-2 px-4 sm:px-5 py-2.5 rounded-full font-syne font-bold text-sm transition-all duration-300 btn-magnetic"
              style={activeSport === i
                ? { background: `${s.color}1c`, border: `1px solid ${s.color}55`, color: s.color, boxShadow: `0 0 24px ${s.color}30` }
                : { background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.09)', color: 'rgba(220,228,255,0.52)' }
              }>
              <span className="font-mono text-[10px] font-bold px-1.5 py-0.5 rounded"
                style={{ background: `${s.color}20`, color: s.color }}>{s.id.toUpperCase()}</span>
              {s.name}
            </button>
          ))}
        </div>

        {/* Sport hero card */}
        <div className="glass-md rounded-2xl sm:rounded-3xl overflow-hidden mb-8 relative"
          style={{ border: `1px solid ${sport.color}30`, boxShadow: `0 0 60px ${sport.color}12`, transition: 'all 0.5s cubic-bezier(0.16,1,0.3,1)' }}>
          <div className="h-0.5" style={{ background: `linear-gradient(90deg,transparent,${sport.color},transparent)` }} />
          <div className="absolute top-0 right-0 w-72 sm:w-96 h-72 sm:h-96 rounded-full pointer-events-none"
            style={{ background: `radial-gradient(circle,${sport.color}15,transparent 70%)`, filter: 'blur(50px)' }} />
          <div className="relative p-6 sm:p-10 md:p-12">
            <div className="flex flex-col sm:flex-row items-start gap-5 sm:gap-8">
              <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl sm:rounded-3xl flex-shrink-0 flex items-center justify-center font-mono font-extrabold text-lg sm:text-2xl"
                style={{ background: `${sport.color}18`, border: `1px solid ${sport.color}33`, color: sport.color }}>
                {sport.id.toUpperCase()}
              </div>
              <div className="flex-1">
                <h2 className="font-syne font-extrabold text-2xl sm:text-3xl md:text-4xl mb-3" style={{ color: sport.color }}>
                  {sport.name}
                </h2>
                <p className="text-sm sm:text-base leading-relaxed mb-3" style={{ color: 'rgba(220,228,255,0.72)' }}>{sport.overview}</p>
                <p className="text-sm leading-relaxed" style={{ color: 'rgba(220,228,255,0.52)' }}>{sport.culture}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Championship table + Rivalries */}
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-5 mb-10 sm:mb-14">
          {/* Table */}
          <div className="lg:col-span-3 glass-md rounded-2xl sm:rounded-3xl overflow-hidden"
            style={{ border: `1px solid ${sport.color}22` }}>
            <div className="px-4 sm:px-6 py-4 flex items-center gap-2"
              style={{ borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
              <Trophy size={14} style={{ color: sport.color }} />
              <span className="font-syne font-bold text-sm text-white">Championship Leaders</span>
            </div>
            <div ref={listRef} className="divide-y divide-white/5">
              {sport.dominance.map((d, i) => {
                const univ = universities.find(u => u.slug === d.slug);
                return (
                  <div key={d.slug}
                    className="flex items-center gap-3 sm:gap-4 px-4 sm:px-6 py-3 sm:py-4 hover:bg-white/2 transition-all"
                    style={{
                      opacity: revealed ? 1 : 0,
                      transform: revealed ? 'translateX(0)' : 'translateX(-16px)',
                      transition: `opacity 0.5s ${i * 75}ms, transform 0.5s ${i * 75}ms cubic-bezier(0.16,1,0.3,1)`,
                    }}>
                    <div className="w-7 h-7 rounded-full flex items-center justify-center text-xs font-syne font-extrabold flex-shrink-0"
                      style={i === 0
                        ? { background: 'rgba(251,191,36,0.15)', color: '#fcd34d' }
                        : { background: 'rgba(255,255,255,0.06)', color: 'rgba(220,228,255,0.40)' }}>
                      {i + 1}
                    </div>
                    {/* Real university logo */}
                    {univ && (
                      <UnivLogo slug={univ.slug} name={univ.shortName} color={univ.colors.primary} size={36} rounded="lg" className="flex-shrink-0" />
                    )}
                    <div className="flex-1 min-w-0">
                      <div className="font-syne font-semibold text-xs sm:text-sm truncate text-white">{d.full}</div>
                      {d.badge && <div className="text-[10px] sm:text-xs mt-0.5" style={{ color: sport.color, opacity: 0.8 }}>{d.badge}</div>}
                    </div>
                    {/* Mini bar */}
                    <div className="hidden sm:flex items-center gap-2 w-28 flex-shrink-0">
                      <div className="flex-1 h-1.5 rounded-full overflow-hidden" style={{ background: 'rgba(255,255,255,0.07)' }}>
                        <div className="h-full rounded-full"
                          style={{
                            width: revealed ? `${(d.titles / sport.dominance[0].titles) * 100}%` : '0%',
                            background: sport.color,
                            transition: `width 1s cubic-bezier(0.16,1,0.3,1) ${i * 80 + 180}ms`,
                            boxShadow: `0 0 8px ${sport.color}88`,
                          }} />
                      </div>
                      <span className="font-syne font-extrabold text-sm w-5" style={{ color: sport.color }}>{d.titles}</span>
                    </div>
                    <span className="sm:hidden font-syne font-extrabold text-base" style={{ color: sport.color }}>{d.titles}</span>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Rivalries + school nav */}
          <div className="lg:col-span-2 space-y-4">
            <div className="glass-md rounded-2xl sm:rounded-3xl p-5 sm:p-6" style={{ border: `1px solid ${sport.color}22` }}>
              <div className="flex items-center gap-2 mb-4">
                <Flame size={14} style={{ color: sport.color }} />
                <span className="font-syne font-bold text-sm text-white">Classic Rivalries</span>
              </div>
              <div className="space-y-3">
                {sport.rivalries.map((r, i) => (
                  <div key={i} className="p-3 sm:p-4 rounded-xl sm:rounded-2xl"
                    style={{ background: `${sport.color}09`, border: `1px solid ${sport.color}1e` }}>
                    <div className="font-syne font-bold text-xs sm:text-sm mb-1.5 flex items-center gap-2" style={{ color: sport.color }}>
                      {r.a}
                      <span style={{ color: 'rgba(220,228,255,0.32)', fontWeight: 400 }}>vs</span>
                      {r.b}
                      <Zap size={10} className="ml-auto" style={{ color: sport.color }} />
                    </div>
                    <p className="text-xs leading-relaxed" style={{ color: 'rgba(220,228,255,0.58)' }}>{r.desc}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* School nav with logos */}
            <div className="glass-md rounded-2xl sm:rounded-3xl p-4 sm:p-5" style={{ border: '1px solid rgba(255,255,255,0.07)' }}>
              <div className="text-[10px] uppercase tracking-widest font-syne mb-3" style={{ color: 'rgba(220,228,255,0.30)' }}>Explore by School</div>
              <div className="grid grid-cols-2 gap-1.5">
                {universities.map(u => (
                  <Link key={u.slug} href={`/universities/${u.slug}`}
                    className="flex items-center gap-2 p-2 rounded-lg transition-all group hover:bg-white/4">
                    <UnivLogo slug={u.slug} name={u.shortName} color={u.colors.primary} size={22} rounded="md" />
                    <span className="text-xs font-medium group-hover:text-white transition-colors"
                      style={{ color: 'rgba(220,228,255,0.55)' }}>{u.shortName}</span>
                    <ArrowRight size={9} className="ml-auto opacity-0 group-hover:opacity-60 transition-all" style={{ color: u.colors.primary }} />
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* All-time leaders */}
        <div className="glass-md rounded-2xl sm:rounded-3xl p-6 sm:p-8" style={{ border: '1px solid rgba(255,255,255,0.07)' }}>
          <div className="flex items-center gap-2 mb-6 sm:mb-8">
            <Star size={16} style={{ color: '#fcd34d', filter: 'drop-shadow(0 0 6px rgba(250,204,21,0.6))' }} />
            <h2 className="font-syne font-bold text-base sm:text-lg text-white">All-Time UAAP Title Leaders</h2>
            <span className="ml-auto text-xs" style={{ color: 'rgba(220,228,255,0.28)' }}>Combined all sports</span>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4">
            {sortedByTitles.map((u, i) => (
              <Link key={u.slug} href={`/universities/${u.slug}`}
                className="p-4 sm:p-5 rounded-xl sm:rounded-2xl text-center group transition-all duration-400 hover:scale-105 hover:-translate-y-1 relative overflow-hidden"
                style={{ border: `1px solid ${u.colors.primary}25`, background: `${u.colors.primary}07` }}>
                <div className="absolute inset-0 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-400"
                  style={{ background: `radial-gradient(circle at 50% 0%,${u.colors.primary}16,transparent 70%)` }} />
                {/* School logo */}
                <div className="flex justify-center mb-2">
                  <UnivLogo slug={u.slug} name={u.shortName} color={u.colors.primary} size={36} rounded="lg" glow />
                </div>
                <div className="font-syne font-extrabold leading-none mb-0.5"
                  style={{ fontSize: 'clamp(1.8rem,4vw,2.4rem)', color: u.colors.primary }}>
                  {u.sports.totalTitles}<span className="text-base opacity-40">+</span>
                </div>
                <div className="font-syne font-bold text-xs sm:text-sm text-white">{u.shortName}</div>
                <div className="text-[10px] sm:text-xs mt-0.5" style={{ color: 'rgba(220,228,255,0.38)' }}>{u.sports.dominantSport}</div>
                {i === 0 && <div className="mt-1.5 text-[10px] font-semibold" style={{ color: '#fcd34d' }}>All-time leader</div>}
              </Link>
            ))}
          </div>
        </div>
      </div>

      <footer className="py-8 px-4 sm:px-6 text-center safe-bottom mt-16" style={{ borderTop: '1px solid rgba(255,255,255,0.05)' }}>
        <div className="max-w-4xl mx-auto">
          <p style={{ color: 'rgba(220,228,255,0.22)', fontSize: '0.72rem' }}>All data for reference only. Verify with official sources.</p>
          <p style={{ color: 'rgba(147,197,253,0.45)', fontSize: '0.7rem', marginTop: 4, fontWeight: 600 }}>Developed by Harry Lagto</p>
        </div>
      </footer>
    </main>
  );
}
