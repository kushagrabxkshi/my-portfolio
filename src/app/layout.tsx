import type { Metadata, Viewport } from 'next'
import './globals.css'

export const viewport: Viewport = {
  themeColor: '#050505',
}

export const metadata: Metadata = {
  metadataBase: new URL('https://kushagrabakshi.dev'),
  title: 'Kushagra Bakshi — VLSI Engineer & AI Builder',
  description:
    '2nd year Electronics Engineering student specializing in VLSI, building SiliconSpec — an AI auto-verification tool for RTL design.',
  openGraph: {
    title: 'Kushagra Bakshi — VLSI Engineer & AI Builder',
    description:
      '2nd year Electronics Engineering student specializing in VLSI, building SiliconSpec — an AI auto-verification tool for RTL design.',
    images: [{ url: '/og-image.png', width: 1200, height: 630 }],
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Kushagra Bakshi — VLSI Engineer & AI Builder',
    images: ['/og-image.png'],
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className="font-satoshi">
      <body>{children}</body>
    </html>
  )
}
