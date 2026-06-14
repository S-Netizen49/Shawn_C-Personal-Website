'use client'
import { useState } from 'react'

type Props = {
  name: string
  desc: string
  stack: string[]
  glyph: string
  color: string
  href: string
}

export default function StaticProjectCard({ name, desc, stack, glyph, color, href }: Props) {
  const [hovered, setHovered] = useState(false)
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        display: 'block', textDecoration: 'none', position: 'relative',
        border: `1px solid ${hovered ? color + '55' : 'rgba(255,255,255,0.1)'}`,
        borderRadius: '8px', padding: '20px', overflow: 'hidden',
        background: hovered ? `${color}08` : 'transparent',
        transition: 'border-color 0.2s, background 0.2s',
      }}
    >
      <div style={{ fontSize: '22px', marginBottom: '12px', display: 'inline-block',
        color: hovered ? color : '#888',
        transform: hovered ? 'scale(1.15) rotate(-6deg)' : 'scale(1)',
        transition: 'transform 0.25s, color 0.2s',
      }}>
        {glyph}
      </div>
      <div style={{ fontFamily: 'monospace', fontSize: '14px', color: hovered ? '#fff' : '#ccc', fontWeight: 500, marginBottom: '6px', transition: 'color 0.2s' }}>
        {name}
      </div>
      <div style={{ fontFamily: 'monospace', fontSize: '12px', color: '#888', lineHeight: 1.6, marginBottom: '14px' }}>
        {desc}
      </div>
      <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap' }}>
        {stack.map(s => (
          <span key={s} style={{
            fontFamily: 'monospace', fontSize: '9px', padding: '2px 8px',
            border: `1px solid ${hovered ? color + '44' : 'rgba(255,255,255,0.1)'}`,
            borderRadius: '3px', color: hovered ? color : '#777',
            letterSpacing: '0.1em', textTransform: 'uppercase',
            transition: 'color 0.2s, border-color 0.2s',
          }}>{s}</span>
        ))}
      </div>
      <div style={{
        position: 'absolute', bottom: 0, left: 0, height: '2px',
        background: color, width: hovered ? '100%' : '0%',
        transition: 'width 0.4s ease',
      }} />
      <span style={{
        position: 'absolute', top: '16px', right: '16px',
        fontFamily: 'monospace', fontSize: '14px',
        color: hovered ? color : '#444',
        transition: 'color 0.2s',
      }}>↗</span>
    </a>
  )
}