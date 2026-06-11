import type { Metadata } from 'next'
import PostRow from '@/components/PostRow'
import { getPosts } from '@/lib/data'

export const metadata: Metadata = { title: 'Writing' }

const TYPES = ['all', 'essay', 'tutorial', 'deep-dive', 'photos', 'case-study']

export default async function BlogPage({
  searchParams,
}: {
  searchParams: { type?: string }
}) {
  const posts = await getPosts()
  const active = searchParams.type ?? 'all'
  const filtered = active === 'all' ? posts : posts.filter(p => p.type === active)

  return (
    <div className="px-7 py-10">
      <h1 className="font-sans text-4xl font-medium text-text-primary tracking-tight mb-2">Writing</h1>
      <p className="font-mono text-sm text-text-muted mb-8">
        Essays, tutorials, deep dives, and the occasional photo walk.
      </p>

      {/* filter tabs */}
      <div className="flex gap-2 mb-8 flex-wrap">
        {TYPES.map(t => (
          <a
            key={t}
            href={t === 'all' ? '/blog' : `/blog?type=${t}`}
            className={`font-mono text-[10px] px-3 py-1.5 rounded border tracking-widest uppercase transition-colors ${
              active === t
                ? 'border-border-hover text-text-secondary bg-bg-surface'
                : 'border-border text-text-dim hover:border-border-hover hover:text-text-muted'
            }`}
          >
            {t}
          </a>
        ))}
      </div>

      <div>
        {filtered.length === 0 ? (
          <p className="font-mono text-xs text-text-dim py-8">Nothing here yet.</p>
        ) : (
          filtered.map(p => <PostRow key={p.id} post={p} />)
        )}
      </div>
    </div>
  )
}
