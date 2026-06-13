'use client'
import { useState } from 'react'

const ITEMS = [
  { label: 'next.js',       color: '#fff' },
  { label: 'supabase',      color: '#4ade80' },
  { label: 'typescript',    color: '#60a5fa' },
  { label: 'systems design',color: '#a78bfa' },
  { label: 'open source',   color: '#4ade80' },
  { label: 'montréal',      color: '#f59e0b' },
  { label: 'rust',          color: '#f97316' },
  { label: 'photography',   color: '#ec4899' },
  { label: 'framer motion', color: '#a78bfa' },
  { label: 'local-first',   color: '#60a5fa' },
  { label: 'mdx',           color: '#4ade80' },
  { label: 'tailwind',      color: '#38bdf8' },
]

function TickerItem({ label, color }: { label: string; color: string }) {
  const [hovered, setHovered] = useState(false)
  return (
    <span
      className="flex items-center gap-3 font-mono text-[10px] tracking-[0.15em] uppercase transition-colors duration-150"
      style={{ color: hovered ? color : '#2a2a2a' }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <span
        className="w-1 h-1 rounded-full inline-block transition-colors duration-150"
        style={{ background: hovered ? color : '#1f1f1f' }}
      />
      {label}
    </span>
  )
}

export default function Ticker() {
  const doubled = [...ITEMS, ...ITEMS]
  return (
    <div className="border-y border-border overflow-hidden py-2.5">
      <div
        className="flex gap-10 whitespace-nowrap w-max"
        style={{ animation: 'ticker 28s linear infinite' }}
      >
        {doubled.map((item, i) => (
          <TickerItem key={i} label={item.label} color={item.color} />
        ))}
      </div>
      <style>{`@keyframes ticker { from { transform: translateX(0) } to { transform: translateX(-50%) } }`}</style>
    </div>
  )
}