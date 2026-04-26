import NebulaBackground from '@/components/ui/NebulaBackground';
import ParticleField from '@/components/ui/ParticleField';
import HeroSection from '@/components/sections/HeroSection';
import UniversityCarousel from '@/components/sections/UniversityCarousel';
import SportsSection from '@/components/sections/SportsSection';
import UnivLogo from '@/components/ui/UnivLogo';
import Link from 'next/link';
import { GraduationCap, BarChart2, ArrowRight } from 'lucide-react';
import { universities } from '@/lib/universities';

export default function HomePage() {
  return (
    <main className="relative">
      <NebulaBackground primaryColor="#1e3a8a" secondaryColor="#4c1d95" intensity={0.9} />
      <ParticleField count={40} />

      <HeroSection />
      <div className="divider mx-auto max-w-5xl" />
      <UniversityCarousel />
      <div className="divider mx-auto max-w-5xl" />
      <SportsSection />
      <div className="divider mx-auto max-w-5xl" />

      {/* Quick university grid */}
      <section className="py-16 sm:py-24 px-4 sm:px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-10 sm:mb-14">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass-bright text-xs font-syne font-semibold tracking-widest uppercase mb-4"
              style={{ border: '1px solid rgba(99,102,241,0.3)', color: '#c4b5fd' }}>
              All Schools
            </div>
            <h2 className="font-syne font-extrabold text-3xl sm:text-4xl md:text-5xl tracking-tight text-white">
              All <span className="grad">8 Universities</span>
            </h2>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4">
            {universities.map((u) => (
              <Link key={u.slug} href={`/universities/${u.slug}`}
                className="glass rounded-xl sm:rounded-2xl p-4 sm:p-5 group transition-all duration-400 hover:scale-[1.04] hover:-translate-y-1 neon-border overflow-hidden relative"
                style={{ border: `1px solid ${u.colors.primary}25` }}>
                <div className="absolute top-0 left-0 right-0 h-0.5"
                  style={{ background: `linear-gradient(90deg,transparent,${u.colors.primary},transparent)` }} />
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-400 pointer-events-none"
                  style={{ background: `radial-gradient(circle at top,${u.colors.primary}14,transparent 70%)` }} />

                <UnivLogo
                  slug={u.slug} name={u.shortName} color={u.colors.primary}
                  size={48} rounded="xl" glow={false}
                  className="mb-3 group-hover:scale-110 transition-transform duration-300"
                />
                <div className="font-syne font-bold text-xs sm:text-sm leading-tight mb-0.5 text-white">{u.shortName}</div>
                <div className="text-[10px] sm:text-xs" style={{ color: 'rgba(220,228,255,0.42)' }}>{u.sports.dominantSport} · {u.sports.totalTitles}+ titles</div>
                <ArrowRight size={12} className="absolute bottom-3 right-3 transition-all opacity-0 group-hover:opacity-100 group-hover:translate-x-0.5"
                  style={{ color: u.colors.primary }} />
              </Link>
            ))}
          </div>
        </div>
      </section>

      <div className="divider mx-auto max-w-5xl" />

      {/* Academics CTA */}
      <section className="py-16 sm:py-24 px-4 sm:px-6">
        <div className="max-w-4xl mx-auto">
          <div className="glass-md rounded-2xl sm:rounded-3xl p-8 sm:p-12 text-center relative overflow-hidden shimmer"
            style={{ border: '1px solid rgba(99,102,241,0.28)', boxShadow: '0 0 60px rgba(99,102,241,0.07)' }}>
            <div className="absolute inset-0 pointer-events-none"
              style={{ background: 'radial-gradient(ellipse at center,rgba(99,102,241,0.06),transparent 70%)' }} />
            <div className="absolute top-0 left-0 right-0 h-px"
              style={{ background: 'linear-gradient(90deg,transparent,rgba(99,102,241,0.55),transparent)' }} />
            <div className="relative">
              <GraduationCap size={32} className="mx-auto mb-4"
                style={{ color: '#818cf8', filter: 'drop-shadow(0 0 12px rgba(99,102,241,0.6))' }} />
              <h2 className="font-syne font-extrabold text-2xl sm:text-4xl tracking-tight mb-3 text-white">
                Ready to <span className="grad">Decide?</span>
              </h2>
              <p className="max-w-md mx-auto mb-8 text-base sm:text-lg leading-relaxed"
                style={{ color: 'rgba(220,228,255,0.62)' }}>
                Compare QS Rankings, tuition costs, program strengths, and sports performance side by side.
              </p>
              <div className="flex flex-wrap justify-center gap-3 sm:gap-4">
                <Link href="/academics" className="btn-primary">
                  <GraduationCap size={15} /> Explore Academics
                </Link>
                <Link href="/compare" className="btn-ghost">
                  <BarChart2 size={15} /> Compare Schools <ArrowRight size={13} />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      <footer className="py-8 sm:py-10 px-4 sm:px-6 text-center safe-bottom" style={{ borderTop: '1px solid rgba(255,255,255,0.05)' }}>
        <div className="max-w-4xl mx-auto">
          <div className="font-display text-xl sm:text-2xl tracking-widest mb-2">
            <span className="grad">FACT</span><span style={{ color: 'rgba(255,255,255,0.25)' }}>-U</span>
          </div>
          <p style={{ color: 'rgba(220,228,255,0.32)', fontSize: '0.8rem' }}>UAAP Universe · Built for students across the Philippines</p>
          <p style={{ color: 'rgba(220,228,255,0.18)', fontSize: '0.7rem', marginTop: 6 }}>
            All university information is for reference. Always verify with official sources.
          </p>
          <p style={{ color: 'rgba(147,197,253,0.45)', fontSize: '0.7rem', marginTop: 4, fontWeight: 600 }}>
            Developed by Harry Lagto
          </p>
        </div>
      </footer>
    </main>
  );
}
