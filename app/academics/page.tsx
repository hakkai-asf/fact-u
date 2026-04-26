'use client';
import { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import { universities } from '@/lib/universities';
import NebulaBackground from '@/components/ui/NebulaBackground';
import UnivLogo from '@/components/ui/UnivLogo';
import ScoreBar from '@/components/ui/ScoreBar';
import { GraduationCap, BookOpen, Star, ArrowRight, Zap, TrendingUp } from 'lucide-react';

export default function AcademicsPage() {
  const [activeSlug, setActiveSlug] = useState(universities[0].slug);
  const [hoveredBar, setHoveredBar] = useState<string | null>(null);
  const active = universities.find(u => u.slug === activeSlug)!;

  const sorted = [...universities].sort((a, b) => {
    const ra = a.academics.qsRankNumber ?? 9999;
    const rb = b.academics.qsRankNumber ?? 9999;
    return ra - rb;
  });
  const tuitionSorted = [...universities].sort((a, b) => a.academics.tuitionScore - b.academics.tuitionScore);

  return (
    <main className="min-h-screen pt-24 pb-24 px-4 sm:px-6">
      <NebulaBackground primaryColor="#1e3a5f" secondaryColor="#3b0764" intensity={0.85} />

      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12 sm:mb-16 pt-4 sm:pt-8">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass-bright text-xs font-syne font-semibold tracking-widest uppercase mb-5"
            style={{ border: '1px solid rgba(99,102,241,0.38)', color: '#a5b4fc' }}>
            <GraduationCap size={11} /> Academic Rankings and Programs
          </div>
          <h1 className="font-syne font-extrabold leading-tight tracking-tight mb-4 text-white"
            style={{ fontSize: 'clamp(3rem,7vw,6rem)' }}>
            Academic <span className="grad">Excellence</span>
          </h1>
          <p className="text-lg max-w-md mx-auto" style={{ color: 'rgba(220,228,255,0.65)' }}>
            QS World Rankings, tuition comparison, top programs, and academic strength across all 8 UAAP schools.
          </p>
        </div>

        {/* QS Rankings table */}
        <div className="glass-md rounded-2xl sm:rounded-3xl overflow-hidden mb-10"
          style={{ border: '1px solid rgba(99,102,241,0.28)' }}>
          <div className="px-6 sm:px-8 py-5 flex items-center gap-3"
            style={{ borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
            <Star size={16} style={{ color: '#818cf8', filter: 'drop-shadow(0 0 8px rgba(99,102,241,0.65))' }} />
            <div>
              <div className="font-syne font-bold text-base text-white">QS World University Rankings</div>
              <div className="text-xs" style={{ color: 'rgba(220,228,255,0.40)' }}>Based on latest available QS ranking cycle</div>
            </div>
            <div className="ml-auto text-xs px-3 py-1 rounded-full"
              style={{ background: 'rgba(99,102,241,0.15)', color: '#a5b4fc', border: '1px solid rgba(99,102,241,0.32)' }}>
              Official QS Data
            </div>
          </div>
          <div className="divide-y divide-white/5">
            {sorted.map((u, i) => {
              const ranked = !u.academics.qsRank.includes('Not');
              return (
                <Link key={u.slug} href={`/universities/${u.slug}`}
                  className="flex items-center gap-3 sm:gap-4 px-5 sm:px-8 py-4 sm:py-5 hover:bg-white/2 transition-all group">
                  {/* Rank number */}
                  <div className="w-8 h-8 rounded-full flex items-center justify-center text-sm font-syne font-extrabold flex-shrink-0"
                    style={i < 3
                      ? { background: 'rgba(251,191,36,0.14)', color: '#fcd34d', boxShadow: '0 0 12px rgba(251,191,36,0.2)' }
                      : { background: 'rgba(255,255,255,0.06)', color: 'rgba(220,228,255,0.38)' }}>
                    {i + 1}
                  </div>
                  {/* Real university logo */}
                  <UnivLogo slug={u.slug} name={u.shortName} color={u.colors.primary} size={44} rounded="xl" className="flex-shrink-0" />
                  {/* Info */}
                  <div className="flex-1 min-w-0">
                    <div className="font-syne font-semibold text-sm group-hover:text-white transition-colors text-white">{u.name}</div>
                    <div className="text-xs mt-0.5" style={{ color: 'rgba(220,228,255,0.40)' }}>{u.academics.qsRegionalRank}</div>
                  </div>
                  {/* Bar desktop */}
                  <div className="hidden md:flex items-center gap-3 w-48 flex-shrink-0">
                    <div className="flex-1 h-1.5 rounded-full overflow-hidden" style={{ background: 'rgba(255,255,255,0.07)' }}>
                      <div className="h-full rounded-full"
                        style={{
                          width: ranked ? `${Math.max(10, 100 - ((u.academics.qsRankNumber! - 800) / 400) * 80)}%` : '12%',
                          background: ranked ? `linear-gradient(90deg,${u.colors.primary},${u.colors.secondary})` : 'rgba(255,255,255,0.15)',
                          boxShadow: ranked ? `0 0 8px ${u.colors.primary}66` : 'none',
                        }} />
                    </div>
                  </div>
                  {/* Rank label */}
                  <div className="flex-shrink-0 text-right">
                    <div className="font-syne font-bold text-sm"
                      style={{ color: ranked ? u.colors.primary : 'rgba(220,228,255,0.30)' }}>
                      {ranked ? u.academics.qsRank : 'Unranked'}
                    </div>
                  </div>
                  {ranked && (
                    <span className="hidden sm:block px-2.5 py-1 rounded-full text-[10px] font-syne font-semibold flex-shrink-0"
                      style={{ background: 'rgba(251,191,36,0.12)', color: '#fcd34d', border: '1px solid rgba(251,191,36,0.28)' }}>
                      QS Ranked
                    </span>
                  )}
                  <ArrowRight size={13} className="text-white/20 group-hover:text-white/55 transition-all group-hover:translate-x-1 flex-shrink-0" />
                </Link>
              );
            })}
          </div>
        </div>

        {/* Tuition comparison */}
        <div className="glass-md rounded-2xl sm:rounded-3xl p-6 sm:p-8 mb-10" style={{ border: '1px solid rgba(255,255,255,0.09)' }}>
          <div className="flex items-center justify-between mb-7">
            <div className="flex items-center gap-3">
              <TrendingUp size={18} style={{ color: '#4ade80', filter: 'drop-shadow(0 0 8px rgba(74,222,128,0.55))' }} />
              <div>
                <div className="font-syne font-bold text-base text-white">Tuition Cost Comparison</div>
                <div className="text-xs" style={{ color: 'rgba(220,228,255,0.40)' }}>Estimated annual range · Public universities are subsidized</div>
              </div>
            </div>
            <div className="hidden sm:flex gap-3 text-[10px] font-syne font-semibold">
              {[['Low','#4ade80'],['Medium','#facc15'],['High','#fb923c'],['Premium','#f87171']].map(([l,c]) => (
                <span key={l} className="flex items-center gap-1" style={{ color: 'rgba(220,228,255,0.55)' }}>
                  <span className="w-2 h-2 rounded-full" style={{ background: c }} />{l}
                </span>
              ))}
            </div>
          </div>
          <div className="space-y-5">
            {tuitionSorted.map((u, i) => {
              const cmap: Record<string,string> = { Low:'#4ade80', Medium:'#facc15', High:'#fb923c', Premium:'#f87171' };
              const c = cmap[u.academics.tuitionLabel] ?? '#60a5fa';
              return (
                <div key={u.slug} className="flex items-center gap-3 sm:gap-4 group"
                  onMouseEnter={() => setHoveredBar(u.slug)}
                  onMouseLeave={() => setHoveredBar(null)}>
                  {/* Logo */}
                  <UnivLogo slug={u.slug} name={u.shortName} color={u.colors.primary} size={36} rounded="lg" className="flex-shrink-0" />
                  <div className="w-10 text-xs font-syne font-bold flex-shrink-0" style={{ color: u.colors.primary }}>{u.shortName}</div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between text-xs mb-1.5">
                      <span style={{ color: 'rgba(220,228,255,0.48)' }}>{u.academics.tuitionRange}</span>
                      <span className="px-2 py-0.5 rounded-full font-syne font-semibold"
                        style={{ background: `${c}18`, color: c, border: `1px solid ${c}35` }}>
                        {u.academics.tuitionLabel}
                      </span>
                    </div>
                    <div className="h-3 rounded-full overflow-hidden relative" style={{ background: 'rgba(255,255,255,0.07)' }}>
                      <div className="h-full rounded-full relative overflow-hidden"
                        style={{
                          width: `${(u.academics.tuitionScore / 10) * 100}%`,
                          background: `linear-gradient(90deg,${c},${c}bb)`,
                          boxShadow: hoveredBar === u.slug ? `0 0 14px ${c}88` : 'none',
                          transition: 'box-shadow 0.3s',
                        }}>
                        <div className="absolute inset-0" style={{ background: 'linear-gradient(90deg,transparent 40%,rgba(255,255,255,0.2))' }} />
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Deep dive selector */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-6">
            <Zap size={18} style={{ color: '#818cf8' }} />
            <h2 className="font-syne font-bold text-xl text-white">
              Deep Dive: <span className="grad">University Academic Profile</span>
            </h2>
          </div>
          {/* University selector with logos */}
          <div className="flex flex-wrap gap-2 mb-10">
            {universities.map(u => (
              <button key={u.slug} onClick={() => setActiveSlug(u.slug)}
                className="flex items-center gap-2 px-3 py-2 rounded-xl text-sm font-syne font-semibold transition-all duration-300 btn-magnetic"
                style={activeSlug === u.slug
                  ? { background: `${u.colors.primary}25`, border: `1px solid ${u.colors.primary}55`, color: u.colors.primary, boxShadow: `0 0 18px ${u.colors.primary}33` }
                  : { background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)', color: 'rgba(220,228,255,0.52)' }
                }>
                <UnivLogo slug={u.slug} name={u.shortName} color={u.colors.primary} size={22} rounded="md" />
                {u.shortName}
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 sm:gap-6">
          {/* Scores */}
          <div className="glass-md rounded-2xl sm:rounded-3xl p-6 sm:p-8" style={{ border: `1px solid ${active.colors.primary}25` }}>
            <div className="flex items-center gap-3 mb-3">
              <UnivLogo slug={active.slug} name={active.shortName} color={active.colors.primary} size={44} rounded="xl" glow />
              <div>
                <h3 className="font-syne font-bold text-lg" style={{ color: active.colors.primary }}>{active.name}</h3>
                <div className="text-xs" style={{ color: 'rgba(220,228,255,0.42)' }}>{active.type === 'public' ? 'State University' : 'Private'} · Est. {active.founded}</div>
              </div>
            </div>
            <p className="text-sm leading-relaxed mb-7" style={{ color: 'rgba(220,228,255,0.65)' }}>{active.academics.overview}</p>

            <div className="p-4 rounded-2xl mb-6" style={{ background: `${active.colors.primary}09`, border: `1px solid ${active.colors.primary}22` }}>
              <div className="flex items-start justify-between gap-3">
                <div>
                  <div className="text-xs mb-1" style={{ color: 'rgba(220,228,255,0.38)' }}>QS World Rank</div>
                  <div className="font-syne font-extrabold text-xl" style={{ color: active.colors.primary }}>{active.academics.qsRank}</div>
                </div>
                <div className="text-right">
                  <div className="text-xs mb-1" style={{ color: 'rgba(220,228,255,0.38)' }}>Tuition Level</div>
                  <div className="font-syne font-bold text-sm text-white">{active.academics.tuitionLabel}</div>
                </div>
              </div>
              <div className="text-xs mt-2" style={{ color: 'rgba(220,228,255,0.38)' }}>{active.academics.qsRegionalRank}</div>
            </div>

            <div className="text-xs uppercase tracking-widest font-syne mb-4" style={{ color: 'rgba(220,228,255,0.30)' }}>Academic Scores</div>
            <div className="space-y-4">
              <ScoreBar label="Academic Reputation" value={active.academics.scores.academicReputation} color={active.colors.primary}   delay={0} />
              <ScoreBar label="Program Strength"    value={active.academics.scores.programStrength}    color={active.colors.primary}   delay={100} />
              <ScoreBar label="Research Output"     value={active.academics.scores.researchOutput}     color={active.colors.secondary} delay={200} />
              <ScoreBar label="Industry Alignment"  value={active.academics.scores.industryAlignment}  color={active.colors.secondary} delay={300} />
            </div>
          </div>

          {/* Programs + colleges */}
          <div className="space-y-5">
            <div className="glass-md rounded-2xl sm:rounded-3xl p-6 sm:p-8" style={{ border: `1px solid ${active.colors.primary}22` }}>
              <div className="flex items-center gap-2 mb-5">
                <BookOpen size={15} style={{ color: active.colors.primary }} />
                <span className="font-syne font-bold text-sm text-white">Top Programs</span>
              </div>
              <div className="space-y-4">
                {active.academics.topPrograms.map((p, i) => (
                  <div key={p.name}>
                    <div className="flex justify-between text-sm mb-1.5">
                      <span style={{ color: 'rgba(220,228,255,0.70)' }}>{p.name}</span>
                      <span className="text-xs font-syne font-bold" style={{ color: active.colors.primary }}>{p.strength}/10</span>
                    </div>
                    <div className="h-1.5 rounded-full overflow-hidden" style={{ background: 'rgba(255,255,255,0.07)' }}>
                      <div className="h-full rounded-full bar-grow relative overflow-hidden"
                        style={{
                          width: `${p.strength * 10}%`,
                          background: `linear-gradient(90deg,${active.colors.primary},${active.colors.secondary})`,
                          animationDelay: `${i * 90}ms`,
                        }}>
                        <div className="absolute inset-0" style={{ background: 'linear-gradient(90deg,transparent 50%,rgba(255,255,255,0.2))' }} />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="glass-md rounded-2xl sm:rounded-3xl p-5 sm:p-6" style={{ border: `1px solid ${active.colors.primary}20` }}>
              <div className="text-xs uppercase tracking-widest font-syne mb-3" style={{ color: 'rgba(220,228,255,0.32)' }}>Academic Strengths</div>
              <div className="flex flex-wrap gap-2">
                {active.academics.strengths.map(s => (
                  <span key={s} className="px-3 py-1.5 rounded-full text-xs font-semibold"
                    style={{ background: `${active.colors.primary}18`, border: `1px solid ${active.colors.primary}35`, color: active.colors.primary }}>
                    {s}
                  </span>
                ))}
              </div>
            </div>

            <Link href={`/universities/${active.slug}`}
              className="flex items-center justify-center gap-2 py-4 rounded-2xl font-syne font-bold text-sm text-white btn-magnetic transition-all"
              style={{ background: `linear-gradient(135deg,${active.colors.primary},${active.colors.secondary})`, boxShadow: `0 0 28px ${active.colors.primary}44` }}>
              Full {active.shortName} Profile <ArrowRight size={14} />
            </Link>
          </div>
        </div>
      </div>

      <footer className="py-8 px-0 text-center safe-bottom mt-16" style={{ borderTop: '1px solid rgba(255,255,255,0.05)' }}>
        <div className="max-w-4xl mx-auto">
          <p style={{ color: 'rgba(220,228,255,0.22)', fontSize: '0.72rem' }}>All data for reference only.</p>
          <p style={{ color: 'rgba(147,197,253,0.45)', fontSize: '0.7rem', marginTop: 4, fontWeight: 600 }}>Developed by Harry Lagto</p>
        </div>
      </footer>
    </main>
  );
}
