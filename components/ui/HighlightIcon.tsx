import {
  Trophy, GraduationCap, BookOpen, FlaskConical, Bird, Scale,
  Globe, Briefcase, Cog, Building2, Star, BarChart2, Heart,
  Medal, Circle, Zap, Anchor, TreePine, Dumbbell,
  Activity, TrendingUp, Wrench, Landmark, Swords, Lightbulb,
} from 'lucide-react';
import type { LucideProps } from 'lucide-react';
import type { FC } from 'react';

type IconFC = FC<LucideProps>;

const MAP: Record<string, IconFC> = {
  trophy:    Trophy,
  grad:      GraduationCap,
  book:      BookOpen,
  research:  FlaskConical,
  eagle:     Bird,
  law:       Scale,
  globe:     Globe,
  work:      Briefcase,
  gear:      Cog,
  building:  Building2,
  star:      Star,
  chart:     BarChart2,
  health:    Heart,
  medal:     Medal,
  stadium:   Landmark,
  vball:     Activity,
  dental:    Activity,
  tamaraw:   Anchor,
  tiger:     Zap,
  archer:    TrendingUp,
  warrior:   Swords,
  green:     TreePine,
  bball:     Dumbbell,
  bolt:      Zap,
  note:      Lightbulb,
  deadline:  Star,
  checklist: BarChart2,
};

interface Props { icon: string; size?: number; color?: string; className?: string; }

export default function HighlightIcon({ icon, size = 16, color, className }: Props) {
  const Icon: IconFC = MAP[icon] ?? Star;
  return <Icon size={size} color={color} className={className} />;
}
