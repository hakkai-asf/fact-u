'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Menu, X, Trophy, GraduationCap, BarChart2, Home, BookOpen } from 'lucide-react';

const links = [
  { href: '/', label: 'Home', icon: Home },
  { href: '/universities', label: 'Universities', icon: GraduationCap },
  { href: '/sports', label: 'Sports', icon: Trophy },
  { href: '/academics', label: 'Academics', icon: BookOpen },
  { href: '/compare', label: 'Compare', icon: BarChart2 },
];

export default function Navbar() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 30);
    window.addEventListener('scroll', handler);
    return () => window.removeEventListener('scroll', handler);
  }, []);

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled ? 'py-3' : 'py-4'
      }`}
      style={{
        background: scrolled ? 'rgba(6,10,18,0.85)' : 'rgba(6,10,18,0.4)',
        backdropFilter: 'blur(24px)',
        borderBottom: scrolled ? '1px solid rgba(255,255,255,0.1)' : '1px solid transparent',
      }}
    >
      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2 group">
          <div
            className="w-8 h-8 rounded-lg flex items-center justify-center text-sm font-black"
            style={{ background: 'linear-gradient(135deg,#2563eb,#7c3aed)' }}
          >
            U
          </div>
          <span className="font-syne font-800 text-lg tracking-tight hidden sm:block">
            <span className="grad-text">UAAP</span>
            <span className="text-white/70 font-normal text-sm ml-1">Universe</span>
          </span>
        </Link>

        {/* Desktop links */}
        <div className="hidden md:flex items-center gap-1">
          {links.map(({ href, label, icon: Icon }) => {
            const active = pathname === href || (href !== '/' && pathname.startsWith(href));
            return (
              <Link
                key={href}
                href={href}
                className={`flex items-center gap-1.5 px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                  active
                    ? 'text-blue-300'
                    : 'text-white/50 hover:text-white/90 hover:bg-white/6'
                }`}
                style={active ? { background: 'rgba(59,130,246,0.12)', border: '1px solid rgba(59,130,246,0.3)' } : {}}
              >
                <Icon size={14} />
                {label}
              </Link>
            );
          })}
        </div>

        {/* CTA */}
        <div className="hidden md:flex items-center gap-3">
          <Link
            href="/compare"
            className="px-4 py-2 rounded-full text-sm font-semibold transition-all duration-300 hover:scale-105"
            style={{
              background: 'linear-gradient(135deg,#2563eb,#7c3aed)',
              boxShadow: '0 0 20px rgba(99,102,241,0.3)',
            }}
          >
            Compare Schools
          </Link>
        </div>

        {/* Mobile toggle */}
        <button
          className="md:hidden p-2 rounded-lg glass"
          onClick={() => setOpen(!open)}
          aria-label="Menu"
        >
          {open ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>

      {/* Mobile menu */}
      {open && (
        <div
          className="md:hidden mt-2 mx-4 rounded-2xl glass p-4 space-y-1"
          style={{ border: '1px solid rgba(255,255,255,0.12)' }}
        >
          {links.map(({ href, label, icon: Icon }) => {
            const active = pathname === href || (href !== '/' && pathname.startsWith(href));
            return (
              <Link
                key={href}
                href={href}
                onClick={() => setOpen(false)}
                className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all ${
                  active ? 'text-blue-300 bg-blue-500/10' : 'text-white/60 hover:text-white hover:bg-white/5'
                }`}
              >
                <Icon size={16} />
                {label}
              </Link>
            );
          })}
        </div>
      )}
    </nav>
  );
}
