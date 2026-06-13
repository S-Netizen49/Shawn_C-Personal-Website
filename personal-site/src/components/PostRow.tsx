import Link from 'next/link'
import type { Post } from '@/lib/types'

const TAG_STYLES: Record<string, string> = {
  'deep-dive':  'text-accent-blue  border-accent-blue/25  bg-accent-blue/5',
  'tutorial':   'text-accent-green border-accent-green/25 bg-accent-green/5',
  'essay':      'text-text-muted   border-border          bg-bg-surface',
  'photos':     'text-accent-amber border-accent-amber/25 bg-accent-amber/5',
  'case-study': 'text-accent-purple border-accent-purple/25 bg-accent-purple/5',
}

const HOVER_COLORS: Record<string, string> = {
  'deep-dive':  'group-hover:text-accent-blue',
  'tutorial':   'group-hover:text-accent-green',
  'essay':      'group-hover:text-white',
  'photos':     'group-hover:text-accent-amber',
  'case-study': 'group-hover:text-accent-purple',
}

export default function PostRow({ post }: { post: Post }) {
  const hoverColor = HOVER_COLORS[post.type] ?? 'group-hover:text-white'
  return (
    <Link
      href={`/blog/${post.slug}`}
      className="post-row group grid grid-cols-[1fr_auto] items-start gap-4 py-4 border-b border-border px-7 -mx-7 transition-colors hover:bg-[#0b0b0b]"
    >
      <div className="flex flex-col gap-1.5 pl-7">
        <div className="flex gap-1.5 flex-wrap">
          {post.tags.slice(0, 2).map(tag => (
            <span
              key={tag}
              className={`font-mono text-[9px] px-2 py-0.5 rounded border tracking-widest uppercase transition-all duration-200 ${TAG_STYLES[post.type] ?? TAG_STYLES.essay}`}
            >
              {tag}
            </span>
          ))}
        </div>
        <span className={`font-mono text-sm text-text-secondary transition-colors duration-200 leading-snug ${hoverColor}`}>
          {post.title}
        </span>
        <span className="font-mono text-[10px] text-text-dim tracking-wide">
          {new Date(post.published_at).getFullYear()} — {post.reading_time} min
        </span>
      </div>
      <span className={`font-mono text-sm text-text-dim transition-all duration-200 mt-0.5 group-hover:translate-x-1 group-hover:-translate-y-1 ${hoverColor}`}>↗</span>
    </Link>
  )
}