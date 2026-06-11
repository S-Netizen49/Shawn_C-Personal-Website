import Link from 'next/link'
import type { Post } from '@/lib/types'

const TAG_COLORS: Record<string, string> = {
  'deep-dive': 'text-accent-blue border-accent-blue/20 bg-accent-blue/5',
  'tutorial':  'text-accent-green border-accent-green/20 bg-accent-green/5',
  'essay':     'text-text-muted border-border bg-bg-surface',
  'photos':    'text-accent-amber border-accent-amber/20 bg-accent-amber/5',
  'case-study':'text-accent-purple border-accent-purple/20 bg-accent-purple/5',
}

export default function PostRow({ post }: { post: Post }) {
  return (
    <Link
      href={`/blog/${post.slug}`}
      className="group grid grid-cols-[1fr_auto] items-start gap-4 py-3.5 border-b border-border hover:bg-bg-hover px-1 transition-colors -mx-1"
    >
      <div className="flex flex-col gap-1.5">
        <div className="flex gap-1.5 flex-wrap">
          {post.tags.slice(0, 2).map(tag => (
            <span key={tag} className={`font-mono text-[9px] px-2 py-0.5 rounded border tracking-widest uppercase ${TAG_COLORS[post.type] ?? TAG_COLORS.essay}`}>
              {tag}
            </span>
          ))}
        </div>
        <span className="font-mono text-sm text-text-secondary group-hover:text-text-primary transition-colors leading-snug">
          {post.title}
        </span>
        <span className="font-mono text-[10px] text-text-dim tracking-wide">
          {new Date(post.published_at).getFullYear()} — {post.reading_time} min
        </span>
      </div>
      <span className="font-mono text-sm text-text-dim group-hover:text-text-secondary group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all mt-0.5">↗</span>
    </Link>
  )
}
