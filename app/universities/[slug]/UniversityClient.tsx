'use client';
import { useState } from 'react';
import Link from 'next/link';
import { University } from '@/lib/universities';
import AnimatedBackground from '@/components/ui/AnimatedBackground';
import ScoreBar from '@/components/ui/ScoreBar';
import {
  MapPin, Trophy, GraduationCap, Star, Users, ArrowLeft,
  ExternalLink, CheckCircle, BarChart2, Flame, BookOpen, Heart
} from 'lucide-react';

type Tab = 'overview' | 'academics' | 'sports' | 'student-life' | 'admissions';

interface Props { university: University }

export default function UniversityClient({ university: u }: Props) {
  const [tab, setTab] = useState<Tab>('overview');
  const [modalOpen, setModalOpen] = useState(false);

  const tabs: { id: Tab; label: string; icon: React.FC<any> }[] = [
    { id: 'overview', label: 'Overview', icon: Star },
    { id: 'academics', label: 'Academics', icon: GraduationCap },
    { id: 'sports', label: 'Sports', icon: Trophy },
    { id: 'student-life', label: 'Student Life', icon: Heart },
    { id: 'admissions', label: 'Admissions', icon: CheckCircle },
  ];

  return (
    <main className="min-h-screen pb-20">
      <AnimatedBackground primaryColor={u.colors.primary} secondaryColor={u.colors.secondary} intensity={0.3} />

      {/* Hero */}
      <div className="relative pt-20 pb-0 overflow-hidden">
        <div className="absolute inset-0 pointer-events-none"
          style={{ background: `linear-gradient(180deg, ${u.colors.primary}22 0%, transparent 100%)` }} />

        <div className="max-w-6xl mx-auto px-6 pt-10">
          <Link href="/universities"
            className="inline-flex items-center gap-2 text-sm text-white/40 hover:text-white/70 transition-colors mb-8">
            <ArrowLeft size={14} /> All Universities
          </Link>

          <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 pb-10"
            style={{ borderBottom: '1px solid rgba(255,255,255,0.08)' }}>
            <div className="flex items-center gap-6">
              {/* Logo block */}
              <div className="w-20 h-20 md:w-28 md:h-28 rounded-3xl flex items-center justify-center font-syne font-800 text-2xl md:text-3xl flex-shrink-0"
                style={{
                  background: `linear-gradient(135deg,${u.colors.primary}88,${u.colors.secondary}88)`,
                  border: `2px solid ${u.colors.primary}66`,
                  boxShadow: `0 0 40px ${u.colors.primary}55`,
                }}>
                {u.shortName}
              </div>
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-xs px-2 py-0.5 rounded-full capitalize"
                    style={{ background: 'rgba(255,255,255,0.08)', color: 'rgba(255,255,255,0.5)', border: '1px solid rgba(255,255,255,0.12)' }}>
                    {u.type} · Est. {u.founded}
                  </span>
                </div>
                <h1 className="font-syne font-800 text-3xl md:text-5xl tracking-tight leading-tight">
                  {u.name}
                </h1>
                <p className="text-white/40 text-sm md:text-base mt-1 italic">"{u.tagline}"</p>
                <div className="flex items-center gap-1.5 mt-2 text-sm text-white/40">
                  <MapPin size={13} />{u.location}
                </div>
              </div>
            </div>

            {/* Highlights */}
            <div className="flex flex-wrap gap-3">
              {u.highlights.map((h) => (
                <div key={h.label} className="glass rounded-2xl px-4 py-3 text-center"
                  style={{ border: `1px solid ${u.colors.primary}33` }}>
                  <div className="text-xl mb-0.5">{h.icon}</div>
                  <div className="font-bold text-sm">{h.value}</div>
                  <div className="text-xs text-white/40">{h.label}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Tabs */}
          <div className="flex gap-1 pt-4 overflow-x-auto no-scrollbar">
            {tabs.map(({ id, label, icon: Icon }) => (
              <button key={id} onClick={() => setTab(id)}
                className="flex items-center gap-1.5 px-4 py-2.5 rounded-xl text-sm font-medium whitespace-nowrap transition-all"
                style={tab === id
                  ? { background: `${u.colors.primary}33`, border: `1px solid ${u.colors.primary}66`, color: '#fff' }
                  : { background: 'transparent', border: '1px solid transparent', color: 'rgba(255,255,255,0.4)' }
                }>
                <Icon size={13} />{label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Tab content */}
      <div className="max-w-6xl mx-auto px-6 pt-10">

        {/* OVERVIEW */}
        {tab === 'overview' && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="md:col-span-2 space-y-6">
              <div className="glass rounded-3xl p-8" style={{ border: `1px solid ${u.colors.primary}22` }}>
                <h2 className="font-syne font-700 text-xl mb-4 flex items-center gap-2">
                  <Star size={18} style={{ color: u.colors.primary }} /> About {u.shortName}
                </h2>
                <p className="text-white/60 leading-relaxed">{u.description}</p>
              </div>
              <div className="glass rounded-3xl p-8" style={{ border: `1px solid ${u.colors.primary}22` }}>
                <h2 className="font-syne font-700 text-xl mb-5 flex items-center gap-2">
                  <Trophy size={18} style={{ color: u.colors.primary }} /> Key Achievements
                </h2>
                <ul className="space-y-3">
                  {u.achievements.map((a, i) => (
                    <li key={i} className="flex items-start gap-3 text-sm text-white/60">
                      <CheckCircle size={14} className="mt-0.5 flex-shrink-0" style={{ color: u.colors.primary }} />
                      {a}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
            <div className="space-y-4">
              <div className="glass rounded-3xl p-6" style={{ border: `1px solid ${u.colors.primary}22` }}>
                <h3 className="font-syne font-700 text-base mb-4">Quick Info</h3>
                <div className="space-y-3 text-sm">
                  <div className="flex justify-between"><span className="text-white/40">Founded</span><span>{u.founded}</span></div>
                  <div className="flex justify-between"><span className="text-white/40">Type</span><span className="capitalize">{u.type}</span></div>
                  <div className="flex justify-between"><span className="text-white/40">Location</span><span className="text-right max-w-[150px] text-xs">{u.location}</span></div>
                  <div className="flex justify-between"><span className="text-white/40">UAAP Titles</span><span>{u.sports.totalTitles}+</span></div>
                  <div className="flex justify-between"><span className="text-white/40">Best in</span><span>{u.sports.dominantSport}</span></div>
                </div>
              </div>
              <Link href={u.website} target="_blank"
                className="flex items-center justify-between p-4 rounded-2xl glass glass-hover text-sm font-medium transition-all">
                Official Website <ExternalLink size={13} className="text-white/30" />
              </Link>
              <button onClick={() => setModalOpen(true)}
                className="w-full py-3 rounded-2xl font-semibold text-sm text-white transition-all hover:scale-105 hover:shadow-2xl"
                style={{ background: `linear-gradient(135deg,${u.colors.primary},${u.colors.secondary})`, boxShadow: `0 0 30px ${u.colors.primary}44` }}>
                Apply to {u.shortName} →
              </button>
              <Link href="/compare"
                className="flex items-center justify-center gap-2 py-3 rounded-2xl glass glass-hover text-sm font-medium transition-all">
                <BarChart2 size={14} /> Compare with another school
              </Link>
            </div>
          </div>
        )}

        {/* ACADEMICS */}
        {tab === 'academics' && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="glass rounded-3xl p-8" style={{ border: `1px solid ${u.colors.primary}22` }}>
              <h2 className="font-syne font-700 text-xl mb-4 flex items-center gap-2">
                <GraduationCap size={18} style={{ color: u.colors.primary }} /> Academic Overview
              </h2>
              <p className="text-white/60 text-sm leading-relaxed mb-6">{u.academics.overview}</p>

              <div className="space-y-2 text-sm mb-6">
                <div className="flex justify-between py-2" style={{ borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
                  <span className="text-white/40">QS World Rank</span>
                  <span className="font-semibold">{u.academics.qsRank}</span>
                </div>
                <div className="flex justify-between py-2" style={{ borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
                  <span className="text-white/40">Regional Context</span>
                  <span className="text-white/70 text-xs text-right max-w-[200px]">{u.academics.qsRegionalRank}</span>
                </div>
                <div className="flex justify-between py-2" style={{ borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
                  <span className="text-white/40">Tuition</span>
                  <span className="text-xs text-right max-w-[200px] text-white/70">{u.academics.tuitionRange}</span>
                </div>
                <div className="flex justify-between py-2">
                  <span className="text-white/40">Tuition Level</span>
                  <span className="px-2 py-0.5 rounded-full text-xs font-semibold"
                    style={{ background: 'rgba(59,130,246,0.15)', color: '#93c5fd' }}>
                    {u.academics.tuitionLabel}
                  </span>
                </div>
              </div>

              <div className="space-y-3">
                <h3 className="font-semibold text-sm mb-3">Academic Strength Scores</h3>
                <ScoreBar label="Academic Reputation" value={u.academics.scores.academicReputation} color={u.colors.primary} delay={0} />
                <ScoreBar label="Program Strength" value={u.academics.scores.programStrength} color={u.colors.primary} delay={100} />
                <ScoreBar label="Research Output" value={u.academics.scores.researchOutput} color={u.colors.secondary} delay={200} />
                <ScoreBar label="Industry Alignment" value={u.academics.scores.industryAlignment} color={u.colors.secondary} delay={300} />
              </div>
            </div>

            <div className="space-y-6">
              <div className="glass rounded-3xl p-8" style={{ border: `1px solid ${u.colors.primary}22` }}>
                <h2 className="font-syne font-700 text-xl mb-4 flex items-center gap-2">
                  <BookOpen size={18} style={{ color: u.colors.primary }} /> Top Programs
                </h2>
                <div className="space-y-3">
                  {u.academics.topPrograms.map((p, i) => (
                    <div key={p.name}>
                      <div className="flex justify-between text-sm mb-1.5">
                        <span className="text-white/70">{p.name}</span>
                        <span className="font-bold" style={{ color: u.colors.primary }}>{p.strength}/10</span>
                      </div>
                      <div className="h-1.5 rounded-full overflow-hidden" style={{ background: 'rgba(255,255,255,0.08)' }}>
                        <div className="h-full rounded-full transition-all duration-1000"
                          style={{ width: `${p.strength * 10}%`, background: `linear-gradient(90deg,${u.colors.primary},${u.colors.secondary})`, transitionDelay: `${i * 100}ms` }} />
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="glass rounded-3xl p-8" style={{ border: `1px solid ${u.colors.primary}22` }}>
                <h2 className="font-syne font-700 text-xl mb-4">Academic Strengths</h2>
                <div className="flex flex-wrap gap-2">
                  {u.academics.strengths.map((s) => (
                    <span key={s} className="px-3 py-1.5 rounded-full text-xs font-medium"
                      style={{ background: `${u.colors.primary}22`, border: `1px solid ${u.colors.primary}44`, color: u.colors.primary }}>
                      {s}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* SPORTS */}
        {tab === 'sports' && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="glass rounded-3xl p-8" style={{ border: `1px solid ${u.colors.primary}22` }}>
              <h2 className="font-syne font-700 text-xl mb-4 flex items-center gap-2">
                <Trophy size={18} style={{ color: u.colors.primary }} /> Sports Overview
              </h2>
              <p className="text-white/60 text-sm leading-relaxed mb-6">{u.sports.overview}</p>
              <div className="space-y-2 text-sm mb-6">
                <div className="flex justify-between py-2" style={{ borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
                  <span className="text-white/40">Total UAAP Titles</span>
                  <span className="font-bold text-lg" style={{ color: u.colors.primary }}>{u.sports.totalTitles}+</span>
                </div>
                <div className="flex justify-between py-2" style={{ borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
                  <span className="text-white/40">Dominant Sport</span>
                  <span className="font-semibold">{u.sports.dominantSport}</span>
                </div>
              </div>
              <p className="text-white/50 text-sm mb-4"><Flame size={13} className="inline mr-1" style={{ color: u.colors.primary }} />{u.sports.notable}</p>
              <div>
                <h3 className="font-semibold text-sm text-white/50 mb-2">UAAP Teams</h3>
                <div className="flex flex-wrap gap-1.5">
                  {u.sports.uaapTeams.map((t) => (
                    <span key={t} className="px-2 py-1 rounded-lg text-xs"
                      style={{ background: 'rgba(255,255,255,0.06)', color: 'rgba(255,255,255,0.5)' }}>{t}</span>
                  ))}
                </div>
              </div>
            </div>

            <div className="glass rounded-3xl p-8" style={{ border: `1px solid ${u.colors.primary}22` }}>
              <h2 className="font-syne font-700 text-xl mb-6 flex items-center gap-2">
                <Star size={18} style={{ color: u.colors.primary }} /> Championship History
              </h2>
              <div className="space-y-4 mb-6">
                {u.sports.championships.map((c) => (
                  <div key={c.sport} className="p-4 rounded-2xl"
                    style={{ background: `${u.colors.primary}11`, border: `1px solid ${u.colors.primary}33` }}>
                    <div className="flex items-center justify-between mb-2">
                      <span className="font-semibold text-sm">{c.sport}</span>
                      <span className="font-bold text-xl" style={{ color: u.colors.primary }}>{c.count}</span>
                    </div>
                    <div className="text-xs text-white/40">Recent: {c.recentYears.join(', ')}</div>
                  </div>
                ))}
              </div>
              <div className="p-4 rounded-2xl" style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)' }}>
                <div className="text-xs text-white/40 mb-1">MVP & Star Players</div>
                <p className="text-sm text-white/60">{u.sports.mvpHistory}</p>
              </div>
            </div>
          </div>
        )}

        {/* STUDENT LIFE */}
        {tab === 'student-life' && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="glass rounded-3xl p-8" style={{ border: `1px solid ${u.colors.primary}22` }}>
              <h2 className="font-syne font-700 text-xl mb-4 flex items-center gap-2">
                <Users size={18} style={{ color: u.colors.primary }} /> Campus Culture
              </h2>
              <p className="text-white/60 text-sm leading-relaxed mb-6">{u.studentLife.overview}</p>
              <p className="text-white/50 text-sm mb-6">{u.studentLife.culture}</p>
              <div className="space-y-3">
                <div>
                  <div className="text-xs text-white/30 mb-2">Mascot</div>
                  <div className="text-white/80 font-medium">{u.studentLife.mascot}</div>
                </div>
                <div>
                  <div className="text-xs text-white/30 mb-2">School Colors</div>
                  <div className="text-white/80 font-medium">{u.studentLife.schoolColor}</div>
                </div>
                <div>
                  <div className="text-xs text-white/30 mb-2">Fan Base</div>
                  <div className="text-white/60 text-sm">{u.studentLife.fanBase}</div>
                </div>
              </div>
            </div>
            <div className="space-y-5">
              <div className="glass rounded-3xl p-8" style={{ border: `1px solid ${u.colors.primary}22` }}>
                <h3 className="font-syne font-700 text-base mb-3">Organizations</h3>
                <ul className="space-y-2">
                  {u.studentLife.organizations.map((o) => (
                    <li key={o} className="flex items-start gap-2 text-sm text-white/60">
                      <span style={{ color: u.colors.primary }}>•</span>{o}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="glass rounded-3xl p-8" style={{ border: `1px solid ${u.colors.primary}22` }}>
                <h3 className="font-syne font-700 text-base mb-3">Key Events</h3>
                <div className="flex flex-wrap gap-2">
                  {u.studentLife.events.map((e) => (
                    <span key={e} className="px-3 py-1.5 rounded-full text-xs font-medium"
                      style={{ background: `${u.colors.primary}22`, color: u.colors.primary }}>
                      {e}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ADMISSIONS */}
        {tab === 'admissions' && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="glass rounded-3xl p-8" style={{ border: `1px solid ${u.colors.primary}22` }}>
              <h2 className="font-syne font-700 text-xl mb-6 flex items-center gap-2">
                <CheckCircle size={18} style={{ color: u.colors.primary }} /> Application Steps
              </h2>
              <ol className="space-y-4">
                {u.admissions.steps.map((s, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <span className="w-6 h-6 rounded-full flex-shrink-0 flex items-center justify-center text-xs font-bold"
                      style={{ background: `${u.colors.primary}33`, color: u.colors.primary }}>
                      {i + 1}
                    </span>
                    <span className="text-sm text-white/60 leading-relaxed">{s}</span>
                  </li>
                ))}
              </ol>
              <div className="mt-6 p-4 rounded-2xl"
                style={{ background: `${u.colors.primary}11`, border: `1px solid ${u.colors.primary}33` }}>
                <div className="text-xs text-white/40 mb-1">Deadline</div>
                <p className="text-sm text-white/70">{u.admissions.deadline}</p>
              </div>
            </div>
            <div className="space-y-5">
              <div className="glass rounded-3xl p-8" style={{ border: `1px solid ${u.colors.primary}22` }}>
                <h3 className="font-syne font-700 text-base mb-4">Requirements Checklist</h3>
                <ul className="space-y-2.5">
                  {u.admissions.requirements.map((r) => (
                    <li key={r} className="flex items-start gap-2.5 text-sm text-white/60">
                      <CheckCircle size={13} className="mt-0.5 flex-shrink-0" style={{ color: u.colors.primary }} />
                      {r}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="glass rounded-3xl p-6" style={{ border: `1px solid rgba(250,204,21,0.2)`, background: 'rgba(250,204,21,0.05)' }}>
                <div className="text-xs text-yellow-400/60 mb-1">💡 Scholarship Note</div>
                <p className="text-sm text-white/60">{u.admissions.scholarshipNote}</p>
              </div>
              <button onClick={() => setModalOpen(true)}
                className="w-full py-4 rounded-2xl font-semibold text-base text-white transition-all hover:scale-105"
                style={{ background: `linear-gradient(135deg,${u.colors.primary},${u.colors.secondary})`, boxShadow: `0 0 40px ${u.colors.primary}55` }}>
                Apply to {u.name} →
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Apply Modal */}
      {modalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center px-4"
          style={{ background: 'rgba(0,0,0,0.7)', backdropFilter: 'blur(8px)' }}
          onClick={() => setModalOpen(false)}>
          <div className="glass rounded-3xl p-8 max-w-md w-full"
            style={{ border: `1px solid ${u.colors.primary}55`, boxShadow: `0 0 60px ${u.colors.primary}33` }}
            onClick={(e) => e.stopPropagation()}>
            <div className="text-center mb-6">
              <div className="w-16 h-16 rounded-2xl flex items-center justify-center font-syne font-800 text-xl mx-auto mb-4"
                style={{ background: `${u.colors.primary}33`, border: `1px solid ${u.colors.primary}55` }}>
                {u.shortName}
              </div>
              <h3 className="font-syne font-700 text-2xl mb-1">{u.name}</h3>
              <p className="text-white/40 text-sm">Ready to apply? Here's a quick summary.</p>
            </div>
            <div className="space-y-3 mb-6">
              <div className="p-3 rounded-xl" style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)' }}>
                <div className="text-xs text-white/30 mb-1">Deadline</div>
                <div className="text-sm text-white/70">{u.admissions.deadline}</div>
              </div>
              <div className="p-3 rounded-xl" style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)' }}>
                <div className="text-xs text-white/30 mb-1">Key requirements</div>
                <div className="text-sm text-white/60">{u.admissions.requirements.slice(0, 3).join(' · ')}</div>
              </div>
              {u.admissions.scholarshipNote && (
                <div className="p-3 rounded-xl" style={{ background: 'rgba(250,204,21,0.07)', border: '1px solid rgba(250,204,21,0.2)' }}>
                  <div className="text-xs text-yellow-400/60 mb-1">💡 Scholarship</div>
                  <div className="text-xs text-white/60">{u.admissions.scholarshipNote}</div>
                </div>
              )}
            </div>
            <div className="flex gap-3">
              <button onClick={() => setModalOpen(false)}
                className="flex-1 py-3 rounded-2xl text-sm glass glass-hover font-medium">Cancel</button>
              <a href={u.admissionsUrl} target="_blank" rel="noopener noreferrer"
                className="flex-1 py-3 rounded-2xl text-sm font-semibold text-center text-white flex items-center justify-center gap-2 transition-all hover:scale-105"
                style={{ background: `linear-gradient(135deg,${u.colors.primary},${u.colors.secondary})` }}>
                Proceed <ExternalLink size={13} />
              </a>
            </div>
          </div>
        </div>
      )}
    </main>
  );
}
