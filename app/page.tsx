'use client';
import { useEffect, useRef, useState, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import { ChevronRight, Zap, Trophy, GraduationCap, BarChart2, Star } from 'lucide-react';

const UNI = [
  { name:'UP',    color:'#7B1113' },
  { name:'ADMU',  color:'#003D8F' },
  { name:'DLSU',  color:'#006B3F' },
  { name:'UST',   color:'#C8A400' },
  { name:'NU',    color:'#003087' },
  { name:'FEU',   color:'#007A47' },
  { name:'AdU',   color:'#003DA5' },
  { name:'UE',    color:'#CC0000' },
];
const WORDS = ['Discover','Explore','Compare','Choose','Belong'];

/* Canvas particle field — inline for landing only */
function LandingParticles() {
  const ref  = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const c   = ref.current!;
    const ctx = c.getContext('2d')!;
    const isMobile = window.matchMedia('(pointer: coarse)').matches;
    const N   = isMobile ? 30 : 70;
    let raf   = 0;
    const mouse = { x: -9999, y: -9999 };

    const resize = () => { c.width = innerWidth; c.height = innerHeight; };
    resize();
    window.addEventListener('resize', resize, { passive: true });
    if (!isMobile) window.addEventListener('mousemove', e => { mouse.x = e.clientX; mouse.y = e.clientY; }, { passive: true });

    type P = { x:number; y:number; vx:number; vy:number; r:number; col:string; a:number; life:number; max:number };
    const spawn = (): P => ({
      x: Math.random()*c.width, y: Math.random()*c.height,
      vx: (Math.random()-.5)*.4, vy: (Math.random()-.5)*.4-.15,
      r: Math.random()*1.8+.5, col: UNI[~~(Math.random()*8)].color,
      a: Math.random()*.4+.1, life:0, max: Math.random()*320+200,
    });
    const ps: P[] = Array.from({length:N},spawn);

    const draw = () => {
      ctx.clearRect(0,0,c.width,c.height);
      ps.forEach((p,i) => {
        p.life++;
        if (p.life > p.max) { ps[i] = spawn(); return; }
        if (!isMobile) {
          const dx=mouse.x-p.x,dy=mouse.y-p.y,d=Math.hypot(dx,dy);
          if(d<150){p.vx+=(dx/d)*.012;p.vy+=(dy/d)*.012;}
        }
        p.vx*=.987;p.vy*=.987;p.x+=p.vx;p.y+=p.vy;
        const t=p.life/p.max;
        const alpha=p.a*(t<.1?t*10:t>.8?(1-t)*5:1);
        ctx.save();
        ctx.globalAlpha=alpha;ctx.shadowBlur=p.r*5;ctx.shadowColor=p.col;ctx.fillStyle=p.col;
        ctx.beginPath();ctx.arc(p.x,p.y,p.r,0,Math.PI*2);ctx.fill();
        if(!isMobile&&i%3===0){
          for(let j=i+1;j<Math.min(i+6,ps.length);j++){
            const q=ps[j],qd=Math.hypot(q.x-p.x,q.y-p.y);
            if(qd<80){
              ctx.globalAlpha=alpha*(1-qd/80)*.1;ctx.strokeStyle=p.col;ctx.lineWidth=.3;
              ctx.beginPath();ctx.moveTo(p.x,p.y);ctx.lineTo(q.x,q.y);ctx.stroke();
            }
          }
        }
        ctx.restore();
      });
      raf=requestAnimationFrame(draw);
    };
    raf=requestAnimationFrame(draw);
    return()=>{cancelAnimationFrame(raf);window.removeEventListener('resize',resize);};
  },[]);

  return <canvas ref={ref} className="fixed inset-0 pointer-events-none" style={{zIndex:1,opacity:.6}} aria-hidden />;
}

/* Scroll-reveal hook */
function useReveal(threshold=.12){
  const ref=useRef<HTMLDivElement>(null);
  const [on,setOn]=useState(false);
  useEffect(()=>{
    const obs=new IntersectionObserver(([e])=>{if(e.isIntersecting)setOn(true);},{threshold});
    if(ref.current)obs.observe(ref.current);
    return()=>obs.disconnect();
  },[threshold]);
  return{ref,on};
}

export default function LandingPage() {
  const router = useRouter();
  const [loaded,   setLoaded]   = useState(false);
  const [wordIdx,  setWordIdx]  = useState(0);
  const [wordVis,  setWordVis]  = useState(true);
  const [entering, setEntering] = useState(false);
  const [entered,  setEntered]  = useState(false);
  const [mx, setMx] = useState(.5);
  const [my, setMy] = useState(.5);

  useEffect(() => { setTimeout(() => setLoaded(true), 80); }, []);

  useEffect(() => {
    const t = setInterval(() => {
      setWordVis(false);
      setTimeout(() => { setWordIdx(i=>(i+1)%WORDS.length); setWordVis(true); }, 360);
    }, 2800);
    return () => clearInterval(t);
  }, []);

  useEffect(() => {
    const isMobile = window.matchMedia('(pointer: coarse)').matches;
    if (isMobile) return;
    const h = (e: MouseEvent) => { setMx(e.clientX/innerWidth); setMy(e.clientY/innerHeight); };
    window.addEventListener('mousemove', h, { passive: true });
    return () => window.removeEventListener('mousemove', h);
  }, []);

  const handleEnter = useCallback(() => {
    if (entering) return;
    setEntering(true);
    setTimeout(() => { setEntered(true); setTimeout(() => router.push('/home'), 620); }, 140);
  }, [entering, router]);

  const stats   = useReveal();
  const features= useReveal();
  const unis    = useReveal();
  const final   = useReveal();

  const statData = [
    { icon: GraduationCap, label: 'Universities',   value: '8',    color: '#4f8ef7' },
    { icon: Trophy,        label: 'UAAP Titles',    value: '500+', color: '#f97316' },
    { icon: Star,          label: 'Years of Sport', value: '85+',  color: '#a78bfa' },
    { icon: BarChart2,     label: 'Programs',       value: '600+', color: '#34d399' },
  ];

  const featureData = [
    { icon: 'campus', title: 'Interactive Carousel',   desc: 'Drag through all 8 universities in a smooth spring-physics carousel.' },
    { icon: 'compare',title: 'Side-by-Side Compare',   desc: 'Animated bar charts compare academics, sports, tuition, and culture.' },
    { icon: 'sports', title: 'Sports Legacy Hub',      desc: 'Championship history, rivalries, MVPs, and every dynasty story.' },
    { icon: 'rank',   title: 'QS Rankings + Tuition',  desc: 'Real rankings, program strengths, and tuition ranges in one view.' },
    { icon: 'grad',   title: 'Admissions Flow',        desc: 'Step-by-step guides and direct links to every admissions portal.' },
    { icon: 'design', title: 'Immersive Design',       desc: 'Glassmorphism, parallax depth, particles, and fluid 60fps motion.' },
  ];
  const featureIcons: Record<string,string> = {
    campus:'🏛', compare:'⚖', sports:'🏆', rank:'📊', grad:'🎓', design:'✦',
  };

  return (
    <div className="relative min-h-screen overflow-x-hidden" style={{ background: '#03050d' }}>
      <LandingParticles />

      {/* Animated bg orbs */}
      <div className="fixed inset-0 pointer-events-none" style={{ zIndex: 0 }}>
        <div className="absolute inset-0 grid-overlay" />
        <div className="absolute rounded-full float-a"
          style={{
            width:'min(900px,120vw)', height:'min(900px,120vw)',
            top:-250, left:-200,
            background:'radial-gradient(circle,rgba(30,58,138,.55),transparent 70%)',
            filter:'blur(90px)', opacity:.4,
            transform:`translate(${mx*44}px,${my*30}px)`,
            transition:'transform .7s cubic-bezier(.16,1,.3,1)',
            willChange:'transform',
          }}
        />
        <div className="absolute rounded-full float-b"
          style={{
            width:'min(700px,90vw)', height:'min(700px,90vw)',
            bottom:-180, right:-160,
            background:'radial-gradient(circle,rgba(76,29,149,.5),transparent 70%)',
            filter:'blur(85px)', opacity:.38,
            transform:`translate(${-mx*32}px,${-my*24}px)`,
            transition:'transform .8s cubic-bezier(.16,1,.3,1)',
            willChange:'transform',
          }}
        />
        <div className="absolute inset-0"
          style={{ background:'radial-gradient(ellipse 85% 85% at 50% 50%,transparent 35%,#03050d 100%)' }} />
      </div>

      {/* ═══ HERO ═══════════════════════════════════════════ */}
      <section className="relative z-10 min-h-screen flex flex-col items-center justify-center text-center px-4 sm:px-6 pt-8 pb-16">

        {/* Floating university chips — desktop only */}
        {loaded && (
          <div className="hidden lg:block">
            {UNI.map((u, i) => {
              const positions = [
                { top:'13%', left:'4%' },  { top:'19%', right:'5%' },
                { top:'53%', left:'1.5%'},  { top:'60%', right:'2%' },
                { top:'79%', left:'8%' },  { top:'83%', right:'7%' },
                { top:'37%', left:'.5%' }, { top:'42%', right:'.5%'},
              ];
              const p = positions[i] || {};
              const depth = (i % 3) + 1;
              return (
                <div key={u.name} className="absolute flex items-center gap-2 px-3 py-1.5 rounded-full"
                  style={{
                    ...p,
                    background: `${u.color}12`,
                    border: `1px solid ${u.color}30`,
                    backdropFilter: 'blur(14px)',
                    boxShadow: `0 0 20px ${u.color}16`,
                    animation: `floatA ${5.5+i*.65}s ease-in-out infinite ${i*.3}s`,
                    transform: `translate(${(mx-.5)*-20*depth}px,${(my-.5)*-12*depth}px)`,
                    transition: 'transform .55s cubic-bezier(.16,1,.3,1)',
                    zIndex: 3,
                  }}>
                  <div className="w-4 h-4 rounded-full flex items-center justify-center text-[9px] font-bold" style={{ background: u.color }}>
                    {u.name.slice(0,1)}
                  </div>
                  <span className="text-[11px] font-syne font-semibold" style={{ color: 'rgba(220,228,255,0.55)' }}>{u.name}</span>
                </div>
              );
            })}
          </div>
        )}

        {/* Concentric rings */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none hidden sm:block"
          style={{ width: 680, height: 680 }}>
          {[0,70,140,210].map((inset,i) => (
            <div key={i} className="absolute rounded-full"
              style={{
                inset,
                border: `1px solid rgba(79,142,247,${.07-i*.014})`,
                boxShadow: i===0 ? '0 0 80px rgba(79,142,247,.04)' : 'none',
                animation: `softPulse ${5+i*2}s ease-in-out infinite ${i*.9}s`,
              }}
            />
          ))}
        </div>

        {/* Badge */}
        <div style={{
          opacity: loaded?1:0, transform: loaded?'translateY(0)':'translateY(22px)',
          transition: 'opacity .9s, transform .9s cubic-bezier(.16,1,.3,1)',
        }}>
          <div className="inline-flex items-center gap-2.5 px-5 py-2 rounded-full mb-8 sm:mb-10"
            style={{
              background: 'rgba(79,142,247,.07)',
              border: '1px solid rgba(79,142,247,.28)',
              backdropFilter: 'blur(20px)',
              boxShadow: '0 0 32px rgba(79,142,247,.1)',
            }}>
            <span className="w-2 h-2 rounded-full bg-blue-400 dot-pulse" style={{ boxShadow: '0 0 8px rgba(96,165,250,.8)' }} />
            <span className="text-xs font-syne font-semibold tracking-widest text-blue-300 uppercase">UAAP University Explorer</span>
            <ChevronRight size={13} className="text-blue-400/60" />
          </div>
        </div>

        {/* FACT-U wordmark */}
        <div style={{
          opacity: loaded?1:0, transform: loaded?'translateY(0)':'translateY(32px)',
          transition: 'opacity 1s .1s cubic-bezier(.16,1,.3,1), transform 1s .1s cubic-bezier(.16,1,.3,1)',
        }}>
          <div style={{
            fontFamily: "'Bebas Neue', sans-serif",
            fontSize: 'clamp(4.5rem,12vw,11rem)',
            letterSpacing: '.04em', lineHeight: .88,
            background: 'linear-gradient(160deg,#fff 0%,#c7d8ff 30%,#4f8ef7 60%,#a78bfa 100%)',
            WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text',
            filter: 'drop-shadow(0 0 50px rgba(79,142,247,.4)) drop-shadow(0 16px 32px rgba(0,0,0,.5))',
          }}>
            FACT-U
          </div>
          <div className="text-center mt-1" style={{ fontSize: '0.65rem', fontFamily: "'Syne', sans-serif", letterSpacing: '.45em', color: 'rgba(220,228,255,0.25)', textTransform: 'uppercase' }}>
            Find · Analyze · Compare · Trust · Universities
          </div>
        </div>

        {/* Rotating verb */}
        <h1 className="font-syne font-extrabold tracking-tight mt-6 sm:mt-8 mb-4 sm:mb-5 w-full"
          style={{
            fontSize: 'clamp(1.5rem,3.5vw,3.2rem)', lineHeight: .95,
            opacity: loaded?1:0, transform: loaded?'translateY(0)':'translateY(18px)',
            transition: 'opacity .9s .25s, transform .9s .25s cubic-bezier(.16,1,.3,1)',
          }}>
          <span style={{
            display: 'inline-block',
            background: 'linear-gradient(135deg,#f97316,#f43f5e,#a855f7)',
            WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text',
            opacity: wordVis?1:0,
            transform: wordVis?'translateY(0) scale(1)':'translateY(-12px) scale(.95)',
            transition: 'opacity .34s cubic-bezier(.16,1,.3,1), transform .34s cubic-bezier(.16,1,.3,1)',
          }}>
            {WORDS[wordIdx]}
          </span>
          {' '}
          <span style={{ color: '#e8eeff' }}>Your University</span>
        </h1>

        {/* Sub */}
        <p className="max-w-lg text-base sm:text-lg leading-relaxed mb-10 sm:mb-12 px-2"
          style={{
            color: 'rgba(220,228,255,0.62)',
            opacity: loaded?1:0, transform: loaded?'translateY(0)':'translateY(16px)',
            transition: 'opacity .9s .35s, transform .9s .35s cubic-bezier(.16,1,.3,1)',
          }}>
          Explore all 8 UAAP universities — academics, sports legacy, programs,
          campus life, and admissions in one platform.
        </p>

        {/* Glass gate card */}
        <div className="w-full max-w-[440px] mx-auto" style={{
          opacity: loaded?1:0, transform: loaded?'translateY(0)':'translateY(32px)',
          transition: 'opacity 1.1s .45s, transform 1.1s .45s cubic-bezier(.34,1.2,.64,1)',
        }}>
          <div className="rounded-3xl overflow-hidden relative"
            style={{
              background: 'rgba(255,255,255,.042)',
              border: '1.5px solid rgba(255,255,255,.11)',
              backdropFilter: 'blur(32px) saturate(1.8)',
              boxShadow: '0 0 80px rgba(79,142,247,.1), 0 32px 70px rgba(0,0,0,.55)',
            }}>
            <div className="absolute top-0 left-0 right-0 h-px" style={{ background: 'linear-gradient(90deg,transparent,rgba(79,142,247,.65),rgba(167,139,250,.65),transparent)' }} />
            <div className="absolute top-0 left-0 w-36 h-36 rounded-full pointer-events-none"
              style={{ background: 'radial-gradient(circle,rgba(255,255,255,.05),transparent 70%)', filter: 'blur(18px)' }} />

            <div className="relative p-6 sm:p-8">
              {/* Avatar stack */}
              <div className="flex justify-center mb-6">
                <div className="flex -space-x-3">
                  {UNI.slice(0,6).map((u,i) => (
                    <div key={u.name} className="w-9 h-9 rounded-full flex items-center justify-center text-[10px] font-syne font-extrabold"
                      style={{
                        background: `linear-gradient(135deg,${u.color},${u.color}88)`,
                        border: '2px solid rgba(3,5,13,.85)',
                        boxShadow: `0 0 12px ${u.color}44`, zIndex: 6-i,
                        color: '#fff',
                      }}>
                      {u.name.slice(0,1)}
                    </div>
                  ))}
                  <div className="w-9 h-9 rounded-full flex items-center justify-center text-[10px] font-bold"
                    style={{ background: 'rgba(255,255,255,.06)', border: '2px solid rgba(3,5,13,.85)', color: 'rgba(255,255,255,0.4)', zIndex: 0 }}>
                    +2
                  </div>
                </div>
              </div>

              <div className="text-center mb-6">
                <div className="font-syne font-extrabold text-lg sm:text-xl mb-2" style={{ color: '#e8eeff' }}>8 Universities. One Platform.</div>
                <div className="text-sm leading-relaxed" style={{ color: 'rgba(220,228,255,0.55)' }}>
                  The most complete UAAP university discovery experience.
                </div>
              </div>

              {/* Feature pills */}
              <div className="flex flex-wrap justify-center gap-2 mb-7">
                {['Interactive Carousel','Live Compare','QS Rankings','Sports Hub','Admissions','Campus Life'].map(f => (
                  <span key={f} className="px-3 py-1 rounded-full text-xs font-semibold"
                    style={{ background: 'rgba(79,142,247,.1)', border: '1px solid rgba(79,142,247,.22)', color: '#93c5fd' }}>
                    {f}
                  </span>
                ))}
              </div>

              {/* CTA */}
              <button onClick={handleEnter} disabled={entering}
                className="relative w-full py-4 rounded-2xl font-syne font-extrabold text-base text-white overflow-hidden group"
                style={{
                  background: entering ? 'linear-gradient(135deg,#1e3a8a,#4c1d95)' : 'linear-gradient(135deg,#2563eb,#7c3aed)',
                  boxShadow: entering ? 'none' : '0 0 55px rgba(79,142,247,.45),inset 0 1px 0 rgba(255,255,255,.18)',
                  transform: entering ? 'scale(.98)' : 'scale(1)',
                  transition: 'all .35s cubic-bezier(.34,1.2,.64,1)',
                  cursor: 'pointer',
                }}>
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-400 pointer-events-none"
                  style={{ background: 'linear-gradient(90deg,transparent,rgba(255,255,255,.08),transparent)', transform: 'skewX(-20deg)' }} />
                <span className="relative flex items-center justify-center gap-2">
                  {entering ? (
                    <><div className="w-4 h-4 rounded-full border-2 border-white/40 border-t-white animate-spin" />Loading…</>
                  ) : (
                    <><Zap size={16} />Enter Experience<ChevronRight size={16} className="group-hover:translate-x-1 transition-transform" /></>
                  )}
                </span>
              </button>
              <p className="text-center text-xs mt-3" style={{ color: 'rgba(255,255,255,0.2)' }}>No sign-up required · Free forever</p>
            </div>
          </div>
        </div>

        {/* Scroll cue */}
        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-2">
          <div className="w-5 h-9 rounded-full flex items-start justify-center pt-1.5"
            style={{ border: '1px solid rgba(255,255,255,.1)', background: 'rgba(255,255,255,.03)' }}>
            <div className="w-1 h-2 rounded-full bg-blue-400 scroll-dot" />
          </div>
          <span style={{ fontSize: '9px', fontFamily: "'Syne',sans-serif", letterSpacing: '.25em', color: 'rgba(255,255,255,0.2)', textTransform: 'uppercase' }}>Scroll</span>
        </div>
      </section>

      {/* ═══ STATS ══════════════════════════════════════════ */}
      <section className="relative z-10 py-4 px-4 sm:px-6">
        <div className="max-w-5xl mx-auto mb-8 h-px" style={{ background: 'linear-gradient(90deg,transparent,rgba(79,142,247,.28),rgba(167,139,250,.28),transparent)' }} />
        <div ref={stats.ref} className="max-w-4xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4">
          {statData.map(({ icon: Icon, label, value, color }, i) => (
            <div key={label} className="relative rounded-2xl p-4 sm:p-6 text-center overflow-hidden"
              style={{
                background: 'rgba(255,255,255,.04)',
                border: `1px solid ${color}20`,
                backdropFilter: 'blur(16px)',
                opacity: stats.on?1:0,
                transform: stats.on?'translateY(0)':'translateY(28px)',
                transition: `opacity .7s ${i*.1}s, transform .7s ${i*.1}s cubic-bezier(.16,1,.3,1)`,
              }}>
              <div className="absolute inset-0 pointer-events-none" style={{ background: `radial-gradient(circle at 50% 0%,${color}10,transparent 70%)` }} />
              <div className="absolute top-0 left-0 right-0 h-px" style={{ background: `linear-gradient(90deg,transparent,${color}55,transparent)` }} />
              <Icon size={20} className="mx-auto mb-2" style={{ color, filter: `drop-shadow(0 0 6px ${color}88)` }} />
              <div className="font-syne font-extrabold text-xl sm:text-2xl" style={{ color }}>{value}</div>
              <div className="text-[10px] sm:text-xs mt-0.5 uppercase tracking-wider font-syne" style={{ color: 'rgba(220,228,255,0.45)' }}>{label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* ═══ FEATURES ═══════════════════════════════════════ */}
      <section className="relative z-10 py-20 sm:py-28 px-4 sm:px-6">
        <div className="max-w-6xl mx-auto">
          <div ref={features.ref} className="text-center mb-12 sm:mb-16"
            style={{ opacity: features.on?1:0, transform: features.on?'translateY(0)':'translateY(24px)', transition: 'opacity .8s, transform .8s cubic-bezier(.16,1,.3,1)' }}>
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-syne font-semibold tracking-widest uppercase mb-4"
              style={{ background: 'rgba(167,139,250,.1)', border: '1px solid rgba(167,139,250,.3)', color: '#c4b5fd' }}>
              <span className="w-1.5 h-1.5 rounded-full bg-purple-400 dot-pulse" />
              Platform Features
            </div>
            <h2 className="font-syne font-extrabold tracking-tight leading-tight"
              style={{ fontSize: 'clamp(1.8rem,4.5vw,3.8rem)', color: '#e8eeff' }}>
              Everything you need to<br />
              <span className="grad">find your university</span>
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5">
            {featureData.map((f, i) => (
              <div key={f.title}
                className="group relative rounded-2xl sm:rounded-3xl p-5 sm:p-7 overflow-hidden"
                style={{
                  background: 'rgba(255,255,255,.035)',
                  border: '1px solid rgba(255,255,255,.07)',
                  backdropFilter: 'blur(16px)',
                  opacity: features.on?1:0,
                  transform: features.on?'translateY(0) scale(1)':'translateY(40px) scale(.95)',
                  transition: `opacity .7s ${i*.07}s, transform .7s ${i*.07}s cubic-bezier(.16,1,.3,1)`,
                }}>
                <div className="absolute inset-0 rounded-2xl sm:rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                  style={{ background: 'radial-gradient(ellipse at top left,rgba(79,142,247,.07),transparent 60%)' }} />
                <div className="absolute top-0 left-0 right-0 h-px opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                  style={{ background: 'linear-gradient(90deg,transparent,rgba(79,142,247,.45),transparent)' }} />
                <div className="text-2xl mb-3 inline-block" style={{ transition: 'transform .4s cubic-bezier(.34,1.2,.64,1)' }}
                  onMouseEnter={e => { (e.currentTarget as HTMLElement).style.transform='scale(1.2) rotate(-6deg)'; }}
                  onMouseLeave={e => { (e.currentTarget as HTMLElement).style.transform='scale(1) rotate(0)'; }}>
                  {featureIcons[f.icon]}
                </div>
                <h3 className="font-syne font-bold text-sm sm:text-base mb-2" style={{ color: '#e8eeff' }}>{f.title}</h3>
                <p className="text-sm leading-relaxed" style={{ color: 'rgba(220,228,255,0.55)' }}>{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ UNIVERSITY PREVIEW ═════════════════════════════ */}
      <section className="relative z-10 py-16 sm:py-20 px-4 sm:px-6">
        <div className="max-w-6xl mx-auto">
          <div ref={unis.ref} className="text-center mb-10 sm:mb-12"
            style={{ opacity: unis.on?1:0, transform: unis.on?'translateY(0)':'translateY(18px)', transition: 'opacity .8s, transform .8s cubic-bezier(.16,1,.3,1)' }}>
            <h2 className="font-syne font-extrabold text-2xl sm:text-4xl tracking-tight mb-2"
              style={{ color: '#e8eeff' }}>
              The <span className="grad-warm">8 Schools</span> of UAAP
            </h2>
            <p style={{ color: 'rgba(220,228,255,0.45)', fontSize: '0.95rem' }}>Each with its own identity, legacy, and story.</p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4">
            {UNI.map((u, i) => (
              <div key={u.name}
                className="group relative rounded-xl sm:rounded-2xl p-4 sm:p-5 overflow-hidden"
                style={{
                  background: `${u.color}0b`,
                  border: `1px solid ${u.color}22`,
                  opacity: unis.on?1:0,
                  transform: unis.on?'translateY(0)':'translateY(30px)',
                  transition: `opacity .7s ${i*.07}s, transform .7s ${i*.07}s cubic-bezier(.16,1,.3,1)`,
                }}>
                <div className="absolute top-0 left-0 right-0 h-0.5" style={{ background: `linear-gradient(90deg,transparent,${u.color},transparent)` }} />
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-400 pointer-events-none"
                  style={{ background: `radial-gradient(circle at top,${u.color}16,transparent 70%)` }} />
                <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-lg sm:rounded-xl flex items-center justify-center font-syne font-extrabold text-xs sm:text-sm mb-2 sm:mb-3"
                  style={{ background: `${u.color}22`, color: u.color, border: `1px solid ${u.color}38` }}>
                  {u.name}
                </div>
                <div className="text-xs sm:text-sm font-syne font-bold" style={{ color: 'rgba(220,228,255,0.7)' }}>Inside FACT-U</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ FINAL CTA ══════════════════════════════════════ */}
      <section ref={final.ref} className="relative z-10 py-24 sm:py-32 px-4 sm:px-6">
        <div className="max-w-2xl sm:max-w-3xl mx-auto text-center">
          <div className="relative rounded-2xl sm:rounded-3xl overflow-hidden p-10 sm:p-14"
            style={{
              background: 'rgba(255,255,255,.03)',
              border: '1px solid rgba(79,142,247,.18)',
              backdropFilter: 'blur(28px)',
              boxShadow: '0 0 100px rgba(79,142,247,.06)',
              opacity: final.on?1:0,
              transform: final.on?'translateY(0)':'translateY(28px)',
              transition: 'opacity .9s, transform .9s cubic-bezier(.16,1,.3,1)',
            }}>
            <div className="absolute top-0 left-0 right-0 h-px" style={{ background: 'linear-gradient(90deg,transparent,rgba(79,142,247,.65),rgba(167,139,250,.65),transparent)' }} />
            <div className="text-4xl sm:text-5xl mb-5" style={{ display: 'inline-block', animation: 'floatB 4s ease-in-out infinite' }}>🎓</div>
            <h2 className="font-syne font-extrabold tracking-tight mb-4"
              style={{ fontSize: 'clamp(1.6rem,3.5vw,3.2rem)', color: '#e8eeff' }}>
              Your future starts<br />
              <span className="grad">with the right choice</span>
            </h2>
            <p className="max-w-md mx-auto mb-8 sm:mb-10 text-base sm:text-lg leading-relaxed"
              style={{ color: 'rgba(220,228,255,0.50)' }}>
              Thousands of students. Eight universities. One platform.
            </p>
            <button onClick={handleEnter}
              className="inline-flex items-center gap-3 px-8 sm:px-10 py-3.5 sm:py-4 rounded-full font-syne font-extrabold text-sm sm:text-base text-white"
              style={{
                background: 'linear-gradient(135deg,#2563eb,#7c3aed)',
                boxShadow: '0 0 60px rgba(79,142,247,.45),inset 0 1px 0 rgba(255,255,255,.18)',
                cursor: 'pointer',
                transition: 'transform .3s cubic-bezier(.34,1.2,.64,1)',
              }}
              onMouseEnter={e => { (e.currentTarget as HTMLElement).style.transform='scale(1.04) translateY(-2px)'; }}
              onMouseLeave={e => { (e.currentTarget as HTMLElement).style.transform='scale(1)'; }}
              onMouseDown={e  => { (e.currentTarget as HTMLElement).style.transform='scale(.97)'; }}
              onMouseUp={e    => { (e.currentTarget as HTMLElement).style.transform='scale(1.04) translateY(-2px)'; }}>
              <Zap size={17} /> Start Exploring <ChevronRight size={17} />
            </button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="relative z-10 py-8 sm:py-10 px-4 sm:px-6 text-center safe-bottom"
        style={{ borderTop: '1px solid rgba(255,255,255,.05)' }}>
        <div style={{ fontFamily: "'Bebas Neue',sans-serif", fontSize: '1.7rem', letterSpacing: '.1em', lineHeight: 1, marginBottom: 6 }}>
          <span style={{ background: 'linear-gradient(135deg,#4f8ef7,#a78bfa)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>FACT</span>
          <span style={{ color: 'rgba(255,255,255,.2)' }}>-U</span>
        </div>
        <p style={{ color: 'rgba(255,255,255,0.22)', fontSize: '0.7rem', letterSpacing: '.05em' }}>Find · Analyze · Compare · Trust · Universities</p>
        <p style={{ color: 'rgba(255,255,255,0.14)', fontSize: '0.7rem', marginTop: 8 }}>
          UAAP Universe · For students across the Philippines
        </p>
        <p style={{ color: 'rgba(255,255,255,0.18)', fontSize: '0.7rem', marginTop: 4 }}>
          Developed by <span style={{ color: 'rgba(147,197,253,0.5)', fontWeight: 600 }}>Harry Lagto</span>
        </p>
      </footer>

      {/* Page transition overlay */}
      <div className="fixed inset-0 pointer-events-none" style={{
        zIndex: 200,
        background: 'linear-gradient(135deg,#03050d,#060818)',
        opacity: entered?1:0,
        transform: entered?'scale(1)':'scale(1.05)',
        transition: 'opacity .62s cubic-bezier(.16,1,.3,1), transform .62s cubic-bezier(.16,1,.3,1)',
      }}>
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="flex flex-col items-center gap-4">
            <div style={{ fontFamily:"'Bebas Neue',sans-serif", fontSize:'2.8rem', letterSpacing:'.1em', background:'linear-gradient(135deg,#4f8ef7,#a78bfa)', WebkitBackgroundClip:'text', WebkitTextFillColor:'transparent', backgroundClip:'text' }}>
              FACT-U
            </div>
            <div className="flex gap-1.5">
              {[0,1,2].map(i=>(
                <div key={i} className="w-1.5 h-1.5 rounded-full bg-blue-400 dot-pulse" style={{ animationDelay:`${i*.18}s` }} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
