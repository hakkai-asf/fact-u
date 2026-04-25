import Link from 'next/link';
import { Zap } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="py-14 px-6" style={{ borderTop: '1px solid rgba(255,255,255,0.05)' }}>
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-xl flex items-center justify-center"
              style={{ background: 'linear-gradient(135deg,#2563eb,#7c3aed)' }}>
              <Zap size={16} className="text-white" />
            </div>
            <div>
              <div className="font-display text-xl tracking-widest leading-none">
                <span className="grad">FACT</span><span className="text-white/40">-U</span>
              </div>
              <div className="text-[10px] text-white/20 tracking-[0.2em] uppercase">UAAP Universe</div>
            </div>
          </div>
          <div className="flex gap-6 text-sm text-white/30">
            {[['/',  'Home'], ['/universities','Universities'], ['/sports','Sports'], ['/academics','Academics'], ['/compare','Compare']].map(([href, label]) => (
              <Link key={href} href={href} className="hover:text-white/60 transition-colors">{label}</Link>
            ))}
          </div>
        </div>
        <div className="mt-8 pt-6 text-center text-xs text-white/15" style={{ borderTop: '1px solid rgba(255,255,255,0.04)' }}>
          All university data is for reference only. Verify with official university sources.
          Built for students across the Philippines. 🇵🇭
        </div>
      </div>
    </footer>
  );
}
