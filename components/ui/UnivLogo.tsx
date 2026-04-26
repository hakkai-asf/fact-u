/**
 * UnivLogo — universal university logo component.
 * Tries to load the real PNG from /assets/logos/{slug}-logo.png
 * Falls back to a styled abbreviation block with the school's primary color.
 *
 * Usage:
 *   <UnivLogo slug="up"        name="UP"   color="#7B1113" size={40} />
 *   <UnivLogo slug="ateneo"    name="ADMU" color="#003D8F" size={48} rounded="xl" />
 */
'use client';
import { useState } from 'react';

interface Props {
  slug:      string;          // e.g. "up", "ateneo", "dlsu"
  name:      string;          // shortName used as fallback text
  color:     string;          // primary color for fallback bg + border glow
  size?:     number;          // px width & height (default 40)
  rounded?:  string;          // tailwind rounded-* value (default "xl")
  className?: string;
  style?:    React.CSSProperties;
  glow?:     boolean;         // whether to add color box-shadow
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

  const borderRadius =
    rounded === 'full' ? '50%' :
    rounded === '2xl'  ? 16 :
    rounded === '3xl'  ? 24 :
    rounded === 'lg'   ? 8  :
    rounded === 'md'   ? 6  :
    rounded === 'sm'   ? 4  : 12; // xl default

  const boxShadow = glow ? `0 0 18px ${color}66, 0 0 4px ${color}44` : undefined;

  const abbr = name.length <= 2 ? name : name.slice(0, 2);
  const fontSize = size <= 28 ? size * 0.38 : size <= 48 ? size * 0.35 : size * 0.3;

  const wrapStyle: React.CSSProperties = {
    width:       size,
    height:      size,
    borderRadius,
    flexShrink:  0,
    overflow:    'hidden',
    position:    'relative',
    display:     'flex',
    alignItems:  'center',
    justifyContent: 'center',
    boxShadow,
    border: `1px solid ${color}44`,
    ...style,
  };

  if (!failed) {
    return (
      <div className={className} style={wrapStyle}>
        {/* Subtle color bg so transparent logos look right */}
        <div style={{ position: 'absolute', inset: 0, background: `${color}18` }} />
        <img
          src={`/assets/logos/${slug}-logo.png`}
          alt={`${name} logo`}
          style={{ width: '100%', height: '100%', objectFit: 'contain', padding: Math.max(3, size * 0.07), position: 'relative', zIndex: 1 }}
          loading="lazy"
          onError={() => setFailed(true)}
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
        color: '#fff',
        fontSize,
        letterSpacing: '-0.02em',
      }}
    >
      {abbr}
    </div>
  );
}
