import { notFound } from 'next/navigation'
import type { Metadata } from 'next'
import { MDXRemote } from 'next-mdx-remote/rsc'
import { getPost, getPosts } from '@/lib/data'
import { mdxComponents } from '@/components/MDXComponents'
import remarkGfm from 'remark-gfm'
import rehypeSlug from 'rehype-slug'
import rehypeHighlight from 'rehype-highlight'

export async function generateStaticParams() {
  const posts = await getPosts()
  return posts.map(p => ({ slug: p.slug }))
}

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const post = await getPost(params.slug)
  if (!post) return {}
  return { title: post.title, description: post.excerpt }
}

export default async function PostPage({ params }: { params: { slug: string } }) {
  const post = await getPost(params.slug)
  if (!post) notFound()

  const published = new Date(post.published_at).toLocaleDateString('en-CA', {
    year: 'numeric', month: 'long', day: 'numeric',
  })

  return (
    <article className="px-7 py-12 max-w-2xl">
      {/* header */}
      <div className="mb-10">
        <div className="flex gap-2 mb-4 flex-wrap">
          {post.tags.map(tag => (
            <span key={tag} className="font-mono text-[9px] px-2 py-0.5 rounded border border-border bg-bg-surface text-text-muted tracking-widest uppercase">
              {tag}
            </span>
          ))}
        </div>
        <h1 className="font-sans text-4xl font-medium text-text-primary tracking-tight leading-snug mb-4">
          {post.title}
        </h1>
        <p className="font-mono text-sm text-text-muted mb-4">{post.excerpt}</p>
        <div className="flex items-center gap-4 font-mono text-[10px] text-text-dim">
          <span>{published}</span>
          <span>·</span>
          <span>{post.reading_time} min read</span>
        </div>
      </div>

      <hr className="border-border mb-10" />

      {/* body */}
      <div className="prose prose-invert max-w-none">
        <MDXRemote
          source={post.content}
          components={mdxComponents as any}
          options={{
            mdxOptions: {
              remarkPlugins: [remarkGfm],
              rehypePlugins: [rehypeSlug, rehypeHighlight],
            },
          }}
        />
      </div>
    </article>
  )
}
