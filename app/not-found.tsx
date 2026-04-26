import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center text-center px-6">
      <div className="font-display text-[120px] leading-none grad mb-4">404</div>
      <h2 className="font-syne font-bold text-2xl mb-3" style={{ color: '#e8eeff' }}>Fouled Out of Bounds</h2>
      <p className="text-base mb-10 max-w-sm" style={{ color: 'rgba(220,228,255,0.55)' }}>
        This page does not exist. Let us get you back in the game.
      </p>
      <Link href="/" className="btn-primary">Back to FACT-U</Link>
    </div>
  );
}
