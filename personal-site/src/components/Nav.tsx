'use client'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

const links = [
  { href: '/blog', label: 'writing' },
  { href: '/projects', label: 'projects' },
  { href: '/photos', label: 'photos' },
  { href: '/about', label: 'about' },
]

export default function Nav() {
  const path = usePathname()
  return (
    <nav className="relative z-10 flex items-center justify-between px-7 py-5">
      <Link href="/" className="font-mono text-[13px] text-white tracking-widest hover:opacity-70 transition-opacity">
        <span className="text-text-muted">//</span> YR
      </Link>
      <div className="flex items-center gap-7">
        {links.map(l => (
          <Link
            key={l.href}
            href={l.href}
            className={`font-mono text-[11px] tracking-widest transition-colors ${
              path.startsWith(l.href) ? 'text-text-secondary' : 'text-text-muted hover:text-text-secondary'
            }`}
          >
            {l.label}
          </Link>
        ))}
      </div>
    </nav>
  )
}
