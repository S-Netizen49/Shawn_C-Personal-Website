'use client'
import { useState, Suspense } from 'react'
import { useSearchParams } from 'next/navigation'
import Link from 'next/link'

const TAGS = ['all', 'sports', 'home', 'life', 'food', 'travel']

const POSTS = [
  { id:1, title:'First tennis match of the season',      tag:'sports', date:'Jun 2025', readTime:'3 min', excerpt:'Lost the first set 2-6 but came back to win 7-5, 6-3. Legs are dead.' },
  { id:2, title:'Why I started playing badminton again', tag:'sports', date:'May 2025', readTime:'4 min', excerpt:'Hadn\'t picked up a racket in two years. Found a club in NDG and went back.' },
  { id:3, title:'Tiling the bathroom — what I learned',  tag:'home',   date:'Apr 2025', readTime:'7 min', excerpt:'Thought it would take a weekend. Took three. Here\'s everything I got wrong.' },
  { id:4, title:'Laurentians in October',                tag:'travel', date:'Oct 2024', readTime:'3 min', excerpt:'Two days in Tremblant. The leaves were stupid beautiful.' },
  { id:5, title:'On finishing university',               tag:'life',   date:'Jun 2025', readTime:'6 min', excerpt:'Four years, three internships, one degree. Some thoughts on what it meant.' },
]

function PostRow({ title, tag, date, readTime, excerpt }: typeof POSTS[0]) {
  const [hovered, setHovered] = useState(false)
  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        borderBottom: '1px solid #e5e5e5', padding: '28px 0',
        cursor: 'pointer', paddingLeft: hovered ? '12px' : '0',
        transition: 'padding-left 0.2s',
      }}
    >
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: '24px' }}>
        <div style={{ flex: 1 }}>
          <p style={{ fontFamily: 'Georgia, serif', fontSize: '20px', color: '#111', margin: '0 0 8px 0', fontStyle: 'italic', lineHeight: 1.3, letterSpacing: '-0.01em' }}>{title}</p>
          <p style={{ fontFamily: 'monospace', fontSize: '12px', color: '#999', lineHeight: 1.7, margin: 0 }}>{excerpt}</p>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: '6px', flexShrink: 0 }}>
          <span style={{ fontFamily: 'monospace', fontSize: '10px', color: '#bbb', textTransform: 'uppercase', letterSpacing: '0.1em' }}>{tag}</span>
          <span style={{ fontFamily: 'monospace', fontSize: '10px', color: '#ccc' }}>{date}</span>
          <span style={{ fontFamily: 'monospace', fontSize: '10px', color: '#ccc' }}>{readTime}</span>
        </div>
      </div>
    </div>
  )
}

function PostsInner() {
  const searchParams = useSearchParams()
  const [activeTag, setActiveTag] = useState(searchParams.get('tag') ?? 'all')
  const filtered = activeTag === 'all' ? POSTS : POSTS.filter(p => p.tag === activeTag)

  return (
    <div style={{ minHeight: '100vh', background: '#fafaf8' }}>
      {/* light nav */}
      <div style={{ position: 'fixed', top: 0, left: 0, right: 0, zIndex: 100, background: '#fafaf8', borderBottom: '1px solid #e5e5e5', padding: '18px 48px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <Link href="/personal" style={{ fontFamily: 'monospace', fontSize: '12px', color: '#999', textDecoration: 'none' }}>← personal</Link>
        <span style={{ fontFamily: 'Georgia, serif', fontSize: '16px', color: '#111', fontStyle: 'italic' }}>Posts</span>
        <Link href="/personal/photos" style={{ fontFamily: 'monospace', fontSize: '11px', color: '#999', textDecoration: 'none' }}>photos</Link>
      </div>

      <div style={{ padding: '120px 48px 80px', maxWidth: '720px', margin: '0 auto' }}>
        <div style={{ marginBottom: '48px' }}>
          <h1 style={{ fontFamily: 'Georgia, serif', fontSize: '44px', fontWeight: 400, color: '#111', margin: '0 0 8px 0', fontStyle: 'italic', letterSpacing: '-0.02em' }}>Posts</h1>
          <p style={{ fontFamily: 'monospace', fontSize: '12px', color: '#bbb', margin: 0 }}>{filtered.length} entries</p>
        </div>

        {/* tag filter — minimal */}
        <div style={{ display: 'flex', gap: '20px', marginBottom: '40px', borderBottom: '1px solid #e5e5e5', paddingBottom: '16px' }}>
          {TAGS.map(t => (
            <button key={t} onClick={() => setActiveTag(t)} style={{
              fontFamily: 'monospace', fontSize: '10px', background: 'none', border: 'none',
              color: activeTag === t ? '#111' : '#bbb', cursor: 'pointer', padding: 0,
              letterSpacing: '0.08em', textTransform: 'uppercase',
              borderBottom: activeTag === t ? '1px solid #111' : '1px solid transparent',
              paddingBottom: '2px', transition: 'color 0.15s',
            }}>{t}</button>
          ))}
        </div>

        <div style={{ borderTop: '1px solid #e5e5e5' }}>
          {filtered.map(p => <PostRow key={p.id} {...p} />)}
        </div>
      </div>
    </div>
  )
}

export default function PostsPage() {
  return (
    <Suspense fallback={<div style={{ background: '#fafaf8', minHeight: '100vh', padding: '120px 48px', fontFamily: 'monospace', fontSize: '12px', color: '#bbb' }}>loading...</div>}>
      <PostsInner />
    </Suspense>
  )
}