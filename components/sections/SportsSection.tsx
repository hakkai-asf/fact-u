'use client';
import { useState } from 'react';
import Link from 'next/link';
import { Trophy, Flame, ChevronRight } from 'lucide-react';
import { universities } from '@/lib/universities';
import UnivLogo from '@/components/ui/UnivLogo';

const sports = [
  { id: 'bb', name: 'Basketball', color: '#f97316', desc: 'The crown jewel. DLSU leads all-time with 20 titles. The Ateneo-DLSU rivalry defines Philippine sports culture.', stat: '20 all-time titles — DLSU' },
  { id: 'vb', name: 'Volleyball',  color: '#a855f7', desc: 'NU Lady Bulldogs own a historic 4-peat dynasty. UST and DLSU are perennial challengers.',                   stat: '4-peat dynasty — NU (2021-24)' },
  { id: 'cd', name: 'Cheerdance', color: '#eab308', desc: 'UST Pep Squad — the most dominant cheerdance program ever with 13 titles and counting.',                        stat: '13 championships — UST' },
  { id: 'fb', name: 'Football',    color: '#22c55e', desc: 'UP Fighting Maroons dominate modern football with a strong scholarship pipeline.',                                stat: '6 recent titles — UP' },
];

// School slugs per sport for logo row
const SPORT_LEADERS: Record<string, string[]> = {
  bb: ['dlsu','ue','ateneo','feu','ust','up'],
  vb: ['nu','dlsu','ust','ateneo'],
  cd: ['ust','ateneo','dlsu','up'],
  fb: ['up','ateneo','dlsu','feu'],
};

export default function SportsSection() {
  const [active, setActive] = useState(0);

  return (
    <section className="py-20 sm:py-28 px-4 sm:px-6 relative overflow-hidden">
      <div className="absolute inset-0 pointer-events-none"
        style={{ background: 'radial-gradient(ellipse 50% 40% at 30% 50%, rgba(249,115,22,0.04), transparent)' }} />

      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 sm:mb-16 gap-6">
          <div>
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass-bright text-xs font-syne font-semibold tracking-widest uppercase mb-5"
              style={{ border: '1px solid rgba(249,115,22,0.32)', color: '#fb923c' }}>
              <Trophy size={11} /> UAAP Sports Culture
            </div>
            <h2 className="font-syne font-extrabold tracking-tight text-white" style={{ fontSize: 'clamp(2.2rem,5vw,4rem)' }}>
              The Spirit of<br /><span className="grad-warm">Competition</span>
            </h2>
          </div>
          <p className="text-sm sm:text-base max-w-xs md:text-right leading-relaxed" style={{ color: 'rgba(220,230,255,0.65)' }}>
            85+ years of athletic tradition, legendary rivalries, and championship dynasties.
          </p>
        </div>

        {/* Sport tabs */}
        <div className="flex flex-wrap gap-2 mb-8 sm:mb-10">
          {sports.map((s, i) => (
            <button key={s.id} onClick={() => setActive(i)}
              className="flex items-center gap-2 px-4 sm:px-5 py-2.5 rounded-full text-sm font-syne font-semibold transition-all duration-300 btn-magnetic"
              style={active === i
                ? { background: `${s.color}20`, border: `1px solid ${s.color}55`, color: s.color, boxShadow: `0 0 22px ${s.color}30` }
                : { background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.09)', color: 'rgba(220,230,255,0.55)' }
              }>
              <span className="font-mono text-[10px] font-bold px-1.5 py-0.5 rounded"
                style={{ background: `${s.color}20`, color: s.color }}>{s.id.toUpperCase()}</span>
              {s.name}
            </button>
          ))}
        </div>

        {/* Active sport card */}
        <div className="relative overflow-hidden rounded-2xl sm:rounded-3xl glass-md p-6 sm:p-10 md:p-12 mb-8"
          style={{
            border: `1px solid ${sports[active].color}30`,
            boxShadow: `0 0 50px ${sports[active].color}12`,
            transition: 'all 0.5s cubic-bezier(0.16,1,0.3,1)',
          }}>
          <div className="absolute top-0 right-0 w-64 sm:w-80 h-64 sm:h-80 rounded-full pointer-events-none"
            style={{ background: `radial-gradient(circle,${sports[active].color}15,transparent 70%)`, filter: 'blur(40px)' }} />

          <div className="relative flex flex-col sm:flex-row items-start gap-6 sm:gap-8">
            <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl sm:rounded-3xl flex-shrink-0 flex items-center justify-center font-mono font-extrabold text-lg sm:text-2xl"
              style={{ background: `${sports[active].color}18`, border: `1px solid ${sports[active].color}33`, color: sports[active].color }}>
              {sports[active].id.toUpperCase()}
            </div>
            <div className="flex-1">
              <h3 className="font-syne font-extrabold text-xl sm:text-2xl md:text-3xl mb-3 text-white">
                {sports[active].name}
              </h3>
              <p className="text-sm sm:text-base leading-relaxed mb-5" style={{ color: 'rgba(220,230,255,0.75)' }}>
                {sports[active].desc}
              </p>
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full mb-5"
                style={{ background: `${sports[active].color}14`, border: `1px solid ${sports[active].color}30` }}>
                <Flame size={13} style={{ color: sports[active].color }} />
                <span className="text-sm font-semibold" style={{ color: sports[active].color }}>
                  {sports[active].stat}
                </span>
              </div>
              {/* School logos row */}
              <div className="flex items-center gap-2 flex-wrap">
                <span className="text-xs font-syne mr-1" style={{ color: 'rgba(220,230,255,0.40)' }}>Leaders:</span>
                {(SPORT_LEADERS[sports[active].id] ?? []).map(slug => {
                  const u = universities.find(x => x.slug === slug);
                  if (!u) return null;
                  return (
                    <Link key={slug} href={`/universities/${slug}`}>
                      <UnivLogo slug={slug} name={u.shortName} color={u.colors.primary} size={32} rounded="lg"
                        style={{ transition: 'transform 0.2s' }}
                        className="hover:scale-110 transition-transform" />
                    </Link>
                  );
                })}
              </div>
            </div>
          </div>
        </div>

        <div className="flex justify-center">
          <Link href="/sports"
            className="flex items-center gap-2 px-5 sm:px-6 py-3 rounded-full font-syne font-semibold text-sm btn-magnetic"
            style={{ background: 'rgba(249,115,22,0.12)', border: '1px solid rgba(249,115,22,0.32)', color: '#fb923c' }}>
            <Trophy size={15} /> Full Sports Hub <ChevronRight size={14} />
          </Link>
        </div>
      </div>
    </section>
  );
}
