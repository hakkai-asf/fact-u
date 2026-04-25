'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Menu, X, Trophy, GraduationCap, BarChart2, Home, BookOpen, Zap } from 'lucide-react';

const links = [
  { href: '/home', label: 'Home', icon: Home },
  { href: '/universities', label: 'Universities', icon: GraduationCap },
  { href: '/sports', label: 'Sports', icon: Trophy },
  { href: '/academics', label: 'Academics', icon: BookOpen },
  { href: '/compare', label: 'Compare', icon: BarChart2 },
];

export default function Navbar() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  // hide nav on root landing page
  const isLanding = pathname === '/';

  useEffect(() => {
    const h = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', h, { passive: true });
    return () => window.removeEventListener('scroll', h);
  }, []);

  if (isLanding) return null;

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-700 ${scrolled ? 'py-3' : 'py-5'}`}
      style={{
        background: scrolled ? 'rgba(3,5,13,0.88)' : 'transparent',
        backdropFilter: scrolled ? 'blur(28px) saturate(1.8)' : 'none',
        borderBottom: scrolled ? '1px solid rgba(79,142,247,0.1)' : '1px solid transparent',
      }}>
      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-3 group">
          <div className="relative w-9 h-9 rounded-xl flex items-center justify-center overflow-hidden"
            style={{ background: 'linear-gradient(135deg,#2563eb,#7c3aed)', boxShadow: '0 0 20px rgba(79,142,247,0.4)' }}>
            <Zap size={18} className="text-white relative z-10" />
          </div>
          <div className="hidden sm:block">
            <div className="font-display text-xl tracking-widest leading-none">
              <span className="grad">FACT</span><span className="text-white/50">-U</span>
            </div>
            <div className="text-[9px] tracking-[0.25em] text-white/25 uppercase font-syne">UAAP Universe</div>
          </div>
        </Link>

        <div className="hidden md:flex items-center gap-1 glass rounded-full px-2 py-2"
          style={{ border: '1px solid rgba(255,255,255,0.07)' }}>
          {links.map(({ href, label, icon: Icon }) => {
            const active = pathname === href || (href !== '/home' && pathname.startsWith(href));
            return (
              <Link key={href} href={href}
                className={`relative flex items-center gap-1.5 px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${active ? 'text-white' : 'text-white/45 hover:text-white/80'}`}
                style={active ? { background: 'rgba(79,142,247,0.15)', border: '1px solid rgba(79,142,247,0.3)' } : {}}>
                <Icon size={13} />{label}
              </Link>
            );
          })}
        </div>

        <div className="hidden md:flex gap-3">
          <Link href="/compare" className="btn-primary text-sm">Compare Schools</Link>
        </div>

        <button className="md:hidden glass p-2.5 rounded-xl" onClick={() => setOpen(!open)}
          style={{ border: '1px solid rgba(255,255,255,0.1)' }}>
          {open ? <X size={18} /> : <Menu size={18} />}
        </button>
      </div>

      {open && (
        <div className="md:hidden mx-4 mt-2 rounded-2xl glass-md p-3 space-y-1 anim-scale-in"
          style={{ border: '1px solid rgba(255,255,255,0.1)' }}>
          {links.map(({ href, label, icon: Icon }) => {
            const active = pathname === href;
            return (
              <Link key={href} href={href} onClick={() => setOpen(false)}
                className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all ${active ? 'text-blue-300' : 'text-white/50 hover:text-white'}`}
                style={active ? { background: 'rgba(79,142,247,0.12)' } : {}}>
                <Icon size={15} />{label}
              </Link>
            );
          })}
          <div className="pt-2 border-t border-white/8">
            <Link href="/compare" onClick={() => setOpen(false)} className="btn-primary w-full text-sm justify-center">
              Compare Schools
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
}
