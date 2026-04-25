'use client';
import { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import { universities } from '@/lib/universities';
import AnimatedBackground from '@/components/ui/AnimatedBackground';
import { Trophy, Flame, Star, ArrowRight, Zap } from 'lucide-react';

const SPORTS = [
  {
    name: 'Basketball', icon: 'BB', color: '#f97316', bg: '#7c2d12',
    overview: 'The crown jewel of UAAP. Basketball draws the biggest crowds, most national TV coverage, and the most intense school rivalries in Philippine sports history. Every season is a national event.',
    culture: 'The Ateneo-DLSU rivalry is the most-watched sporting event in the country. Alumni, celebrities, and students pack Smart Araneta Coliseum each game day.',
    dominance: [
      { school: 'DLSU', full: 'De La Salle University',        titles: 20, badge: 'All-time leader', color: '#006B3F' },
      { school: 'UE',   full: 'University of the East',        titles: 18, badge: 'Historic giant',  color: '#CC0000' },
      { school: 'ADMU', full: 'Ateneo de Manila University',   titles: 12, badge: '4-peat dynasty',  color: '#003D8F' },
      { school: 'FEU',  full: 'Far Eastern University',        titles: 7,  badge: '',               color: '#006B3F' },
      { school: 'UST',  full: 'University of Santo Tomas',     titles: 7,  badge: '',               color: '#C8A400' },
      { school: 'UP',   full: 'University of the Philippines', titles: 2,  badge: 'Back-to-back 22-23', color: '#7B1113' },
    ],
    rivalries: [
      { a: 'Ateneo', b: 'La Salle', desc: 'The biggest rivalry in Philippine sports. Every matchup is a major national event.' },
      { a: 'FEU',    b: 'UE',       desc: 'The historic Manila derby — two schools close together, decades of fierce battles.' },
      { a: 'UP',     b: 'Everyone', desc: 'The underdog nation narrative — state scholars vs private school giants.' },
    ],
  },
  {
    name: 'Volleyball', icon: 'VB', color: '#a855f7', bg: '#3b0764',
    overview: "UAAP Volleyball has exploded in popularity, now rivaling basketball. Women's volleyball especially draws massive crowds and has produced the Philippines' biggest sports celebrities.",
    culture: "NU Lady Bulldogs dominate headlines. The Alyssa Valdez era changed women's sports forever in the Philippines — volleyball is no longer just basketball's understudy.",
    dominance: [
      { school: 'NU',   full: 'National University',          titles: 9, badge: '4-peat dynasty',      color: '#003087' },
      { school: 'DLSU', full: 'De La Salle University',       titles: 9, badge: 'Multiple eras',        color: '#006B3F' },
      { school: 'UST',  full: 'University of Santo Tomas',    titles: 9, badge: 'Championship pedigree',color: '#C8A400' },
      { school: 'ADMU', full: 'Ateneo de Manila University',  titles: 5, badge: '',                    color: '#003D8F' },
    ],
    rivalries: [
      { a: 'NU',   b: 'UST',  desc: 'The current dynasty challenger matchup — always a finals rematch energy.' },
      { a: 'DLSU', b: 'ADMU', desc: 'Classic crosstown rivals bringing their volleyball intensity every set.' },
    ],
  },
  {
    name: 'Cheerdance', icon: 'CD', color: '#eab308', bg: '#713f12',
    overview: 'The UAAP Cheerdance Competition is the most spectacular non-athletic event in Philippine sports. Teams perform elaborate 8-minute routines combining stunts, dance, and theatrical elements.',
    culture: 'UST Pep Squad is synonymous with CDC supremacy. Schools train year-round for this event. The CDC is taken with the same seriousness as a championship basketball game.',
    dominance: [
      { school: 'UST',  full: 'University of Santo Tomas',    titles: 13, badge: 'Untouchable dynasty', color: '#C8A400' },
      { school: 'ADMU', full: 'Ateneo de Manila University',  titles: 4,  badge: 'Consistent contender',color: '#003D8F' },
      { school: 'DLSU', full: 'De La Salle University',       titles: 4,  badge: 'Artistic powerhouse',  color: '#006B3F' },
      { school: 'UP',   full: 'University of the Philippines',titles: 3,  badge: 'Creative innovator',   color: '#7B1113' },
    ],
    rivalries: [
      { a: 'UST', b: 'Everyone', desc: "Can anyone dethrone the Pep Squad? That's the only rivalry question that matters." },
      { a: 'Ateneo', b: 'La Salle', desc: 'The classic crosstown battle extends to the CDC floor too.' },
    ],
  },
  {
    name: 'Football', icon: 'FB', color: '#22c55e', bg: '#052e16',
    overview: "Football is UAAP's fastest-growing sport. UP Fighting Maroons have emerged as the dominant force, leveraging a committed scholarship pipeline and top-quality coaching staff.",
    culture: "Football has a passionate growing niche. UP's dominance has brought more attention to the sport. Technical, tactical, and increasingly professional in quality.",
    dominance: [
      { school: 'UP',   full: 'University of the Philippines',  titles: 6, badge: 'Modern dynasty',      color: '#7B1113' },
      { school: 'ADMU', full: 'Ateneo de Manila University',    titles: 4, badge: 'Technical excellence', color: '#003D8F' },
      { school: 'DLSU', full: 'De La Salle University',         titles: 3, badge: '',                    color: '#006B3F' },
      { school: 'FEU',  full: 'Far Eastern University',         titles: 2, badge: '',                    color: '#006B3F' },
    ],
    rivalries: [
      { a: 'UP', b: 'Ateneo', desc: 'The academic rivalry extends to the pitch — two elite programs battling for football supremacy.' },
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
      <AnimatedBackground primaryColor={sport.bg} secondaryColor="#1c1917" intensity={0.32} />

      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        {/* Header */}
        <div className="text-center mb-12 sm:mb-16 pt-4 sm:pt-8">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass-bright text-xs font-syne font-semibold tracking-widest uppercase mb-4"
            style={{ border: '1px solid rgba(249,115,22,0.32)', color: '#fb923c' }}>
            <Trophy size={11} /> UAAP Sports Hub
          </div>
          <h1 className="font-syne font-extrabold leading-tight tracking-tight mb-3" style={{ fontSize: 'clamp(2.5rem,6vw,5.5rem)', color: '#e8eeff' }}>
            The Spirit of <span className="grad-warm">UAAP</span>
          </h1>
          <p className="text-base sm:text-lg max-w-md mx-auto" style={{ color: 'rgba(220,228,255,0.55)' }}>
            85+ years of athletic tradition, legendary rivalries, and championship dynasties.
          </p>
        </div>

        {/* Sport tab pills */}
        <div className="flex flex-wrap justify-center gap-2 sm:gap-3 mb-10 sm:mb-14">
          {SPORTS.map((s, i) => (
            <button key={s.name} onClick={() => setActiveSport(i)}
              className="flex items-center gap-2 px-4 sm:px-6 py-2.5 rounded-full font-syne font-bold text-sm transition-all duration-400 btn-magnetic"
              style={activeSport === i
                ? { background: `${s.color}1a`, border: `1px solid ${s.color}55`, color: s.color, boxShadow: `0 0 24px ${s.color}30` }
                : { background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)', color: 'rgba(220,228,255,0.45)' }
              }>
              <span className="font-mono text-[11px] font-bold px-1.5 py-0.5 rounded"
                style={{ background: `${s.color}22`, color: s.color }}>{s.icon}</span>
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
                {sport.icon}
              </div>
              <div className="flex-1 min-w-0">
                <h2 className="font-syne font-extrabold text-2xl sm:text-3xl md:text-4xl mb-3"
                  style={{ color: sport.color }}>
                  {sport.name}
                </h2>
                <p className="text-sm sm:text-base leading-relaxed mb-3" style={{ color: 'rgba(220,228,255,0.65)' }}>{sport.overview}</p>
                <p className="text-sm leading-relaxed" style={{ color: 'rgba(220,228,255,0.45)' }}>{sport.culture}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Championship table + Rivalries */}
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-5 mb-10 sm:mb-14">
          {/* Championships */}
          <div className="lg:col-span-3 glass-md rounded-2xl sm:rounded-3xl overflow-hidden"
            style={{ border: `1px solid ${sport.color}20` }}>
            <div className="px-4 sm:px-6 py-4 flex items-center gap-2"
              style={{ borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
              <Trophy size={14} style={{ color: sport.color }} />
              <span className="font-syne font-bold text-sm" style={{ color: '#e8eeff' }}>Championship Leaders</span>
            </div>
            <div ref={listRef} className="divide-y divide-white/5">
              {sport.dominance.map((d, i) => (
                <div key={d.school}
                  className="flex items-center gap-3 sm:gap-4 px-4 sm:px-6 py-3 sm:py-4 hover:bg-white/2 transition-all"
                  style={{
                    opacity: revealed ? 1 : 0,
                    transform: revealed ? 'translateX(0)' : 'translateX(-16px)',
                    transition: `opacity 0.5s ${i * 75}ms, transform 0.5s ${i * 75}ms cubic-bezier(0.16,1,0.3,1)`,
                  }}>
                  <div className="w-7 h-7 rounded-full flex items-center justify-center text-xs font-syne font-extrabold flex-shrink-0"
                    style={i === 0
                      ? { background: 'rgba(251,191,36,0.15)', color: '#fcd34d' }
                      : { background: 'rgba(255,255,255,0.06)', color: 'rgba(255,255,255,0.35)' }}>
                    {i + 1}
                  </div>
                  <div className="w-9 h-9 rounded-lg flex items-center justify-center font-syne font-extrabold text-xs flex-shrink-0"
                    style={{ background: `${d.color}22`, color: d.color, border: `1px solid ${d.color}38` }}>
                    {d.school.slice(0, 2)}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="font-syne font-semibold text-xs sm:text-sm truncate" style={{ color: '#e8eeff' }}>{d.full}</div>
                    {d.badge && <div className="text-[10px] sm:text-xs mt-0.5" style={{ color: sport.color, opacity: 0.7 }}>{d.badge}</div>}
                  </div>
                  <div className="hidden sm:flex items-center gap-2 w-24 flex-shrink-0">
                    <div className="flex-1 h-1.5 rounded-full overflow-hidden" style={{ background: 'rgba(255,255,255,0.06)' }}>
                      <div className="h-full rounded-full"
                        style={{
                          width: revealed ? `${(d.titles / sport.dominance[0].titles) * 100}%` : '0%',
                          background: sport.color,
                          transition: `width 1s cubic-bezier(0.16,1,0.3,1) ${i * 80 + 180}ms`,
                          boxShadow: `0 0 8px ${sport.color}77`,
                        }} />
                    </div>
                    <span className="font-syne font-extrabold text-sm w-5" style={{ color: sport.color }}>{d.titles}</span>
                  </div>
                  <span className="sm:hidden font-syne font-extrabold text-base" style={{ color: sport.color }}>{d.titles}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Rivalries + nav */}
          <div className="lg:col-span-2 space-y-4">
            <div className="glass-md rounded-2xl sm:rounded-3xl p-5 sm:p-6" style={{ border: `1px solid ${sport.color}20` }}>
              <div className="flex items-center gap-2 mb-4">
                <Flame size={14} style={{ color: sport.color }} />
                <span className="font-syne font-bold text-sm" style={{ color: '#e8eeff' }}>Classic Rivalries</span>
              </div>
              <div className="space-y-3">
                {sport.rivalries.map((r, i) => (
                  <div key={i} className="p-3 sm:p-4 rounded-xl sm:rounded-2xl"
                    style={{ background: `${sport.color}08`, border: `1px solid ${sport.color}1e` }}>
                    <div className="font-syne font-bold text-xs sm:text-sm mb-1.5 flex items-center gap-2"
                      style={{ color: sport.color }}>
                      {r.a}
                      <span style={{ color: 'rgba(220,228,255,0.3)', fontWeight: 400 }}>vs</span>
                      {r.b}
                      <Zap size={10} className="ml-auto" style={{ color: sport.color }} />
                    </div>
                    <p className="text-xs leading-relaxed" style={{ color: 'rgba(220,228,255,0.5)' }}>{r.desc}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="glass-md rounded-2xl sm:rounded-3xl p-4 sm:p-5" style={{ border: '1px solid rgba(255,255,255,0.07)' }}>
              <div className="text-[10px] uppercase tracking-widest font-syne mb-3" style={{ color: 'rgba(220,228,255,0.28)' }}>Explore by School</div>
              <div className="grid grid-cols-2 gap-1.5">
                {universities.map(u => (
                  <Link key={u.slug} href={`/universities/${u.slug}`}
                    className="flex items-center gap-2 p-2 rounded-lg transition-all group"
                    style={{ border: '1px solid transparent' }}>
                    <div className="w-5 h-5 rounded-md flex items-center justify-center text-[9px] font-syne font-extrabold flex-shrink-0"
                      style={{ background: `${u.colors.primary}22`, color: u.colors.primary }}>
                      {u.shortName.slice(0, 1)}
                    </div>
                    <span className="text-xs font-medium group-hover:text-white transition-colors"
                      style={{ color: 'rgba(220,228,255,0.48)' }}>{u.shortName}</span>
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
            <Star size={16} className="text-yellow-400" style={{ filter: 'drop-shadow(0 0 6px rgba(250,204,21,0.55))' }} />
            <h2 className="font-syne font-bold text-base sm:text-lg" style={{ color: '#e8eeff' }}>All-Time UAAP Title Leaders</h2>
            <span className="ml-auto text-xs" style={{ color: 'rgba(220,228,255,0.25)' }}>Combined all sports</span>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4">
            {sortedByTitles.map((u, i) => (
              <Link key={u.slug} href={`/universities/${u.slug}`}
                className="p-4 sm:p-5 rounded-xl sm:rounded-2xl text-center group transition-all duration-400 hover:scale-105 hover:-translate-y-1 relative overflow-hidden"
                style={{ border: `1px solid ${u.colors.primary}25`, background: `${u.colors.primary}07` }}>
                <div className="absolute inset-0 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-400"
                  style={{ background: `radial-gradient(circle at 50% 0%,${u.colors.primary}16,transparent 70%)` }} />
                <div className="relative">
                  <div className="font-syne font-extrabold leading-none mb-0.5" style={{ fontSize: 'clamp(1.8rem,4vw,2.4rem)', color: u.colors.primary }}>
                    {u.sports.totalTitles}<span className="text-base opacity-40">+</span>
                  </div>
                  <div className="font-syne font-bold text-xs sm:text-sm" style={{ color: '#e8eeff' }}>{u.shortName}</div>
                  <div className="text-[10px] sm:text-xs mt-0.5" style={{ color: 'rgba(220,228,255,0.32)' }}>{u.sports.dominantSport}</div>
                  {i === 0 && <div className="mt-1.5 text-[10px] font-semibold" style={{ color: '#fcd34d' }}>All-time leader</div>}
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>

      <footer className="py-8 px-4 sm:px-6 text-center safe-bottom mt-16" style={{ borderTop: '1px solid rgba(255,255,255,0.05)' }}>
        <div className="max-w-4xl mx-auto">
          <p style={{ color: 'rgba(220,228,255,0.18)', fontSize: '0.72rem' }}>All data is for reference only. Verify with official university sources.</p>
          <p style={{ color: 'rgba(147,197,253,0.32)', fontSize: '0.7rem', marginTop: 4, fontWeight: 500 }}>Developed by Harry Lagto</p>
        </div>
      </footer>
    </main>
  );
}
