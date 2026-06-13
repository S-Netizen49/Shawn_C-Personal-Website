'use client'
import { useState } from 'react'

const ITEMS = [
  { label: 'next.js',        color: '#fff'    },
  { label: 'supabase',       color: '#4ade80' },
  { label: 'typescript',     color: '#60a5fa' },
  { label: 'systems design', color: '#a78bfa' },
  { label: 'open source',    color: '#4ade80' },
  { label: 'montréal',       color: '#f59e0b' },
  { label: 'rust',           color: '#f97316' },
  { label: 'photography',    color: '#ec4899' },
  { label: 'framer motion',  color: '#a78bfa' },
  { label: 'local-first',    color: '#60a5fa' },
  { label: 'mdx',            color: '#4ade80' },
  { label: 'tailwind',       color: '#38bdf8' },
]

function Item({ label, color }: { label: string; color: string }) {
  const [hovered, setHovered] = useState(false)
  return (
    <span
      style={{
        display: 'flex', alignItems: 'center', gap: '10px',
        fontFamily: 'monospace', fontSize: '11px',
        letterSpacing: '0.15em', textTransform: 'uppercase',
        color: hovered ? color : '#777',
        transition: 'color 0.15s',
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <span style={{
        width: '4px', height: '4px', borderRadius: '50%', display: 'inline-block',
        background: hovered ? color : '#444',
        transition: 'background 0.15s',
      }} />
      {label}
    </span>
  )
}

export default function Ticker() {
  const doubled = [...ITEMS, ...ITEMS]
  return (
    <div style={{ borderBottom: '1px solid rgba(255,255,255,0.06)', overflow: 'hidden', padding: '12px 0' }}>
      <div style={{ display: 'flex', gap: '40px', whiteSpace: 'nowrap', width: 'max-content', animation: 'ticker 28s linear infinite' }}>
        {doubled.map((item, i) => <Item key={i} label={item.label} color={item.color} />)}
      </div>
      <style>{`@keyframes ticker { from { transform: translateX(0) } to { transform: translateX(-50%) } }`}</style>
    </div>
  )
}