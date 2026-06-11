import { notFound } from 'next/navigation'
import type { Metadata } from 'next'
import { MDXRemote } from 'next-mdx-remote/rsc'
import { getProject, getProjects } from '@/lib/data'
import { mdxComponents } from '@/components/MDXComponents'
import remarkGfm from 'remark-gfm'

export async function generateStaticParams() {
  const projects = await getProjects()
  return projects.map(p => ({ slug: p.slug }))
}

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const project = await getProject(params.slug)
  if (!project) return {}
  return { title: project.name, description: project.description }
}

export default async function ProjectPage({ params }: { params: { slug: string } }) {
  const project = await getProject(params.slug)
  if (!project) notFound()

  return (
    <article className="px-7 py-12 max-w-2xl">
      <div className="mb-10">
        <div className="text-3xl font-mono mb-4">{project.glyph}</div>
        <h1 className="font-sans text-4xl font-medium text-text-primary tracking-tight mb-3">
          {project.name}
        </h1>
        <p className="font-mono text-sm text-text-muted mb-5">{project.description}</p>
        <div className="flex gap-2 flex-wrap mb-5">
          {project.stack.map(s => (
            <span key={s} className="font-mono text-[9px] px-2.5 py-1 rounded border border-border bg-bg-surface text-text-dim tracking-widest uppercase">
              {s}
            </span>
          ))}
        </div>
        <div className="flex gap-3">
          {project.url && (
            <a href={project.url} target="_blank" rel="noopener" className="font-mono text-[11px] text-text-secondary border border-border px-3 py-1.5 rounded hover:border-border-hover transition-colors">
              visit ↗
            </a>
          )}
          {project.github_url && (
            <a href={project.github_url} target="_blank" rel="noopener" className="font-mono text-[11px] text-text-muted border border-border px-3 py-1.5 rounded hover:border-border-hover transition-colors">
              github ↗
            </a>
          )}
        </div>
      </div>

      <hr className="border-border mb-10" />

      <div className="prose prose-invert max-w-none">
        <MDXRemote
          source={project.long_description}
          components={mdxComponents as any}
          options={{ mdxOptions: { remarkPlugins: [remarkGfm] } }}
        />
      </div>
    </article>
  )
}
