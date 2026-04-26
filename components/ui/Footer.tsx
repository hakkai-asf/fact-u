import Link from 'next/link';
import { Zap } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="py-10 px-4 sm:px-6 safe-bottom" style={{ borderTop: '1px solid rgba(255,255,255,0.05)' }}>
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-xl flex items-center justify-center"
            style={{ background: 'linear-gradient(135deg,#2563eb,#7c3aed)' }}>
            <Zap size={16} className="text-white" />
          </div>
          <div>
            <div className="font-display text-xl tracking-widest leading-none">
              <span className="grad">FACT</span><span style={{ color: 'rgba(255,255,255,0.3)' }}>-U</span>
            </div>
            <div style={{ fontSize: '9px', letterSpacing: '0.2em', color: 'rgba(255,255,255,0.2)', textTransform: 'uppercase', fontFamily: "'Syne',sans-serif" }}>UAAP Universe</div>
          </div>
        </div>
        <div className="flex flex-wrap justify-center gap-4 sm:gap-6 text-sm" style={{ color: 'rgba(220,228,255,0.35)' }}>
          {[['/', 'Home'], ['/universities', 'Universities'], ['/sports', 'Sports'], ['/academics', 'Academics'], ['/compare', 'Compare']].map(([href, label]) => (
            <Link key={href} href={href} className="hover:text-white/70 transition-colors">{label}</Link>
          ))}
        </div>
      </div>
      <div className="max-w-6xl mx-auto mt-6 pt-5 text-center" style={{ borderTop: '1px solid rgba(255,255,255,0.04)' }}>
        <p style={{ color: 'rgba(220,228,255,0.18)', fontSize: '0.72rem' }}>
          All university data is for reference only. Verify with official university sources. UAAP Universe — Philippines.
        </p>
        <p style={{ color: 'rgba(147,197,253,0.35)', fontSize: '0.72rem', marginTop: 4, fontWeight: 500 }}>
          Developed by Harry Lagto
        </p>
      </div>
    </footer>
  );
}
