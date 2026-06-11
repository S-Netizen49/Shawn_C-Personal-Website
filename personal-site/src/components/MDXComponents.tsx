import type { MDXComponents } from 'mdx/types'

export const mdxComponents: MDXComponents = {
  h1: ({ children }) => (
    <h1 className="font-sans text-3xl font-medium text-text-primary tracking-tight mt-10 mb-4">{children}</h1>
  ),
  h2: ({ children }) => (
    <h2 className="font-sans text-xl font-medium text-text-primary tracking-tight mt-8 mb-3 pb-2 border-b border-border">{children}</h2>
  ),
  h3: ({ children }) => (
    <h3 className="font-sans text-base font-medium text-text-primary mt-6 mb-2">{children}</h3>
  ),
  p: ({ children }) => (
    <p className="font-mono text-sm text-text-secondary leading-7 mb-4">{children}</p>
  ),
  a: ({ href, children }) => (
    <a href={href} className="text-text-primary underline decoration-border hover:decoration-text-secondary transition-colors">
      {children}
    </a>
  ),
  code: ({ children }) => (
    <code className="font-mono text-accent-green bg-bg-surface px-1.5 py-0.5 rounded text-[0.85em]">{children}</code>
  ),
  pre: ({ children }) => (
    <pre className="bg-[#0d0d0d] border border-border rounded-lg p-5 overflow-x-auto my-5 text-sm leading-relaxed">
      {children}
    </pre>
  ),
  blockquote: ({ children }) => (
    <blockquote className="border-l-2 border-border pl-5 my-5 italic text-text-muted">{children}</blockquote>
  ),
  ul: ({ children }) => <ul className="list-none pl-0 my-4 space-y-1.5">{children}</ul>,
  li: ({ children }) => (
    <li className="font-mono text-sm text-text-secondary flex gap-3 before:content-['—'] before:text-text-dim before:shrink-0">
      {children}
    </li>
  ),
  hr: () => <hr className="border-border my-8" />,

  // Custom callout component — use in MDX as <Callout>...</Callout>
  Callout: ({ children, type = 'info' }: { children: React.ReactNode; type?: 'info' | 'warn' }) => (
    <div className={`border rounded-lg p-4 my-5 font-mono text-sm ${
      type === 'warn'
        ? 'border-accent-amber/20 bg-accent-amber/5 text-accent-amber'
        : 'border-accent-blue/20 bg-accent-blue/5 text-accent-blue'
    }`}>
      {children}
    </div>
  ),
}
