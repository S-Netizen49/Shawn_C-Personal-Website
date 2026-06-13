import ParticleCanvas from '@/components/ParticleCanvas'
import HeroName from '@/components/HeroName'
import Ticker from '@/components/Ticker'
import PostRow from '@/components/PostRow'
import ProjectCard from '@/components/ProjectCard'
import { getPosts, getProjects } from '@/lib/data'
import { Suspense } from 'react'

const YOUR_NAME = 'Your Name'
const YOUR_CITY = 'Montréal'
const NOW = [
  { label: 'status',   value: 'available for work',                            live: true,  color: '#4ade80' },
  { label: 'building', value: 'this site + a new open source tool',            live: false, color: '#60a5fa' },
  { label: 'reading',  value: 'Structure & Interpretation of Computer Programs',live: false, color: '#a78bfa' },
]
const SOCIAL = [
  { label: 'github',  href: 'https://github.com/yourhandle' },
  { label: 'twitter', href: 'https://twitter.com/yourhandle' },
  { label: 'rss',     href: '/rss.xml' },
  { label: 'email',   href: 'mailto:you@example.com' },
]

const LABEL = {
  fontFamily: 'monospace', fontSize: '9px', color: '#666',
  letterSpacing: '0.22em', textTransform: 'uppercase' as const,
  marginBottom: '20px', marginTop: 0,
}

export default async function Home() {
  const [posts, projects] = await Promise.all([getPosts(5), getProjects(true)])

  return (
    <>
      <ParticleCanvas />

      <div style={{ position: 'relative', zIndex: 1 }}>

        {/* ── HERO ── */}
        <section style={{
          position: 'relative', height: '100vh',
          display: 'flex', flexDirection: 'column', justifyContent: 'flex-end',
          padding: '0 40px 64px',
        }}>
          <div style={{
            position: 'absolute', inset: 0, pointerEvents: 'none',
            background: 'linear-gradient(to top, rgba(3,3,10,0.96) 0%, rgba(3,3,10,0.3) 60%, transparent 100%)',
          }} />
          <div style={{ position: 'relative' }}>
            <p style={{ fontFamily: 'monospace', fontSize: '11px', color: '#888', letterSpacing: '0.2em', textTransform: 'uppercase', marginBottom: '16px', marginTop: 0 }}>
              software engineer &amp; writer
            </p>
            <HeroName name={YOUR_NAME} />
            <p style={{ fontFamily: 'monospace', fontSize: '14px', color: '#aaa', lineHeight: 1.8, maxWidth: '400px', marginTop: '12px', marginBottom: 0 }}>
              Building things, <span style={{ color: '#ddd' }}>writing about them</span>, breaking them,
              {' '}writing about that too. Based in <span style={{ color: '#4ade80' }}>{YOUR_CITY}</span>.
            </p>
          </div>
        </section>

        {/* ── CONTENT PANEL ── */}
        <div style={{
          background: 'rgba(3,3,10,0.94)',
          backdropFilter: 'blur(16px)',
          WebkitBackdropFilter: 'blur(16px)',
          borderTop: '1px solid rgba(255,255,255,0.08)',
        }}>
          <Ticker />

          {/* Writing */}
          <section style={{ padding: '40px', borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
            <p style={LABEL}>recent writing</p>
            <Suspense fallback={<p style={{ fontFamily: 'monospace', fontSize: '12px', color: '#666', margin: 0 }}>loading...</p>}>
              {posts.length === 0
                ? <p style={{ fontFamily: 'monospace', fontSize: '13px', color: '#777', margin: 0 }}>
                    No posts yet — add them in Supabase or visit <span style={{ color: '#aaa' }}>/admin</span>.
                  </p>
                : posts.map(p => <PostRow key={p.id} post={p} />)
              }
            </Suspense>
          </section>

          {/* Projects */}
          <section style={{ padding: '40px', borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
            <p style={LABEL}>selected projects</p>
            {projects.length === 0
              ? <p style={{ fontFamily: 'monospace', fontSize: '13px', color: '#777', margin: 0 }}>
                  No projects yet — add them in Supabase.
                </p>
              : <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
                  {projects.map(p => <ProjectCard key={p.id} project={p} />)}
                </div>
            }
          </section>

          {/* Now */}
          <section style={{ padding: '40px' }}>
            <p style={LABEL}>now</p>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '10px' }}>
              {NOW.map(card => (
                <div key={card.label} className="now-card" style={{ border: '1px solid #222', borderRadius: '8px', padding: '16px' }}>
                  <p style={{ fontFamily: 'monospace', fontSize: '9px', color: '#666', letterSpacing: '0.15em', textTransform: 'uppercase', marginBottom: '8px', marginTop: 0 }}>
                    {card.label}
                  </p>
                  <p style={{ fontFamily: 'monospace', fontSize: '13px', color: '#bbb', lineHeight: 1.6, margin: 0 }}>
                    {card.live && (
                      <span style={{ display: 'inline-block', width: '6px', height: '6px', borderRadius: '50%', background: card.color, marginRight: '7px', verticalAlign: 'middle' }} />
                    )}
                    {card.value}
                  </p>
                </div>
              ))}
            </div>
          </section>

          {/* Footer */}
          <footer style={{ padding: '20px 40px', borderTop: '1px solid rgba(255,255,255,0.06)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <span style={{ fontFamily: 'monospace', fontSize: '11px', color: '#555' }}>© {new Date().getFullYear()}</span>
            <div style={{ display: 'flex', gap: '24px' }}>
              {SOCIAL.map(l => (
                <a key={l.label} href={l.href} className="footer-link"
                  style={{ fontFamily: 'monospace', fontSize: '11px', color: '#777', textDecoration: 'none', letterSpacing: '0.08em' }}>
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