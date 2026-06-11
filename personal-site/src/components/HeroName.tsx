'use client'
import { useState } from 'react'

export default function HeroName({ name }: { name: string }) {
  const [bouncing, setBouncing] = useState<number | null>(null)

  return (
    <h1 className="font-sans text-[60px] sm:text-[72px] font-bold leading-none tracking-[-0.04em] text-white mb-4 select-none">
      {name.split('').map((char, i) =>
        char === ' ' ? (
          <span key={i} className="inline-block w-[0.28em]" />
        ) : (
          <span
            key={i}
            className="inline-block cursor-default transition-all duration-150"
            style={{
              transform: bouncing === i ? 'translateY(-10px) rotate(-4deg)' : 'none',
              color: bouncing === i ? '#fff' : undefined,
            }}
            onMouseEnter={() => {
              setBouncing(i)
              setTimeout(() => setBouncing(null), 380)
            }}
          >
            {char}
          </span>
        )
      )}
    </h1>
  )
}
