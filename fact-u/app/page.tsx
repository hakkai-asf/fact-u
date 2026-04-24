import AnimatedBackground from '@/components/ui/AnimatedBackground';
import HeroSection from '@/components/sections/HeroSection';
import UniversityCarousel from '@/components/sections/UniversityCarousel';
import SportsSection from '@/components/sections/SportsSection';
import Link from 'next/link';
import { GraduationCap, BarChart2, ArrowRight } from 'lucide-react';

export default function HomePage() {
  return (
    <main>
      <AnimatedBackground primaryColor="#1e40af" secondaryColor="#7c3aed" />
      <HeroSection />
      <UniversityCarousel />
      <SportsSection />

      {/* Academics CTA band */}
      <section className="py-20 px-6">
        <div className="max-w-5xl mx-auto">
          <div className="glass rounded-3xl p-10 md:p-14 text-center relative overflow-hidden"
            style={{ border: '1px solid rgba(99,102,241,0.3)' }}>
            <div className="absolute inset-0 opacity-10"
              style={{ background: 'radial-gradient(ellipse at center, #6366f1, transparent 70%)' }} />
            <div className="relative">
              <GraduationCap size={40} className="mx-auto mb-4 text-indigo-400" />
              <h2 className="font-syne font-800 text-3xl md:text-4xl mb-4">
                Compare Academics & <span className="grad-text">Rankings</span>
              </h2>
              <p className="text-white/50 max-w-xl mx-auto mb-8">
                QS World Rankings, tuition ranges, top programs, and strength scores — all in one place to help you decide.
              </p>
              <div className="flex flex-wrap justify-center gap-4">
                <Link href="/academics"
                  className="flex items-center gap-2 px-6 py-3 rounded-full font-semibold text-sm transition-all hover:scale-105"
                  style={{ background: 'linear-gradient(135deg,#4f46e5,#7c3aed)', boxShadow: '0 0 30px rgba(99,102,241,0.3)' }}>
                  <GraduationCap size={16} /> Explore Academics
                </Link>
                <Link href="/compare"
                  className="flex items-center gap-2 px-6 py-3 rounded-full font-semibold text-sm glass glass-hover transition-all hover:scale-105"
                  style={{ border: '1px solid rgba(255,255,255,0.15)' }}>
                  <BarChart2 size={16} /> Compare Schools <ArrowRight size={14} />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
