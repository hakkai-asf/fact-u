import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center text-center px-6">
      <div className="text-7xl mb-6">🏀</div>
      <h1 className="font-syne font-800 text-5xl mb-4">404</h1>
      <p className="text-white/50 text-lg mb-8">This page fouled out. Let's get you back in the game.</p>
      <Link href="/"
        className="px-6 py-3 rounded-full font-semibold text-sm text-white transition-all hover:scale-105"
        style={{ background: 'linear-gradient(135deg,#2563eb,#7c3aed)' }}>
        Back to Home
      </Link>
    </div>
  );
}
