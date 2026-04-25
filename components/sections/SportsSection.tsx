'use client';
import { useRef, useState } from 'react';
import Link from 'next/link';
import { Trophy, Flame, ChevronRight } from 'lucide-react';

const sports = [
  { emoji:'🏀', name:'Basketball', color:'#f97316', desc:'The crown jewel. DLSU leads all-time with 20 titles. The Ateneo-DLSU rivalry is Philippine sports culture.',    stat:'20 all-time titles by DLSU' },
  { emoji:'🏐', name:'Volleyball',  color:'#a855f7', desc:'NU Lady Bulldogs own a historic 4-peat dynasty. UST and DLSU are perennial challengers.',                   stat:'4-peat dynasty by NU (2021–24)' },
  { emoji:'📣', name:'Cheerdance', color:'#eab308', desc:'UST Pep Squad is the most dominant program ever — 13 titles and counting. The CDC is its own religion.',       stat:'13 championships by UST' },
  { emoji:'⚽', name:'Football',    color:'#22c55e', desc:'UP Fighting Maroons dominate modern football, leveraging a strong scholarship pipeline and technical coaching.', stat:'6 recent titles by UP' },
];

export default function SportsSection() {
  const [active, setActive] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);

  return (
    <section className="py-28 px-6 relative overflow-hidden">
      {/* BG accent */}
      <div className="absolute inset-0 pointer-events-none"
        style={{ background: 'radial-gradient(ellipse 50% 40% at 30% 50%, rgba(249,115,22,0.06), transparent)' }} />

      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <div>
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-syne font-600 tracking-widest uppercase mb-5 glass-bright"
              style={{ border: '1px solid rgba(249,115,22,0.3)', color: '#fb923c' }}>
              <Trophy size={11} /> UAAP Sports Culture
            </div>
            <h2 className="font-syne font-800 text-5xl md:text-6xl tracking-tight">
              The Spirit of<br /><span className="grad-warm">Competition</span>
            </h2>
          </div>
          <p className="text-white/35 text-base max-w-xs md:text-right leading-relaxed">
            85+ years of athletic tradition, legendary rivalries, and championship dynasties.
          </p>
        </div>

        {/* Sport selector pills */}
        <div className="flex flex-wrap gap-2 mb-10">
          {sports.map((s, i) => (
            <button key={s.name} onClick={() => setActive(i)}
              className="flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-syne font-600 transition-all duration-400 btn-magnetic"
              style={active === i
                ? { background: `${s.color}20`, border: `1px solid ${s.color}55`, color: s.color, boxShadow: `0 0 25px ${s.color}33` }
                : { background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)', color: 'rgba(255,255,255,0.4)' }
              }>
              {s.emoji} {s.name}
            </button>
          ))}
        </div>

        {/* Active sport card */}
        <div className="relative overflow-hidden rounded-3xl glass-md p-8 md:p-12 mb-8"
          style={{
            border: `1px solid ${sports[active].color}33`,
            boxShadow: `0 0 60px ${sports[active].color}15`,
            transition: 'all 0.6s cubic-bezier(0.16,1,0.3,1)',
          }}>
          {/* BG glow */}
          <div className="absolute top-0 right-0 w-80 h-80 rounded-full pointer-events-none"
            style={{ background: `radial-gradient(circle,${sports[active].color}1a,transparent 70%)`, filter: 'blur(40px)' }} />

          <div className="relative flex flex-col md:flex-row items-start gap-8">
            <div className="w-20 h-20 rounded-2xl flex-shrink-0 flex items-center justify-center text-5xl"
              style={{ background: `${sports[active].color}18`, border: `1px solid ${sports[active].color}33` }}>
              {sports[active].emoji}
            </div>
            <div className="flex-1">
              <h3 className="font-syne font-800 text-2xl md:text-3xl mb-3" style={{ color: sports[active].color }}>
                {sports[active].name}
              </h3>
              <p className="text-white/60 text-base leading-relaxed mb-5">{sports[active].desc}</p>
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full"
                style={{ background: `${sports[active].color}15`, border: `1px solid ${sports[active].color}33` }}>
                <Flame size={13} style={{ color: sports[active].color }} />
                <span className="text-sm font-semibold" style={{ color: sports[active].color }}>
                  {sports[active].stat}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* CTA */}
        <div className="flex justify-center">
          <Link href="/sports"
            className="flex items-center gap-2 px-6 py-3 rounded-full font-syne font-600 text-sm btn-magnetic"
            style={{ background: 'rgba(249,115,22,0.12)', border: '1px solid rgba(249,115,22,0.35)', color: '#fb923c' }}>
            <Trophy size={15} /> Full Sports Hub <ChevronRight size={14} />
          </Link>
        </div>
      </div>
    </section>
  );
}
