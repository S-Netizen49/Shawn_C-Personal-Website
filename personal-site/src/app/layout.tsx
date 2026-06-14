import type { Metadata } from 'next'
import '@/styles/globals.css'
import Nav from '@/components/Nav'
import Cursor from '@/components/Cursor'

export const metadata: Metadata = {
  title: { default: 'Shawn Cui', template: '%s — Shawn Cui' },
  description: 'Full-stack software engineer based in Montréal. Previously at Genetec and Consoltec.',
  openGraph: { type: 'website', locale: 'en_CA', siteName: 'Shawn Cui' },
  twitter: { card: 'summary_large_image', creator: '@shawncui' },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body style={{ background: '#03030a', color: '#d4d4d4', cursor: 'none', margin: 0, minHeight: '100vh', WebkitFontSmoothing: 'antialiased' } as React.CSSProperties}>
        <Cursor />
        <Nav />
        <main>{children}</main>
      </body>
    </html>
  )
}