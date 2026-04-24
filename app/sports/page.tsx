'use client';
import { useState } from 'react';
import Link from 'next/link';
import { universities } from '@/lib/universities';
import AnimatedBackground from '@/components/ui/AnimatedBackground';
import { Trophy, Star, Flame, ArrowRight, Users } from 'lucide-react';

const SPORTS_DATA = [
  {
    name: 'Basketball',
    emoji: '🏀',
    color: '#f97316',
    overview: 'The crown jewel of UAAP sports. The basketball tournament draws the biggest crowds, most national TV coverage, and the most intense school rivalries in Philippine sports history.',
    culture: 'Every school year, UAAP Basketball defines school pride. The classic matchups — Ateneo vs DLSU, FEU vs UE — are battles that transcend sport. Alumni, students, and fans pack the Smart Araneta Coliseum every game day.',
    dominance: [
      { school: 'DLSU Green Archers', titles: 20, note: 'Most titles all-time, Animo La Salle dynasty' },
      { school: 'UE Red Warriors', titles: 18, note: 'Historic powerhouse, PBA pipeline program' },
      { school: 'Ateneo Blue Eagles', titles: 12, note: '4-peat dynasty (2018–2022), Blue Eagle Army' },
      { school: 'FEU Tamaraws', titles: 7, note: 'Competitive contender, recent Final Four appearances' },
      { school: 'UST Growling Tigers', titles: 7, note: 'Storied program with passionate Thomasian following' },
      { school: 'UP Fighting Maroons', titles: 2, note: 'Back-to-back 2022–2023 champions, historic comeback' },
    ],
    rivalries: ['Ateneo vs La Salle (ADMU-DLSU game is the most-watched)', 'FEU vs UE (historical Manila rivalry)', 'UP vs everyone (underdog narrative)', 'NU vs Ateneo (recent contender clash)'],
  },
  {
    name: 'Volleyball',
    emoji: '🏐',
    color: '#a855f7',
    overview: 'UAAP Volleyball has exploded in popularity, now rivaling basketball. The women\'s tournament especially draws massive crowds and has produced some of the Philippines\' biggest sports celebrities.',
    culture: 'NU Lady Bulldogs dominate headlines, but UST, DLSU, and Ateneo all have passionate fan bases. Volleyball has elevated women\'s sports in Philippine consciousness.',
    dominance: [
      { school: 'NU Lady Bulldogs', titles: 9, note: '4-peat dynasty 2021–2024, volleyball powerhouse' },
      { school: 'DLSU Lady Spikers', titles: 9, note: 'Storied program with multiple eras of dominance' },
      { school: 'UST Tigresses', titles: 9, note: 'Championship pedigree, passionate fan base' },
      { school: 'Ateneo Lady Eagles', titles: 5, note: 'Consistent Final Four, strong recent performances' },
    ],
    rivalries: ['NU vs UST (recent dynasty challengers)', 'DLSU vs Ateneo (perennial contenders)', 'The Grand Slam race — who wins all titles in a year'],
  },
  {
    name: 'Cheerdance',
    emoji: '📣',
    color: '#f59e0b',
    overview: 'The UAAP Cheerdance Competition (CDC) is the most spectacular non-athletic event in Philippine sports. Teams perform elaborate routines with stunts, choreography, and theatrical elements.',
    culture: 'UST Pep Squad is the undisputed dynasty. The CDC is taken with deadly seriousness — schools train for months. Fans watch as intensely as any game.',
    dominance: [
      { school: 'UST Pep Squad', titles: 13, note: 'The most dominant program in CDC history' },
      { school: 'Ateneo Pep Squad', titles: 4, note: 'Consistent challenger and perennial contender' },
      { school: 'DLSU Animo Squad', titles: 4, note: 'Strong artistic program, crowd favorites' },
      { school: 'UP Pep Squad', titles: 3, note: 'Known for creative, intellectually-themed performances' },
    ],
    rivalries: ['UST vs everyone else', 'The artistic vs athleticism debate between schools'],
  },
  {
    name: 'Football',
    emoji: '⚽',
    color: '#22c55e',
    overview: 'Football is the fastest-growing UAAP sport. The UP Fighting Maroons have emerged as the dominant force, with consistent scholarship support and a committed player development pipeline.',
    culture: 'Football has a passionate, growing niche following. UP\'s dominance has brought the sport more attention. Schools with scholarship programs are pulling ahead.',
    dominance: [
      { school: 'UP Fighting Maroons', titles: 6, note: 'Recent dominant force, back-to-back champions' },
      { school: 'Ateneo Blue Eagles', titles: 4, note: 'Strong football program with technical discipline' },
      { school: 'DLSU Green Archers', titles: 3, note: 'Growing program with consistent top placements' },
      { school: 'FEU Tamaraws', titles: 2, note: 'Historical contenders in the sport' },
    ],
    rivalries: ['UP vs Ateneo (scholarly-academic rivalry extends to the pitch)', 'The "football school" debate as the sport grows'],
  },
];

export default function SportsPage() {
  const [activeSport, setActiveSport] = useState(SPORTS_DATA[0].name);
  const sport = SPORTS_DATA.find((s) => s.name === activeSport)!;

  return (
    <main className="min-h-screen pt-24 pb-20 px-6">
      <AnimatedBackground primaryColor="#7c2d12" secondaryColor="#4c1d95" intensity={0.25} />
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-sm font-medium mb-4"
            style={{ background: 'rgba(249,115,22,0.1)', border: '1px solid rgba(249,115,22,0.3)', color: '#fb923c' }}>
            <Trophy size={12} /> UAAP Sports Hub
          </div>
          <h1 className="font-syne font-800 text-4xl md:text-6xl tracking-tight mb-4">
            The Spirit of <span style={{ background: 'linear-gradient(135deg,#f97316,#ef4444)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>UAAP</span>
          </h1>
          <p className="text-white/40 text-lg max-w-xl mx-auto">
            85+ years of athletic tradition, school pride, legendary rivalries, and championship dynasties.
          </p>
        </div>

        {/* Sport tabs */}
        <div className="flex flex-wrap justify-center gap-3 mb-12">
          {SPORTS_DATA.map((s) => (
            <button key={s.name} onClick={() => setActiveSport(s.name)}
              className="flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-semibold transition-all duration-300"
              style={activeSport === s.name
                ? { background: `${s.color}22`, border: `1px solid ${s.color}66`, color: s.color, boxShadow: `0 0 20px ${s.color}33` }
                : { background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', color: 'rgba(255,255,255,0.5)' }
              }>
              <span>{s.emoji}</span>
              {s.name}
            </button>
          ))}
        </div>

        {/* Sport detail */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-10">
          <div className="lg:col-span-2 space-y-6">
            <div className="glass rounded-3xl p-8" style={{ border: `1px solid ${sport.color}33` }}>
              <div className="flex items-center gap-3 mb-4">
                <span className="text-4xl">{sport.emoji}</span>
                <div>
                  <h2 className="font-syne font-800 text-2xl" style={{ color: sport.color }}>{sport.name}</h2>
                  <div className="flex items-center gap-1 text-xs text-white/30"><Flame size={11} /> UAAP Tournament</div>
                </div>
              </div>
              <p className="text-white/60 leading-relaxed mb-4">{sport.overview}</p>
              <p className="text-white/50 text-sm leading-relaxed">{sport.culture}</p>
            </div>

            {/* Championship table */}
            <div className="glass rounded-3xl overflow-hidden" style={{ border: `1px solid ${sport.color}22` }}>
              <div className="px-6 py-4" style={{ borderBottom: '1px solid rgba(255,255,255,0.07)' }}>
                <h3 className="font-syne font-700 text-base flex items-center gap-2">
                  <Trophy size={15} style={{ color: sport.color }} /> Championship Leaders
                </h3>
              </div>
              <div className="divide-y divide-white/5">
                {sport.dominance.map((d, i) => (
                  <div key={d.school} className="px-6 py-4 flex items-center gap-4">
                    <div className="w-7 h-7 rounded-full flex items-center justify-center text-sm font-bold flex-shrink-0"
                      style={i === 0
                        ? { background: 'rgba(250,204,21,0.2)', color: '#fcd34d' }
                        : { background: 'rgba(255,255,255,0.07)', color: 'rgba(255,255,255,0.4)' }
                      }>
                      {i + 1}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="font-semibold text-sm">{d.school}</div>
                      <div className="text-xs text-white/40 truncate">{d.note}</div>
                    </div>
                    <div className="flex items-center gap-1 flex-shrink-0">
                      <span className="font-bold text-lg" style={{ color: sport.color }}>{d.titles}</span>
                      <span className="text-xs text-white/30">titles</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Rivalries + quick nav */}
          <div className="space-y-5">
            <div className="glass rounded-3xl p-6" style={{ border: `1px solid ${sport.color}22` }}>
              <h3 className="font-syne font-700 text-base mb-4 flex items-center gap-2">
                <Flame size={14} style={{ color: sport.color }} /> Classic Rivalries
              </h3>
              <ul className="space-y-3">
                {sport.rivalries.map((r) => (
                  <li key={r} className="text-sm text-white/55 flex items-start gap-2 leading-relaxed">
                    <span style={{ color: sport.color, flexShrink: 0 }}>⚡</span>
                    {r}
                  </li>
                ))}
              </ul>
            </div>

            <div className="glass rounded-3xl p-6" style={{ border: '1px solid rgba(255,255,255,0.1)' }}>
              <h3 className="font-syne font-700 text-base mb-4">Explore by University</h3>
              <div className="space-y-2">
                {universities.map((u) => (
                  <Link key={u.slug} href={`/universities/${u.slug}`}
                    className="flex items-center justify-between p-3 rounded-xl glass-hover text-sm text-white/60 hover:text-white transition-all group">
                    <div className="flex items-center gap-2">
                      <div className="w-6 h-6 rounded-lg flex items-center justify-center text-xs font-bold"
                        style={{ background: `${u.colors.primary}33`, color: u.colors.primary }}>
                        {u.shortName.slice(0, 1)}
                      </div>
                      {u.shortName}
                    </div>
                    <ArrowRight size={13} className="opacity-0 group-hover:opacity-100 transition-opacity" />
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Title leaders overview */}
        <div className="glass rounded-3xl p-8" style={{ border: '1px solid rgba(255,255,255,0.08)' }}>
          <h2 className="font-syne font-700 text-xl mb-6 flex items-center gap-2">
            <Star className="text-yellow-400" size={18} /> All-Time UAAP Title Leaders
          </h2>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            {universities.sort((a, b) => b.sports.totalTitles - a.sports.totalTitles).map((u, i) => (
              <Link key={u.slug} href={`/universities/${u.slug}`}
                className="p-4 rounded-2xl text-center transition-all hover:scale-105 group glass-hover"
                style={{ border: `1px solid ${u.colors.primary}33` }}>
                <div className="font-syne font-800 text-3xl mb-1" style={{ color: u.colors.primary }}>{u.sports.totalTitles}+</div>
                <div className="font-semibold text-sm">{u.shortName}</div>
                <div className="text-xs text-white/30 mt-0.5">{u.sports.dominantSport}</div>
                {i === 0 && <div className="text-xs mt-1.5 text-yellow-400">👑 All-time leader</div>}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </main>
  );
}
