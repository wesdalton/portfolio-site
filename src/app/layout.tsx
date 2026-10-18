import '@/styles/globals.css';
import type { Metadata } from 'next';
import { Analytics } from '@vercel/analytics/next';
import StructuredData from '@/components/StructuredData';

const description =
  'Wesley Dalton is a software engineer studying Computer Science and History at Penn. Selected work in AI evaluation, autonomous systems, and product engineering.';

export const metadata: Metadata = {
  metadataBase: new URL('https://wesleydalton.com'),
  title: 'Wesley Dalton — Software Engineer',
  description,
  authors: [{ name: 'Wesley Dalton' }],
  icons: {
    icon: [{ url: '/favicon.svg' }],
    apple: [{ url: '/apple-touch-icon.svg' }],
  },
  openGraph: {
    title: 'Wesley Dalton — Software Engineer',
    description,
    url: 'https://wesleydalton.com',
    siteName: 'Wesley Dalton',
    images: [{ url: '/images/headshot.jpeg', alt: 'Wesley Dalton' }],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary',
    title: 'Wesley Dalton — Software Engineer',
    description,
    images: ['/images/headshot.jpeg'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  verification: {
    google: 'T_R994_GjgkMq_AYLDu9vzV5HKoC1Q6jf9dv1taSPUg',
  },
  alternates: { canonical: 'https://wesleydalton.com' },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head><StructuredData /></head>
      <body>
        {children}
        <Analytics />
      </body>
    </html>
  );
}
