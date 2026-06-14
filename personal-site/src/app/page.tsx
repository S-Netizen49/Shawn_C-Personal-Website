import ParticleCanvas from '@/components/ParticleCanvas'
import HeroName from '@/components/HeroName'
import Ticker from '@/components/Ticker'
import PostRow from '@/components/PostRow'
import ProjectCard from '@/components/ProjectCard'
import StaticProjectCard from '@/components/StaticProjectCard'
import ExperienceTeaser from '@/components/ExperienceTeaser'
import PersonalTeaser from '@/components/PersonalTeaser'
import { getPosts, getProjects } from '@/lib/data'
import { Suspense } from 'react'

const NOW = [
  { label: 'status',   value: 'open to opportunities',              live: true,  color: '#4ade80' },
  { label: 'building', value: 'Touristy — iOS travel planning app', live: false, color: '#60a5fa' },
  { label: 'studying', value: 'B.Sc. Computer Science, Concordia',  live: false, color: '#a78bfa' },
]
const SOCIAL = [
  { label: 'github',   href: 'https://github.com/S-Netizen49' },
  { label: 'linkedin', href: 'https://www.linkedin.com/in/shawnn-cui/' },
  { label: 'email',    href: 'mailto:zhzhang2002@gmail.com' },
]
const STATIC_PROJECTS = [
  {
    name: 'Touristy',
    desc: 'Full-stack iOS travel planning app with trip optimizer, real-time weather, and Google Maps integration.',
    stack: ['React Native', 'Spring Boot', 'PostgreSQL', 'Google APIs'],
    glyph: '✈',
    color: '#60a5fa',
    href: 'https://github.com/S-Netizen49',
  },
  {
    name: 'YTMusic Sorter',
    desc: 'Chrome extension with AI agent that auto-categorizes YouTube Music liked songs by genre, mood, or decade.',
    stack: ['JavaScript', 'Chrome Extension', 'Gemini', 'Ollama'],
    glyph: '♪',
    color: '#f59e0b',
    href: 'https://github.com/S-Netizen49',
  },
]

const LABEL: React.CSSProperties = {
  fontFamily: 'monospace', fontSize: '9px', color: '#666',
  letterSpacing: '0.22em', textTransform: 'uppercase',
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
              software engineer · montreal, qc
            </p>
            <HeroName name="Shawn Cui" />
            <p style={{ fontFamily: 'monospace', fontSize: '14px', color: '#aaa', lineHeight: 1.8, maxWidth: '480px', marginTop: '14px', marginBottom: 0 }}>
              Full-stack engineer with a taste for{' '}
              <span style={{ color: '#ddd' }}>distributed systems</span> and{' '}
              <span style={{ color: '#ddd' }}>mobile apps</span>. CS graduate from{' '}
              <span style={{ color: '#4ade80' }}>Concordia</span>. Previously at{' '}
              <span style={{ color: '#60a5fa' }}>Genetec</span> &amp;{' '}
              <span style={{ color: '#a78bfa' }}>Consoltec</span>.
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
                    No posts yet — visit <span style={{ color: '#aaa' }}>/admin</span> to write your first one.
                  </p>
                : posts.map(p => <PostRow key={p.id} post={p} />)
              }
            </Suspense>
          </section>

          {/* Projects */}
          <section style={{ padding: '40px', borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
            <p style={LABEL}>selected projects</p>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
              {projects.length > 0
                ? projects.map(p => <ProjectCard key={p.id} project={p} />)
                : STATIC_PROJECTS.map(p => <StaticProjectCard key={p.name} {...p} />)
              }
            </div>
          </section>

          {/* Experience teaser */}
          <section style={{ padding: '40px', borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
            <ExperienceTeaser />
          </section>
          {/* Personal */}
          <section style={{ padding: '40px', borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
            <PersonalTeaser />
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
                    {card.live && <span style={{ display: 'inline-block', width: '6px', height: '6px', borderRadius: '50%', background: card.color, marginRight: '7px', verticalAlign: 'middle' }} />}
                    {card.value}
                  </p>
                </div>
              ))}
            </div>
          </section>

          {/* Footer */}
          <footer style={{ padding: '20px 40px', borderTop: '1px solid rgba(255,255,255,0.06)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <span style={{ fontFamily: 'monospace', fontSize: '11px', color: '#555' }}>© {new Date().getFullYear()} Shawn Cui</span>
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