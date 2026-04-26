'use client';
import { useState, useEffect, useRef } from 'react';
import { universities } from '@/lib/universities';
import NebulaBackground from '@/components/ui/NebulaBackground';
import { BarChart2, ChevronDown, Trophy, GraduationCap, Users, Star, ExternalLink, ArrowRight, Zap } from 'lucide-react';
import Link from 'next/link';

const CRITERIA = [
  { key: 'academicReputation', label: 'Academic Reputation', icon: GraduationCap, color: '#4f8ef7' },
  { key: 'programStrength',    label: 'Program Strength',    icon: Star,          color: '#a78bfa' },
  { key: 'researchOutput',     label: 'Research Output',     icon: Star,          color: '#38bdf8' },
  { key: 'industryAlignment',  label: 'Industry Alignment',  icon: Users,         color: '#34d399' },
  { key: 'sports',             label: 'Sports Performance',  icon: Trophy,        color: '#f97316' },
  { key: 'affordability',      label: 'Affordability',       icon: Star,          color: '#fbbf24' },
];

function getVal(u: typeof universities[0], key: string): number {
  if (key in u.academics.scores) return (u.academics.scores as any)[key];
  if (key === 'sports')       return Math.min(10, Math.round(u.sports.totalTitles / 5));
  if (key === 'affordability') return 11 - u.academics.tuitionScore;
  return 5;
}

function AnimBar({ value, color, delay = 0, side }: { value: number; color: string; delay?: number; side: 'left'|'right' }) {
  const [anim, setAnim] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setTimeout(() => setAnim(true), delay); }, { threshold: 0.3 });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, [delay]);

  return (
    <div ref={ref} className="flex items-center gap-2" style={{ flexDirection: side === 'right' ? 'row-reverse' : 'row' }}>
      <div className="flex-1 h-2.5 rounded-full overflow-hidden" style={{ background: 'rgba(255,255,255,0.06)' }}>
        <div className="h-full rounded-full transition-all duration-1000 ease-out relative overflow-hidden"
          style={{
            width: anim ? `${value * 10}%` : '0%',
            background: `linear-gradient(90deg, ${color}, ${color}bb)`,
            boxShadow: `0 0 10px ${color}77`,
            transitionDelay: `${delay}ms`,
          }}>
          <div className="absolute inset-0" style={{ background: 'linear-gradient(90deg,transparent 50%,rgba(255,255,255,0.25))' }} />
        </div>
      </div>
      <span className="text-sm font-syne font-800 w-5 text-center" style={{ color }}>{value}</span>
    </div>
  );
}

export default function ComparePage() {
  const [leftSlug,  setLeftSlug]  = useState(universities[1].slug); // ateneo
  const [rightSlug, setRightSlug] = useState(universities[2].slug); // dlsu
  const [animKey, setAnimKey]     = useState(0);

  const left  = universities.find(u => u.slug === leftSlug)!;
  const right = universities.find(u => u.slug === rightSlug)!;

  const handleLeft  = (slug: string) => { setLeftSlug(slug);  setAnimKey(k => k + 1); };
  const handleRight = (slug: string) => { setRightSlug(slug); setAnimKey(k => k + 1); };

  return (
    <main className="min-h-screen pt-24 pb-24 px-6">
      <NebulaBackground primaryColor={left.colors.primary} secondaryColor={right.colors.primary} intensity={0.22} />

      <div className="max-w-6xl mx-auto">

        {/* Header */}
        <div className="text-center mb-16 pt-8">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass-bright text-xs font-syne font-600 tracking-widest uppercase mb-5"
            style={{ border: '1px solid rgba(99,102,241,0.35)', color: '#a5b4fc' }}>
            <BarChart2 size={11} /> Interactive Comparison
          </div>
          <h1 className="font-syne font-800 leading-tight tracking-tight mb-4"
            style={{ fontSize: 'clamp(2.8rem,6vw,5.5rem)' }}>
            Compare <span className="grad">Universities</span>
          </h1>
          <p className="text-white/35 text-lg max-w-md mx-auto">
            Pick two schools and see them go head-to-head across every dimension.
          </p>
        </div>

        {/* Selector row */}
        <div className="grid grid-cols-2 gap-4 mb-10">
          {[{ u: left, slug: leftSlug, set: handleLeft, side: 'left' },
            { u: right, slug: rightSlug, set: handleRight, side: 'right' }].map(({ u, slug, set }) => (
            <div key={u.slug} className="glass-md rounded-3xl p-5 flex items-center gap-4 relative overflow-hidden"
              style={{ border: `1px solid ${u.colors.primary}44` }}>
              <div className="absolute top-0 left-0 right-0 h-0.5"
                style={{ background: `linear-gradient(90deg,transparent,${u.colors.primary},transparent)` }} />
              <div className="w-12 h-12 rounded-xl flex items-center justify-center font-syne font-800 text-sm flex-shrink-0"
                style={{ background: `${u.colors.primary}33`, color: u.colors.primary, border: `1px solid ${u.colors.primary}55` }}>
                {u.shortName.slice(0, 2)}
              </div>
              <div className="flex-1 min-w-0">
                <div className="text-sm font-syne font-700">{u.name}</div>
                <div className="text-xs text-white/35">{u.tagline}</div>
              </div>
              <div className="relative flex-shrink-0">
                <select value={slug} onChange={e => set(e.target.value)}
                  className="appearance-none pl-3 pr-7 py-2 rounded-xl text-xs font-syne font-600 outline-none cursor-none"
                  style={{ background: 'rgba(255,255,255,0.08)', color: '#fff', border: '1px solid rgba(255,255,255,0.15)' }}>
                  {universities.map(x => (
                    <option key={x.slug} value={x.slug} style={{ background: '#060a18' }}>{x.shortName}</option>
                  ))}
                </select>
                <ChevronDown size={12} className="absolute right-2 top-1/2 -translate-y-1/2 text-white/40 pointer-events-none" />
              </div>
            </div>
          ))}
        </div>

        {/* VS divider */}
        <div className="flex items-center gap-4 mb-10">
          <div className="flex-1 h-px" style={{ background: `linear-gradient(90deg,transparent,${left.colors.primary}66)` }} />
          <div className="glass-bright rounded-full px-5 py-2 font-display text-2xl tracking-widest"
            style={{ border: '1px solid rgba(255,255,255,0.12)', color: 'rgba(255,255,255,0.4)' }}>VS</div>
          <div className="flex-1 h-px" style={{ background: `linear-gradient(90deg,${right.colors.primary}66,transparent)` }} />
        </div>

        {/* Overview cards */}
        <div className="grid grid-cols-2 gap-4 mb-10">
          {[left, right].map((u, side) => (
            <div key={u.slug} className="glass-md rounded-3xl p-6 relative overflow-hidden"
              style={{ border: `1px solid ${u.colors.primary}44`, background: `${u.colors.primary}06` }}>
              <div className="absolute inset-0 pointer-events-none"
                style={{ background: `radial-gradient(ellipse at ${side === 0 ? 'top right' : 'top left'},${u.colors.primary}12,transparent 70%)` }} />
              <div className="relative">
                <div className="font-syne font-800 text-xl mb-0.5" style={{ color: u.colors.primary }}>{u.shortName}</div>
                <div className="text-xs text-white/35 mb-4">{u.type === 'public' ? 'State University' : 'Private'} · Est. {u.founded}</div>
                <div className="grid grid-cols-2 gap-2 text-xs">
                  {[
                    ['QS Rank',      u.academics.qsRank.includes('Not') ? 'Unranked' : u.academics.qsRank],
                    ['Titles',       `${u.sports.totalTitles}+`],
                    ['Tuition',      u.academics.tuitionLabel],
                    ['Best sport',   u.sports.dominantSport],
                  ].map(([k,v]) => (
                    <div key={k} className="p-2.5 rounded-xl" style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.06)' }}>
                      <div className="text-white/25 mb-0.5">{k}</div>
                      <div className="font-semibold text-xs leading-tight">{v}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Main comparison bars */}
        <div className="glass-md rounded-3xl overflow-hidden mb-8"
          style={{ border: '1px solid rgba(255,255,255,0.08)' }}>
          <div className="px-8 py-5 flex items-center justify-between"
            style={{ borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
            <h2 className="font-syne font-700 text-lg flex items-center gap-2">
              <Zap size={16} className="text-indigo-400" /> Head-to-Head Scores
            </h2>
            <div className="flex items-center gap-4 text-xs text-white/40">
              <span className="flex items-center gap-1.5">
                <div className="w-3 h-1 rounded-full" style={{ background: left.colors.primary }} />{left.shortName}
              </span>
              <span className="flex items-center gap-1.5">
                <div className="w-3 h-1 rounded-full" style={{ background: right.colors.primary }} />{right.shortName}
              </span>
            </div>
          </div>
          <div className="p-8 space-y-8" key={animKey}>
            {CRITERIA.map(({ key, label, icon: Icon, color }, i) => {
              const lv = getVal(left, key);
              const rv = getVal(right, key);
              const winner = lv > rv ? 'left' : rv > lv ? 'right' : 'tie';
              return (
                <div key={key}>
                  <div className="flex items-center gap-3 mb-3">
                    <Icon size={13} className="text-white/30" />
                    <span className="text-sm font-syne font-600 text-white/60 flex-1">{label}</span>
                    {winner !== 'tie' && (
                      <span className="text-xs px-2.5 py-0.5 rounded-full font-semibold"
                        style={{
                          background: winner === 'left' ? `${left.colors.primary}22` : `${right.colors.primary}22`,
                          color:      winner === 'left' ?  left.colors.primary       :  right.colors.primary,
                          border:    `1px solid ${winner === 'left' ? left.colors.primary : right.colors.primary}44`,
                        }}>
                        {winner === 'left' ? left.shortName : right.shortName} leads
                      </span>
                    )}
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <AnimBar value={lv} color={left.colors.primary}  delay={i * 80}       side="left" />
                    <AnimBar value={rv} color={right.colors.primary} delay={i * 80 + 40}  side="right" />
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Programs side by side */}
        <div className="grid grid-cols-2 gap-4 mb-8">
          {[left, right].map(u => (
            <div key={u.slug} className="glass-md rounded-3xl p-6"
              style={{ border: `1px solid ${u.colors.primary}28` }}>
              <div className="font-syne font-700 text-sm mb-4" style={{ color: u.colors.primary }}>
                {u.shortName} — Top Programs
              </div>
              <div className="space-y-3">
                {u.academics.topPrograms.slice(0, 4).map(p => (
                  <div key={p.name} className="flex items-center gap-3 text-xs">
                    <span className="text-white/50 flex-1 truncate">{p.name}</span>
                    <div className="flex gap-0.5 flex-shrink-0">
                      {Array.from({ length: 5 }).map((_, j) => (
                        <div key={j} className="w-2 h-2 rounded-sm transition-all duration-300"
                          style={{ background: j < Math.round(p.strength / 2) ? u.colors.primary : 'rgba(255,255,255,0.08)' }} />
                      ))}
                    </div>
                    <span className="w-5 text-right font-bold text-xs" style={{ color: u.colors.primary }}>{p.strength}</span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Sports comparison */}
        <div className="grid grid-cols-2 gap-4 mb-10">
          {[left, right].map(u => (
            <div key={u.slug} className="glass-md rounded-3xl p-6"
              style={{ border: `1px solid ${u.colors.primary}28` }}>
              <div className="font-syne font-700 text-sm mb-4 flex items-center gap-2" style={{ color: u.colors.primary }}>
                <Trophy size={14} /> {u.shortName} Sports
              </div>
              <div className="text-3xl font-syne font-800 mb-1" style={{ color: u.colors.primary }}>
                {u.sports.totalTitles}+
              </div>
              <div className="text-xs text-white/35 mb-3">Total UAAP titles</div>
              <div className="text-sm text-white/50 mb-2">Best: <span className="font-semibold text-white/70">{u.sports.dominantSport}</span></div>
              <p className="text-xs text-white/35 leading-relaxed">{u.sports.mvpHistory}</p>
            </div>
          ))}
        </div>

        {/* Apply CTAs */}
        <div className="grid grid-cols-2 gap-4">
          {[left, right].map(u => (
            <a key={u.slug} href={u.admissionsUrl} target="_blank" rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 py-4 rounded-2xl font-syne font-700 text-sm text-white btn-magnetic transition-all"
              style={{
                background: `linear-gradient(135deg,${u.colors.primary},${u.colors.secondary})`,
                boxShadow: `0 0 40px ${u.colors.primary}44`,
              }}>
              Apply to {u.shortName} <ExternalLink size={13} />
            </a>
          ))}
        </div>

        {/* View profiles */}
        <div className="grid grid-cols-2 gap-4 mt-3">
          {[left, right].map(u => (
            <Link key={u.slug} href={`/universities/${u.slug}`}
              className="flex items-center justify-center gap-2 py-3 rounded-2xl text-sm glass btn-magnetic transition-all"
              style={{ border: `1px solid ${u.colors.primary}28`, color: u.colors.primary }}>
              View {u.shortName} Profile <ArrowRight size={13} />
            </Link>
          ))}
        </div>
      </div>
    </main>
  );
}
