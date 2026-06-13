import { Suspense } from 'react'
import ParticleCanvas from '@/components/ParticleCanvas'
import HeroName from '@/components/HeroName'
import Ticker from '@/components/Ticker'
import PostRow from '@/components/PostRow'
import ProjectCard from '@/components/ProjectCard'
import { getPosts, getProjects } from '@/lib/data'

const YOUR_NAME = 'Your Name'
const YOUR_CITY = 'Montréal'
const NOW = [
  { label: 'status',   value: 'available for work', live: true,  color: '#4ade80' },
  { label: 'building', value: 'this site + a new open source tool', live: false, color: '#60a5fa' },
  { label: 'reading',  value: 'Structure & Interpretation of Computer Programs', live: false, color: '#a78bfa' },
]
const SOCIAL = [
  { label: 'github',  href: 'https://github.com/yourhandle' },
  { label: 'twitter', href: 'https://twitter.com/yourhandle' },
  { label: 'rss',     href: '/rss.xml' },
  { label: 'email',   href: 'mailto:you@example.com' },
]

export default async function Home() {
  const [posts, projects] = await Promise.all([getPosts(5), getProjects(true)])

  return (
    <>
      {/* Fixed fullscreen planet background */}
      <ParticleCanvas />

      {/* All content sits above canvas */}
      <div style={{ position: 'relative', zIndex: 1 }}>

        {/* ── Hero ── */}
        <section style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', justifyContent: 'flex-end', padding: '0 28px 56px' }}>
          <div style={{
            background: 'linear-gradient(to top, rgba(3,3,10,0.96) 0%, rgba(3,3,10,0.7) 60%, transparent 100%)',
            position: 'absolute', inset: 0, pointerEvents: 'none',
          }}/>
          <div style={{ position: 'relative' }}>
            <p style={{ fontFamily: 'monospace', fontSize: '10px', color: '#555', letterSpacing: '0.2em', textTransform: 'uppercase', marginBottom: '20px' }}>
              software engineer &amp; writer
            </p>
            <HeroName name={YOUR_NAME} />
            <p style={{ fontFamily: 'monospace', fontSize: '13px', color: '#666', lineHeight: 1.75, maxWidth: '380px', marginTop: '14px' }}>
              Building things, <span style={{ color: '#999' }}>writing about them</span>, breaking them,{' '}
              writing about that too. Based in <span style={{ color: '#4ade80', opacity: 0.8 }}>{YOUR_CITY}</span>.
            </p>
          </div>
        </section>

        {/* ── Content panel ── */}
        <div style={{ background: 'rgba(3,3,10,0.92)', backdropFilter: 'blur(12px)', borderTop: '1px solid rgba(255,255,255,0.05)' }}>
          <Ticker />

          {/* Writing */}
          <section style={{ padding: '36px 28px', borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
            <p style={{ fontFamily: 'monospace', fontSize: '9px', color: '#2d2d2d', letterSpacing: '0.2em', textTransform: 'uppercase', marginBottom: '20px' }}>
              recent writing
            </p>
            <Suspense fallback={<p style={{ fontFamily: 'monospace', fontSize: '11px', color: '#333' }}>loading...</p>}>
              {posts.length === 0 ? (
                <p style={{ fontFamily: 'monospace', fontSize: '11px', color: '#333' }}>
                  No posts yet — add them in Supabase or visit <span style={{ color: '#555' }}>/admin</span>.
                </p>
              ) : (
                posts.map(p => <PostRow key={p.id} post={p} />)
              )}
            </Suspense>
          </section>

          {/* Projects */}
          <section style={{ padding: '36px 28px', borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
            <p style={{ fontFamily: 'monospace', fontSize: '9px', color: '#2d2d2d', letterSpacing: '0.2em', textTransform: 'uppercase', marginBottom: '20px' }}>
              selected projects
            </p>
            {projects.length === 0 ? (
              <p style={{ fontFamily: 'monospace', fontSize: '11px', color: '#333' }}>No projects yet.</p>
            ) : (
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
                {projects.map(p => <ProjectCard key={p.id} project={p} />)}
              </div>
            )}
          </section>

          {/* Now */}
          <section style={{ padding: '36px 28px' }}>
            <p style={{ fontFamily: 'monospace', fontSize: '9px', color: '#2d2d2d', letterSpacing: '0.2em', textTransform: 'uppercase', marginBottom: '20px' }}>
              now
            </p>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '10px' }}>
              {NOW.map(card => (
                <div key={card.label} className="now-card" style={{ border: '1px solid #1a1a1a', borderRadius: '8px', padding: '16px' }}>
                  <p style={{ fontFamily: 'monospace', fontSize: '9px', color: '#333', letterSpacing: '0.15em', textTransform: 'uppercase', marginBottom: '8px' }}>
                    {card.label}
                  </p>
                  <p style={{ fontFamily: 'monospace', fontSize: '11px', color: '#888', lineHeight: 1.6 }}>
                    {card.live && (
                      <span style={{ display: 'inline-block', width: '6px', height: '6px', borderRadius: '50%', background: card.color, marginRight: '6px', verticalAlign: 'middle', animation: 'pulse 2s ease-in-out infinite' }} />
                    )}
                    {card.value}
                  </p>
                </div>
              ))}
            </div>
          </section>

          {/* Footer */}
          <footer style={{ padding: '20px 28px', borderTop: '1px solid rgba(255,255,255,0.04)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <span style={{ fontFamily: 'monospace', fontSize: '10px', color: '#2d2d2d' }}>© {new Date().getFullYear()}</span>
            <div style={{ display: 'flex', gap: '20px' }}>
              {SOCIAL.map(l => (
                <a key={l.label} href={l.href} className="footer-link" style={{ fontFamily: 'monospace', fontSize: '10px', color: '#333', textDecoration: 'none', letterSpacing: '0.08em' }}>
                  {l.label}
                </a>
              ))}
            </div>
          </footer>
        </div>
      </div>
    </>
  )
}
