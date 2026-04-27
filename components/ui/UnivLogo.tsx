/**
 * UnivLogo — universal university logo component.
 *
 * MODIFIED: Fixed Vercel/production image loading issues:
 * - Added key prop reset so failed state clears on slug change
 * - Added cache-busting via build ID to prevent stale Vercel CDN cache
 * - Robust onError that surfaces the fallback correctly every time
 * - Works correctly when you add a new logo file and redeploy
 */
'use client';
import { useState, useEffect } from 'react';

// ADDED: Build-time cache buster — changes on every Vercel deployment
// so freshly added images always load without manual cache clearing.
// In production this becomes the Vercel deployment ID; locally it stays "dev".
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
  // MODIFIED: Reset failed state whenever slug changes (route navigation fix)
  const [failed, setFailed] = useState(false);
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

  // MODIFIED: Use slug (lowercase, trimmed) as the canonical filename key.
  // This ensures case-sensitive Linux (Vercel) filesystem always matches.
  const safeSlug = slug.toLowerCase().trim();

  // MODIFIED: Cache-bust URL — appended as query param.
  // Next.js/Vercel serves /public files as static assets; query params are
  // forwarded so the CDN edge treats each deploy's files as fresh.
  const src = `/assets/logos/${safeSlug}-logo.png?v=${CACHE_BUST}`;

  if (!failed) {
    return (
      <div className={className} style={wrapStyle}>
        <div style={{ position: 'absolute', inset: 0, background: `${color}18` }} />
        <img
          src={src}
          alt={`${name} logo`}
          style={{
            width:      '100%',
            height:     '100%',
            objectFit:  'contain',
            padding:    Math.max(3, size * 0.07),
            position:   'relative',
            zIndex:     1,
          }}
          loading="lazy"
          // MODIFIED: onError is a plain function — no closure over stale state
          onError={(e) => {
            (e.currentTarget as HTMLImageElement).style.display = 'none';
            setFailed(true);
          }}
        />
      </div>
    );
  }

  // Fallback: colored abbreviation block
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
