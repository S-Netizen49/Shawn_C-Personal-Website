import type { Metadata } from 'next'
import ProjectCard from '@/components/ProjectCard'
import { getProjects } from '@/lib/data'

export const metadata: Metadata = { title: 'Projects' }

export default async function ProjectsPage() {
  const projects = await getProjects()

  return (
    <div className="px-7 py-10">
      <h1 className="font-sans text-4xl font-medium text-text-primary tracking-tight mb-2">Projects</h1>
      <p className="font-mono text-sm text-text-muted mb-8">
        Things I've built, shipped, and learned from.
      </p>
      <div className="grid grid-cols-2 gap-2.5">
        {projects.map(p => <ProjectCard key={p.id} project={p} />)}
      </div>
    </div>
  )
}
