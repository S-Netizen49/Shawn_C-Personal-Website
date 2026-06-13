'use client'
import Link from 'next/link'
import { useState } from 'react'
import type { Project } from '@/lib/types'

export default function ProjectCard({ project }: { project: Project }) {
  const [hovered, setHovered] = useState(false)

  return (
    <Link
      href={`/projects/${project.slug}`}
      data-cursor="project"
      className="group relative border border-border rounded-lg p-5 overflow-hidden transition-all duration-300 block"
      style={{
        background: hovered ? `color-mix(in srgb, ${project.accent_color} 4%, #080808)` : '#080808',
        borderColor: hovered ? `color-mix(in srgb, ${project.accent_color} 30%, #1a1a1a)` : '#1a1a1a',
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {/* glyph */}
      <div
        className="text-[22px] font-mono mb-3 leading-none transition-all duration-300"
        style={{
          transform: hovered ? 'scale(1.2) rotate(-8deg)' : 'scale(1) rotate(0deg)',
          color: hovered ? project.accent_color : '#555',
        }}
      >
        {project.glyph}
      </div>

      {/* name */}
      <div
        className="font-mono text-[13px] font-medium mb-1.5 transition-colors duration-200"
        style={{ color: hovered ? '#fff' : '#d4d4d4' }}
      >
        {project.name}
      </div>

      {/* desc */}
      <div className="font-mono text-[11px] text-text-muted leading-relaxed mb-3.5 transition-colors duration-200 group-hover:text-[#666]">
        {project.description}
      </div>

      {/* stack chips */}
      <div className="flex gap-1.5 flex-wrap">
        {project.stack.map(s => (
          <span
            key={s}
            className="font-mono text-[9px] px-2 py-0.5 rounded border tracking-widest uppercase transition-all duration-200"
            style={{
              borderColor: hovered ? `color-mix(in srgb, ${project.accent_color} 25%, #1a1a1a)` : '#1a1a1a',
              color: hovered ? `color-mix(in srgb, ${project.accent_color} 70%, #888)` : '#2d2d2d',
              background: hovered ? `color-mix(in srgb, ${project.accent_color} 8%, transparent)` : 'transparent',
            }}
          >
            {s}
          </span>
        ))}
      </div>

      {/* arrow */}
      <div
        className="absolute top-4 right-4 font-mono text-sm transition-all duration-200"
        style={{
          color: hovered ? project.accent_color : '#2a2a2a',
          transform: hovered ? 'translate(2px, -2px)' : 'translate(0,0)',
        }}
      >
        ↗
      </div>

      {/* bottom accent bar */}
      <div
        className="absolute bottom-0 left-0 h-[2px] transition-all duration-500 ease-out"
        style={{
          width: hovered ? '100%' : '0%',
          background: project.accent_color,
        }}
      />

      {/* subtle corner glow */}
      <div
        className="absolute bottom-0 right-0 w-24 h-24 rounded-full transition-opacity duration-300 pointer-events-none"
        style={{
          background: `radial-gradient(circle, ${project.accent_color}15 0%, transparent 70%)`,
          opacity: hovered ? 1 : 0,
        }}
      />
    </Link>
  )
}