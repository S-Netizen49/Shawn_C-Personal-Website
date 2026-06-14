'use client'
import { useState } from 'react'

const ITEMS = [
  { label: 'react native',   color: '#60a5fa' },
  { label: 'spring boot',    color: '#4ade80' },
  { label: 'typescript',     color: '#60a5fa' },
  { label: 'c#',             color: '#a78bfa' },
  { label: 'postgresql',     color: '#38bdf8' },
  { label: 'aws',            color: '#f59e0b' },
  { label: 'angularjs',      color: '#ec4899' },
  { label: 'java',           color: '#f97316' },
  { label: 'distributed systems', color: '#a78bfa' },
  { label: 'montreal',       color: '#4ade80' },
  { label: 'microservices',  color: '#60a5fa' },
  { label: 'concordia',      color: '#f59e0b' },
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
      <span style={{ width: '4px', height: '4px', borderRadius: '50%', display: 'inline-block', background: hovered ? color : '#444', transition: 'background 0.15s' }} />
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