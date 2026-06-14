'use client'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useState } from 'react'

const LINKS = [
  { href: '/blog',       label: 'writing'    },
  { href: '/projects',   label: 'projects'   },
  { href: '/experience', label: 'experience' },
  {
    href: '/personal', label: 'personal',
    sub: [
      { href: '/personal/posts',  label: 'posts'  },
      { href: '/personal/photos', label: 'photos' },
    ],
  },
  { href: '/about',      label: 'about'      },
]

export default function Nav() {
  const path = usePathname()
  const [personalOpen, setPersonalOpen] = useState(false)

  return (
    <nav style={{
      position: 'fixed', top: 0, left: 0, right: 0, zIndex: 50,
      display: 'flex', alignItems: 'center', justifyContent: 'space-between',
      padding: '20px 40px',
    }}>
      <Link href="/" style={{ fontFamily: 'monospace', fontSize: '13px', color: '#fff', textDecoration: 'none', letterSpacing: '0.12em' }}>
        <span style={{ color: '#444' }}>//</span> SC
      </Link>

      <div style={{ display: 'flex', gap: '28px', alignItems: 'center' }}>
        {LINKS.map(l => {
          const isActive = path.startsWith(l.href)
          if (l.sub) {
            return (
              <div key={l.href} style={{ position: 'relative' }}
                onMouseEnter={() => setPersonalOpen(true)}
                onMouseLeave={() => setPersonalOpen(false)}
              >
                <Link href={l.href} className="nav-link" style={{
                  fontFamily: 'monospace', fontSize: '11px', textDecoration: 'none',
                  letterSpacing: '0.1em', color: isActive ? '#ccc' : '#666', transition: 'color 0.2s',
                }}>
                  {l.label}
                </Link>
                {/* dropdown */}
                <div style={{
                  position: 'absolute', top: '100%', left: '50%', transform: 'translateX(-50%)',
                  paddingTop: '12px',
                  opacity: personalOpen ? 1 : 0,
                  pointerEvents: personalOpen ? 'auto' : 'none',
                  transition: 'opacity 0.15s',
                }}>
                  <div style={{
                    background: 'rgba(8,8,14,0.95)', border: '1px solid rgba(255,255,255,0.08)',
                    borderRadius: '8px', padding: '6px',
                    backdropFilter: 'blur(12px)', minWidth: '110px',
                    display: 'flex', flexDirection: 'column', gap: '2px',
                  }}>
                    {l.sub.map(s => (
                      <Link key={s.href} href={s.href} style={{
                        fontFamily: 'monospace', fontSize: '11px', color: path.startsWith(s.href) ? '#ccc' : '#666',
                        textDecoration: 'none', padding: '6px 10px', borderRadius: '5px',
                        display: 'block', letterSpacing: '0.08em',
                        transition: 'color 0.15s, background 0.15s',
                      }}
                        onMouseEnter={e => { const el = e.currentTarget as HTMLElement; el.style.color = '#fff'; el.style.background = 'rgba(255,255,255,0.06)' }}
                        onMouseLeave={e => { const el = e.currentTarget as HTMLElement; el.style.color = path.startsWith(s.href) ? '#ccc' : '#666'; el.style.background = 'transparent' }}
                      >
                        {s.label}
                      </Link>
                    ))}
                  </div>
                </div>
              </div>
            )
          }
          return (
            <Link key={l.href} href={l.href} className="nav-link" style={{
              fontFamily: 'monospace', fontSize: '11px', textDecoration: 'none',
              letterSpacing: '0.1em', color: isActive ? '#ccc' : '#666', transition: 'color 0.2s',
            }}>
              {l.label}
            </Link>
          )
        })}
      </div>
    </nav>
  )
}