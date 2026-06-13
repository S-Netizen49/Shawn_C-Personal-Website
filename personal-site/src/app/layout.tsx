import type { Metadata } from 'next'
import '@/styles/globals.css'
import Nav from '@/components/Nav'
import Cursor from '@/components/Cursor'

export const metadata: Metadata = {
  title: { default: 'Your Name', template: '%s — Your Name' },
  description: 'Building things, writing about them. Software engineer based in Montréal.',
  openGraph: { type: 'website', locale: 'en_CA', url: process.env.NEXT_PUBLIC_SITE_URL, siteName: 'Your Name' },
  twitter: { card: 'summary_large_image', creator: '@yourhandle' },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body style={{ background: '#080808', color: '#d4d4d4', cursor: 'none', margin: 0 }}>
        <Cursor />
        <Nav />
        <main>{children}</main>
      </body>
    </html>
  )
}