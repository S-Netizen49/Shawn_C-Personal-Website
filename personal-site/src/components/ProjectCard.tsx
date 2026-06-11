'use client'
import Link from 'next/link'
import type { Project } from '@/lib/types'

export default function ProjectCard({ project }: { project: Project }) {
  return (
    <Link
      href={`/projects/${project.slug}`}
      className="group relative border border-border rounded-lg p-5 overflow-hidden transition-colors hover:border-border-hover block"
    >
      <div className="text-[22px] font-mono mb-3 leading-none">{project.glyph}</div>
      <div className="font-mono text-[13px] text-text-primary font-medium mb-1.5">{project.name}</div>
      <div className="font-mono text-[11px] text-text-muted leading-relaxed mb-3.5">{project.description}</div>
      <div className="flex gap-1.5 flex-wrap">
        {project.stack.map(s => (
          <span key={s} className="font-mono text-[9px] px-2 py-0.5 rounded border border-border bg-bg-surface text-text-dim tracking-widest uppercase">
            {s}
          </span>
        ))}
      </div>
      {/* accent bar */}
      <div
        className="absolute bottom-0 left-0 h-[2px] w-0 group-hover:w-full transition-all duration-500 ease-out"
        style={{ background: project.accent_color }}
      />
    </Link>
  )
}
