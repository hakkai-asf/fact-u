'use client';
import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { University } from '@/lib/universities';
import AnimatedBackground from '@/components/ui/AnimatedBackground';
import ScoreBar from '@/components/ui/ScoreBar';
import { MapPin, Trophy, GraduationCap, Star, Users, ArrowLeft, ExternalLink, CheckCircle, BarChart2, Flame, BookOpen, Heart } from 'lucide-react';

type Tab = 'overview'|'academics'|'sports'|'student-life'|'admissions';

export default function UniversityClient({ university: u }: { university: University }) {
  const [tab, setTab]         = useState<Tab>('overview');
  const [modal, setModal]     = useState(false);
  const [heroVisible, setHeroVisible] = useState(false);
  const heroRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setTimeout(() => setHeroVisible(true), 100);
  }, []);

  const tabs: {id:Tab; label:string; icon:React.FC<any>}[] = [
    {id:'overview',     label:'Overview',     icon:Star},
    {id:'academics',    label:'Academics',    icon:GraduationCap},
    {id:'sports',       label:'Sports',       icon:Trophy},
    {id:'student-life', label:'Student Life', icon:Heart},
    {id:'admissions',   label:'Admissions',   icon:CheckCircle},
  ];

  return (
    <main className="min-h-screen pb-24">
      <AnimatedBackground primaryColor={u.colors.primary} secondaryColor={u.colors.secondary} intensity={0.35} />

      {/* HERO */}
      <div className="relative overflow-hidden" ref={heroRef}>
        {/* Full-bleed color gradient top */}
        <div className="absolute inset-0 pointer-events-none"
          style={{ background: `linear-gradient(180deg, ${u.colors.primary}30 0%, transparent 100%)` }} />
        <div className="absolute top-0 left-0 right-0 h-px"
          style={{ background: `linear-gradient(90deg,transparent,${u.colors.primary},transparent)` }} />

        <div className="max-w-7xl mx-auto px-6 pt-28 pb-0">
          {/* Back */}
          <Link href="/universities"
            className="inline-flex items-center gap-2 text-sm text-white/35 hover:text-white/70 transition-colors mb-10 group">
            <ArrowLeft size={14} className="group-hover:-translate-x-1 transition-transform" /> All Universities
          </Link>

          <div className={`transition-all duration-1000 ${heroVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
            <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-10 pb-10"
              style={{ borderBottom: '1px solid rgba(255,255,255,0.07)' }}>

              <div className="flex items-center gap-7">
                {/* Logo */}
                <div className="relative flex-shrink-0">
                  <div className="w-24 h-24 md:w-32 md:h-32 rounded-3xl flex items-center justify-center font-syne font-800 text-2xl md:text-3xl"
                    style={{
                      background: `linear-gradient(135deg,${u.colors.primary}cc,${u.colors.secondary}aa)`,
                      border: `1.5px solid ${u.colors.primary}77`,
                      boxShadow: `0 0 60px ${u.colors.primary}66, inset 0 1px 0 rgba(255,255,255,0.2)`,
                    }}>
                    {u.shortName}
                  </div>
                  {/* Glow ring */}
                  <div className="absolute inset-0 rounded-3xl pulse-glow"
                    style={{ border: `1px solid ${u.colors.primary}44` }} />
                </div>

                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-xs px-3 py-1 rounded-full uppercase tracking-widest font-syne font-600"
                      style={{ background: 'rgba(255,255,255,0.06)', color: 'rgba(255,255,255,0.4)', border: '1px solid rgba(255,255,255,0.1)' }}>
                      {u.type} · Est. {u.founded}
                    </span>
                  </div>
                  <h1 className="font-syne font-800 leading-tight tracking-tight"
                    style={{ fontSize: 'clamp(1.8rem,4vw,3.8rem)' }}>
                    {u.name}
                  </h1>
                  <p className="text-white/35 text-base mt-1 italic">"{u.tagline}"</p>
                  <div className="flex items-center gap-1.5 mt-2 text-sm text-white/30">
                    <MapPin size={12} />{u.location}
                  </div>
                </div>
              </div>

              {/* Highlights */}
              <div className="flex flex-wrap gap-3">
                {u.highlights.map(h => (
                  <div key={h.label} className="glass rounded-2xl px-5 py-3 text-center sweep"
                    style={{ border: `1px solid ${u.colors.primary}28` }}>
                    <div className="text-xl mb-0.5">{h.icon}</div>
                    <div className="font-syne font-800 text-base">{h.value}</div>
                    <div className="text-[11px] text-white/35">{h.label}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Tabs */}
            <div className="flex gap-1 pt-4 overflow-x-auto no-scrollbar -mb-px">
              {tabs.map(({id, label, icon:Icon}) => (
                <button key={id} onClick={() => setTab(id)}
                  className="flex items-center gap-1.5 px-5 py-3 text-sm font-syne font-600 whitespace-nowrap transition-all duration-300 relative"
                  style={{
                    color: tab === id ? '#fff' : 'rgba(255,255,255,0.35)',
                    borderBottom: tab === id ? `2px solid ${u.colors.primary}` : '2px solid transparent',
                  }}>
                  <Icon size={13} />{label}
                  {tab === id && (
                    <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-1.5 h-1.5 rounded-full"
                      style={{ background: u.colors.primary, boxShadow: `0 0 8px ${u.colors.primary}` }} />
                  )}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* TAB CONTENT */}
      <div className="max-w-7xl mx-auto px-6 pt-10">

        {tab === 'overview' && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 anim-fade-up">
            <div className="lg:col-span-2 space-y-5">
              <div className="glass-md rounded-3xl p-8" style={{border:`1px solid ${u.colors.primary}20`}}>
                <h2 className="font-syne font-700 text-lg mb-4 flex items-center gap-2">
                  <Star size={16} style={{color:u.colors.primary}}/> About {u.shortName}
                </h2>
                <p className="text-white/55 leading-relaxed">{u.description}</p>
              </div>
              <div className="glass-md rounded-3xl p-8" style={{border:`1px solid ${u.colors.primary}20`}}>
                <h2 className="font-syne font-700 text-lg mb-5 flex items-center gap-2">
                  <Trophy size={16} style={{color:u.colors.primary}}/> Key Achievements
                </h2>
                <ul className="space-y-3">
                  {u.achievements.map((a,i) => (
                    <li key={i} className="flex items-start gap-3 text-sm text-white/55">
                      <CheckCircle size={14} className="mt-0.5 flex-shrink-0" style={{color:u.colors.primary}}/>
                      {a}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
            <div className="space-y-4">
              <div className="glass-md rounded-3xl p-6" style={{border:`1px solid ${u.colors.primary}20`}}>
                <h3 className="font-syne font-700 text-sm mb-4 text-white/60">Quick Info</h3>
                <div className="space-y-3 text-sm">
                  {[['Founded',u.founded],['Type',u.type],['Location',u.location],['Total Titles',`${u.sports.totalTitles}+`],['Best in',u.sports.dominantSport]].map(([k,v])=>(
                    <div key={k} className="flex justify-between gap-2 py-2" style={{borderBottom:'1px solid rgba(255,255,255,0.05)'}}>
                      <span className="text-white/35 flex-shrink-0 capitalize">{k}</span>
                      <span className="text-right text-xs">{v}</span>
                    </div>
                  ))}
                </div>
              </div>
              <a href={u.website} target="_blank" className="flex items-center justify-between p-4 rounded-2xl glass btn-magnetic text-sm font-medium transition-all hover:border-blue-400/30"
                style={{border:'1px solid rgba(255,255,255,0.08)'}}>
                Official Website <ExternalLink size={13} className="text-white/25"/>
              </a>
              <button onClick={() => setModal(true)}
                className="w-full py-4 rounded-2xl font-syne font-700 text-sm text-white btn-magnetic transition-all"
                style={{background:`linear-gradient(135deg,${u.colors.primary},${u.colors.secondary})`, boxShadow:`0 0 40px ${u.colors.primary}44`}}>
                Apply to {u.shortName} →
              </button>
              <Link href="/compare" className="flex items-center justify-center gap-2 py-3 rounded-2xl glass btn-magnetic text-sm font-medium transition-all"
                style={{border:'1px solid rgba(255,255,255,0.1)'}}>
                <BarChart2 size={14}/> Compare with another school
              </Link>
            </div>
          </div>
        )}

        {tab === 'academics' && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 anim-fade-up">
            <div className="glass-md rounded-3xl p-8" style={{border:`1px solid ${u.colors.primary}20`}}>
              <h2 className="font-syne font-700 text-lg mb-4 flex items-center gap-2">
                <GraduationCap size={16} style={{color:u.colors.primary}}/> Academic Profile
              </h2>
              <p className="text-white/50 text-sm leading-relaxed mb-7">{u.academics.overview}</p>
              <div className="space-y-2 text-sm mb-7">
                {[['QS World Rank',u.academics.qsRank],['Regional Context',u.academics.qsRegionalRank],['Tuition Range',u.academics.tuitionRange],['Tuition Level',u.academics.tuitionLabel]].map(([k,v])=>(
                  <div key={k} className="flex justify-between py-2.5" style={{borderBottom:'1px solid rgba(255,255,255,0.05)'}}>
                    <span className="text-white/35">{k}</span>
                    <span className="text-xs text-right max-w-[200px] font-medium">{v}</span>
                  </div>
                ))}
              </div>
              <div className="space-y-4">
                <div className="text-xs text-white/35 uppercase tracking-widest font-syne mb-3">Strength Scores</div>
                <ScoreBar label="Academic Reputation" value={u.academics.scores.academicReputation} color={u.colors.primary} delay={0}/>
                <ScoreBar label="Program Strength"    value={u.academics.scores.programStrength}    color={u.colors.primary} delay={120}/>
                <ScoreBar label="Research Output"     value={u.academics.scores.researchOutput}     color={u.colors.secondary} delay={240}/>
                <ScoreBar label="Industry Alignment"  value={u.academics.scores.industryAlignment}  color={u.colors.secondary} delay={360}/>
              </div>
            </div>
            <div className="space-y-5">
              <div className="glass-md rounded-3xl p-8" style={{border:`1px solid ${u.colors.primary}20`}}>
                <h2 className="font-syne font-700 text-lg mb-5 flex items-center gap-2">
                  <BookOpen size={16} style={{color:u.colors.primary}}/> Top Programs
                </h2>
                <div className="space-y-4">
                  {u.academics.topPrograms.map((p,i) => (
                    <div key={p.name}>
                      <div className="flex justify-between text-sm mb-1.5">
                        <span className="text-white/60">{p.name}</span>
                        <span className="font-bold text-xs" style={{color:u.colors.primary}}>{p.strength}/10</span>
                      </div>
                      <div className="h-1.5 rounded-full overflow-hidden" style={{background:'rgba(255,255,255,0.06)'}}>
                        <div className="h-full rounded-full bar-grow"
                          style={{width:`${p.strength*10}%`,background:`linear-gradient(90deg,${u.colors.primary},${u.colors.secondary})`,animationDelay:`${i*100}ms`}}/>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              <div className="glass-md rounded-3xl p-6" style={{border:`1px solid ${u.colors.primary}20`}}>
                <h3 className="font-syne font-700 text-sm mb-3 text-white/50">Academic Strengths</h3>
                <div className="flex flex-wrap gap-2">
                  {u.academics.strengths.map(s => (
                    <span key={s} className="px-3 py-1.5 rounded-full text-xs font-medium"
                      style={{background:`${u.colors.primary}18`,border:`1px solid ${u.colors.primary}35`,color:u.colors.primary}}>{s}</span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {tab === 'sports' && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 anim-fade-up">
            <div className="glass-md rounded-3xl p-8" style={{border:`1px solid ${u.colors.primary}20`}}>
              <h2 className="font-syne font-700 text-lg mb-4 flex items-center gap-2">
                <Trophy size={16} style={{color:u.colors.primary}}/> Sports Overview
              </h2>
              <p className="text-white/55 text-sm leading-relaxed mb-6">{u.sports.overview}</p>
              <div className="space-y-3 text-sm mb-6">
                <div className="flex justify-between py-3" style={{borderBottom:'1px solid rgba(255,255,255,0.05)'}}>
                  <span className="text-white/35">Total UAAP Titles</span>
                  <span className="font-syne font-800 text-2xl" style={{color:u.colors.primary}}>{u.sports.totalTitles}+</span>
                </div>
                <div className="flex justify-between py-3" style={{borderBottom:'1px solid rgba(255,255,255,0.05)'}}>
                  <span className="text-white/35">Dominant Sport</span>
                  <span className="font-semibold">{u.sports.dominantSport}</span>
                </div>
              </div>
              <div className="p-4 rounded-2xl mb-4" style={{background:`${u.colors.primary}10`,border:`1px solid ${u.colors.primary}25`}}>
                <Flame size={13} className="inline mr-2" style={{color:u.colors.primary}}/>
                <span className="text-sm text-white/60">{u.sports.notable}</span>
              </div>
              <div className="flex flex-wrap gap-1.5">
                {u.sports.uaapTeams.map(t => (
                  <span key={t} className="px-2.5 py-1 rounded-lg text-xs" style={{background:'rgba(255,255,255,0.05)',color:'rgba(255,255,255,0.45)'}}>{t}</span>
                ))}
              </div>
            </div>
            <div className="glass-md rounded-3xl p-8" style={{border:`1px solid ${u.colors.primary}20`}}>
              <h2 className="font-syne font-700 text-lg mb-6 flex items-center gap-2">
                <Star size={16} style={{color:u.colors.primary}}/> Championship History
              </h2>
              <div className="space-y-4 mb-6">
                {u.sports.championships.map(c => (
                  <div key={c.sport} className="p-4 rounded-2xl" style={{background:`${u.colors.primary}0d`,border:`1px solid ${u.colors.primary}25`}}>
                    <div className="flex items-center justify-between mb-1">
                      <span className="font-semibold text-sm">{c.sport}</span>
                      <span className="font-syne font-800 text-2xl" style={{color:u.colors.primary}}>{c.count}</span>
                    </div>
                    <div className="text-xs text-white/30">Recent: {c.recentYears.join(', ')}</div>
                  </div>
                ))}
              </div>
              <div className="p-4 rounded-2xl" style={{background:'rgba(255,255,255,0.03)',border:'1px solid rgba(255,255,255,0.07)'}}>
                <div className="text-xs text-white/30 mb-1">MVP & Star Players</div>
                <p className="text-sm text-white/50">{u.sports.mvpHistory}</p>
              </div>
            </div>
          </div>
        )}

        {tab === 'student-life' && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 anim-fade-up">
            <div className="glass-md rounded-3xl p-8" style={{border:`1px solid ${u.colors.primary}20`}}>
              <h2 className="font-syne font-700 text-lg mb-4 flex items-center gap-2">
                <Users size={16} style={{color:u.colors.primary}}/> Campus Culture
              </h2>
              <p className="text-white/55 text-sm leading-relaxed mb-5">{u.studentLife.overview}</p>
              <p className="text-white/40 text-sm mb-6">{u.studentLife.culture}</p>
              <div className="space-y-4 text-sm">
                {[['Mascot',u.studentLife.mascot],['School Colors',u.studentLife.schoolColor]].map(([k,v])=>(
                  <div key={k}><div className="text-xs text-white/25 mb-1">{k}</div><div className="text-white/70 font-medium">{v}</div></div>
                ))}
                <div><div className="text-xs text-white/25 mb-1">Fan Base</div><div className="text-white/50 text-xs leading-relaxed">{u.studentLife.fanBase}</div></div>
              </div>
            </div>
            <div className="space-y-5">
              <div className="glass-md rounded-3xl p-7" style={{border:`1px solid ${u.colors.primary}20`}}>
                <h3 className="font-syne font-700 text-sm mb-3 text-white/50">Organizations</h3>
                <ul className="space-y-2">
                  {u.studentLife.organizations.map(o => (
                    <li key={o} className="flex items-start gap-2 text-sm text-white/50">
                      <span style={{color:u.colors.primary,flexShrink:0}}>›</span>{o}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="glass-md rounded-3xl p-7" style={{border:`1px solid ${u.colors.primary}20`}}>
                <h3 className="font-syne font-700 text-sm mb-3 text-white/50">Key Events</h3>
                <div className="flex flex-wrap gap-2">
                  {u.studentLife.events.map(e => (
                    <span key={e} className="px-3 py-1.5 rounded-full text-xs font-medium"
                      style={{background:`${u.colors.primary}18`,color:u.colors.primary}}>{e}</span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {tab === 'admissions' && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 anim-fade-up">
            <div className="glass-md rounded-3xl p-8" style={{border:`1px solid ${u.colors.primary}20`}}>
              <h2 className="font-syne font-700 text-lg mb-6 flex items-center gap-2">
                <CheckCircle size={16} style={{color:u.colors.primary}}/> Application Steps
              </h2>
              <ol className="space-y-5">
                {u.admissions.steps.map((s,i) => (
                  <li key={i} className="flex items-start gap-4">
                    <span className="w-7 h-7 rounded-full flex-shrink-0 flex items-center justify-center text-xs font-bold font-syne"
                      style={{background:`${u.colors.primary}25`,color:u.colors.primary,border:`1px solid ${u.colors.primary}40`}}>{i+1}</span>
                    <span className="text-sm text-white/55 leading-relaxed pt-0.5">{s}</span>
                  </li>
                ))}
              </ol>
              <div className="mt-6 p-4 rounded-2xl" style={{background:`${u.colors.primary}0d`,border:`1px solid ${u.colors.primary}25`}}>
                <div className="text-xs text-white/30 mb-1">⏰ Deadline</div>
                <p className="text-sm text-white/60">{u.admissions.deadline}</p>
              </div>
            </div>
            <div className="space-y-5">
              <div className="glass-md rounded-3xl p-8" style={{border:`1px solid ${u.colors.primary}20`}}>
                <h3 className="font-syne font-700 text-sm mb-4 text-white/50">Requirements Checklist</h3>
                <ul className="space-y-2.5">
                  {u.admissions.requirements.map(r => (
                    <li key={r} className="flex items-start gap-2.5 text-sm text-white/55">
                      <CheckCircle size={13} className="mt-0.5 flex-shrink-0" style={{color:u.colors.primary}}/>{r}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="glass-md rounded-3xl p-5" style={{background:'rgba(250,204,21,0.04)',border:'1px solid rgba(250,204,21,0.15)'}}>
                <div className="text-xs text-yellow-400/50 mb-1">💡 Scholarship</div>
                <p className="text-xs text-white/50">{u.admissions.scholarshipNote}</p>
              </div>
              <button onClick={() => setModal(true)}
                className="w-full py-4 rounded-2xl font-syne font-700 text-base text-white btn-magnetic pulse-glow transition-all"
                style={{background:`linear-gradient(135deg,${u.colors.primary},${u.colors.secondary})`,boxShadow:`0 0 50px ${u.colors.primary}55`}}>
                Apply to {u.name} →
              </button>
            </div>
          </div>
        )}
      </div>

      {/* APPLY MODAL */}
      {modal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center px-4"
          style={{background:'rgba(0,0,0,0.75)',backdropFilter:'blur(12px)'}}
          onClick={() => setModal(false)}>
          <div className="glass-md rounded-3xl p-8 max-w-md w-full anim-scale-in"
            style={{border:`1.5px solid ${u.colors.primary}55`,boxShadow:`0 0 80px ${u.colors.primary}44`}}
            onClick={e => e.stopPropagation()}>
            <div className="text-center mb-7">
              <div className="w-16 h-16 rounded-2xl flex items-center justify-center font-syne font-800 text-xl mx-auto mb-4"
                style={{background:`${u.colors.primary}33`,border:`1.5px solid ${u.colors.primary}55`,boxShadow:`0 0 30px ${u.colors.primary}44`}}>
                {u.shortName}
              </div>
              <h3 className="font-syne font-800 text-2xl mb-1">{u.name}</h3>
              <p className="text-white/35 text-sm">Ready to take the next step?</p>
            </div>
            <div className="space-y-3 mb-7">
              {[[u.admissions.deadline,'⏰ Deadline'],[u.admissions.requirements.slice(0,3).join(' · '),'📋 Key requirements'],[u.admissions.scholarshipNote,'💡 Scholarship']].map(([v,label])=>(
                <div key={label} className="p-3 rounded-xl" style={{background:'rgba(255,255,255,0.04)',border:'1px solid rgba(255,255,255,0.08)'}}>
                  <div className="text-xs text-white/30 mb-1">{label}</div>
                  <div className="text-sm text-white/60">{v}</div>
                </div>
              ))}
            </div>
            <div className="flex gap-3">
              <button onClick={() => setModal(false)}
                className="flex-1 py-3 rounded-2xl text-sm glass btn-magnetic font-medium">Cancel</button>
              <a href={u.admissionsUrl} target="_blank" rel="noopener noreferrer"
                className="flex-1 py-3 rounded-2xl text-sm font-syne font-700 text-center text-white flex items-center justify-center gap-2 btn-magnetic transition-all"
                style={{background:`linear-gradient(135deg,${u.colors.primary},${u.colors.secondary})`,boxShadow:`0 0 30px ${u.colors.primary}44`}}>
                Proceed <ExternalLink size={13}/>
              </a>
            </div>
          </div>
        </div>
      )}
    </main>
  );
}
