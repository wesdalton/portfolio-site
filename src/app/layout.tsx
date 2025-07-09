import '@/styles/globals.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import ScrollProgress from '@/components/ScrollProgress'
import StructuredData from '@/components/StructuredData'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Wesley Dalton | Software Engineer & AI Developer at University of Pennsylvania',
  description: 'Wesley Dalton is a Computer Science student at UPenn pursuing an accelerated M.S.E. in Computer & Information Science. Currently Full Stack & ML Engineering Intern at TRAK with experience in AI, machine learning, and software engineering.',
  keywords: 'Wesley Dalton, Software Engineer, AI Developer, Machine Learning Engineer, University of Pennsylvania, UPenn, TRAK, Full Stack Developer, Computer Science, Portfolio, React, Python, Next.js',
  authors: [{ name: 'Wesley Dalton' }],
  icons: {
    icon: [
      { url: '/favicon.svg' },
    ],
    apple: [
      { url: '/apple-touch-icon.svg' },
    ],
  },
  openGraph: {
    title: 'Wesley Dalton | Software Engineer & AI Developer at University of Pennsylvania',
    description: 'Wesley Dalton is a Computer Science student at UPenn pursuing an accelerated M.S.E. in Computer & Information Science. Currently Full Stack & ML Engineering Intern at TRAK with experience in AI, machine learning, and software engineering.',
    url: 'https://wesleydalton.com',
    siteName: 'Wesley Dalton - Software Engineer Portfolio',
    images: [
      {
        url: '/images/headshot.jpeg',
        width: 1200,
        height: 630,
        alt: 'Wesley Dalton Portfolio',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Wesley Dalton | Software Engineer & AI Developer at University of Pennsylvania',
    description: 'Wesley Dalton is a Computer Science student at UPenn pursuing an accelerated M.S.E. in Computer & Information Science. Currently Full Stack & ML Engineering Intern at TRAK.',
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
  alternates: {
    canonical: 'https://wesleydalton.com',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className="scroll-smooth">
      <head>
        <StructuredData />
      </head>
      <body className={`${inter.className} antialiased overflow-x-hidden`}>
        <ScrollProgress />
        {children}
        <Analytics />
      </body>
    </html>
  )
}