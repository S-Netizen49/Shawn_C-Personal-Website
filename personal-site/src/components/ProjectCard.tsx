'use client'
import Link from 'next/link'
import { useState } from 'react'
import type { Project } from '@/lib/types'

export default function ProjectCard({ project }: { project: Project }) {
  const [hovered, setHovered] = useState(false)
  const c = project.accent_color

  return (
    <Link
      href={`/projects/${project.slug}`}
      data-cursor="project"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        display: 'block', textDecoration: 'none', position: 'relative',
        border: `1px solid ${hovered ? c + '55' : 'rgba(255,255,255,0.1)'}`,
        borderRadius: '8px', padding: '20px', overflow: 'hidden',
        background: hovered ? `${c}08` : 'transparent',
        transition: 'border-color 0.2s, background 0.2s',
      }}
    >
      <div style={{ fontSize: '22px', fontFamily: 'monospace', marginBottom: '12px', lineHeight: 1,
        color: hovered ? c : '#888',
        transform: hovered ? 'scale(1.15) rotate(-6deg)' : 'scale(1)',
        transition: 'transform 0.25s, color 0.2s', display: 'inline-block',
      }}>
        {project.glyph}
      </div>
      <div style={{ fontFamily: 'monospace', fontSize: '14px', color: hovered ? '#fff' : '#ccc', fontWeight: 500, marginBottom: '6px', transition: 'color 0.2s' }}>
        {project.name}
      </div>
      <div style={{ fontFamily: 'monospace', fontSize: '12px', color: '#888', lineHeight: 1.6, marginBottom: '14px' }}>
        {project.description}
      </div>
      <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap' }}>
        {project.stack.map(s => (
          <span key={s} style={{
            fontFamily: 'monospace', fontSize: '9px', padding: '2px 8px',
            border: `1px solid ${hovered ? c + '44' : 'rgba(255,255,255,0.1)'}`,
            borderRadius: '3px', letterSpacing: '0.1em', textTransform: 'uppercase',
            color: hovered ? c : '#777',
            transition: 'color 0.2s, border-color 0.2s',
          }}>
            {s}
          </span>
        ))}
      </div>
      <span style={{
        position: 'absolute', top: '16px', right: '16px',
        fontFamily: 'monospace', fontSize: '14px',
        color: hovered ? c : '#444',
        transform: hovered ? 'translate(2px,-2px)' : 'none',
        transition: 'color 0.2s, transform 0.2s',
      }}>↗</span>
      <div style={{
        position: 'absolute', bottom: 0, left: 0,
        height: '2px', background: c,
        width: hovered ? '100%' : '0%',
        transition: 'width 0.4s ease',
      }} />
    </Link>
  )
}