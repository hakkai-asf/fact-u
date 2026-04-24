'use client';
import { useState } from 'react';
import Link from 'next/link';
import { universities } from '@/lib/universities';
import AnimatedBackground from '@/components/ui/AnimatedBackground';
import ScoreBar from '@/components/ui/ScoreBar';
import { GraduationCap, BookOpen, Star, ArrowRight, ExternalLink, Trophy } from 'lucide-react';

export default function AcademicsPage() {
  const [activeSlug, setActiveSlug] = useState(universities[0].slug);
  const active = universities.find((u) => u.slug === activeSlug)!;

  const sorted = [...universities].sort((a, b) => {
    const rankA = a.academics.qsRankNumber ?? 2000;
    const rankB = b.academics.qsRankNumber ?? 2000;
    return rankA - rankB;
  });

  return (
    <main className="min-h-screen pt-24 pb-20 px-6">
      <AnimatedBackground primaryColor="#1e3a5f" secondaryColor="#4c1d95" intensity={0.25} />
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-sm font-medium mb-4"
            style={{ background: 'rgba(99,102,241,0.1)', border: '1px solid rgba(99,102,241,0.3)', color: '#a5b4fc' }}>
            <GraduationCap size={12} /> Academic Rankings & Programs
          </div>
          <h1 className="font-syne font-800 text-4xl md:text-6xl tracking-tight mb-4">
            Academic <span className="grad-text">Excellence</span>
          </h1>
          <p className="text-white/40 text-lg max-w-xl mx-auto">
            QS World Rankings, tuition ranges, top programs, and academic strength scores across all 8 UAAP universities.
          </p>
        </div>

        {/* QS Rankings Overview */}
        <div className="glass rounded-3xl overflow-hidden mb-10" style={{ border: '1px solid rgba(99,102,241,0.3)' }}>
          <div className="px-6 py-5 flex items-center gap-3" style={{ borderBottom: '1px solid rgba(255,255,255,0.07)' }}>
            <Star size={18} className="text-indigo-400" />
            <div>
              <div className="font-syne font-700 text-base">QS World University Rankings</div>
              <div className="text-xs text-white/40">Based on latest available QS ranking cycle</div>
            </div>
          </div>
          <div className="divide-y divide-white/5">
            {sorted.map((u, i) => {
              const ranked = !u.academics.qsRank.includes('Not');
              return (
                <Link key={u.slug} href={`/universities/${u.slug}?tab=academics`}
                  className="flex items-center gap-4 px-6 py-4 hover:bg-white/3 transition-all group">
                  <div className="w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold flex-shrink-0"
                    style={i < 3 ? { background: 'rgba(250,204,21,0.15)', color: '#fcd34d' } : { background: 'rgba(255,255,255,0.07)', color: 'rgba(255,255,255,0.4)' }}>
                    {i + 1}
                  </div>
                  <div className="w-10 h-10 rounded-xl flex items-center justify-center text-xs font-bold flex-shrink-0"
                    style={{ background: `${u.colors.primary}33`, color: u.colors.primary }}>
                    {u.shortName.slice(0, 2)}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="font-semibold text-sm group-hover:text-white transition-colors">{u.name}</div>
                    <div className="text-xs text-white/35">{u.academics.qsRegionalRank}</div>
                  </div>
                  <div className="text-right flex-shrink-0">
                    <div className={`font-bold text-sm ${ranked ? '' : 'text-white/30'}`}
                      style={ranked ? { color: u.colors.primary } : {}}>
                      {ranked ? u.academics.qsRank : 'Unranked'}
                    </div>
                    <div className="text-xs text-white/30">QS Rank</div>
                  </div>
                  {ranked && (
                    <div className="px-2 py-1 rounded-full text-xs flex-shrink-0"
                      style={{ background: 'rgba(250,204,21,0.1)', color: '#fcd34d', border: '1px solid rgba(250,204,21,0.2)' }}>
                      QS Ranked
                    </div>
                  )}
                  <ArrowRight size={13} className="text-white/20 group-hover:text-white/60 transition-colors flex-shrink-0" />
                </Link>
              );
            })}
          </div>
        </div>

        {/* Tuition comparison */}
        <div className="glass rounded-3xl p-8 mb-10" style={{ border: '1px solid rgba(255,255,255,0.1)' }}>
          <h2 className="font-syne font-700 text-xl mb-2 flex items-center gap-2">
            <BookOpen size={18} className="text-green-400" /> Tuition Cost Comparison
          </h2>
          <p className="text-white/40 text-sm mb-6">Estimated annual cost range. Public universities are significantly subsidized.</p>
          <div className="space-y-4">
            {[...universities].sort((a, b) => a.academics.tuitionScore - b.academics.tuitionScore).map((u, i) => (
              <div key={u.slug} className="flex items-center gap-4">
                <div className="w-10 text-sm font-semibold" style={{ color: u.colors.primary }}>{u.shortName}</div>
                <div className="flex-1">
                  <div className="flex items-center justify-between text-xs text-white/40 mb-1">
                    <span>{u.academics.tuitionRange}</span>
                    <span className="px-2 py-0.5 rounded-full"
                      style={{
                        background: u.academics.tuitionLabel === 'Low' ? 'rgba(34,197,94,0.15)' : u.academics.tuitionLabel === 'Medium' ? 'rgba(234,179,8,0.15)' : 'rgba(239,68,68,0.15)',
                        color: u.academics.tuitionLabel === 'Low' ? '#86efac' : u.academics.tuitionLabel === 'Medium' ? '#fde047' : '#fca5a5',
                      }}>
                      {u.academics.tuitionLabel}
                    </span>
                  </div>
                  <div className="h-2.5 rounded-full overflow-hidden" style={{ background: 'rgba(255,255,255,0.07)' }}>
                    <div className="h-full rounded-full transition-all duration-1000"
                      style={{
                        width: `${(u.academics.tuitionScore / 10) * 100}%`,
                        background: `linear-gradient(90deg,${u.colors.primary},${u.colors.secondary})`,
                        transitionDelay: `${i * 80}ms`,
                      }} />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Deep dive selector */}
        <div className="mb-6">
          <h2 className="font-syne font-700 text-2xl mb-6">
            Deep Dive: <span className="grad-text">University Academic Profile</span>
          </h2>
          <div className="flex flex-wrap gap-2 mb-8">
            {universities.map((u) => (
              <button key={u.slug} onClick={() => setActiveSlug(u.slug)}
                className="px-4 py-2 rounded-xl text-sm font-semibold transition-all"
                style={activeSlug === u.slug
                  ? { background: `${u.colors.primary}33`, border: `1px solid ${u.colors.primary}66`, color: u.colors.primary }
                  : { background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', color: 'rgba(255,255,255,0.5)' }
                }>
                {u.shortName}
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="glass rounded-3xl p-8" style={{ border: `1px solid ${active.colors.primary}33` }}>
            <h3 className="font-syne font-700 text-lg mb-2" style={{ color: active.colors.primary }}>{active.name}</h3>
            <p className="text-white/50 text-sm leading-relaxed mb-6">{active.academics.overview}</p>
            <div className="space-y-3">
              <ScoreBar label="Academic Reputation" value={active.academics.scores.academicReputation} color={active.colors.primary} delay={0} />
              <ScoreBar label="Program Strength" value={active.academics.scores.programStrength} color={active.colors.primary} delay={100} />
              <ScoreBar label="Research Output" value={active.academics.scores.researchOutput} color={active.colors.secondary} delay={200} />
              <ScoreBar label="Industry Alignment" value={active.academics.scores.industryAlignment} color={active.colors.secondary} delay={300} />
            </div>
          </div>

          <div className="space-y-4">
            <div className="glass rounded-3xl p-6" style={{ border: `1px solid ${active.colors.primary}22` }}>
              <h3 className="font-semibold text-sm text-white/60 mb-4">Top Programs</h3>
              <div className="space-y-3">
                {active.academics.topPrograms.map((p, i) => (
                  <div key={p.name} className="flex items-center gap-3 text-sm">
                    <span className="text-white/30 text-xs w-4">{i + 1}.</span>
                    <span className="flex-1 text-white/70">{p.name}</span>
                    <div className="flex gap-0.5">
                      {Array.from({ length: 5 }).map((_, j) => (
                        <div key={j} className="w-2 h-2 rounded-sm"
                          style={{ background: j < Math.round(p.strength / 2) ? active.colors.primary : 'rgba(255,255,255,0.1)' }} />
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="glass rounded-3xl p-6" style={{ border: `1px solid ${active.colors.primary}22` }}>
              <h3 className="font-semibold text-sm text-white/60 mb-3">Colleges & Schools</h3>
              <ul className="space-y-1.5">
                {active.academics.colleges.map((c) => (
                  <li key={c} className="text-xs text-white/50 flex items-center gap-2">
                    <span style={{ color: active.colors.primary }}>›</span>{c}
                  </li>
                ))}
              </ul>
            </div>
            <Link href={`/universities/${active.slug}`}
              className="flex items-center justify-center gap-2 py-3 rounded-2xl font-semibold text-sm transition-all hover:scale-105"
              style={{ background: `linear-gradient(135deg,${active.colors.primary},${active.colors.secondary})`, boxShadow: `0 0 20px ${active.colors.primary}44` }}>
              Full {active.shortName} Profile <ArrowRight size={14} />
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
}
