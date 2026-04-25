interface Props {
  badge?: string; title: string; titleGrad?: string;
  subtitle?: string; center?: boolean; badgeColor?: string;
}
export default function SectionHeader({ badge, title, titleGrad, subtitle, center = true, badgeColor = '#4f8ef7' }: Props) {
  return (
    <div className={`mb-16 ${center ? 'text-center' : ''}`}>
      {badge && (
        <div className={`inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-syne font-600 tracking-widest uppercase mb-5 ${center ? 'mx-auto' : ''}`}
          style={{ background: `${badgeColor}18`, border: `1px solid ${badgeColor}35`, color: badgeColor }}>
          <span className="w-1.5 h-1.5 rounded-full dot-pulse" style={{ background: badgeColor }} />
          {badge}
        </div>
      )}
      <h2 className="font-syne font-800 tracking-tight mb-4 leading-[1.0]"
        style={{ fontSize: 'clamp(2rem,4.5vw,3.5rem)' }}>
        {title}{titleGrad && <span className="grad"> {titleGrad}</span>}
      </h2>
      {subtitle && (
        <p className="text-white/40 text-lg max-w-2xl leading-relaxed"
          style={center ? { margin: '0 auto' } : {}}>
          {subtitle}
        </p>
      )}
    </div>
  );
}
