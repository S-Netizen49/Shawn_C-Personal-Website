'use client'
import { useState } from 'react'
import Link from 'next/link'

const CATEGORIES = ['all', 'nature', 'travel', 'city', 'random']

const PHOTOS: { id: number; cat: string; caption: string; location: string; date: string; aspect: string }[] = [
  { id:1, cat:'nature',  caption:'Laurentian forest',    location:'Mont-Tremblant', date:'Oct 2024', aspect:'3/4'  },
  { id:2, cat:'city',    caption:'Old Port at blue hour', location:'Montréal',       date:'Aug 2024', aspect:'4/3'  },
  { id:3, cat:'travel',  caption:'First trip abroad',     location:'TBD',            date:'2025',     aspect:'3/4'  },
  { id:4, cat:'nature',  caption:'Sunrise hike',          location:'Adirondacks',    date:'Jul 2024', aspect:'16/9' },
  { id:5, cat:'city',    caption:'Mile End morning',      location:'Montréal',       date:'Mar 2025', aspect:'4/3'  },
  { id:6, cat:'random',  caption:'Good light, good day',  location:'—',              date:'2024',     aspect:'3/4'  },
]

function PhotoSlot({ caption, location, date, aspect, cat }: typeof PHOTOS[0]) {
  const [hovered, setHovered] = useState(false)
  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        position: 'relative', borderRadius: '2px', overflow: 'hidden',
        aspectRatio: aspect, cursor: 'pointer',
        background: '#f0f0ee',
        border: `1px solid ${hovered ? '#bbb' : '#e8e8e6'}`,
        transition: 'border-color 0.2s, transform 0.25s',
        transform: hovered ? 'scale(1.01)' : 'scale(1)',
        breakInside: 'avoid', marginBottom: '12px',
      }}
    >
      {/* placeholder interior */}
      <div style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <div style={{ textAlign: 'center' }}>
          <div style={{ fontFamily: 'Georgia, serif', fontSize: '28px', color: '#d5d5d2', marginBottom: '6px', fontStyle: 'italic' }}>+</div>
          <p style={{ fontFamily: 'monospace', fontSize: '9px', color: '#ccc', letterSpacing: '0.1em', textTransform: 'uppercase', margin: 0 }}>upload</p>
        </div>
      </div>
      {/* caption overlay */}
      <div style={{
        position: 'absolute', bottom: 0, left: 0, right: 0, padding: '20px 14px 12px',
        background: 'linear-gradient(to top, rgba(0,0,0,0.18), transparent)',
        opacity: hovered ? 1 : 0, transition: 'opacity 0.2s',
      }}>
        <p style={{ fontFamily: 'Georgia, serif', fontSize: '12px', color: '#111', margin: '0 0 2px 0', fontStyle: 'italic' }}>{caption}</p>
        <p style={{ fontFamily: 'monospace', fontSize: '9px', color: '#666', margin: 0 }}>{location} · {date}</p>
      </div>
    </div>
  )
}

export default function PhotosPage() {
  const [activecat, setActivecat] = useState('all')
  const filtered = activecat === 'all' ? PHOTOS : PHOTOS.filter(p => p.cat === activecat)

  return (
    <div style={{ minHeight: '100vh', background: '#fafaf8' }}>
      {/* light nav */}
      <div style={{ position: 'fixed', top: 0, left: 0, right: 0, zIndex: 100, background: '#fafaf8', borderBottom: '1px solid #e5e5e5', padding: '18px 48px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <Link href="/personal" style={{ fontFamily: 'monospace', fontSize: '12px', color: '#999', textDecoration: 'none' }}>← personal</Link>
        <span style={{ fontFamily: 'Georgia, serif', fontSize: '16px', color: '#111', fontStyle: 'italic' }}>Photos</span>
        <Link href="/personal/posts" style={{ fontFamily: 'monospace', fontSize: '11px', color: '#999', textDecoration: 'none' }}>posts</Link>
      </div>

      <div style={{ padding: '120px 48px 80px' }}>
        {/* header */}
        <div style={{ maxWidth: '720px', margin: '0 auto 40px' }}>
          <h1 style={{ fontFamily: 'Georgia, serif', fontSize: '44px', fontWeight: 400, color: '#111', margin: '0 0 8px 0', fontStyle: 'italic', letterSpacing: '-0.02em' }}>Photos</h1>
          <p style={{ fontFamily: 'monospace', fontSize: '12px', color: '#bbb', margin: 0 }}>Moments worth keeping.</p>
        </div>

        {/* filter */}
        <div style={{ maxWidth: '720px', margin: '0 auto 36px', display: 'flex', gap: '20px', borderBottom: '1px solid #e5e5e5', paddingBottom: '16px' }}>
          {CATEGORIES.map(c => (
            <button key={c} onClick={() => setActivecat(c)} style={{
              fontFamily: 'monospace', fontSize: '10px', background: 'none', border: 'none',
              color: activecat === c ? '#111' : '#bbb', cursor: 'pointer', padding: 0,
              letterSpacing: '0.08em', textTransform: 'uppercase',
              borderBottom: activecat === c ? '1px solid #111' : '1px solid transparent',
              paddingBottom: '2px', transition: 'color 0.15s',
            }}>{c}</button>
          ))}
        </div>

        {/* masonry */}
        <div style={{ maxWidth: '960px', margin: '0 auto', columns: '3 240px', gap: '12px' }}>
          {filtered.map(p => <PhotoSlot key={p.id} {...p} />)}
          {/* add slot */}
          <div style={{ breakInside: 'avoid', marginBottom: '12px' }}>
            <div style={{ aspectRatio: '4/3', background: '#f5f5f2', border: '1px dashed #ddd', borderRadius: '2px', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }}
              onMouseEnter={e => { (e.currentTarget as HTMLElement).style.borderColor = '#aaa' }}
              onMouseLeave={e => { (e.currentTarget as HTMLElement).style.borderColor = '#ddd' }}
            >
              <div style={{ textAlign: 'center' }}>
                <p style={{ fontFamily: 'Georgia, serif', fontSize: '22px', color: '#ccc', margin: '0 0 4px 0' }}>+</p>
                <p style={{ fontFamily: 'monospace', fontSize: '9px', color: '#ccc', letterSpacing: '0.1em', textTransform: 'uppercase', margin: 0 }}>add photo</p>
              </div>
            </div>
          </div>
        </div>

        {/* upload note */}
        <div style={{ maxWidth: '720px', margin: '40px auto 0', borderTop: '1px solid #e5e5e5', paddingTop: '24px' }}>
          <p style={{ fontFamily: 'monospace', fontSize: '11px', color: '#bbb', lineHeight: 1.7, margin: 0 }}>
            To add photos: Supabase Storage → <span style={{ color: '#888' }}>photos</span> bucket → upload → add URL to <span style={{ color: '#888' }}>PHOTOS</span> array with a <span style={{ color: '#888' }}>src</span> field. Then swap the placeholder for an <span style={{ color: '#888' }}>&lt;img&gt;</span>.
          </p>
        </div>
      </div>
    </div>
  )
}