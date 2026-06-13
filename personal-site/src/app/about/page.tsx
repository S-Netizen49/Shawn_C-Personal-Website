import type { Metadata } from 'next'

export const metadata: Metadata = { title: 'About' }

export default function AboutPage() {
  return (
    <div className="px-7 py-12 max-w-xl">
      <h1 className="font-sans text-4xl font-medium text-text-primary tracking-tight mb-8">About</h1>

      <div className="space-y-5 font-mono text-sm text-text-secondary leading-7">
        <p>
          I'm a software engineer based in Montréal. I build products,
          write about the process, and occasionally ship open source tools that
          scratch my own itches.
        </p>
        <p>
          Currently working on{' '}
          <span className="text-text-primary">_______</span>. Previously at{' '}
          <span className="text-text-primary">_______</span>.
        </p>
        <p>
          Outside of code I'm into photography, good coffee, and reading things
          I don't fully understand yet.
        </p>
      </div>

      <div className="mt-10 pt-8 border-t border-border">
        <p className="font-mono text-[9px] text-text-dim tracking-widest uppercase mb-4">find me</p>
        <div className="flex flex-col gap-2">
          {[
            { label: 'github', href: 'https://github.com/yourhandle' },
            { label: 'twitter / x', href: 'https://twitter.com/yourhandle' },
            { label: 'email', href: 'mailto:you@example.com' },
          ].map(l => (
            <a
              key={l.label}
              href={l.href}
              className="font-mono text-sm text-text-muted hover:text-text-primary transition-colors flex items-center gap-2 w-fit"
            >
              <span className="text-text-dim">—</span> {l.label}
            </a>
          ))}
        </div>
      </div>
    </div>
  )
}