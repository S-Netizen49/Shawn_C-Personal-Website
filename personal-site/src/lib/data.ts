import { createClient } from '@/lib/supabase/server'
import type { Post, Project } from '@/lib/types'

export async function getPosts(limit?: number): Promise<Post[]> {
  const supabase = createClient()
  let query = supabase
    .from('posts')
    .select('*')
    .eq('published', true)
    .order('published_at', { ascending: false })

  if (limit) query = query.limit(limit)

  const { data, error } = await query
  if (error) { console.error(error); return [] }
  return data ?? []
}

export async function getPost(slug: string): Promise<Post | null> {
  const supabase = createClient()
  const { data, error } = await supabase
    .from('posts')
    .select('*')
    .eq('slug', slug)
    .eq('published', true)
    .single()

  if (error) { console.error(error); return null }
  return data
}

export async function getProjects(featuredOnly = false): Promise<Project[]> {
  const supabase = createClient()
  let query = supabase.from('projects').select('*').order('created_at', { ascending: false })
  if (featuredOnly) query = query.eq('featured', true)

  const { data, error } = await query
  if (error) { console.error(error); return [] }
  return data ?? []
}

export async function getProject(slug: string): Promise<Project | null> {
  const supabase = createClient()
  const { data, error } = await supabase
    .from('projects')
    .select('*')
    .eq('slug', slug)
    .single()

  if (error) { console.error(error); return null }
  return data
}
