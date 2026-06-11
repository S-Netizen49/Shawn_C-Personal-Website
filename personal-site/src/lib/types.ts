export type Post = {
  id: string
  slug: string
  title: string
  excerpt: string
  content: string
  tags: string[]
  type: 'essay' | 'tutorial' | 'deep-dive' | 'photos' | 'case-study'
  published: boolean
  published_at: string
  reading_time: number
  cover_image_url?: string
  created_at: string
  updated_at: string
}

export type Project = {
  id: string
  slug: string
  name: string
  description: string
  long_description: string
  stack: string[]
  url?: string
  github_url?: string
  status: 'active' | 'archived' | 'wip'
  featured: boolean
  accent_color: string
  glyph: string
  created_at: string
}

export type Database = {
  public: {
    Tables: {
      posts: { Row: Post; Insert: Omit<Post, 'id' | 'created_at' | 'updated_at'>; Update: Partial<Post> }
      projects: { Row: Project; Insert: Omit<Project, 'id' | 'created_at'>; Update: Partial<Project> }
    }
  }
}
