import type { Metadata } from 'next';
import './globals.css';
import Navbar from '@/components/ui/Navbar';

export const metadata: Metadata = {
  title: 'UAAP Universe — Find Your University',
  description: 'Explore, compare, and discover UAAP universities. Your ultimate guide to finding the right school in the Philippines.',
  openGraph: {
    title: 'UAAP Universe',
    description: 'The ultimate UAAP university discovery platform.',
    type: 'website',
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <Navbar />
        {children}
      </body>
    </html>
  );
}
