import '@/styles/globals.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import ScrollProgress from '@/components/ScrollProgress'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Wesley Dalton | Software Engineer',
  description: 'UPenn CS & History student with experience in AI, software engineering, and product development.',
  keywords: 'Wesley Dalton, Software Engineer, AI, Machine Learning, UPenn, Portfolio',
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
    title: 'Wesley Dalton | Software Engineer',
    description: 'UPenn CS & History student with experience in AI, software engineering, and product development.',
    url: 'https://wesleydalton.com',
    siteName: 'Wesley Dalton Portfolio',
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
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className={`${inter.className} antialiased overflow-x-hidden`}>
        <ScrollProgress />
        {children}
      </body>
    </html>
  )
}