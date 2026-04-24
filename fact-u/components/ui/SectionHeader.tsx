interface Props {
  badge?: string;
  title: string;
  titleGrad?: string;
  subtitle?: string;
  center?: boolean;
}

export default function SectionHeader({ badge, title, titleGrad, subtitle, center = true }: Props) {
  return (
    <div className={`mb-12 ${center ? 'text-center' : ''}`}>
      {badge && (
        <div className={`inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-sm font-medium mb-4 ${center ? 'mx-auto' : ''}`}
          style={{ background: 'rgba(59,130,246,0.1)', border: '1px solid rgba(59,130,246,0.3)', color: '#93c5fd' }}>
          <span className="w-1.5 h-1.5 rounded-full bg-blue-400 animate-pulse" />
          {badge}
        </div>
      )}
      <h2 className="font-syne font-800 text-3xl md:text-4xl lg:text-5xl tracking-tight mb-4">
        {title}{titleGrad && <span className="grad-text"> {titleGrad}</span>}
      </h2>
      {subtitle && <p className="text-white/50 text-lg max-w-2xl" style={center ? { margin: '0 auto' } : {}}>{subtitle}</p>}
    </div>
  );
}
