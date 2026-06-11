const ITEMS = [
  'next.js', 'supabase', 'typescript', 'systems design',
  'open source', 'montréal', 'rust', 'photography',
  'framer motion', 'local-first', 'mdx', 'tailwind',
]

export default function Ticker() {
  const doubled = [...ITEMS, ...ITEMS]
  return (
    <div className="border-y border-border overflow-hidden py-2.5">
      <div
        className="flex gap-12 whitespace-nowrap w-max"
        style={{ animation: 'ticker 24s linear infinite' }}
      >
        {doubled.map((item, i) => (
          <span key={i} className="flex items-center gap-3 font-mono text-[10px] text-text-dim tracking-[0.15em] uppercase">
            <span className="w-1 h-1 rounded-full bg-border inline-block" />
            {item}
          </span>
        ))}
      </div>
      <style>{`@keyframes ticker { from { transform: translateX(0) } to { transform: translateX(-50%) } }`}</style>
    </div>
  )
}
