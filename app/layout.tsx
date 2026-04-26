import type { Metadata } from 'next';
import './globals.css';
import Navbar from '@/components/ui/Navbar';
import Cursor from '@/components/ui/Cursor';

export const metadata: Metadata = {
  title: 'FACT-U — UAAP University Explorer',
  description: 'Find the university that fits you. Explore all 8 UAAP member schools — academics, sports, culture, and admissions in one immersive platform.',
  icons: {
    icon: [
      { url: '/assets/fact-u-logo.png', type: 'image/png' },
    ],
    apple: '/assets/fact-u-logo.png',
    shortcut: '/assets/fact-u-logo.png',
  },
  openGraph: {
    title: 'FACT-U — UAAP Universe',
    description: 'The ultimate UAAP university discovery platform.',
    type: 'website',
    images: [{ url: '/assets/fact-u-logo.png' }],
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
