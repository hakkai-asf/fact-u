'use client';
import { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import { universities } from '@/lib/universities';
import AnimatedBackground from '@/components/ui/AnimatedBackground';
import { Trophy, Flame, Star, ArrowRight, Zap, Users } from 'lucide-react';

const SPORTS = [
  {
    name: 'Basketball', emoji: '🏀', color: '#f97316', bg: '#7c2d12',
    overview: 'The crown jewel of UAAP. Basketball draws the biggest crowds, most national TV coverage, and the most intense school rivalries in Philippine sports history. Every season is a national event.',
    culture: 'The Ateneo-DLSU rivalry "The UAAP Finals" is the most-watched sporting event in the country. Alumni, celebrities, and students pack Smart Araneta Coliseum each game day.',
    dominance: [
      { school: 'DLSU', full: 'De La Salle University',     titles: 20, badge: '👑 All-time leader', color: '#006B3F' },
      { school: 'UE',   full: 'University of the East',     titles: 18, badge: '🔥 Historic giant',  color: '#CC0000' },
      { school: 'ADMU', full: 'Ateneo de Manila University', titles: 12, badge: '⚡ 4-peat dynasty',  color: '#003D8F' },
      { school: 'FEU',  full: 'Far Eastern University',     titles: 7,  badge: '',                   color: '#006B3F' },
      { school: 'UST',  full: 'University of Santo Tomas',  titles: 7,  badge: '',                   color: '#F5C518' },
      { school: 'UP',   full: 'University of the Philippines', titles: 2, badge: '⭐ Back-to-back 22–23', color: '#7B1113' },
    ],
    rivalries: [
      { a: 'Ateneo', b: 'La Salle', desc: 'The biggest rivalry in Philippine sports. Every matchup is a national holiday.' },
      { a: 'FEU',    b: 'UE',       desc: 'The historic Manila derby — two schools 1km apart, decades of battles.' },
      { a: 'UP',     b: 'Everyone', desc: 'The underdog nation narrative — iskolar ng bayan vs private school giants.' },
    ],
  },
  {
    name: 'Volleyball', emoji: '🏐', color: '#a855f7', bg: '#3b0764',
    overview: 'UAAP Volleyball has exploded in popularity, now rivaling basketball. Women\'s volleyball especially draws massive crowds and has produced the Philippines\' biggest sports celebrities.',
    culture: 'NU Lady Bulldogs dominate headlines. The Alyssa Valdez era changed women\'s sports forever in the Philippines — volleyball is no longer just basketball\'s understudy.',
    dominance: [
      { school: 'NU',   full: 'National University',        titles: 9, badge: '👑 4-peat dynasty', color: '#003087' },
      { school: 'DLSU', full: 'De La Salle University',     titles: 9, badge: '🏐 Multiple eras',  color: '#006B3F' },
      { school: 'UST',  full: 'University of Santo Tomas',  titles: 9, badge: '🔥 Championship pedigree', color: '#F5C518' },
      { school: 'ADMU', full: 'Ateneo de Manila University', titles: 5, badge: '',                  color: '#003D8F' },
    ],
    rivalries: [
      { a: 'NU',   b: 'UST',  desc: 'The current dynasty challenger matchup — always a finals rematch energy.' },
      { a: 'DLSU', b: 'ADMU', desc: 'Classic crosstown rivals bringing their volleyball intensity every set.' },
    ],
  },
  {
    name: 'Cheerdance', emoji: '📣', color: '#eab308', bg: '#713f12',
    overview: 'The UAAP Cheerdance Competition is the most spectacular non-athletic event in Philippine sports. Teams perform elaborate 8-minute routines combining stunts, dance, and theatrical elements.',
    culture: 'UST Pep Squad is synonymous with CDC supremacy. Schools train year-round for this event. The CDC is taken with the same seriousness as a championship basketball game.',
    dominance: [
      { school: 'UST',  full: 'University of Santo Tomas',   titles: 13, badge: '👑 Untouchable dynasty', color: '#F5C518' },
      { school: 'ADMU', full: 'Ateneo de Manila University',  titles: 4,  badge: '⭐ Consistent contender', color: '#003D8F' },
      { school: 'DLSU', full: 'De La Salle University',      titles: 4,  badge: '🌟 Artistic powerhouse',  color: '#006B3F' },
      { school: 'UP',   full: 'University of the Philippines', titles: 3, badge: '💡 Creative innovator',   color: '#7B1113' },
    ],
    rivalries: [
      { a: 'UST', b: 'Everyone', desc: 'Can anyone dethrone the Pep Squad? That\'s the only rivalry question that matters.' },
      { a: 'Ateneo', b: 'La Salle', desc: 'The classic crosstown battle extends to the CDC floor too.' },
    ],
  },
  {
    name: 'Football', emoji: '⚽', color: '#22c55e', bg: '#052e16',
    overview: 'Football is UAAP\'s fastest-growing sport. UP Fighting Maroons have emerged as the dominant force, leveraging a committed scholarship pipeline and top-quality coaching staff.',
    culture: 'Football has a passionate growing niche. UP\'s dominance has brought more attention to the sport. Technical, tactical, and increasingly professional in quality.',
    dominance: [
      { school: 'UP',   full: 'University of the Philippines',   titles: 6, badge: '👑 Modern dynasty', color: '#7B1113' },
      { school: 'ADMU', full: 'Ateneo de Manila University',     titles: 4, badge: '⚡ Technical excellence', color: '#003D8F' },
      { school: 'DLSU', full: 'De La Salle University',         titles: 3, badge: '',                   color: '#006B3F' },
      { school: 'FEU',  full: 'Far Eastern University',         titles: 2, badge: '',                   color: '#006B3F' },
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
    const t = setTimeout(() => setRevealed(true), 100);
    return () => clearTimeout(t);
  }, [activeSport]);

  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setRevealed(true); }, { threshold: 0.1 });
    if (listRef.current) obs.observe(listRef.current);
    return () => obs.disconnect();
  }, []);

  const sortedByTitles = [...universities].sort((a, b) => b.sports.totalTitles - a.sports.totalTitles);

  return (
    <main className="min-h-screen pt-24 pb-24 px-6">
      <AnimatedBackground primaryColor={sport.bg} secondaryColor="#1c1917" intensity={0.35} />

      <div className="max-w-7xl mx-auto">

        {/* Header */}
        <div className="text-center mb-16 pt-8">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass-bright text-xs font-syne font-600 tracking-widest uppercase mb-5"
            style={{ border: '1px solid rgba(249,115,22,0.35)', color: '#fb923c' }}>
            <Trophy size={11} /> UAAP Sports Hub
          </div>
          <h1 className="font-syne font-800 leading-tight tracking-tight mb-4"
            style={{ fontSize: 'clamp(3rem,7vw,6rem)' }}>
            The Spirit of <span className="grad-warm">UAAP</span>
          </h1>
          <p className="text-white/35 text-lg max-w-md mx-auto">
            85+ years of athletic tradition, legendary rivalries, and championship dynasties.
          </p>
        </div>

        {/* Sport tab pills */}
        <div className="flex flex-wrap justify-center gap-3 mb-14">
          {SPORTS.map((s, i) => (
            <button key={s.name} onClick={() => setActiveSport(i)}
              className="flex items-center gap-2.5 px-6 py-3 rounded-full font-syne font-700 text-sm btn-magnetic transition-all duration-400"
              style={activeSport === i
                ? { background: `${s.color}1a`, border: `1px solid ${s.color}55`, color: s.color, boxShadow: `0 0 30px ${s.color}33` }
                : { background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)', color: 'rgba(255,255,255,0.45)' }
              }>
              <span className="text-lg">{s.emoji}</span> {s.name}
            </button>
          ))}
        </div>

        {/* Sport hero card */}
        <div className="glass-md rounded-3xl overflow-hidden mb-10 relative"
          style={{
            border: `1px solid ${sport.color}33`,
            boxShadow: `0 0 80px ${sport.color}15`,
            transition: 'border-color 0.6s, box-shadow 0.6s',
          }}>
          {/* Top accent */}
          <div className="h-1" style={{ background: `linear-gradient(90deg,transparent,${sport.color},transparent)` }} />
          {/* BG glow */}
          <div className="absolute top-0 right-0 w-96 h-96 rounded-full pointer-events-none"
            style={{ background: `radial-gradient(circle,${sport.color}18,transparent 70%)`, filter: 'blur(60px)' }} />
          <div className="absolute bottom-0 left-0 w-64 h-64 rounded-full pointer-events-none"
            style={{ background: `radial-gradient(circle,${sport.color}0d,transparent 70%)`, filter: 'blur(40px)' }} />

          <div className="relative p-8 md:p-12">
            <div className="flex flex-col md:flex-row items-start gap-8">
              <div className="w-20 h-20 md:w-24 md:h-24 rounded-3xl flex-shrink-0 flex items-center justify-center text-5xl md:text-6xl"
                style={{ background: `${sport.color}15`, border: `1px solid ${sport.color}33` }}>
                {sport.emoji}
              </div>
              <div className="flex-1">
                <h2 className="font-syne font-800 text-2xl md:text-4xl mb-3"
                  style={{ color: sport.color, textShadow: `0 0 40px ${sport.color}55` }}>
                  {sport.name}
                </h2>
                <p className="text-white/60 text-base leading-relaxed mb-4">{sport.overview}</p>
                <p className="text-white/40 text-sm leading-relaxed">{sport.culture}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Championship table + Rivalries side by side */}
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-6 mb-14">
          {/* Championships */}
          <div className="lg:col-span-3 glass-md rounded-3xl overflow-hidden"
            style={{ border: `1px solid ${sport.color}22` }}>
            <div className="px-6 py-4 flex items-center gap-2"
              style={{ borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
              <Trophy size={15} style={{ color: sport.color }} />
              <span className="font-syne font-700 text-sm">Championship Leaders</span>
            </div>
            <div ref={listRef} className="divide-y divide-white/5">
              {sport.dominance.map((d, i) => (
                <div key={d.school}
                  className="flex items-center gap-4 px-6 py-4 transition-all duration-300 hover:bg-white/2"
                  style={{
                    opacity: revealed ? 1 : 0,
                    transform: revealed ? 'translateX(0)' : 'translateX(-20px)',
                    transition: `opacity 0.5s, transform 0.5s cubic-bezier(0.16,1,0.3,1) ${i * 80}ms`,
                  }}>
                  <div className="w-8 h-8 rounded-full flex items-center justify-center text-sm font-syne font-800 flex-shrink-0"
                    style={i === 0
                      ? { background: 'rgba(251,191,36,0.15)', color: '#fcd34d', boxShadow: '0 0 12px rgba(251,191,36,0.3)' }
                      : { background: 'rgba(255,255,255,0.06)', color: 'rgba(255,255,255,0.35)' }}>
                    {i + 1}
                  </div>
                  <div className="w-10 h-10 rounded-xl flex items-center justify-center font-syne font-800 text-xs flex-shrink-0"
                    style={{ background: `${d.color}25`, color: d.color, border: `1px solid ${d.color}40` }}>
                    {d.school.slice(0, 2)}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="font-syne font-600 text-sm">{d.full}</div>
                    {d.badge && (
                      <div className="text-xs mt-0.5" style={{ color: sport.color, opacity: 0.7 }}>{d.badge}</div>
                    )}
                  </div>
                  {/* Bar */}
                  <div className="hidden sm:flex items-center gap-2 w-28 flex-shrink-0">
                    <div className="flex-1 h-1.5 rounded-full overflow-hidden" style={{ background: 'rgba(255,255,255,0.06)' }}>
                      <div className="h-full rounded-full"
                        style={{
                          width: revealed ? `${(d.titles / sport.dominance[0].titles) * 100}%` : '0%',
                          background: sport.color,
                          transition: `width 1s cubic-bezier(0.16,1,0.3,1) ${i * 80 + 200}ms`,
                          boxShadow: `0 0 8px ${sport.color}88`,
                        }} />
                    </div>
                    <span className="font-syne font-800 text-sm w-5" style={{ color: sport.color }}>{d.titles}</span>
                  </div>
                  <span className="sm:hidden font-syne font-800 text-base" style={{ color: sport.color }}>{d.titles}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Rivalries */}
          <div className="lg:col-span-2 space-y-4">
            <div className="glass-md rounded-3xl p-6" style={{ border: `1px solid ${sport.color}22` }}>
              <div className="flex items-center gap-2 mb-5">
                <Flame size={15} style={{ color: sport.color }} />
                <span className="font-syne font-700 text-sm">Classic Rivalries</span>
              </div>
              <div className="space-y-4">
                {sport.rivalries.map((r, i) => (
                  <div key={i} className="p-4 rounded-2xl"
                    style={{ background: `${sport.color}09`, border: `1px solid ${sport.color}20` }}>
                    <div className="font-syne font-700 text-sm mb-2 flex items-center gap-2"
                      style={{ color: sport.color }}>
                      <span>{r.a}</span>
                      <span className="text-white/25 font-normal">vs</span>
                      <span>{r.b}</span>
                      <Zap size={11} className="ml-auto" style={{ color: sport.color }} />
                    </div>
                    <p className="text-xs text-white/45 leading-relaxed">{r.desc}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Quick nav to schools */}
            <div className="glass-md rounded-3xl p-5" style={{ border: '1px solid rgba(255,255,255,0.08)' }}>
              <div className="text-xs text-white/30 uppercase tracking-widest font-syne mb-3">Explore by School</div>
              <div className="grid grid-cols-2 gap-2">
                {universities.map(u => (
                  <Link key={u.slug} href={`/universities/${u.slug}`}
                    className="flex items-center gap-2 p-2.5 rounded-xl transition-all hover:bg-white/4 group"
                    style={{ border: '1px solid transparent' }}>
                    <div className="w-6 h-6 rounded-lg flex items-center justify-center text-[10px] font-syne font-800 flex-shrink-0"
                      style={{ background: `${u.colors.primary}25`, color: u.colors.primary }}>
                      {u.shortName.slice(0, 1)}
                    </div>
                    <span className="text-xs text-white/45 group-hover:text-white/70 transition-colors">{u.shortName}</span>
                    <ArrowRight size={10} className="ml-auto text-white/15 group-hover:text-white/40 transition-all group-hover:translate-x-0.5" />
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* All-time title leaders */}
        <div className="glass-md rounded-3xl p-8" style={{ border: '1px solid rgba(255,255,255,0.07)' }}>
          <div className="flex items-center gap-2 mb-8">
            <Star size={16} className="text-yellow-400" style={{ filter: 'drop-shadow(0 0 8px rgba(250,204,21,0.6))' }} />
            <h2 className="font-syne font-700 text-lg">All-Time UAAP Title Leaders</h2>
            <span className="ml-auto text-xs text-white/25 font-syne">Combined all sports</span>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            {sortedByTitles.map((u, i) => (
              <Link key={u.slug} href={`/universities/${u.slug}`}
                className="p-5 rounded-2xl text-center group transition-all duration-400 hover:scale-105 hover:-translate-y-1 neon-border relative overflow-hidden"
                style={{ border: `1px solid ${u.colors.primary}28`, background: `${u.colors.primary}07` }}>
                <div className="absolute inset-0 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-400"
                  style={{ background: `radial-gradient(circle at 50% 0%,${u.colors.primary}18,transparent 70%)` }} />
                <div className="relative">
                  <div className="font-syne font-800 mb-0.5" style={{ fontSize: '2.5rem', color: u.colors.primary, lineHeight: 1 }}>
                    {u.sports.totalTitles}
                    <span className="text-lg opacity-50">+</span>
                  </div>
                  <div className="font-syne font-700 text-sm">{u.shortName}</div>
                  <div className="text-[11px] text-white/30 mt-0.5">{u.sports.dominantSport}</div>
                  {i === 0 && (
                    <div className="mt-2 text-[10px] text-yellow-400 font-semibold">👑 All-time leader</div>
                  )}
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </main>
  );
}
