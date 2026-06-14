'use client'
import { useState } from 'react'

const ITEMS = [
  { label: 'Photos',  href: '/personal/photos',            color: '#f59e0b', glyph: '◫', desc: 'Nature, travel, city' },
  { label: 'Sports',  href: '/personal/posts?tag=sports',  color: '#4ade80', glyph: '◉', desc: 'Tennis & badminton' },
  { label: 'Home',    href: '/personal/posts?tag=home',    color: '#a78bfa', glyph: '⌂', desc: 'Renovations' },
  { label: 'Life',    href: '/personal/posts?tag=life',    color: '#60a5fa', glyph: '◌', desc: 'Everything else' },
]

function PersonalCard({ label, href, color, glyph, desc }: typeof ITEMS[0]) {
  const [hovered, setHovered] = useState(false)
  return (
    <a
      href={href}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        display: 'block', textDecoration: 'none',
        border: `1px solid ${hovered ? color + '55' : 'rgba(255,255,255,0.07)'}`,
        borderRadius: '8px', padding: '16px',
        background: hovered ? `${color}08` : 'transparent',
        transition: 'border-color 0.2s, background 0.2s',
      }}
    >
      <div style={{ fontSize: '20px', color: hovered ? color : '#555', marginBottom: '8px', transition: 'color 0.2s' }}>{glyph}</div>
      <p style={{ fontFamily: 'monospace', fontSize: '12px', color: hovered ? '#fff' : '#ccc', margin: '0 0 4px 0', fontWeight: 600, transition: 'color 0.2s' }}>{label}</p>
      <p style={{ fontFamily: 'monospace', fontSize: '10px', color: '#555', margin: 0, lineHeight: 1.5 }}>{desc}</p>
    </a>
  )
}

export default function PersonalTeaser() {
  return (
    <>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
        <p style={{ fontFamily: 'monospace', fontSize: '9px', color: '#666', letterSpacing: '0.22em', textTransform: 'uppercase', margin: 0 }}>personal</p>
        <a href="/personal" style={{ fontFamily: 'monospace', fontSize: '10px', color: '#555', textDecoration: 'none', letterSpacing: '0.1em' }}>explore →</a>
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr 1fr', gap: '10px' }}>
        {ITEMS.map(item => <PersonalCard key={item.label} {...item} />)}
      </div>
    </>
  )
}