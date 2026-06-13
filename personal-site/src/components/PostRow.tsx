import Link from 'next/link'
import type { Post } from '@/lib/types'

const TAG_COLORS: Record<string, string> = {
  'deep-dive':  '#60a5fa',
  'tutorial':   '#4ade80',
  'essay':      '#aaa',
  'photos':     '#f59e0b',
  'case-study': '#a78bfa',
}

export default function PostRow({ post }: { post: Post }) {
  const tagColor = TAG_COLORS[post.type] ?? '#aaa'
  return (
    <Link
      href={`/blog/${post.slug}`}
      className="post-row"
      style={{
        display: 'grid', gridTemplateColumns: '1fr auto', alignItems: 'start',
        gap: '16px', padding: '14px 0', borderBottom: '1px solid rgba(255,255,255,0.06)',
        textDecoration: 'none', transition: 'background 0.15s',
      }}
    >
      <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
        <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap' }}>
          {post.tags.slice(0, 2).map(tag => (
            <span key={tag} style={{
              fontFamily: 'monospace', fontSize: '9px', padding: '2px 8px',
              border: `1px solid ${tagColor}33`, borderRadius: '3px',
              color: tagColor, background: `${tagColor}0d`,
              letterSpacing: '0.1em', textTransform: 'uppercase',
            }}>
              {tag}
            </span>
          ))}
        </div>
        <span style={{ fontFamily: 'monospace', fontSize: '14px', color: '#ccc', lineHeight: 1.4 }}>
          {post.title}
        </span>
        <span style={{ fontFamily: 'monospace', fontSize: '10px', color: '#555', letterSpacing: '0.08em' }}>
          {new Date(post.published_at).getFullYear()} — {post.reading_time} min
        </span>
      </div>
      <span style={{ fontFamily: 'monospace', fontSize: '14px', color: '#555', marginTop: '2px' }}>↗</span>
    </Link>
  )
}