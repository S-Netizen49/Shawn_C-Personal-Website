'use client'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

const links = [
  { href: '/blog',       label: 'writing'    },
  { href: '/projects',   label: 'projects'   },
  { href: '/experience', label: 'experience' },
  { href: '/about',      label: 'about'      },
]

export default function Nav() {
  const path = usePathname()
  return (
    <nav style={{
      position: 'fixed', top: 0, left: 0, right: 0, zIndex: 50,
      display: 'flex', alignItems: 'center', justifyContent: 'space-between',
      padding: '20px 40px',
    }}>
      <Link href="/" style={{ fontFamily: 'monospace', fontSize: '13px', color: '#fff', textDecoration: 'none', letterSpacing: '0.12em' }}>
        <span style={{ color: '#444' }}>//</span> SC
      </Link>
      <div style={{ display: 'flex', gap: '28px' }}>
        {links.map(l => (
          <Link key={l.href} href={l.href} className="nav-link" style={{
            fontFamily: 'monospace', fontSize: '11px', textDecoration: 'none',
            letterSpacing: '0.1em', color: path.startsWith(l.href) ? '#ccc' : '#666',
            transition: 'color 0.2s',
          }}>
            {l.label}
          </Link>
        ))}
      </div>
    </nav>
  )
}