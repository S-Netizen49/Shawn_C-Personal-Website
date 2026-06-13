'use client'
import { useEffect, useRef, useState } from 'react'

export default function Cursor() {
  const dot   = useRef<HTMLDivElement>(null)
  const ring  = useRef<HTMLDivElement>(null)
  const pos   = useRef({ x: -100, y: -100 })
  const ringP = useRef({ x: -100, y: -100 })
  const rafId = useRef<number>()
  const [hidden, setHidden]   = useState(false)
  const [flavor, setFlavor]   = useState<'default'|'link'|'text'|'project'>('default')

  useEffect(() => {
    function onMove(e: MouseEvent) {
      pos.current = { x: e.clientX, y: e.clientY }
      if (dot.current) {
        dot.current.style.transform = `translate(${e.clientX}px,${e.clientY}px) translate(-50%,-50%)`
      }
      // hide inside the hero canvas
      const el = document.elementFromPoint(e.clientX, e.clientY)
      const inHero = !!el?.closest('[data-hero-canvas]')
      setHidden(inHero)
      if (!inHero) {
        const isProject = !!el?.closest('[data-cursor="project"]')
        const isLink    = !!el?.closest('a,button,[data-cursor]')
        const isText    = !!el?.closest('p,h1,h2,h3,span')
        setFlavor(isProject ? 'project' : isLink ? 'link' : isText ? 'text' : 'default')
      }
    }

    function animate() {
      const lerp = (a: number, b: number, t: number) => a + (b-a)*t
      ringP.current.x = lerp(ringP.current.x, pos.current.x, 0.12)
      ringP.current.y = lerp(ringP.current.y, pos.current.y, 0.12)
      if (ring.current) {
        ring.current.style.transform = `translate(${ringP.current.x}px,${ringP.current.y}px) translate(-50%,-50%)`
      }
      rafId.current = requestAnimationFrame(animate)
    }

    window.addEventListener('mousemove', onMove)
    rafId.current = requestAnimationFrame(animate)
    return () => {
      window.removeEventListener('mousemove', onMove)
      if (rafId.current) cancelAnimationFrame(rafId.current)
    }
  }, [])

  const ringSize    = flavor==='link' ? 44 : flavor==='project' ? 64 : flavor==='text' ? 28 : 36
  const ringBorder  = flavor==='link'
    ? '1px solid rgba(74,222,128,0.7)'
    : flavor==='project'
    ? '1px solid rgba(96,165,250,0.5)'
    : '1px solid rgba(255,255,255,0.25)'
  const dotColor    = flavor==='link' ? '#4ade80' : flavor==='project' ? '#60a5fa' : '#fff'
  const dotSize     = flavor==='link' ? 5 : flavor==='text' ? 2 : 3
  const opacity     = hidden ? 0 : 1

  return (
    <>
      <div ref={dot} style={{
        position:'fixed',top:0,left:0,
        width:dotSize,height:dotSize,borderRadius:'50%',
        background:dotColor,pointerEvents:'none',zIndex:9999,
        transition:'width .15s,height .15s,background .15s,opacity .1s',
        willChange:'transform',opacity,
      }}/>
      <div ref={ring} style={{
        position:'fixed',top:0,left:0,
        width:ringSize,height:ringSize,borderRadius:'50%',
        border:ringBorder,opacity:hidden?0:0.35,
        pointerEvents:'none',zIndex:9998,
        transition:'width .2s cubic-bezier(.34,1.56,.64,1),height .2s cubic-bezier(.34,1.56,.64,1),border .2s,opacity .15s',
        willChange:'transform',
      }}/>
    </>
  )
}