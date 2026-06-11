import { Suspense } from 'react'
import ParticleCanvas from '@/components/ParticleCanvas'
import HeroName from '@/components/HeroName'
import Ticker from '@/components/Ticker'
import PostRow from '@/components/PostRow'
import ProjectCard from '@/components/ProjectCard'
import { getPosts, getProjects } from '@/lib/data'

// ─── Edit these to make it yours ───────────────────────────────────────────
const YOUR_NAME   = 'Your Name'
const YOUR_CITY   = 'Montréal'
const NOW = {
  status:   { label: 'status',   value: 'available for work', live: true },
  building: { label: 'building', value: 'this site + a new open source tool' },
  reading:  { label: 'reading',  value: 'Structure & Interpretation of Computer Programs' },
}
// ───────────────────────────────────────────────────────────────────────────

const SEC = 'font-mono text-[9px] text-text-dim tracking-[0.2em] uppercase mb-5'

export default async function Home() {
  const [posts, projects] = await Promise.all([
    getPosts(5),
    getProjects(true),
  ])

  return (
    <>
      {/* ── Hero ─────────────────────────────────────────────── */}
      <section className="relative min-h-[480px] flex flex-col justify-end px-7 pb-10 pt-14 overflow-hidden">
        <ParticleCanvas />
        <div className="relative z-10">
          <p className="font-mono text-[10px] text-text-muted tracking-[0.2em] uppercase mb-5">
            software engineer &amp; writer
          </p>
          <HeroName name={YOUR_NAME} />
          <p className="font-mono text-sm text-text-muted leading-7 max-w-sm mt-4">
            Building things,{' '}
            <span className="text-text-secondary">writing about them</span>, breaking them,<br />
            writing about that too. Based in{' '}
            <span className="text-text-secondary">{YOUR_CITY}</span>.
          </p>
        </div>
      </section>

      <Ticker />

      {/* ── Writing ──────────────────────────────────────────── */}
      <section className="px-7 py-9 border-b border-border">
        <p className={SEC}>recent writing</p>
        <Suspense fallback={<div className="font-mono text-xs text-text-dim">loading...</div>}>
          {posts.length === 0 ? (
            <p className="font-mono text-xs text-text-dim">No posts yet — add them in Supabase or create MDX files.</p>
          ) : (
            posts.map(p => <PostRow key={p.id} post={p} />)
          )}
        </Suspense>
      </section>

      {/* ── Projects ─────────────────────────────────────────── */}
      <section className="px-7 py-9 border-b border-border">
        <p className={SEC}>selected projects</p>
        <div className="grid grid-cols-2 gap-2.5">
          {projects.map(p => <ProjectCard key={p.id} project={p} />)}
        </div>
      </section>

      {/* ── Now ──────────────────────────────────────────────── */}
      <section className="px-7 py-9">
        <p className={SEC}>now</p>
        <div className="grid grid-cols-3 gap-2.5">
          {Object.values(NOW).map((card) => (
            <div key={card.label} className="border border-border rounded-lg p-4">
              <p className="font-mono text-[9px] text-text-dim tracking-[0.15em] uppercase mb-2">{card.label}</p>
              <p className="font-mono text-xs text-text-secondary leading-relaxed">
                {'live' in card && card.live && (
                  <span className="inline-block w-1.5 h-1.5 rounded-full bg-accent-green mr-1.5 align-middle animate-pulse" />
                )}
                {card.value}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* ── Footer ───────────────────────────────────────────── */}
      <footer className="px-7 py-5 border-t border-border flex justify-between items-center">
        <span className="font-mono text-[10px] text-text-dim">© {new Date().getFullYear()}</span>
        <div className="flex gap-4">
          {['github', 'twitter', 'rss', 'email'].map(l => (
            <a key={l} href="#" className="font-mono text-[10px] text-text-dim hover:text-text-secondary transition-colors tracking-wide">
              {l}
            </a>
          ))}
        </div>
      </footer>
    </>
  )
}
