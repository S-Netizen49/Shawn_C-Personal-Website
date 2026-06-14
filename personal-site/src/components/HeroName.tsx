'use client'
import { useState } from 'react'

export default function HeroName({ name }: { name: string }) {
  const [bouncing, setBouncing] = useState<number | null>(null)

  return (
    <h1 style={{ fontSize: 'clamp(48px, 8vw, 80px)', fontWeight: 700, lineHeight: 0.95, letterSpacing: '-0.04em', color: '#fff', margin: 0, userSelect: 'none', fontFamily: 'system-ui, sans-serif' }}>
      {name.split('').map((char, i) =>
        char === ' ' ? (
          <span key={i} style={{ display: 'inline-block', width: '0.28em' }} />
        ) : (
          <span
            key={i}
            style={{
              display: 'inline-block',
              transition: 'transform 0.15s cubic-bezier(.34,1.56,.64,1), color 0.15s',
              transform: bouncing === i ? 'translateY(-10px) rotate(-4deg)' : 'none',
              color: bouncing === i ? '#4ade80' : '#fff',
            }}
            onMouseEnter={() => { setBouncing(i); setTimeout(() => setBouncing(null), 380) }}
          >
            {char}
          </span>
        )
      )}
    </h1>
  )
}