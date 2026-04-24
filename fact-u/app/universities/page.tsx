'use client';
import { useState } from 'react';
import Link from 'next/link';
import { universities } from '@/lib/universities';
import AnimatedBackground from '@/components/ui/AnimatedBackground';
import { Search, Trophy, GraduationCap, MapPin, ArrowRight } from 'lucide-react';

export default function UniversitiesPage() {
  const [q, setQ] = useState('');
  const [filter, setFilter] = useState<'all' | 'public' | 'private'>('all');

  const filtered = universities.filter((u) => {
    const matchQ = u.name.toLowerCase().includes(q.toLowerCase()) ||
      u.shortName.toLowerCase().includes(q.toLowerCase());
    const matchF = filter === 'all' || u.type === filter;
    return matchQ && matchF;
  });

  return (
    <main className="min-h-screen pt-24 pb-20 px-6">
      <AnimatedBackground primaryColor="#1e3a5f" secondaryColor="#312e81" />
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-sm font-medium mb-4"
            style={{ background: 'rgba(59,130,246,0.1)', border: '1px solid rgba(59,130,246,0.3)', color: '#93c5fd' }}>
            <GraduationCap size={12} /> All Member Universities
          </div>
          <h1 className="font-syne font-800 text-4xl md:text-6xl tracking-tight mb-4">
            UAAP <span className="grad-text">Universities</span>
          </h1>
          <p className="text-white/40 text-lg max-w-xl mx-auto">
            Explore all 8 member schools — their history, academics, sports, and culture.
          </p>
        </div>

        {/* Search + Filter */}
        <div className="flex flex-col sm:flex-row gap-4 mb-10 max-w-2xl mx-auto">
          <div className="relative flex-1">
            <Search size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-white/30" />
            <input
              value={q}
              onChange={(e) => setQ(e.target.value)}
              placeholder="Search university…"
              className="w-full pl-10 pr-4 py-3 rounded-2xl text-sm bg-white/5 border border-white/10 text-white placeholder-white/30 outline-none focus:border-blue-500/50 transition-all"
            />
          </div>
          <div className="flex gap-2">
            {(['all', 'public', 'private'] as const).map((f) => (
              <button key={f} onClick={() => setFilter(f)}
                className="px-4 py-2 rounded-xl text-sm font-medium capitalize transition-all"
                style={filter === f
                  ? { background: 'rgba(59,130,246,0.2)', border: '1px solid rgba(59,130,246,0.5)', color: '#93c5fd' }
                  : { background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', color: 'rgba(255,255,255,0.5)' }
                }>
                {f}
              </button>
            ))}
          </div>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filtered.map((u, i) => (
            <Link
              key={u.slug}
              href={`/universities/${u.slug}`}
              className="glass rounded-3xl overflow-hidden group transition-all duration-400 hover:scale-[1.03] hover:-translate-y-1"
              style={{
                border: `1px solid ${u.colors.primary}33`,
                animationDelay: `${i * 0.05}s`,
              }}
            >
              {/* Top color band */}
              <div className="h-2" style={{ background: `linear-gradient(90deg,${u.colors.primary},${u.colors.secondary})` }} />

              <div className="p-6">
                {/* Logo / initials */}
                <div className="flex items-start justify-between mb-4">
                  <div
                    className="w-14 h-14 rounded-2xl flex items-center justify-center font-syne font-800 text-lg transition-transform duration-300 group-hover:scale-110"
                    style={{ background: `${u.colors.primary}33`, border: `1px solid ${u.colors.primary}55`, color: u.colors.primary }}
                  >
                    {u.shortName.slice(0, 2)}
                  </div>
                  <span className="text-xs px-2 py-1 rounded-full capitalize"
                    style={{ background: 'rgba(255,255,255,0.06)', color: 'rgba(255,255,255,0.4)', border: '1px solid rgba(255,255,255,0.1)' }}>
                    {u.type}
                  </span>
                </div>

                <h3 className="font-syne font-700 text-base leading-snug mb-1 group-hover:text-white transition-colors">
                  {u.name}
                </h3>
                <p className="text-white/40 text-xs mb-4 italic">"{u.tagline}"</p>

                {/* Quick stats */}
                <div className="space-y-2 mb-5">
                  <div className="flex items-center gap-2 text-xs text-white/50">
                    <MapPin size={12} className="text-white/25" />
                    {u.location}
                  </div>
                  <div className="flex items-center gap-2 text-xs text-white/50">
                    <Trophy size={12} style={{ color: u.colors.primary }} />
                    {u.sports.totalTitles}+ UAAP titles · {u.sports.dominantSport}
                  </div>
                  <div className="flex items-center gap-2 text-xs text-white/50">
                    <GraduationCap size={12} className="text-indigo-400" />
                    {u.academics.qsRank.includes('Not') ? 'Local top institution' : `QS ${u.academics.qsRank}`}
                  </div>
                </div>

                {/* Explore btn */}
                <div className="flex items-center gap-1.5 text-sm font-semibold transition-all group-hover:gap-2.5"
                  style={{ color: u.colors.primary }}>
                  Explore <ArrowRight size={14} className="transition-transform duration-300 group-hover:translate-x-1" />
                </div>
              </div>
            </Link>
          ))}
        </div>

        {filtered.length === 0 && (
          <div className="text-center py-24 text-white/30">
            <GraduationCap size={48} className="mx-auto mb-4 opacity-30" />
            <p className="text-lg">No universities match your search.</p>
          </div>
        )}
      </div>
    </main>
  );
}
