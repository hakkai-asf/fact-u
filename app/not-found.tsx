import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center text-center px-6">
      <div className="text-8xl mb-8 float-b">🏀</div>
      <div className="font-display text-9xl grad mb-4" style={{ lineHeight: 1 }}>404</div>
      <h2 className="font-syne font-700 text-2xl mb-3">Fouled Out of Bounds</h2>
      <p className="text-white/40 text-lg mb-10 max-w-sm">
        This page doesn't exist. Let's get you back on the court.
      </p>
      <Link href="/" className="btn-primary">← Back to FACT-U</Link>
    </div>
  );
}
