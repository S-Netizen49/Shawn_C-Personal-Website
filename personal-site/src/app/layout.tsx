import type { Metadata } from 'next'
import '@/styles/globals.css'
import Nav from '@/components/Nav'

export const metadata: Metadata = {
  title: { default: 'Your Name', template: '%s — Your Name' },
  description: 'Building things, writing about them. Software engineer based in Montréal.',
  openGraph: {
    type: 'website',
    locale: 'en_CA',
    url: process.env.NEXT_PUBLIC_SITE_URL,
    siteName: 'Your Name',
  },
  twitter: { card: 'summary_large_image', creator: '@yourhandle' },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="bg-bg text-text-primary antialiased">
        <Nav />
        <main>{children}</main>
      </body>
    </html>
  )
}
