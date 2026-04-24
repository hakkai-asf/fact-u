'use client';
import { useState } from 'react';
import { universities } from '@/lib/universities';
import AnimatedBackground from '@/components/ui/AnimatedBackground';
import { BarChart2, ChevronDown, Trophy, GraduationCap, Users, Star, ArrowRight, ExternalLink } from 'lucide-react';
import Link from 'next/link';

const CRITERIA = [
  { key: 'academicReputation', label: 'Academic Reputation', icon: GraduationCap },
  { key: 'programStrength', label: 'Program Strength', icon: Star },
  { key: 'researchOutput', label: 'Research Output', icon: Star },
  { key: 'industryAlignment', label: 'Industry Alignment', icon: Users },
];

function getValue(u: typeof universities[0], key: string): number {
  if (key in u.academics.scores) return (u.academics.scores as any)[key];
  if (key === 'sports') return Math.min(10, Math.round(u.sports.totalTitles / 5));
  if (key === 'tuition') return 11 - u.academics.tuitionScore;
  return 5;
}

function AnimatedBar({ value, max = 10, color, delay = 0 }: { value: number; max?: number; color: string; delay?: number }) {
  return (
    <div className="flex items-center gap-3">
      <div className="flex-1 h-3 rounded-full overflow-hidden" style={{ background: 'rgba(255,255,255,0.07)' }}>
        <div
          className="h-full rounded-full"
          style={{
            width: `${(value / max) * 100}%`,
            background: `linear-gradient(90deg,${color},${color}99)`,
            boxShadow: `0 0 10px ${color}55`,
            transition: `width 1.2s cubic-bezier(0.23,1,0.32,1) ${delay}ms`,
          }}
        />
      </div>
      <span className="text-sm font-bold w-8 text-right" style={{ color }}>{value}</span>
    </div>
  );
}

export default function ComparePage() {
  const [leftSlug, setLeftSlug] = useState(universities[0].slug);
  const [rightSlug, setRightSlug] = useState(universities[1].slug);

  const left = universities.find((u) => u.slug === leftSlug)!;
  const right = universities.find((u) => u.slug === rightSlug)!;

  const allCriteria = [
    ...CRITERIA,
    { key: 'sports', label: 'Sports Performance', icon: Trophy },
    { key: 'tuition', label: 'Affordability', icon: Star },
  ];

  return (
    <main className="min-h-screen pt-24 pb-20 px-6">
      <AnimatedBackground
        primaryColor={left.colors.primary}
        secondaryColor={right.colors.primary}
        intensity={0.2}
      />
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-sm font-medium mb-4"
            style={{ background: 'rgba(99,102,241,0.1)', border: '1px solid rgba(99,102,241,0.3)', color: '#a5b4fc' }}>
            <BarChart2 size={12} /> Interactive Comparison Tool
          </div>
          <h1 className="font-syne font-800 text-4xl md:text-6xl tracking-tight mb-4">
            Compare <span className="grad-text">Universities</span>
          </h1>
          <p className="text-white/40 text-lg max-w-xl mx-auto">
            Select two schools and compare them side-by-side across academics, sports, and culture.
          </p>
        </div>

        {/* Selectors */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-10">
          {[{ slug: leftSlug, set: setLeftSlug, side: 'left' }, { slug: rightSlug, set: setRightSlug, side: 'right' }].map(({ slug, set, side }) => {
            const u = universities.find((x) => x.slug === slug)!;
            return (
              <div key={side}
                className="glass rounded-2xl p-4 flex items-center gap-4"
                style={{ border: `1px solid ${u.colors.primary}44` }}>
                <div className="w-12 h-12 rounded-xl flex items-center justify-center font-syne font-800 text-sm flex-shrink-0"
                  style={{ background: `${u.colors.primary}33`, color: u.colors.primary }}>
                  {u.shortName}
                </div>
                <div className="flex-1">
                  <div className="text-sm font-semibold">{u.name}</div>
                  <div className="text-xs text-white/40">{u.tagline}</div>
                </div>
                <div className="relative">
                  <select
                    value={slug}
                    onChange={(e) => set(e.target.value)}
                    className="appearance-none pl-3 pr-8 py-2 rounded-xl text-sm bg-white/8 text-white border border-white/15 outline-none cursor-pointer"
                    style={{ background: 'rgba(255,255,255,0.08)' }}
                  >
                    {universities.map((x) => (
                      <option key={x.slug} value={x.slug} style={{ background: '#0c111d' }}>{x.shortName}</option>
                    ))}
                  </select>
                  <ChevronDown size={13} className="absolute right-2 top-1/2 -translate-y-1/2 text-white/40 pointer-events-none" />
                </div>
              </div>
            );
          })}
        </div>

        {/* Overview cards */}
        <div className="grid grid-cols-2 gap-4 mb-8">
          {[left, right].map((u) => (
            <div key={u.slug} className="glass rounded-3xl p-6"
              style={{ border: `1px solid ${u.colors.primary}44`, background: `${u.colors.primary}08` }}>
              <div className="font-syne font-800 text-lg mb-1" style={{ color: u.colors.primary }}>{u.shortName}</div>
              <div className="text-xs text-white/40 mb-3">{u.type === 'public' ? 'State University' : 'Private University'} · Est. {u.founded}</div>
              <div className="grid grid-cols-2 gap-2 text-xs">
                <div className="p-2 rounded-lg" style={{ background: 'rgba(255,255,255,0.04)' }}>
                  <div className="text-white/30 mb-0.5">QS Rank</div>
                  <div className="font-semibold text-xs">{u.academics.qsRank.includes('Not') ? 'Unranked' : u.academics.qsRank}</div>
                </div>
                <div className="p-2 rounded-lg" style={{ background: 'rgba(255,255,255,0.04)' }}>
                  <div className="text-white/30 mb-0.5">Total Titles</div>
                  <div className="font-semibold">{u.sports.totalTitles}+</div>
                </div>
                <div className="p-2 rounded-lg" style={{ background: 'rgba(255,255,255,0.04)' }}>
                  <div className="text-white/30 mb-0.5">Tuition</div>
                  <div className="font-semibold">{u.academics.tuitionLabel}</div>
                </div>
                <div className="p-2 rounded-lg" style={{ background: 'rgba(255,255,255,0.04)' }}>
                  <div className="text-white/30 mb-0.5">Best in</div>
                  <div className="font-semibold">{u.sports.dominantSport}</div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Comparison bars */}
        <div className="glass rounded-3xl overflow-hidden mb-8" style={{ border: '1px solid rgba(255,255,255,0.1)' }}>
          <div className="p-6 border-b border-white/8">
            <h2 className="font-syne font-700 text-xl flex items-center gap-2">
              <BarChart2 size={18} className="text-indigo-400" /> Side-by-Side Scores
            </h2>
          </div>
          <div className="p-6 space-y-8">
            {allCriteria.map(({ key, label, icon: Icon }, i) => {
              const lv = getValue(left, key);
              const rv = getValue(right, key);
              const winner = lv > rv ? 'left' : rv > lv ? 'right' : 'tie';
              return (
                <div key={key}>
                  <div className="flex items-center gap-2 mb-3">
                    <Icon size={14} className="text-white/40" />
                    <span className="text-sm font-semibold text-white/70">{label}</span>
                    {winner !== 'tie' && (
                      <span className="ml-auto text-xs px-2 py-0.5 rounded-full"
                        style={{ background: winner === 'left' ? `${left.colors.primary}22` : `${right.colors.primary}22`, color: winner === 'left' ? left.colors.primary : right.colors.primary }}>
                        {winner === 'left' ? left.shortName : right.shortName} leads
                      </span>
                    )}
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <AnimatedBar value={lv} color={left.colors.primary} delay={i * 80} />
                    <AnimatedBar value={rv} color={right.colors.primary} delay={i * 80 + 40} />
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Programs comparison */}
        <div className="grid grid-cols-2 gap-4 mb-8">
          {[left, right].map((u) => (
            <div key={u.slug} className="glass rounded-3xl p-6" style={{ border: `1px solid ${u.colors.primary}33` }}>
              <div className="font-syne font-700 text-base mb-4" style={{ color: u.colors.primary }}>
                {u.shortName} Top Programs
              </div>
              <div className="space-y-2">
                {u.academics.topPrograms.slice(0, 4).map((p) => (
                  <div key={p.name} className="flex items-center justify-between text-xs">
                    <span className="text-white/60 truncate mr-2">{p.name}</span>
                    <div className="flex gap-0.5 flex-shrink-0">
                      {Array.from({ length: 5 }).map((_, j) => (
                        <div key={j} className="w-1.5 h-1.5 rounded-full"
                          style={{ background: j < Math.round(p.strength / 2) ? u.colors.primary : 'rgba(255,255,255,0.1)' }} />
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Apply CTAs */}
        <div className="grid grid-cols-2 gap-4">
          {[left, right].map((u) => (
            <a key={u.slug} href={u.admissionsUrl} target="_blank" rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 py-4 rounded-2xl font-semibold text-sm text-white transition-all hover:scale-105"
              style={{ background: `linear-gradient(135deg,${u.colors.primary},${u.colors.secondary})`, boxShadow: `0 0 30px ${u.colors.primary}44` }}>
              Apply to {u.shortName} <ExternalLink size={13} />
            </a>
          ))}
        </div>
      </div>
    </main>
  );
}
