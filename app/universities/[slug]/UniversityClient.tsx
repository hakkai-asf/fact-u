'use client';
import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { University } from '@/lib/universities';
import NebulaBackground from '@/components/ui/NebulaBackground';
import ScoreBar from '@/components/ui/ScoreBar';
import HighlightIcon from '@/components/ui/HighlightIcon';
import {
  MapPin, Trophy, GraduationCap, Star, Users, ArrowLeft,
  ExternalLink, CheckCircle, BarChart2, Flame, BookOpen,
  Heart, Clock, FileText, Lightbulb, Building2, Globe,
} from 'lucide-react';

type Tab = 'overview' | 'academics' | 'sports' | 'student-life' | 'admissions';

export default function UniversityClient({ university: u }: { university: University }) {
  const [tab,   setTab]   = useState<Tab>('overview');
  const [modal, setModal] = useState(false);
  const [ready, setReady] = useState(false);

  useEffect(() => { setTimeout(() => setReady(true), 100); }, []);

  const tabs: { id: Tab; label: string; icon: React.FC<any> }[] = [
    { id: 'overview',     label: 'Overview',     icon: Star },
    { id: 'academics',    label: 'Academics',    icon: GraduationCap },
    { id: 'sports',       label: 'Sports',       icon: Trophy },
    { id: 'student-life', label: 'Student Life', icon: Heart },
    { id: 'admissions',   label: 'Admissions',   icon: CheckCircle },
  ];

  return (
    <main className="min-h-screen pb-20">
      <NebulaBackground primaryColor={u.colors.primary} secondaryColor={u.colors.secondary} intensity={0.3} />

      {/* ── HERO ── */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none"
          style={{ background: `linear-gradient(180deg,${u.colors.primary}28 0%,transparent 100%)` }} />
        <div className="absolute top-0 left-0 right-0 h-px"
          style={{ background: `linear-gradient(90deg,transparent,${u.colors.primary},transparent)` }} />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 pt-24 sm:pt-28 pb-0">
          <Link href="/universities"
            className="inline-flex items-center gap-2 text-sm mb-8 transition-colors group"
            style={{ color: 'rgba(220,228,255,0.4)' }}
            onMouseEnter={e => { (e.currentTarget as HTMLElement).style.color = 'rgba(220,228,255,0.75)'; }}
            onMouseLeave={e => { (e.currentTarget as HTMLElement).style.color = 'rgba(220,228,255,0.4)'; }}>
            <ArrowLeft size={14} className="group-hover:-translate-x-1 transition-transform" />
            All Universities
          </Link>

          <div className={`transition-all duration-700 ${ready ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}>
            <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8 sm:gap-10 pb-8 sm:pb-10"
              style={{ borderBottom: '1px solid rgba(255,255,255,0.07)' }}>

              {/* Logo + info */}
              <div className="flex flex-col sm:flex-row items-start sm:items-center gap-5 sm:gap-7">
                {/* University logo placeholder */}
                <div className="relative flex-shrink-0">
                  {/* Try real logo first */}
                  <div className="w-20 h-20 sm:w-28 sm:h-28 md:w-32 md:h-32 rounded-2xl sm:rounded-3xl overflow-hidden relative"
                    style={{
                      background: `linear-gradient(135deg,${u.colors.primary}cc,${u.colors.secondary}aa)`,
                      border: `1.5px solid ${u.colors.primary}66`,
                      boxShadow: `0 0 50px ${u.colors.primary}55, inset 0 1px 0 rgba(255,255,255,0.18)`,
                    }}>
                    {/* Real logo if available */}
                    <img
                      src={`/assets/logos/${u.slug}-logo.svg`}
                      alt={`${u.shortName} logo`}
                      className="w-full h-full object-contain p-3"
                      onError={e => {
                        (e.currentTarget as HTMLImageElement).style.display = 'none';
                        const fb = (e.currentTarget as HTMLImageElement).nextElementSibling as HTMLElement;
                        if (fb) fb.style.display = 'flex';
                      }}
                    />
                    {/* Fallback text logo */}
                    <div className="absolute inset-0 items-center justify-center font-syne font-extrabold text-white"
                      style={{ display: 'none', fontSize: 'clamp(1rem,3vw,1.6rem)' }}>
                      {u.shortName}
                    </div>
                  </div>
                  {/* Glow ring */}
                  <div className="absolute inset-0 rounded-2xl sm:rounded-3xl pulse-glow pointer-events-none"
                    style={{ border: `1px solid ${u.colors.primary}40` }} />
                </div>

                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-xs px-3 py-1 rounded-full uppercase tracking-widest font-syne font-semibold"
                      style={{ background: 'rgba(255,255,255,0.06)', color: 'rgba(220,228,255,0.45)', border: '1px solid rgba(255,255,255,0.1)' }}>
                      {u.type} · Est. {u.founded}
                    </span>
                  </div>
                  <h1 className="font-syne font-extrabold leading-tight tracking-tight"
                    style={{ fontSize: 'clamp(1.6rem,4vw,3.5rem)', color: '#e8eeff' }}>
                    {u.name}
                  </h1>
                  <p className="text-sm mt-1 italic" style={{ color: 'rgba(220,228,255,0.42)' }}>"{u.tagline}"</p>
                  <div className="flex items-center gap-1.5 mt-2 text-sm" style={{ color: 'rgba(220,228,255,0.38)' }}>
                    <MapPin size={12} />{u.location}
                  </div>
                </div>
              </div>

              {/* Highlights */}
              <div className="flex flex-wrap gap-2 sm:gap-3">
                {u.highlights.map(h => (
                  <div key={h.label} className="glass rounded-xl sm:rounded-2xl px-4 py-3 text-center sweep"
                    style={{ border: `1px solid ${u.colors.primary}25` }}>
                    <HighlightIcon icon={h.icon} size={16} color={u.colors.primary} className="mx-auto mb-1" />
                    <div className="font-syne font-extrabold text-sm sm:text-base" style={{ color: '#e8eeff' }}>{h.value}</div>
                    <div style={{ fontSize: '10px', color: 'rgba(220,228,255,0.38)' }}>{h.label}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Tab bar */}
            <div className="flex gap-0.5 pt-3 overflow-x-auto no-scrollbar -mb-px">
              {tabs.map(({ id, label, icon: Icon }) => (
                <button key={id} onClick={() => setTab(id)}
                  className="flex items-center gap-1.5 px-4 sm:px-5 py-3 text-xs sm:text-sm font-syne font-semibold whitespace-nowrap transition-all duration-300 relative flex-shrink-0"
                  style={{
                    color: tab === id ? '#e8eeff' : 'rgba(220,228,255,0.38)',
                    borderBottom: tab === id ? `2px solid ${u.colors.primary}` : '2px solid transparent',
                  }}>
                  <Icon size={12} />{label}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* ── TAB CONTENT ── */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 pt-8 sm:pt-10">

        {/* ── OVERVIEW ── */}
        {tab === 'overview' && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-5 sm:gap-6 anim-fade-up">
            <div className="lg:col-span-2 space-y-5">

              {/* Campus image placeholder */}
              <div className="rounded-2xl sm:rounded-3xl overflow-hidden relative"
                style={{ height: 220, background: `linear-gradient(160deg,${u.colors.primary}55,${u.colors.secondary}33)`, border: `1px solid ${u.colors.primary}22` }}>
                <img
                  src={u.campusImage}
                  alt={`${u.name} campus`}
                  className="w-full h-full object-cover"
                  onError={e => { (e.currentTarget as HTMLImageElement).style.display = 'none'; }}
                />
                {/* Overlay label when no image */}
                <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none"
                  style={{ background: 'rgba(0,0,0,0.25)' }}>
                  <Building2 size={32} style={{ color: `${u.colors.primary}77` }} />
                  <span className="text-xs mt-2 font-syne" style={{ color: 'rgba(220,228,255,0.35)' }}>Campus image — see README for how to add</span>
                </div>
              </div>

              <div className="glass-md rounded-2xl sm:rounded-3xl p-6 sm:p-8" style={{ border: `1px solid ${u.colors.primary}18` }}>
                <h2 className="font-syne font-bold text-base sm:text-lg mb-4 flex items-center gap-2" style={{ color: '#e8eeff' }}>
                  <Star size={15} style={{ color: u.colors.primary }} /> About {u.shortName}
                </h2>
                <p className="leading-relaxed text-sm sm:text-base" style={{ color: 'rgba(220,228,255,0.68)' }}>{u.description}</p>
              </div>

              <div className="glass-md rounded-2xl sm:rounded-3xl p-6 sm:p-8" style={{ border: `1px solid ${u.colors.primary}18` }}>
                <h2 className="font-syne font-bold text-base sm:text-lg mb-5 flex items-center gap-2" style={{ color: '#e8eeff' }}>
                  <Trophy size={15} style={{ color: u.colors.primary }} /> Key Achievements
                </h2>
                <ul className="space-y-3">
                  {u.achievements.map((a, i) => (
                    <li key={i} className="flex items-start gap-3 text-sm" style={{ color: 'rgba(220,228,255,0.65)' }}>
                      <CheckCircle size={13} className="mt-0.5 flex-shrink-0" style={{ color: u.colors.primary }} />
                      {a}
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Right sidebar */}
            <div className="space-y-4">
              <div className="glass-md rounded-2xl sm:rounded-3xl p-5 sm:p-6" style={{ border: `1px solid ${u.colors.primary}18` }}>
                <h3 className="font-syne font-bold text-sm mb-4" style={{ color: 'rgba(220,228,255,0.55)' }}>Quick Info</h3>
                <div className="space-y-3 text-sm">
                  {[['Founded', u.founded], ['Type', u.type], ['Location', u.location], ['UAAP Titles', `${u.sports.totalTitles}+`], ['Best in', u.sports.dominantSport]].map(([k, v]) => (
                    <div key={k} className="flex justify-between gap-2 py-2" style={{ borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
                      <span style={{ color: 'rgba(220,228,255,0.38)' }} className="flex-shrink-0 capitalize">{k}</span>
                      <span className="text-right text-xs" style={{ color: 'rgba(220,228,255,0.70)' }}>{v}</span>
                    </div>
                  ))}
                </div>
              </div>

              <a href={u.website} target="_blank" rel="noopener noreferrer"
                className="flex items-center justify-between p-4 rounded-2xl glass transition-all hover:bg-white/5 text-sm font-medium"
                style={{ border: '1px solid rgba(255,255,255,0.08)', color: 'rgba(220,228,255,0.55)' }}>
                <span className="flex items-center gap-2"><Globe size={13} /> Official Website</span>
                <ExternalLink size={12} style={{ color: 'rgba(220,228,255,0.3)' }} />
              </a>

              <button onClick={() => setModal(true)}
                className="w-full py-3.5 rounded-2xl font-syne font-bold text-sm text-white btn-magnetic transition-all"
                style={{ background: `linear-gradient(135deg,${u.colors.primary},${u.colors.secondary})`, boxShadow: `0 0 32px ${u.colors.primary}44` }}>
                Apply to {u.shortName}
              </button>

              <Link href="/compare"
                className="flex items-center justify-center gap-2 py-3 rounded-2xl glass transition-all hover:bg-white/5 text-sm font-medium"
                style={{ border: '1px solid rgba(255,255,255,0.08)', color: 'rgba(220,228,255,0.55)' }}>
                <BarChart2 size={13} /> Compare with another school
              </Link>
            </div>
          </div>
        )}

        {/* ── ACADEMICS ── */}
        {tab === 'academics' && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 sm:gap-6 anim-fade-up">
            <div className="glass-md rounded-2xl sm:rounded-3xl p-6 sm:p-8" style={{ border: `1px solid ${u.colors.primary}18` }}>
              <h2 className="font-syne font-bold text-base sm:text-lg mb-4 flex items-center gap-2" style={{ color: '#e8eeff' }}>
                <GraduationCap size={15} style={{ color: u.colors.primary }} /> Academic Profile
              </h2>
              <p className="text-sm leading-relaxed mb-7" style={{ color: 'rgba(220,228,255,0.65)' }}>{u.academics.overview}</p>

              <div className="space-y-0 text-sm mb-7">
                {[
                  ['QS World Rank', u.academics.qsRank],
                  ['Regional Context', u.academics.qsRegionalRank],
                  ['Tuition Range', u.academics.tuitionRange],
                  ['Tuition Level', u.academics.tuitionLabel],
                ].map(([k, v]) => (
                  <div key={k} className="flex justify-between py-2.5" style={{ borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
                    <span style={{ color: 'rgba(220,228,255,0.40)' }}>{k}</span>
                    <span className="text-xs text-right max-w-[200px] font-medium" style={{ color: 'rgba(220,228,255,0.72)' }}>{v}</span>
                  </div>
                ))}
              </div>

              <div className="text-xs uppercase tracking-widest font-syne mb-4" style={{ color: 'rgba(220,228,255,0.28)' }}>Strength Scores</div>
              <div className="space-y-4">
                <ScoreBar label="Academic Reputation" value={u.academics.scores.academicReputation} color={u.colors.primary}   delay={0} />
                <ScoreBar label="Program Strength"    value={u.academics.scores.programStrength}    color={u.colors.primary}   delay={100} />
                <ScoreBar label="Research Output"     value={u.academics.scores.researchOutput}     color={u.colors.secondary} delay={200} />
                <ScoreBar label="Industry Alignment"  value={u.academics.scores.industryAlignment}  color={u.colors.secondary} delay={300} />
              </div>
            </div>

            <div className="space-y-5">
              <div className="glass-md rounded-2xl sm:rounded-3xl p-6 sm:p-8" style={{ border: `1px solid ${u.colors.primary}18` }}>
                <h2 className="font-syne font-bold text-base sm:text-lg mb-5 flex items-center gap-2" style={{ color: '#e8eeff' }}>
                  <BookOpen size={15} style={{ color: u.colors.primary }} /> Top Programs
                </h2>
                <div className="space-y-4">
                  {u.academics.topPrograms.map((p, i) => (
                    <div key={p.name}>
                      <div className="flex justify-between text-sm mb-1.5">
                        <span style={{ color: 'rgba(220,228,255,0.65)' }}>{p.name}</span>
                        <span className="text-xs font-syne font-bold" style={{ color: u.colors.primary }}>{p.strength}/10</span>
                      </div>
                      <div className="h-1.5 rounded-full overflow-hidden" style={{ background: 'rgba(255,255,255,0.06)' }}>
                        <div className="h-full rounded-full bar-grow relative overflow-hidden"
                          style={{
                            width: `${p.strength * 10}%`,
                            background: `linear-gradient(90deg,${u.colors.primary},${u.colors.secondary})`,
                            animationDelay: `${i * 90}ms`,
                          }} />
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="glass-md rounded-2xl sm:rounded-3xl p-5 sm:p-6" style={{ border: `1px solid ${u.colors.primary}18` }}>
                <div className="text-xs uppercase tracking-widest font-syne mb-3" style={{ color: 'rgba(220,228,255,0.30)' }}>Academic Strengths</div>
                <div className="flex flex-wrap gap-2">
                  {u.academics.strengths.map(s => (
                    <span key={s} className="px-3 py-1.5 rounded-full text-xs font-semibold"
                      style={{ background: `${u.colors.primary}16`, border: `1px solid ${u.colors.primary}32`, color: u.colors.primary }}>
                      {s}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ── SPORTS ── */}
        {tab === 'sports' && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 sm:gap-6 anim-fade-up">
            <div className="glass-md rounded-2xl sm:rounded-3xl p-6 sm:p-8" style={{ border: `1px solid ${u.colors.primary}18` }}>
              <h2 className="font-syne font-bold text-base sm:text-lg mb-4 flex items-center gap-2" style={{ color: '#e8eeff' }}>
                <Trophy size={15} style={{ color: u.colors.primary }} /> Sports Overview
              </h2>
              <p className="text-sm leading-relaxed mb-6" style={{ color: 'rgba(220,228,255,0.65)' }}>{u.sports.overview}</p>
              <div className="space-y-0 text-sm mb-6">
                <div className="flex justify-between py-3" style={{ borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
                  <span style={{ color: 'rgba(220,228,255,0.40)' }}>Total UAAP Titles</span>
                  <span className="font-syne font-extrabold text-xl" style={{ color: u.colors.primary }}>{u.sports.totalTitles}+</span>
                </div>
                <div className="flex justify-between py-3" style={{ borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
                  <span style={{ color: 'rgba(220,228,255,0.40)' }}>Dominant Sport</span>
                  <span className="font-semibold" style={{ color: 'rgba(220,228,255,0.72)' }}>{u.sports.dominantSport}</span>
                </div>
              </div>
              <div className="p-4 rounded-xl sm:rounded-2xl mb-5"
                style={{ background: `${u.colors.primary}0d`, border: `1px solid ${u.colors.primary}22` }}>
                <p className="text-sm" style={{ color: 'rgba(220,228,255,0.62)' }}>
                  <Flame size={12} className="inline mr-2" style={{ color: u.colors.primary }} />
                  {u.sports.notable}
                </p>
              </div>
              <div className="flex flex-wrap gap-1.5">
                {u.sports.uaapTeams.map(t => (
                  <span key={t} className="px-2.5 py-1 rounded-lg text-xs"
                    style={{ background: 'rgba(255,255,255,0.05)', color: 'rgba(220,228,255,0.50)' }}>{t}</span>
                ))}
              </div>
            </div>

            <div className="glass-md rounded-2xl sm:rounded-3xl p-6 sm:p-8" style={{ border: `1px solid ${u.colors.primary}18` }}>
              <h2 className="font-syne font-bold text-base sm:text-lg mb-6 flex items-center gap-2" style={{ color: '#e8eeff' }}>
                <Star size={15} style={{ color: u.colors.primary }} /> Championship History
              </h2>
              <div className="space-y-4 mb-6">
                {u.sports.championships.map(c => (
                  <div key={c.sport} className="p-4 rounded-xl sm:rounded-2xl"
                    style={{ background: `${u.colors.primary}0d`, border: `1px solid ${u.colors.primary}22` }}>
                    <div className="flex items-center justify-between mb-1">
                      <span className="font-semibold text-sm" style={{ color: '#e8eeff' }}>{c.sport}</span>
                      <span className="font-syne font-extrabold text-2xl" style={{ color: u.colors.primary }}>{c.count}</span>
                    </div>
                    <div className="text-xs" style={{ color: 'rgba(220,228,255,0.38)' }}>Recent: {c.recentYears.join(', ')}</div>
                  </div>
                ))}
              </div>
              <div className="p-4 rounded-xl sm:rounded-2xl" style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.07)' }}>
                <div className="text-xs mb-1" style={{ color: 'rgba(220,228,255,0.30)' }}>MVP & Star Players</div>
                <p className="text-sm" style={{ color: 'rgba(220,228,255,0.58)' }}>{u.sports.mvpHistory}</p>
              </div>
            </div>
          </div>
        )}

        {/* ── STUDENT LIFE ── */}
        {tab === 'student-life' && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 sm:gap-6 anim-fade-up">
            <div className="glass-md rounded-2xl sm:rounded-3xl p-6 sm:p-8" style={{ border: `1px solid ${u.colors.primary}18` }}>
              <h2 className="font-syne font-bold text-base sm:text-lg mb-4 flex items-center gap-2" style={{ color: '#e8eeff' }}>
                <Users size={15} style={{ color: u.colors.primary }} /> Campus Culture
              </h2>
              <p className="text-sm leading-relaxed mb-5" style={{ color: 'rgba(220,228,255,0.65)' }}>{u.studentLife.overview}</p>
              <p className="text-sm mb-6" style={{ color: 'rgba(220,228,255,0.50)' }}>{u.studentLife.culture}</p>
              <div className="space-y-4 text-sm">
                {[['Mascot', u.studentLife.mascot], ['School Colors', u.studentLife.schoolColor]].map(([k, v]) => (
                  <div key={k}>
                    <div className="text-xs mb-1" style={{ color: 'rgba(220,228,255,0.28)' }}>{k}</div>
                    <div className="font-medium" style={{ color: 'rgba(220,228,255,0.75)' }}>{v}</div>
                  </div>
                ))}
                <div>
                  <div className="text-xs mb-1" style={{ color: 'rgba(220,228,255,0.28)' }}>Fan Base</div>
                  <div className="text-xs leading-relaxed" style={{ color: 'rgba(220,228,255,0.55)' }}>{u.studentLife.fanBase}</div>
                </div>
              </div>
            </div>

            <div className="space-y-5">
              <div className="glass-md rounded-2xl sm:rounded-3xl p-6 sm:p-7" style={{ border: `1px solid ${u.colors.primary}18` }}>
                <div className="font-syne font-bold text-sm mb-3" style={{ color: 'rgba(220,228,255,0.55)' }}>Organizations</div>
                <ul className="space-y-2">
                  {u.studentLife.organizations.map(o => (
                    <li key={o} className="flex items-start gap-2 text-sm" style={{ color: 'rgba(220,228,255,0.62)' }}>
                      <span style={{ color: u.colors.primary, flexShrink: 0 }}>›</span>{o}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="glass-md rounded-2xl sm:rounded-3xl p-6 sm:p-7" style={{ border: `1px solid ${u.colors.primary}18` }}>
                <div className="font-syne font-bold text-sm mb-3" style={{ color: 'rgba(220,228,255,0.55)' }}>Key Events</div>
                <div className="flex flex-wrap gap-2">
                  {u.studentLife.events.map(ev => (
                    <span key={ev} className="px-3 py-1.5 rounded-full text-xs font-medium"
                      style={{ background: `${u.colors.primary}16`, color: u.colors.primary }}>
                      {ev}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ── ADMISSIONS ── */}
        {tab === 'admissions' && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 sm:gap-6 anim-fade-up">
            <div className="glass-md rounded-2xl sm:rounded-3xl p-6 sm:p-8" style={{ border: `1px solid ${u.colors.primary}18` }}>
              <h2 className="font-syne font-bold text-base sm:text-lg mb-6 flex items-center gap-2" style={{ color: '#e8eeff' }}>
                <CheckCircle size={15} style={{ color: u.colors.primary }} /> Application Steps
              </h2>
              <ol className="space-y-5">
                {u.admissions.steps.map((s, i) => (
                  <li key={i} className="flex items-start gap-4">
                    <span className="w-6 h-6 rounded-full flex-shrink-0 flex items-center justify-center text-xs font-bold font-syne"
                      style={{ background: `${u.colors.primary}22`, color: u.colors.primary, border: `1px solid ${u.colors.primary}38` }}>
                      {i + 1}
                    </span>
                    <span className="text-sm leading-relaxed pt-0.5" style={{ color: 'rgba(220,228,255,0.65)' }}>{s}</span>
                  </li>
                ))}
              </ol>
              <div className="mt-6 p-4 rounded-xl sm:rounded-2xl"
                style={{ background: `${u.colors.primary}0d`, border: `1px solid ${u.colors.primary}22` }}>
                <div className="flex items-center gap-2 text-xs mb-1" style={{ color: 'rgba(220,228,255,0.35)' }}>
                  <Clock size={11} /> Deadline
                </div>
                <p className="text-sm" style={{ color: 'rgba(220,228,255,0.65)' }}>{u.admissions.deadline}</p>
              </div>
            </div>

            <div className="space-y-5">
              <div className="glass-md rounded-2xl sm:rounded-3xl p-6 sm:p-8" style={{ border: `1px solid ${u.colors.primary}18` }}>
                <div className="flex items-center gap-2 text-sm font-syne font-bold mb-4" style={{ color: 'rgba(220,228,255,0.55)' }}>
                  <FileText size={13} /> Requirements Checklist
                </div>
                <ul className="space-y-2.5">
                  {u.admissions.requirements.map(r => (
                    <li key={r} className="flex items-start gap-2.5 text-sm" style={{ color: 'rgba(220,228,255,0.65)' }}>
                      <CheckCircle size={12} className="mt-0.5 flex-shrink-0" style={{ color: u.colors.primary }} />
                      {r}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="glass-md rounded-2xl sm:rounded-3xl p-5"
                style={{ background: 'rgba(250,204,21,0.04)', border: '1px solid rgba(250,204,21,0.15)' }}>
                <div className="flex items-center gap-2 text-xs mb-1" style={{ color: 'rgba(250,204,21,0.55)' }}>
                  <Lightbulb size={11} /> Scholarship Note
                </div>
                <p className="text-xs" style={{ color: 'rgba(220,228,255,0.58)' }}>{u.admissions.scholarshipNote}</p>
              </div>

              <button onClick={() => setModal(true)}
                className="w-full py-4 rounded-2xl font-syne font-bold text-base text-white btn-magnetic pulse-glow transition-all"
                style={{ background: `linear-gradient(135deg,${u.colors.primary},${u.colors.secondary})`, boxShadow: `0 0 40px ${u.colors.primary}44` }}>
                Apply to {u.name}
              </button>
            </div>
          </div>
        )}
      </div>

      {/* ── APPLY MODAL ── */}
      {modal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center px-4"
          style={{ background: 'rgba(0,0,0,0.78)', backdropFilter: 'blur(12px)' }}
          onClick={() => setModal(false)}>
          <div className="glass-md rounded-2xl sm:rounded-3xl p-6 sm:p-8 max-w-md w-full anim-scale-in"
            style={{ border: `1.5px solid ${u.colors.primary}55`, boxShadow: `0 0 70px ${u.colors.primary}40` }}
            onClick={e => e.stopPropagation()}>
            <div className="text-center mb-7">
              <div className="w-14 h-14 rounded-2xl flex items-center justify-center font-syne font-extrabold text-xl mx-auto mb-4"
                style={{ background: `${u.colors.primary}30`, border: `1.5px solid ${u.colors.primary}55` }}>
                {u.shortName}
              </div>
              <h3 className="font-syne font-bold text-xl mb-1" style={{ color: '#e8eeff' }}>{u.name}</h3>
              <p className="text-sm" style={{ color: 'rgba(220,228,255,0.45)' }}>Ready to take the next step?</p>
            </div>
            <div className="space-y-3 mb-7">
              {[
                [u.admissions.deadline, 'Deadline', Clock],
                [u.admissions.requirements.slice(0, 3).join(' · '), 'Key requirements', FileText],
                [u.admissions.scholarshipNote, 'Scholarship', Lightbulb],
              ].map(([val, label, Icon]: any) => (
                <div key={label as string} className="p-3 rounded-xl"
                  style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.07)' }}>
                  <div className="flex items-center gap-1.5 text-xs mb-1" style={{ color: 'rgba(220,228,255,0.32)' }}>
                    <Icon size={10} />{label as string}
                  </div>
                  <div className="text-sm" style={{ color: 'rgba(220,228,255,0.65)' }}>{val as string}</div>
                </div>
              ))}
            </div>
            <div className="flex gap-3">
              <button onClick={() => setModal(false)}
                className="flex-1 py-3 rounded-2xl text-sm glass font-medium transition-all hover:bg-white/8"
                style={{ color: 'rgba(220,228,255,0.6)' }}>
                Cancel
              </button>
              <a href={u.admissionsUrl} target="_blank" rel="noopener noreferrer"
                className="flex-1 py-3 rounded-2xl text-sm font-syne font-bold text-center text-white flex items-center justify-center gap-2 btn-magnetic transition-all"
                style={{ background: `linear-gradient(135deg,${u.colors.primary},${u.colors.secondary})` }}>
                Proceed <ExternalLink size={12} />
              </a>
            </div>
          </div>
        </div>
      )}

      {/* Footer */}
      <footer className="py-8 px-4 sm:px-6 text-center safe-bottom mt-16" style={{ borderTop: '1px solid rgba(255,255,255,0.05)' }}>
        <div className="max-w-4xl mx-auto">
          <p style={{ color: 'rgba(220,228,255,0.18)', fontSize: '0.72rem' }}>All data for reference only. Verify with official sources.</p>
          <p style={{ color: 'rgba(147,197,253,0.32)', fontSize: '0.7rem', marginTop: 4, fontWeight: 500 }}>Developed by Harry Lagto</p>
        </div>
      </footer>
    </main>
  );
}
