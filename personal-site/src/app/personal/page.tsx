'use client'
import Link from 'next/link'
import { useState } from 'react'

const CATEGORIES = [
  { slug: 'photos', label: 'Photos',    href: '/personal/photos',           desc: 'Nature, travel, city, moments.',   count: 0  },
  { slug: 'sports', label: 'Sports',    href: '/personal/posts?tag=sports',  desc: 'Tennis, badminton, whatever\'s on.', count: 0  },
  { slug: 'home',   label: 'Home',      href: '/personal/posts?tag=home',    desc: 'Renovations and build projects.',   count: 0  },
  { slug: 'life',   label: 'Life',      href: '/personal/posts?tag=life',    desc: 'Everything else.',                 count: 0  },
]

function Card({ label, href, desc, count }: typeof CATEGORIES[0]) {
  const [hovered, setHovered] = useState(false)
  return (
    <Link href={href} onMouseEnter={() => setHovered(true)} onMouseLeave={() => setHovered(false)} style={{ textDecoration: 'none', display: 'block' }}>
      <div style={{
        borderBottom: '1px solid #e5e5e5',
        padding: '28px 0',
        display: 'flex', justifyContent: 'space-between', alignItems: 'center',
        transition: 'padding-left 0.2s',
        paddingLeft: hovered ? '12px' : '0',
      }}>
        <div>
          <p style={{ fontFamily: 'Georgia, serif', fontSize: '22px', color: '#111', margin: '0 0 6px 0', fontStyle: 'italic', fontWeight: 400, letterSpacing: '-0.01em' }}>{label}</p>
          <p style={{ fontFamily: 'monospace', fontSize: '11px', color: '#999', margin: 0, letterSpacing: '0.04em' }}>{desc}</p>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
          <span style={{ fontFamily: 'monospace', fontSize: '11px', color: '#bbb' }}>{count} posts</span>
          <span style={{ fontSize: '18px', color: hovered ? '#111' : '#ccc', transition: 'color 0.2s' }}>→</span>
        </div>
      </div>
    </Link>
  )
}

export default function PersonalPage() {
  return (
    <div style={{ minHeight: '100vh', background: '#fafaf8', color: '#111' }}>
      {/* light nav override */}
      <div style={{ position: 'fixed', top: 0, left: 0, right: 0, zIndex: 100, background: '#fafaf8', borderBottom: '1px solid #e5e5e5', padding: '18px 48px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <Link href="/" style={{ fontFamily: 'monospace', fontSize: '12px', color: '#999', textDecoration: 'none', letterSpacing: '0.1em' }}>← back</Link>
        <span style={{ fontFamily: 'Georgia, serif', fontSize: '16px', color: '#111', fontStyle: 'italic' }}>Shawn Cui</span>
        <Link href="/personal/posts" style={{ fontFamily: 'monospace', fontSize: '11px', color: '#999', textDecoration: 'none', letterSpacing: '0.08em' }}>posts</Link>
      </div>

      <div style={{ padding: '120px 48px 80px', maxWidth: '720px', margin: '0 auto' }}>
        {/* header */}
        <div style={{ marginBottom: '64px' }}>
          <p style={{ fontFamily: 'monospace', fontSize: '10px', color: '#bbb', letterSpacing: '0.18em', textTransform: 'uppercase', margin: '0 0 20px 0' }}>
            outside the code
          </p>
          <h1 style={{ fontFamily: 'Georgia, serif', fontSize: '52px', fontWeight: 400, color: '#111', margin: '0 0 20px 0', lineHeight: 1.15, fontStyle: 'italic', letterSpacing: '-0.02em' }}>
            Personal
          </h1>
          <p style={{ fontFamily: 'monospace', fontSize: '13px', color: '#888', lineHeight: 1.85, margin: 0, maxWidth: '440px' }}>
            This is the non-CV part. Sports, house projects, photos, life.
            No audience in mind — just writing things down.
          </p>
        </div>

        {/* category list */}
        <div style={{ borderTop: '1px solid #e5e5e5' }}>
          {CATEGORIES.map(c => <Card key={c.slug} {...c} />)}
        </div>

        {/* footer note */}
        <p style={{ fontFamily: 'monospace', fontSize: '10px', color: '#ccc', marginTop: '48px', lineHeight: 1.7 }}>
          Updated whenever something happens worth writing about.
        </p>
      </div>
    </div>
  )
}