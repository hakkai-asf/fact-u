'use client';
import Link from 'next/link';
import { Trophy, Flame, Star } from 'lucide-react';

const sportHighlights = [
  {
    sport: 'Basketball',
    emoji: '🏀',
    color: '#f97316',
    dominant: 'DLSU (20 titles), UE (18), Ateneo (12)',
    highlight: 'Most-watched UAAP sport. The FEU-DLSU-Ateneo-UP rivalries define Philippine sports culture.',
    mvps: 'Ben Mbala, Ange Kouamé, Ricci Rivero',
  },
  {
    sport: 'Volleyball',
    emoji: '🏐',
    color: '#a855f7',
    dominant: 'NU (9 titles), DLSU (9), UST (9)',
    highlight: 'NU Lady Bulldogs set the standard with a historic 4-peat dynasty (2021–2024).',
    mvps: 'Alyssa Valdez, Aiza Maizo, Tots Carlos',
  },
  {
    sport: 'Cheerdance',
    emoji: '📣',
    color: '#eab308',
    dominant: 'UST Pep Squad (13 titles)',
    highlight: 'The UAAP CDC is the most intense non-athletic competition — UST is the reigning dynasty.',
    mvps: 'UST Pep Squad — perennial champions',
  },
  {
    sport: 'Football',
    emoji: '⚽',
    color: '#22c55e',
    dominant: 'UP Fighting Maroons (6 titles)',
    highlight: 'UP has emerged as the dominant football program, winning back-to-back in recent seasons.',
    mvps: 'Multiple UP Scholar-athletes',
  },
];

export default function SportsSection() {
  return (
    <section className="py-24 px-6 relative">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-sm font-medium mb-4"
            style={{ background: 'rgba(249,115,22,0.1)', border: '1px solid rgba(249,115,22,0.3)', color: '#fb923c' }}>
            <Trophy size={12} />
            UAAP Sports Culture
          </div>
          <h2 className="font-syne font-800 text-4xl md:text-5xl tracking-tight mb-3">
            The Spirit of <span style={{ background: 'linear-gradient(135deg,#f97316,#ef4444)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>Competition</span>
          </h2>
          <p className="text-white/40 text-lg max-w-xl mx-auto">
            Over 85 years of athletic tradition, rivalry, and school pride across 15+ sports tournaments.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {sportHighlights.map((s) => (
            <div
              key={s.sport}
              className="glass rounded-3xl p-6 transition-all duration-300 hover:scale-[1.02] group"
              style={{ border: `1px solid ${s.color}33` }}
            >
              <div className="flex items-start gap-4">
                <div
                  className="w-14 h-14 rounded-2xl flex items-center justify-center text-2xl flex-shrink-0 transition-transform duration-300 group-hover:scale-110"
                  style={{ background: `${s.color}22`, border: `1px solid ${s.color}44` }}
                >
                  {s.emoji}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-2">
                    <h3 className="font-syne font-700 text-xl" style={{ color: s.color }}>{s.sport}</h3>
                    <Flame size={14} style={{ color: s.color }} />
                  </div>
                  <p className="text-white/60 text-sm mb-3 leading-relaxed">{s.highlight}</p>
                  <div className="space-y-1.5 text-xs">
                    <div className="flex gap-2">
                      <span className="text-white/30 w-20 flex-shrink-0">Dominant:</span>
                      <span className="text-white/60">{s.dominant}</span>
                    </div>
                    <div className="flex gap-2">
                      <span className="text-white/30 w-20 flex-shrink-0">Stars:</span>
                      <span className="text-white/60">{s.mvps}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-12">
          <Link
            href="/sports"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-full font-semibold text-sm transition-all hover:scale-105"
            style={{ background: 'rgba(249,115,22,0.15)', border: '1px solid rgba(249,115,22,0.4)', color: '#fb923c' }}
          >
            <Trophy size={16} />
            View Full Sports Hub
          </Link>
        </div>
      </div>
    </section>
  );
}
