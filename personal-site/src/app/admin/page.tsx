'use client'
import { useState, useEffect } from 'react'
import { createClient } from '@/lib/supabase/client'
import type { Post } from '@/lib/types'

type View = 'list' | 'edit'

export default function AdminPage() {
  const [authed, setAuthed] = useState(false)
  const [loading, setLoading] = useState(true)
  const [posts, setPosts] = useState<Post[]>([])
  const [view, setView] = useState<View>('list')
  const [editing, setEditing] = useState<Partial<Post> | null>(null)
  const [saving, setSaving] = useState(false)
  const supabase = createClient()

  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => {
      setAuthed(!!data.session)
      setLoading(false)
    })
  }, [])

  useEffect(() => {
    if (authed) fetchPosts()
  }, [authed])

  async function fetchPosts() {
    const { data } = await supabase.from('posts').select('*').order('created_at', { ascending: false })
    setPosts(data ?? [])
  }

  async function signIn(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    const fd = new FormData(e.currentTarget)
    const { error } = await supabase.auth.signInWithPassword({
      email: fd.get('email') as string,
      password: fd.get('password') as string,
    })
    if (!error) setAuthed(true)
    else alert(error.message)
  }

  async function save() {
    if (!editing) return
    setSaving(true)
    const { id, created_at, updated_at, ...data } = editing as Post
    if (id) {
      await supabase.from('posts').update(data).eq('id', id)
    } else {
      await supabase.from('posts').insert({ ...data, reading_time: Math.ceil((data.content?.split(' ').length ?? 0) / 200) })
    }
    setSaving(false)
    setView('list')
    fetchPosts()
  }

  if (loading) return <div className="px-7 py-10 font-mono text-xs text-text-dim">loading...</div>

  if (!authed) return (
    <div className="px-7 py-16 max-w-sm">
      <p className="font-mono text-[9px] text-text-dim tracking-widest uppercase mb-6">admin</p>
      <form onSubmit={signIn} className="flex flex-col gap-3">
        <input name="email" type="email" placeholder="email" required className="bg-bg-surface border border-border rounded px-3 py-2 font-mono text-sm text-text-primary placeholder:text-text-dim focus:outline-none focus:border-border-hover" />
        <input name="password" type="password" placeholder="password" required className="bg-bg-surface border border-border rounded px-3 py-2 font-mono text-sm text-text-primary placeholder:text-text-dim focus:outline-none focus:border-border-hover" />
        <button type="submit" className="font-mono text-xs bg-bg-surface border border-border-hover text-text-secondary px-4 py-2 rounded hover:text-text-primary transition-colors">sign in →</button>
      </form>
    </div>
  )

  if (view === 'edit') return (
    <div className="px-7 py-10 max-w-3xl">
      <div className="flex items-center justify-between mb-6">
        <p className="font-mono text-[9px] text-text-dim tracking-widest uppercase">{editing?.id ? 'edit post' : 'new post'}</p>
        <button onClick={() => setView('list')} className="font-mono text-xs text-text-dim hover:text-text-secondary">← back</button>
      </div>
      <div className="flex flex-col gap-4">
        {(['title', 'slug', 'excerpt'] as const).map(f => (
          <div key={f} className="flex flex-col gap-1.5">
            <label className="font-mono text-[9px] text-text-dim tracking-widest uppercase">{f}</label>
            <input
              value={(editing as any)?.[f] ?? ''}
              onChange={e => setEditing(p => ({ ...p, [f]: e.target.value }))}
              className="bg-bg-surface border border-border rounded px-3 py-2 font-mono text-sm text-text-primary placeholder:text-text-dim focus:outline-none focus:border-border-hover"
            />
          </div>
        ))}
        <div className="flex gap-3">
          <div className="flex flex-col gap-1.5 flex-1">
            <label className="font-mono text-[9px] text-text-dim tracking-widest uppercase">type</label>
            <select value={editing?.type ?? 'essay'} onChange={e => setEditing(p => ({ ...p, type: e.target.value as Post['type'] }))} className="bg-bg-surface border border-border rounded px-3 py-2 font-mono text-sm text-text-primary focus:outline-none focus:border-border-hover">
              {['essay','tutorial','deep-dive','photos','case-study'].map(t => <option key={t} value={t}>{t}</option>)}
            </select>
          </div>
          <div className="flex flex-col gap-1.5 flex-1">
            <label className="font-mono text-[9px] text-text-dim tracking-widest uppercase">tags (comma separated)</label>
            <input
              value={editing?.tags?.join(', ') ?? ''}
              onChange={e => setEditing(p => ({ ...p, tags: e.target.value.split(',').map(t => t.trim()) }))}
              className="bg-bg-surface border border-border rounded px-3 py-2 font-mono text-sm text-text-primary placeholder:text-text-dim focus:outline-none focus:border-border-hover"
            />
          </div>
        </div>
        <div className="flex flex-col gap-1.5">
          <label className="font-mono text-[9px] text-text-dim tracking-widest uppercase">content (MDX)</label>
          <textarea
            rows={22}
            value={editing?.content ?? ''}
            onChange={e => setEditing(p => ({ ...p, content: e.target.value }))}
            className="bg-[#0d0d0d] border border-border rounded px-3 py-3 font-mono text-sm text-text-primary placeholder:text-text-dim focus:outline-none focus:border-border-hover resize-none leading-7"
            placeholder="Write your post in MDX..."
          />
        </div>
        <div className="flex items-center gap-4">
          <label className="flex items-center gap-2 cursor-pointer">
            <input type="checkbox" checked={editing?.published ?? false} onChange={e => setEditing(p => ({ ...p, published: e.target.checked }))} className="accent-accent-green" />
            <span className="font-mono text-xs text-text-muted">published</span>
          </label>
          <button onClick={save} disabled={saving} className="font-mono text-xs bg-bg-surface border border-border-hover text-text-secondary px-5 py-2 rounded hover:text-text-primary transition-colors disabled:opacity-50">
            {saving ? 'saving...' : 'save post →'}
          </button>
        </div>
      </div>
    </div>
  )

  return (
    <div className="px-7 py-10">
      <div className="flex items-center justify-between mb-6">
        <p className="font-mono text-[9px] text-text-dim tracking-widest uppercase">admin — posts</p>
        <button onClick={() => { setEditing({ published: false, tags: [], type: 'essay' }); setView('edit') }}
          className="font-mono text-[10px] border border-border-hover text-text-secondary px-3 py-1.5 rounded hover:text-text-primary transition-colors">
          + new post
        </button>
      </div>
      <div>
        {posts.map(p => (
          <div key={p.id} className="flex items-center justify-between py-3 border-b border-border gap-4">
            <div className="flex flex-col gap-1 min-w-0">
              <span className="font-mono text-sm text-text-secondary truncate">{p.title || '(untitled)'}</span>
              <span className="font-mono text-[10px] text-text-dim">{p.slug} · {p.type}</span>
            </div>
            <div className="flex items-center gap-3 shrink-0">
              <span className={`font-mono text-[9px] tracking-widest uppercase ${p.published ? 'text-accent-green' : 'text-text-dim'}`}>
                {p.published ? 'live' : 'draft'}
              </span>
              <button onClick={() => { setEditing(p); setView('edit') }} className="font-mono text-[10px] text-text-dim hover:text-text-secondary transition-colors">edit</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
