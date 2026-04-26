'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Menu, X, Trophy, GraduationCap, BarChart2, Home, BookOpen } from 'lucide-react';
import Image from 'next/image';

const links = [
  { href: '/home',         label: 'Home',        icon: Home },
  { href: '/universities', label: 'Universities', icon: GraduationCap },
  { href: '/sports',       label: 'Sports',       icon: Trophy },
  { href: '/academics',    label: 'Academics',    icon: BookOpen },
  { href: '/compare',      label: 'Compare',      icon: BarChart2 },
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

  useEffect(() => { setOpen(false); }, [pathname]);

  if (isLanding) return null;

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${scrolled ? 'py-2 sm:py-3' : 'py-3 sm:py-4'}`}
      style={{
        background: scrolled ? 'rgba(3,5,13,0.90)' : 'rgba(3,5,13,0.45)',
        backdropFilter: 'blur(24px) saturate(1.6)',
        borderBottom: scrolled ? '1px solid rgba(79,142,247,0.12)' : '1px solid transparent',
      }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 flex items-center justify-between">

        {/* Logo — uses fact-u-logo.png, falls back to text */}
        <Link href="/" className="flex items-center gap-2.5 flex-shrink-0 group">
          <div className="relative w-8 h-8 sm:w-9 sm:h-9 rounded-xl overflow-hidden flex-shrink-0"
            style={{ boxShadow: '0 0 16px rgba(79,142,247,0.4)' }}>
            <img
              src="/assets/fact-u-logo.png"
              alt="FACT-U Logo"
              className="w-full h-full object-cover"
              onError={e => {
                (e.currentTarget as HTMLImageElement).style.display = 'none';
                const fb = (e.currentTarget as HTMLImageElement).nextElementSibling as HTMLElement;
                if (fb) fb.style.display = 'flex';
              }}
            />
            {/* Fallback */}
            <div className="absolute inset-0 items-center justify-center font-syne font-extrabold text-white text-xs"
              style={{ display: 'none', background: 'linear-gradient(135deg,#2563eb,#7c3aed)' }}>
              F
            </div>
          </div>
          <div className="hidden sm:block leading-none">
            <div className="font-display text-lg tracking-widest">
              <span className="grad">FACT</span>
              <span style={{ color: 'rgba(255,255,255,0.38)' }}>-U</span>
            </div>
            <div style={{ fontSize: '8px', letterSpacing: '0.22em', color: 'rgba(255,255,255,0.22)', textTransform: 'uppercase', fontFamily: "'Syne',sans-serif" }}>
              UAAP Universe
            </div>
          </div>
        </Link>

        {/* Desktop links */}
        <div className="hidden md:flex items-center gap-0.5 glass rounded-full px-1.5 py-1.5"
          style={{ border: '1px solid rgba(255,255,255,0.08)' }}>
          {links.map(({ href, label, icon: Icon }) => {
            const active = pathname === href || (href !== '/home' && pathname.startsWith(href));
            return (
              <Link key={href} href={href}
                className="relative flex items-center gap-1.5 px-3.5 py-2 rounded-full text-sm font-medium transition-all duration-300 whitespace-nowrap"
                style={{
                  color: active ? '#e8eeff' : 'rgba(220,228,255,0.45)',
                  background: active ? 'rgba(79,142,247,0.15)' : 'transparent',
                  border: active ? '1px solid rgba(79,142,247,0.28)' : '1px solid transparent',
                }}>
                <Icon size={13} />{label}
              </Link>
            );
          })}
        </div>

        {/* CTA + mobile toggle */}
        <div className="flex items-center gap-3">
          <Link href="/compare" className="hidden md:inline-flex btn-primary" style={{ padding: '0.6rem 1.3rem', fontSize: '0.82rem' }}>
            Compare Schools
          </Link>
          <button className="md:hidden glass p-2.5 rounded-xl"
            style={{ border: '1px solid rgba(255,255,255,0.1)' }}
            onClick={() => setOpen(!open)}
            aria-label={open ? 'Close menu' : 'Open menu'}>
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
                className="flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all"
                style={{
                  color: active ? '#93c5fd' : 'rgba(220,228,255,0.60)',
                  background: active ? 'rgba(79,142,247,0.12)' : 'transparent',
                }}>
                <Icon size={16} />{label}
              </Link>
            );
          })}
          <div className="pt-2 mt-1 border-t border-white/8 pb-1">
            <Link href="/compare" className="btn-primary w-full justify-center" style={{ padding: '0.7rem 1.2rem', fontSize: '0.85rem' }}>
              Compare Schools
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
}
