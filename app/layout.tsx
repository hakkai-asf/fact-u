import type { Metadata } from 'next';
import './globals.css';
import Navbar from '@/components/ui/Navbar';
import Cursor from '@/components/ui/Cursor';

export const metadata: Metadata = {
  title: 'FACT-U — UAAP University Explorer',
  description: 'Find the university that fits you. Explore all 8 UAAP member schools — academics, sports, culture, and admissions in one immersive platform.',
  openGraph: {
    title: 'FACT-U — UAAP Universe',
    description: 'The ultimate UAAP university discovery platform.',
    type: 'website',
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <Cursor />
        <Navbar />
        {children}
      </body>
    </html>
  );
}
