'use client';
import { useEffect, useRef, useState, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import { ChevronRight, Zap, Trophy, GraduationCap, BarChart2, Star, ArrowDown } from 'lucide-react';

/* ─────────────────────────────────────────────
   CONSTANTS
───────────────────────────────────────────── */
const UNI = [
  { name:'UP',    color:'#7B1113', text:'Fighting Maroons', sport:'Basketball · Football' },
  { name:'ADMU',  color:'#003D8F', text:'Blue Eagles',      sport:'Basketball · Volleyball' },
  { name:'DLSU',  color:'#006B3F', text:'Green Archers',    sport:'Basketball · Volleyball' },
  { name:'UST',   color:'#C8A400', text:'Growling Tigers',  sport:'Cheerdance · Volleyball' },
  { name:'NU',    color:'#003087', text:'Bulldogs',         sport:'Volleyball' },
  { name:'FEU',   color:'#007A47', text:'Tamaraws',         sport:'Basketball' },
  { name:'AdU',   color:'#003DA5', text:'Falcons',          sport:'Basketball' },
  { name:'UE',    color:'#CC0000', text:'Red Warriors',     sport:'Basketball' },
];
const WORDS = ['Discover','Explore','Compare','Choose','Belong'];
const rand  = (a:number,b:number) => Math.random()*(b-a)+a;

/* ─────────────────────────────────────────────
   PARTICLE ENGINE (canvas, magnetic, networked)
───────────────────────────────────────────── */
function ParticleCanvas() {
  const ref   = useRef<HTMLCanvasElement>(null);
  const mouse = useRef({x:-9999,y:-9999});
  const raf   = useRef(0);

  useEffect(()=>{
    const c = ref.current!;
    const ctx = c.getContext('2d')!;
    const resize = () => { c.width=innerWidth; c.height=innerHeight; };
    resize();
    window.addEventListener('resize',resize,{passive:true});
    window.addEventListener('mousemove',e=>{mouse.current={x:e.clientX,y:e.clientY}},{passive:true});

    type P={x:number;y:number;vx:number;vy:number;r:number;col:string;a:number;life:number;max:number};
    const spawn=():P=>({
      x:rand(0,c.width), y:rand(0,c.height),
      vx:rand(-.3,.3), vy:rand(-.5,-.05),
      r:rand(.8,2.6), col:UNI[~~rand(0,8)].color,
      a:rand(.12,.5), life:0, max:rand(200,500),
    });
    const ps:P[] = Array.from({length:90},spawn);

    const draw=()=>{
      ctx.clearRect(0,0,c.width,c.height);
      for(let i=0;i<ps.length;i++){
        const p=ps[i]; p.life++;
        if(p.life>p.max){ps[i]=spawn();continue;}
        const dx=mouse.current.x-p.x,dy=mouse.current.y-p.y,d=Math.hypot(dx,dy);
        if(d<180){p.vx+=(dx/d)*.016;p.vy+=(dy/d)*.016;}
        p.vx*=.985;p.vy*=.985;p.x+=p.vx;p.y+=p.vy;
        const t=p.life/p.max;
        const alpha=p.a*(t<.1?t*10:t>.8?(1-t)*5:1);
        ctx.save();
        ctx.globalAlpha=alpha;
        ctx.shadowBlur=p.r*7; ctx.shadowColor=p.col; ctx.fillStyle=p.col;
        ctx.beginPath(); ctx.arc(p.x,p.y,p.r,0,Math.PI*2); ctx.fill();
        // connect nearby
        for(let j=i+1;j<ps.length;j++){
          const q=ps[j],qd=Math.hypot(q.x-p.x,q.y-p.y);
          if(qd<110){
            ctx.globalAlpha=alpha*(1-qd/110)*.13;
            ctx.strokeStyle=p.col; ctx.lineWidth=.35;
            ctx.beginPath();ctx.moveTo(p.x,p.y);ctx.lineTo(q.x,q.y);ctx.stroke();
          }
        }
        ctx.restore();
      }
      raf.current=requestAnimationFrame(draw);
    };
    raf.current=requestAnimationFrame(draw);
    return()=>{cancelAnimationFrame(raf.current);window.removeEventListener('resize',resize);};
  },[]);

  return <canvas ref={ref} className="fixed inset-0 pointer-events-none" style={{zIndex:1,opacity:.7}}/>;
}

/* ─────────────────────────────────────────────
   3D ORBS (mouse-reactive parallax)
───────────────────────────────────────────── */
function OrbField({mx,my}:{mx:number;my:number}) {
  return (
    <div className="fixed inset-0 pointer-events-none" style={{zIndex:0}}>
      {/* Grid */}
      <div className="absolute inset-0" style={{
        backgroundImage:'linear-gradient(rgba(79,142,247,.038) 1px,transparent 1px),linear-gradient(90deg,rgba(79,142,247,.038) 1px,transparent 1px)',
        backgroundSize:'80px 80px',
      }}/>
      {/* Orb 1 */}
      <div className="absolute rounded-full" style={{
        width:900,height:900,top:-250,left:-250,
        background:'radial-gradient(circle,rgba(30,58,138,.6),transparent 70%)',
        filter:'blur(100px)',opacity:.45,
        transform:`translate(${mx*50}px,${my*35}px)`,
        transition:'transform .6s cubic-bezier(.16,1,.3,1)',
        animation:'floatA 11s ease-in-out infinite',
      }}/>
      {/* Orb 2 */}
      <div className="absolute rounded-full" style={{
        width:750,height:750,bottom:-200,right:-200,
        background:'radial-gradient(circle,rgba(76,29,149,.55),transparent 70%)',
        filter:'blur(90px)',opacity:.4,
        transform:`translate(${-mx*40}px,${-my*30}px)`,
        transition:'transform .7s cubic-bezier(.16,1,.3,1)',
        animation:'floatB 9s ease-in-out infinite 2s',
      }}/>
      {/* Orb 3 centre pulse */}
      <div className="absolute rounded-full" style={{
        width:500,height:500,top:'35%',left:'42%',
        background:'radial-gradient(circle,rgba(56,189,248,.1),transparent 70%)',
        filter:'blur(80px)',
        animation:'floatC 13s ease-in-out infinite 1s',
      }}/>
      {/* Vignette */}
      <div className="absolute inset-0" style={{background:'radial-gradient(ellipse 85% 85% at 50% 50%,transparent 35%,#03050d 100%)'}}/>
    </div>
  );
}

/* ─────────────────────────────────────────────
   3D TILT CARD
───────────────────────────────────────────── */
function TiltCard({children,className='',style={}}:{children:React.ReactNode;className?:string;style?:React.CSSProperties}) {
  const ref = useRef<HTMLDivElement>(null);
  const onMove=(e:React.MouseEvent)=>{
    const el=ref.current!; const r=el.getBoundingClientRect();
    const x=((e.clientX-r.left)/r.width-.5)*16;
    const y=((e.clientY-r.top)/r.height-.5)*16;
    el.style.transform=`perspective(1000px) rotateY(${x}deg) rotateX(${-y}deg) translateZ(16px) scale(1.01)`;
  };
  const onLeave=()=>{ ref.current!.style.transform='perspective(1000px) rotateY(0) rotateX(0) translateZ(0) scale(1)'; };
  return (
    <div ref={ref} onMouseMove={onMove} onMouseLeave={onLeave}
      className={className}
      style={{transformStyle:'preserve-3d',transition:'transform .18s cubic-bezier(.16,1,.3,1)',willChange:'transform',...style}}>
      {children}
    </div>
  );
}

/* ─────────────────────────────────────────────
   FLOATING UNI CHIP
───────────────────────────────────────────── */
function UniChip({name,color,i,mx,my}:{name:string;color:string;i:number;mx:number;my:number}) {
  const positions = [
    {top:'13%',left:'4%'},{top:'19%',right:'5%'},
    {top:'53%',left:'1.5%'},{top:'60%',right:'2%'},
    {top:'79%',left:'8%'},{top:'83%',right:'7%'},
    {top:'37%',left:'.5%'},{top:'42%',right:'.5%'},
  ];
  const p = positions[i]||{top:'50%',left:'50%'};
  const depth = (i%3)+1;
  return (
    <div className="absolute hidden lg:flex items-center gap-2 px-3 py-1.5 rounded-full"
      style={{
        ...p,
        background:`${color}12`,border:`1px solid ${color}30`,
        backdropFilter:'blur(16px)',boxShadow:`0 0 24px ${color}18`,
        animation:`floatA ${5+i*.7}s ease-in-out infinite ${i*.3}s`,
        transform:`translate(${(mx-.5)*-22*depth}px,${(my-.5)*-14*depth}px)`,
        transition:'transform .5s cubic-bezier(.16,1,.3,1)',
        zIndex:3,
      }}>
      <div className="w-4 h-4 rounded-full flex items-center justify-center text-[9px] font-bold" style={{background:color}}>
        {name.slice(0,1)}
      </div>
      <span className="text-[11px] font-syne font-600 text-white/40">{name}</span>
    </div>
  );
}

/* ─────────────────────────────────────────────
   SCROLL REVEAL HOOK
───────────────────────────────────────────── */
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

/* ═══════════════════════════════════════════════
   MAIN LANDING PAGE
═══════════════════════════════════════════════ */
export default function LandingPage() {
  const router = useRouter();
  const [loaded,  setLoaded]  = useState(false);
  const [wordIdx, setWordIdx] = useState(0);
  const [wordVis, setWordVis] = useState(true);
  const [entering,setEntering]= useState(false);
  const [entered, setEntered] = useState(false);
  const [mx, setMx] = useState(.5);
  const [my, setMy] = useState(.5);

  /* Load */
  useEffect(()=>{ setTimeout(()=>setLoaded(true),80); },[]);

  /* Word cycle */
  useEffect(()=>{
    const t=setInterval(()=>{
      setWordVis(false);
      setTimeout(()=>{ setWordIdx(i=>(i+1)%WORDS.length); setWordVis(true); },360);
    },2800);
    return()=>clearInterval(t);
  },[]);

  /* Mouse parallax */
  useEffect(()=>{
    const h=(e:MouseEvent)=>{ setMx(e.clientX/innerWidth); setMy(e.clientY/innerHeight); };
    window.addEventListener('mousemove',h,{passive:true});
    return()=>window.removeEventListener('mousemove',h);
  },[]);

  /* Enter transition */
  const handleEnter = useCallback(()=>{
    if(entering)return;
    setEntering(true);
    setTimeout(()=>{ setEntered(true); setTimeout(()=>router.push('/home'),650); },150);
  },[entering,router]);

  /* Section refs */
  const stats   = useReveal();
  const features= useReveal();
  const unis    = useReveal();
  const final   = useReveal();

  const statData = [
    {icon:GraduationCap,label:'Universities',  value:'8',    color:'#4f8ef7'},
    {icon:Trophy,       label:'UAAP Titles',   value:'500+', color:'#f97316'},
    {icon:Star,         label:'Years of Sport', value:'85+',  color:'#a78bfa'},
    {icon:BarChart2,    label:'Programs',       value:'600+', color:'#34d399'},
  ];

  const featureData = [
    {icon:'🎠',title:'3D Interactive Carousel',    desc:'Drag through all 8 universities in a cinematic perspective carousel with z-depth, spring physics, and inertia.'},
    {icon:'⚖️',title:'Live Side-by-Side Compare',  desc:'Animated bar charts and radar-style scoring compare academics, sports, tuition, and culture at a glance.'},
    {icon:'🏆',title:'Sports Legacy Hub',          desc:'Championship history, fierce rivalries, MVPs, and the stories behind every 85-year dynasty.'},
    {icon:'📚',title:'QS Rankings + Tuition',      desc:'Real QS World Rankings, program strength scores, and estimated tuition ranges help you find the right fit.'},
    {icon:'🎓',title:'Full Admissions Flow',       desc:'Step-by-step guides, requirements checklists, and direct links to every official admissions portal.'},
    {icon:'✨',title:'Immersive 3D Design',        desc:'Glassmorphism, parallax depth layers, canvas particles, magnetic cursor, and 60fps fluid motion throughout.'},
  ];

  return (
    <div className="relative min-h-screen overflow-x-hidden" style={{background:'#03050d',cursor:'none'}}>

      <ParticleCanvas/>
      <OrbField mx={mx} my={my}/>

      {/* ══ HERO ═══════════════════════════════ */}
      <section className="relative z-10 min-h-screen flex flex-col items-center justify-center text-center px-6 pt-10 pb-20">

        {/* Floating university chips — parallax layer */}
        {loaded && UNI.map((u,i)=>(
          <UniChip key={u.name} name={u.name} color={u.color} i={i} mx={mx} my={my}/>
        ))}

        {/* Concentric rings */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none" style={{width:720,height:720}}>
          {[0,70,140,210].map((inset,i)=>(
            <div key={i} className="absolute rounded-full" style={{
              inset,
              border:`1px solid rgba(79,142,247,${.07-i*.014})`,
              boxShadow:i===0?'0 0 100px rgba(79,142,247,0.05)':'none',
              animation:`softPulse ${5+i*2}s ease-in-out infinite ${i*.9}s`,
            }}/>
          ))}
        </div>

        {/* Badge */}
        <div className="relative z-10" style={{
          opacity:loaded?1:0,transform:loaded?'translateY(0)':'translateY(24px)',
          transition:'opacity .9s,transform .9s cubic-bezier(.16,1,.3,1)',
        }}>
          <div className="inline-flex items-center gap-2.5 px-5 py-2 rounded-full mb-10"
            style={{
              background:'rgba(79,142,247,.07)',border:'1px solid rgba(79,142,247,.28)',
              backdropFilter:'blur(24px)',boxShadow:'0 0 40px rgba(79,142,247,.12)',
            }}>
            <span className="w-2 h-2 rounded-full bg-blue-400 dot-pulse" style={{boxShadow:'0 0 8px rgba(96,165,250,.8)'}}/>
            <span className="text-xs font-syne font-600 tracking-[.2em] text-blue-300 uppercase">UAAP University Explorer</span>
            <ChevronRight size={13} className="text-blue-400/60"/>
          </div>
        </div>

        {/* FACT-U wordmark with 3D depth */}
        <div className="relative z-10" style={{
          opacity:loaded?1:0,transform:loaded?'translateY(0)':'translateY(32px)',
          transition:'opacity 1s .1s cubic-bezier(.16,1,.3,1),transform 1s .1s cubic-bezier(.16,1,.3,1)',
        }}>
          <div style={{
            fontFamily:"'Bebas Neue',sans-serif",
            fontSize:'clamp(5rem,14vw,13rem)',
            letterSpacing:'.04em',lineHeight:.9,
            background:'linear-gradient(160deg,#fff 0%,#c7d8ff 30%,#4f8ef7 60%,#a78bfa 100%)',
            WebkitBackgroundClip:'text',WebkitTextFillColor:'transparent',backgroundClip:'text',
            filter:'drop-shadow(0 0 60px rgba(79,142,247,.4)) drop-shadow(0 20px 40px rgba(0,0,0,.5))',
            textShadow:'none',
          }}>
            FACT-U
          </div>
          <div className="text-[11px] font-syne tracking-[.5em] text-white/18 uppercase text-center mt-1">
            Find · Analyze · Compare · Trust · Universities
          </div>
        </div>

        {/* Rotating verb */}
        <h1 className="relative z-10 font-syne font-800 tracking-tight mt-8 mb-5" style={{
          fontSize:'clamp(1.8rem,4vw,3.8rem)',lineHeight:.95,
          opacity:loaded?1:0,transform:loaded?'translateY(0)':'translateY(20px)',
          transition:'opacity .9s .25s,transform .9s .25s cubic-bezier(.16,1,.3,1)',
        }}>
          <span style={{
            display:'inline-block',
            background:'linear-gradient(135deg,#f97316,#f43f5e,#a855f7)',
            WebkitBackgroundClip:'text',WebkitTextFillColor:'transparent',backgroundClip:'text',
            opacity:wordVis?1:0,
            transform:wordVis?'translateY(0) scale(1)':'translateY(-14px) scale(.94)',
            transition:'opacity .36s cubic-bezier(.16,1,.3,1),transform .36s cubic-bezier(.16,1,.3,1)',
          }}>
            {WORDS[wordIdx]}
          </span>
          {' '}<span className="text-white">Your University</span>
        </h1>

        {/* Subtext */}
        <p className="relative z-10 text-white/38 max-w-lg text-lg leading-relaxed mb-14" style={{
          opacity:loaded?1:0,transform:loaded?'translateY(0)':'translateY(18px)',
          transition:'opacity .9s .35s,transform .9s .35s cubic-bezier(.16,1,.3,1)',
        }}>
          Explore all 8 UAAP universities — academics, sports legacy, programs,
          campus life, and admissions in one cinematic platform.
        </p>

        {/* ── GLASS GATE CARD (3D tilt) ── */}
        <div className="relative z-10 w-full max-w-[460px]" style={{
          opacity:loaded?1:0,transform:loaded?'translateY(0)':'translateY(36px)',
          transition:'opacity 1.1s .45s,transform 1.1s .45s cubic-bezier(.34,1.2,.64,1)',
        }}>
          <TiltCard
            className="rounded-3xl overflow-hidden"
            style={{
              background:'rgba(255,255,255,0.042)',
              border:'1.5px solid rgba(255,255,255,.11)',
              backdropFilter:'blur(36px) saturate(1.8)',
              boxShadow:'0 0 100px rgba(79,142,247,.1),0 40px 80px rgba(0,0,0,.55),inset 0 1px 0 rgba(255,255,255,.08)',
            }}>
            {/* Top shimmer line */}
            <div className="absolute top-0 left-0 right-0 h-px" style={{background:'linear-gradient(90deg,transparent,rgba(79,142,247,.7),rgba(167,139,250,.7),transparent)'}}/>
            {/* Specular highlight corner */}
            <div className="absolute top-0 left-0 w-40 h-40 rounded-full pointer-events-none" style={{background:'radial-gradient(circle,rgba(255,255,255,.05),transparent 70%)',filter:'blur(20px)'}}/>
            {/* Bottom glow */}
            <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-64 h-20 pointer-events-none" style={{background:'radial-gradient(ellipse,rgba(79,142,247,.08),transparent)',filter:'blur(20px)'}}/>

            <div className="relative p-8">
              {/* Avatar stack */}
              <div className="flex justify-center mb-6">
                <div className="flex -space-x-3">
                  {UNI.slice(0,6).map((u,i)=>(
                    <div key={u.name} className="w-9 h-9 rounded-full flex items-center justify-center text-[10px] font-syne font-800"
                      style={{background:`linear-gradient(135deg,${u.color},${u.color}88)`,border:'2px solid rgba(3,5,13,.85)',boxShadow:`0 0 14px ${u.color}44`,zIndex:6-i}}>
                      {u.name.slice(0,1)}
                    </div>
                  ))}
                  <div className="w-9 h-9 rounded-full flex items-center justify-center text-[10px] text-white/35 font-bold"
                    style={{background:'rgba(255,255,255,.06)',border:'2px solid rgba(3,5,13,.85)',zIndex:0}}>+2</div>
                </div>
              </div>

              <div className="text-center mb-7">
                <div className="font-syne font-800 text-xl mb-2">8 Universities. One Platform.</div>
                <div className="text-white/38 text-sm leading-relaxed">
                  The most complete UAAP university discovery experience ever built.
                </div>
              </div>

              {/* Feature pills */}
              <div className="flex flex-wrap justify-center gap-2 mb-8">
                {['3D Carousel','Live Compare','QS Rankings','Sports Hub','Admissions','Campus Life'].map(f=>(
                  <span key={f} className="px-3 py-1 rounded-full text-xs font-syne font-600"
                    style={{background:'rgba(79,142,247,.1)',border:'1px solid rgba(79,142,247,.22)',color:'#93c5fd'}}>
                    {f}
                  </span>
                ))}
              </div>

              {/* CTA */}
              <button onClick={handleEnter} disabled={entering}
                className="relative w-full py-4 rounded-2xl font-syne font-800 text-base text-white overflow-hidden group"
                style={{
                  background:entering?'linear-gradient(135deg,#1e3a8a,#4c1d95)':'linear-gradient(135deg,#2563eb,#7c3aed)',
                  boxShadow:entering?'0 0 20px rgba(79,142,247,.2)':'0 0 60px rgba(79,142,247,.45),inset 0 1px 0 rgba(255,255,255,.18)',
                  transform:entering?'scale(.98)':'scale(1)',
                  transition:'all .35s cubic-bezier(.34,1.2,.64,1)',
                  cursor:'none',
                }}>
                {/* hover sweep */}
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-400 pointer-events-none"
                  style={{background:'linear-gradient(90deg,transparent,rgba(255,255,255,.1),transparent)',transform:'skewX(-20deg)',transition:'opacity .4s,transform 1s'}}/>
                <span className="relative flex items-center justify-center gap-2">
                  {entering?(
                    <><div className="w-4 h-4 rounded-full border-2 border-white/40 border-t-white animate-spin"/>Entering…</>
                  ):(
                    <><Zap size={17}/>Enter Experience<ChevronRight size={16} className="group-hover:translate-x-1 transition-transform duration-300"/></>
                  )}
                </span>
              </button>
              <p className="text-center text-[11px] text-white/18 mt-3">No sign-up · Free forever</p>
            </div>
          </TiltCard>
        </div>

        {/* Scroll cue */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-2">
          <div className="w-5 h-9 rounded-full flex items-start justify-center pt-1.5"
            style={{border:'1px solid rgba(255,255,255,.1)',background:'rgba(255,255,255,.03)'}}>
            <div className="w-1 h-2 rounded-full bg-blue-400" style={{animation:'scrollDot 1.8s ease-in-out infinite'}}/>
          </div>
          <span className="text-[10px] text-white/18 tracking-[.25em] uppercase font-syne">Scroll to preview</span>
        </div>
      </section>

      {/* ══ STATS ══════════════════════════════ */}
      <section className="relative z-10 py-4 px-6">
        <div className="max-w-5xl mx-auto mb-10 h-px" style={{background:'linear-gradient(90deg,transparent,rgba(79,142,247,.3),rgba(167,139,250,.3),transparent)'}}/>
        <div ref={stats.ref} className="max-w-4xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-4">
          {statData.map(({icon:Icon,label,value,color},i)=>(
            <TiltCard key={label} className="relative rounded-2xl p-6 text-center overflow-hidden"
              style={{
                background:'rgba(255,255,255,.035)',border:`1px solid ${color}20`,backdropFilter:'blur(20px)',
                opacity:stats.on?1:0,transform:stats.on?'translateY(0)':'translateY(32px)',
                transition:`opacity .7s ${i*.1}s,transform .7s ${i*.1}s cubic-bezier(.16,1,.3,1)`,
                boxShadow:stats.on?`0 0 30px ${color}10`:'none',
              }}>
              <div className="absolute inset-0 pointer-events-none" style={{background:`radial-gradient(circle at 50% 0%,${color}10,transparent 70%)`}}/>
              <div className="absolute top-0 left-0 right-0 h-px" style={{background:`linear-gradient(90deg,transparent,${color}66,transparent)`}}/>
              <Icon size={22} className="mx-auto mb-2" style={{color,filter:`drop-shadow(0 0 8px ${color}88)`}}/>
              <div className="font-syne font-800 text-2xl" style={{color,textShadow:`0 0 20px ${color}66`}}>{value}</div>
              <div className="text-[11px] text-white/30 mt-0.5 uppercase tracking-wider font-syne">{label}</div>
            </TiltCard>
          ))}
        </div>
      </section>

      {/* ══ FEATURES GRID ═════════════════════ */}
      <section className="relative z-10 py-28 px-6">
        <div className="max-w-6xl mx-auto">
          <div ref={features.ref} className="text-center mb-16" style={{
            opacity:features.on?1:0,transform:features.on?'translateY(0)':'translateY(28px)',
            transition:'opacity .8s,transform .8s cubic-bezier(.16,1,.3,1)',
          }}>
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-syne font-600 tracking-[.18em] uppercase mb-5"
              style={{background:'rgba(167,139,250,.1)',border:'1px solid rgba(167,139,250,.3)',color:'#c4b5fd'}}>
              <span className="w-1.5 h-1.5 rounded-full bg-purple-400 dot-pulse"/>
              Platform Features
            </div>
            <h2 className="font-syne font-800 tracking-tight leading-tight" style={{fontSize:'clamp(2rem,5vw,4rem)'}}>
              Everything you need to<br/>
              <span style={{background:'linear-gradient(135deg,#4f8ef7,#a78bfa,#38bdf8)',WebkitBackgroundClip:'text',WebkitTextFillColor:'transparent',backgroundClip:'text'}}>
                find your university
              </span>
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {featureData.map((f,i)=>(
              <TiltCard key={f.title}
                className="group relative rounded-3xl p-7 overflow-hidden"
                style={{
                  background:'rgba(255,255,255,.035)',border:'1px solid rgba(255,255,255,.07)',
                  backdropFilter:'blur(20px)',
                  opacity:features.on?1:0,
                  transform:features.on?'translateY(0) scale(1)':'translateY(44px) scale(.94)',
                  transition:`opacity .7s ${i*.08}s,transform .7s ${i*.08}s cubic-bezier(.16,1,.3,1)`,
                }}>
                {/* hover glow */}
                <div className="absolute inset-0 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                  style={{background:'radial-gradient(ellipse at top left,rgba(79,142,247,.07),transparent 60%)'}}/>
                <div className="absolute top-0 left-0 right-0 h-px opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                  style={{background:'linear-gradient(90deg,transparent,rgba(79,142,247,.5),transparent)'}}/>
                <div className="text-3xl mb-4 inline-block" style={{transition:'transform .4s cubic-bezier(.34,1.2,.64,1)'}}
                  onMouseEnter={e=>{(e.currentTarget as HTMLElement).style.transform='scale(1.25) rotate(-8deg)';}}
                  onMouseLeave={e=>{(e.currentTarget as HTMLElement).style.transform='scale(1) rotate(0)';}}>{f.icon}</div>
                <h3 className="font-syne font-700 text-base mb-2">{f.title}</h3>
                <p className="text-white/38 text-sm leading-relaxed">{f.desc}</p>
              </TiltCard>
            ))}
          </div>
        </div>
      </section>

      {/* ══ UNIVERSITY PREVIEW ════════════════ */}
      <section className="relative z-10 py-20 px-6">
        <div className="max-w-6xl mx-auto">
          <div ref={unis.ref} className="text-center mb-12" style={{
            opacity:unis.on?1:0,transform:unis.on?'translateY(0)':'translateY(20px)',
            transition:'opacity .8s,transform .8s cubic-bezier(.16,1,.3,1)',
          }}>
            <h2 className="font-syne font-800 text-3xl md:text-5xl tracking-tight mb-2">
              The <span style={{background:'linear-gradient(135deg,#f97316,#f43f5e)',WebkitBackgroundClip:'text',WebkitTextFillColor:'transparent',backgroundClip:'text'}}>8 Schools</span> of UAAP
            </h2>
            <p className="text-white/30 text-base">Each with its own identity, legacy, and story.</p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {UNI.map((u,i)=>(
              <TiltCard key={u.name}
                className="group relative rounded-2xl p-5 overflow-hidden"
                style={{
                  background:`${u.color}0b`,border:`1px solid ${u.color}22`,
                  opacity:unis.on?1:0,
                  transform:unis.on?'translateY(0)':'translateY(36px)',
                  transition:`opacity .7s ${i*.07}s,transform .7s ${i*.07}s cubic-bezier(.16,1,.3,1)`,
                }}>
                {/* Top line */}
                <div className="absolute top-0 left-0 right-0 h-0.5" style={{background:`linear-gradient(90deg,transparent,${u.color},transparent)`}}/>
                {/* Hover glow */}
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-400 pointer-events-none"
                  style={{background:`radial-gradient(circle at top,${u.color}1a,transparent 70%)`}}/>
                <div className="w-13 h-13 w-12 h-12 rounded-xl flex items-center justify-center font-syne font-800 text-sm mb-3 group-hover:scale-110 transition-transform duration-300"
                  style={{background:`${u.color}22`,color:u.color,border:`1px solid ${u.color}38`,boxShadow:`0 0 20px ${u.color}22`}}>
                  {u.name}
                </div>
                <div className="text-sm font-syne font-700 text-white/70 mb-0.5">{u.text}</div>
                <div className="text-[11px] text-white/28">{u.sport}</div>
              </TiltCard>
            ))}
          </div>
        </div>
      </section>

      {/* ══ FINAL CTA ═════════════════════════ */}
      <section ref={final.ref} className="relative z-10 py-32 px-6">
        <div className="max-w-3xl mx-auto text-center">
          <TiltCard className="relative rounded-3xl overflow-hidden p-14"
            style={{
              background:'rgba(255,255,255,.03)',border:'1px solid rgba(79,142,247,.18)',
              backdropFilter:'blur(30px)',boxShadow:'0 0 120px rgba(79,142,247,.06)',
              opacity:final.on?1:0,transform:final.on?'translateY(0)':'translateY(32px)',
              transition:'opacity .9s,transform .9s cubic-bezier(.16,1,.3,1)',
            }}>
            <div className="absolute top-0 left-0 right-0 h-px" style={{background:'linear-gradient(90deg,transparent,rgba(79,142,247,.7),rgba(167,139,250,.7),transparent)'}}/>
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-72 h-36 pointer-events-none"
              style={{background:'radial-gradient(ellipse,rgba(79,142,247,.1),transparent 70%)',filter:'blur(24px)'}}/>
            <div className="relative">
              <div className="text-6xl mb-6" style={{animation:'floatB 4s ease-in-out infinite'}}>🎓</div>
              <h2 className="font-syne font-800 tracking-tight mb-4" style={{fontSize:'clamp(1.8rem,4vw,3.5rem)'}}>
                Your future starts<br/>
                <span style={{background:'linear-gradient(135deg,#4f8ef7,#a78bfa,#38bdf8)',WebkitBackgroundClip:'text',WebkitTextFillColor:'transparent',backgroundClip:'text'}}>
                  with the right choice
                </span>
              </h2>
              <p className="text-white/32 max-w-md mx-auto mb-10 text-lg leading-relaxed">
                Thousands of students. Eight universities. One platform to help you decide.
              </p>
              <button onClick={handleEnter}
                className="inline-flex items-center gap-3 px-10 py-4 rounded-full font-syne font-800 text-base text-white group"
                style={{
                  background:'linear-gradient(135deg,#2563eb,#7c3aed)',
                  boxShadow:'0 0 70px rgba(79,142,247,.5),inset 0 1px 0 rgba(255,255,255,.18)',
                  cursor:'none',transition:'transform .3s cubic-bezier(.34,1.2,.64,1)',
                }}
                onMouseEnter={e=>{(e.currentTarget as HTMLElement).style.transform='scale(1.04) translateY(-2px)';}}
                onMouseLeave={e=>{(e.currentTarget as HTMLElement).style.transform='scale(1) translateY(0)';}}
                onMouseDown={e=>{(e.currentTarget as HTMLElement).style.transform='scale(.97)';}}
                onMouseUp={e=>{(e.currentTarget as HTMLElement).style.transform='scale(1.04) translateY(-2px)';}}>
                <Zap size={18}/> Start Exploring Now
                <ChevronRight size={18} className="group-hover:translate-x-1 transition-transform"/>
              </button>
            </div>
          </TiltCard>
        </div>
      </section>

      {/* Footer */}
      <footer className="relative z-10 py-10 px-6 text-center" style={{borderTop:'1px solid rgba(255,255,255,.05)'}}>
        <div style={{fontFamily:"'Bebas Neue',sans-serif",fontSize:'1.8rem',letterSpacing:'.1em',lineHeight:1,marginBottom:6}}>
          <span style={{background:'linear-gradient(135deg,#4f8ef7,#a78bfa)',WebkitBackgroundClip:'text',WebkitTextFillColor:'transparent',backgroundClip:'text'}}>FACT</span>
          <span style={{color:'rgba(255,255,255,.2)'}}>-U</span>
        </div>
        <p className="text-white/18 text-xs">Find · Analyze · Compare · Trust · Universities</p>
        <p className="text-white/10 text-xs mt-2">UAAP Universe · For students across the Philippines</p>
      </footer>

      {/* ── FULL PAGE TRANSITION OVERLAY ── */}
      <div className="fixed inset-0 pointer-events-none" style={{
        zIndex:200,
        background:'linear-gradient(135deg,#03050d,#060818)',
        opacity:entered?1:0,
        transform:entered?'scale(1)':'scale(1.06)',
        transition:'opacity .65s cubic-bezier(.16,1,.3,1),transform .65s cubic-bezier(.16,1,.3,1)',
      }}>
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="flex flex-col items-center gap-4">
            <div style={{fontFamily:"'Bebas Neue',sans-serif",fontSize:'3rem',letterSpacing:'.1em',background:'linear-gradient(135deg,#4f8ef7,#a78bfa)',WebkitBackgroundClip:'text',WebkitTextFillColor:'transparent',backgroundClip:'text'}}>
              FACT-U
            </div>
            <div className="flex gap-1.5">
              {[0,1,2].map(i=>(
                <div key={i} className="w-1.5 h-1.5 rounded-full bg-blue-400 dot-pulse" style={{animationDelay:`${i*.18}s`}}/>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
