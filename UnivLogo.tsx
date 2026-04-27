/**
 * components/ui/UnivLogo.tsx
 * MODIFIED: Fixed Vercel/production logo loading.
 * - slug change resets failed state (fixes cross-page navigation)
 * - cache-busting query param on every deploy
 * - lowercase slug enforced (case-sensitive Vercel filesystem)
 * - clean onError with no stale closure
 */
'use client';
import { useState, useEffect } from 'react';

// Cache buster — changes every Vercel deployment via git commit SHA
const CACHE_BUST = process.env.NEXT_PUBLIC_VERCEL_GIT_COMMIT_SHA?.slice(0, 8) ?? 'dev';

interface Props {
  slug:       string;
  name:       string;
  color:      string;
  size?:      number;
  rounded?:   string;
  className?: string;
  style?:     React.CSSProperties;
  glow?:      boolean;
}

export default function UnivLogo({
  slug, name, color,
  size    = 40,
  rounded = 'xl',
  className = '',
  style,
  glow = false,
}: Props) {
  const [failed, setFailed] = useState(false);

  // Reset on slug change — fixes stale failed state when navigating pages
  useEffect(() => { setFailed(false); }, [slug]);

  const borderRadius =
    rounded === 'full' ? '50%'  :
    rounded === '2xl'  ? 16     :
    rounded === '3xl'  ? 24     :
    rounded === 'lg'   ? 8      :
    rounded === 'md'   ? 6      :
    rounded === 'sm'   ? 4      : 12;

  const boxShadow = glow ? `0 0 18px ${color}66, 0 0 4px ${color}44` : undefined;
  const abbr      = name.length <= 2 ? name : name.slice(0, 2);
  const fontSize  = size <= 28 ? size * 0.38 : size <= 48 ? size * 0.35 : size * 0.3;

  const wrapStyle: React.CSSProperties = {
    width:          size,
    height:         size,
    borderRadius,
    flexShrink:     0,
    overflow:       'hidden',
    position:       'relative',
    display:        'flex',
    alignItems:     'center',
    justifyContent: 'center',
    boxShadow,
    border: `1px solid ${color}44`,
    ...style,
  };

  // Enforce lowercase — Vercel Linux filesystem is case-sensitive
  const safeSlug = slug.toLowerCase().trim();
  const src = `/assets/logos/${safeSlug}-logo.png?v=${CACHE_BUST}`;

  if (!failed) {
    return (
      <div className={className} style={wrapStyle}>
        <div style={{ position: 'absolute', inset: 0, background: `${color}18` }} />
        <img
          src={src}
          alt={`${name} logo`}
          style={{
            width:     '100%',
            height:    '100%',
            objectFit: 'contain',
            padding:   Math.max(3, size * 0.07),
            position:  'relative',
            zIndex:    1,
          }}
          loading="lazy"
          onError={() => setFailed(true)}
        />
      </div>
    );
  }

  // Fallback: colored abbreviation
  return (
    <div
      className={`font-syne font-extrabold ${className}`}
      style={{
        ...wrapStyle,
        background: `linear-gradient(135deg, ${color}dd, ${color}99)`,
        color:      '#fff',
        fontSize,
        letterSpacing: '-0.02em',
      }}
    >
      {abbr}
    </div>
  );
}
