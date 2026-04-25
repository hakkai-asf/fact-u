import AnimatedBackground from '@/components/ui/AnimatedBackground';
import ParticleField from '@/components/ui/ParticleField';
import HeroSection from '@/components/sections/HeroSection';
import UniversityCarousel from '@/components/sections/UniversityCarousel';
import SportsSection from '@/components/sections/SportsSection';
import Link from 'next/link';
import { GraduationCap, BarChart2, ArrowRight, Star } from 'lucide-react';
import { universities } from '@/lib/universities';

export default function HomePage() {
  return (
    <main className="relative">
      <AnimatedBackground primaryColor="#1e3a8a" secondaryColor="#4c1d95" intensity={0.35} />
      <ParticleField count={50} />

      <HeroSection />

      {/* Divider */}
      <div className="divider mx-auto max-w-5xl" />

      <UniversityCarousel />

      <div className="divider mx-auto max-w-5xl" />

      <SportsSection />

      <div className="divider mx-auto max-w-5xl" />

      {/* University Quick Grid */}
      <section className="py-24 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-14">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass-bright text-xs font-syne font-600 tracking-widest uppercase mb-5"
              style={{ border: '1px solid rgba(99,102,241,0.35)', color: '#a5b4fc' }}>
              <Star size={11} /> All Schools
            </div>
            <h2 className="font-syne font-800 text-4xl md:text-5xl tracking-tight">
              All <span className="grad">8 Universities</span>
            </h2>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            {universities.map((u, i) => (
              <Link key={u.slug} href={`/universities/${u.slug}`}
                className="glass rounded-2xl p-5 group transition-all duration-400 hover:scale-[1.04] hover:-translate-y-1 neon-border btn-magnetic overflow-hidden relative"
                style={{ border: `1px solid ${u.colors.primary}28`, animationDelay: `${i*0.05}s` }}>
                <div className="absolute top-0 left-0 right-0 h-0.5"
                  style={{ background: `linear-gradient(90deg,transparent,${u.colors.primary},transparent)` }} />
                <div className="w-12 h-12 rounded-xl flex items-center justify-center font-syne font-800 text-sm mb-3 group-hover:scale-110 transition-transform duration-300"
                  style={{ background: `${u.colors.primary}25`, color: u.colors.primary, border: `1px solid ${u.colors.primary}40` }}>
                  {u.shortName.slice(0,2)}
                </div>
                <div className="font-syne font-700 text-sm leading-tight mb-1">{u.shortName}</div>
                <div className="text-[11px] text-white/35 truncate">{u.sports.dominantSport} · {u.sports.totalTitles}+ titles</div>
                <ArrowRight size={13} className="absolute bottom-4 right-4 text-white/20 group-hover:text-white/60 group-hover:translate-x-1 transition-all" />
              </Link>
            ))}
          </div>
        </div>
      </section>

      <div className="divider mx-auto max-w-5xl" />

      {/* Academics CTA */}
      <section className="py-24 px-6">
        <div className="max-w-4xl mx-auto">
          <div className="glass-md rounded-3xl p-12 text-center relative overflow-hidden shimmer"
            style={{ border: '1px solid rgba(99,102,241,0.3)', boxShadow: '0 0 80px rgba(99,102,241,0.08)' }}>
            <div className="absolute inset-0 pointer-events-none"
              style={{ background: 'radial-gradient(ellipse at center,rgba(99,102,241,0.06),transparent 70%)' }} />
            <div className="absolute top-0 left-0 right-0 h-px"
              style={{ background: 'linear-gradient(90deg,transparent,rgba(99,102,241,0.6),transparent)' }} />
            <div className="relative">
              <GraduationCap size={36} className="mx-auto mb-5 text-indigo-400" style={{ filter: 'drop-shadow(0 0 12px rgba(99,102,241,0.6))' }} />
              <h2 className="font-syne font-800 text-3xl md:text-5xl tracking-tight mb-4">
                Ready to <span className="grad">Decide?</span>
              </h2>
              <p className="text-white/40 max-w-md mx-auto mb-10 text-lg">
                Compare QS Rankings, tuition costs, program strengths, and sports performance side by side.
              </p>
              <div className="flex flex-wrap justify-center gap-4">
                <Link href="/academics" className="btn-primary">
                  <GraduationCap size={16} /> Explore Academics
                </Link>
                <Link href="/compare" className="btn-ghost">
                  <BarChart2 size={16} /> Compare Schools <ArrowRight size={14} />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-10 px-6 text-center border-t border-white/5">
        <div className="max-w-4xl mx-auto">
          <div className="font-display text-2xl tracking-widest mb-2">
            <span className="grad">FACT</span><span className="text-white/30">-U</span>
          </div>
          <p className="text-white/25 text-sm">UAAP Universe · Built for students across the Philippines</p>
          <p className="text-white/15 text-xs mt-3">
            All university information is for reference. Always verify with official university sources.
          </p>
        </div>
      </footer>
    </main>
  );
}
