'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Menu, X, Trophy, GraduationCap, BarChart2, Home, BookOpen, Zap } from 'lucide-react';

const links = [
  { href: '/home',        label: 'Home',         icon: Home },
  { href: '/universities',label: 'Universities',  icon: GraduationCap },
  { href: '/sports',      label: 'Sports',        icon: Trophy },
  { href: '/academics',   label: 'Academics',     icon: BookOpen },
  { href: '/compare',     label: 'Compare',       icon: BarChart2 },
];

export default function Navbar() {
  const pathname  = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [open,     setOpen]     = useState(false);
  const isLanding = pathname === '/';

  useEffect(() => {
    const h = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', h, { passive: true });
    return () => window.removeEventListener('scroll', h);
  }, []);

  // Close mobile menu on route change
  useEffect(() => { setOpen(false); }, [pathname]);

  if (isLanding) return null;

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${scrolled ? 'py-2 sm:py-3' : 'py-3 sm:py-4'}`}
      style={{
        background: scrolled ? 'rgba(3,5,13,0.92)' : 'rgba(3,5,13,0.5)',
        backdropFilter: 'blur(24px) saturate(1.6)',
        borderBottom: scrolled ? '1px solid rgba(79,142,247,0.1)' : '1px solid transparent',
      }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 flex items-center justify-between">

        {/* Logo */}
        <Link href="/" className="flex items-center gap-2.5 group flex-shrink-0">
          <div className="w-8 h-8 rounded-xl flex items-center justify-center flex-shrink-0"
            style={{ background: 'linear-gradient(135deg,#2563eb,#7c3aed)', boxShadow: '0 0 16px rgba(79,142,247,0.4)' }}>
            <Zap size={16} className="text-white" />
          </div>
          <div className="hidden sm:block leading-none">
            <div className="font-display text-lg tracking-widest">
              <span className="grad">FACT</span>
              <span style={{ color: 'rgba(255,255,255,0.4)' }}>-U</span>
            </div>
            <div style={{ fontSize: '8px', letterSpacing: '0.22em', color: 'rgba(255,255,255,0.22)', textTransform: 'uppercase', fontFamily: "'Syne',sans-serif" }}>
              UAAP Universe
            </div>
          </div>
        </Link>

        {/* Desktop nav */}
        <div className="hidden md:flex items-center gap-0.5 glass rounded-full px-1.5 py-1.5"
          style={{ border: '1px solid rgba(255,255,255,0.08)' }}>
          {links.map(({ href, label, icon: Icon }) => {
            const active = pathname === href || (href !== '/home' && pathname.startsWith(href));
            return (
              <Link key={href} href={href}
                className={`relative flex items-center gap-1.5 px-3.5 py-2 rounded-full text-sm font-medium transition-all duration-300 whitespace-nowrap ${active ? 'text-white' : 'hover:text-white/80'}`}
                style={{
                  color: active ? '#fff' : 'rgba(220,228,255,0.45)',
                  background: active ? 'rgba(79,142,247,0.15)' : 'transparent',
                  border: active ? '1px solid rgba(79,142,247,0.3)' : '1px solid transparent',
                }}
              >
                <Icon size={13} />
                {label}
              </Link>
            );
          })}
        </div>

        {/* Desktop CTA */}
        <div className="hidden md:flex gap-3 items-center flex-shrink-0">
          <Link href="/compare" className="btn-primary" style={{ padding: '0.6rem 1.4rem', fontSize: '0.82rem' }}>
            Compare Schools
          </Link>
        </div>

        {/* Mobile: logo text + toggle */}
        <div className="flex items-center gap-3 md:hidden">
          <span className="font-display text-base tracking-widest">
            <span className="grad">FACT</span>
            <span style={{ color: 'rgba(255,255,255,0.35)' }}>-U</span>
          </span>
          <button
            className="p-2 rounded-xl glass flex-shrink-0"
            style={{ border: '1px solid rgba(255,255,255,0.1)' }}
            onClick={() => setOpen(!open)}
            aria-label={open ? 'Close menu' : 'Open menu'}
          >
            {open ? <X size={18} /> : <Menu size={18} />}
          </button>
        </div>
      </div>

      {/* Mobile dropdown */}
      {open && (
        <div className="md:hidden mx-3 mt-2 rounded-2xl glass-md p-2 space-y-0.5 anim-scale-in"
          style={{ border: '1px solid rgba(255,255,255,0.1)' }}>
          {links.map(({ href, label, icon: Icon }) => {
            const active = pathname === href || (href !== '/home' && pathname.startsWith(href));
            return (
              <Link key={href} href={href}
                className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all ${active ? '' : 'hover:bg-white/5'}`}
                style={{
                  color: active ? '#93c5fd' : 'rgba(220,228,255,0.6)',
                  background: active ? 'rgba(79,142,247,0.12)' : 'transparent',
                  border: active ? '1px solid rgba(79,142,247,0.2)' : '1px solid transparent',
                }}
              >
                <Icon size={16} />
                {label}
              </Link>
            );
          })}
          <div className="pt-2 mt-2 border-t border-white/8 pb-1">
            <Link href="/compare"
              className="btn-primary w-full justify-center"
              style={{ padding: '0.7rem 1.2rem', fontSize: '0.85rem' }}
            >
              Compare Schools
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
}
