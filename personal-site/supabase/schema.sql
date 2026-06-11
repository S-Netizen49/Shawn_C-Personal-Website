-- ============================================================
-- Personal site schema
-- Run this in: Supabase Dashboard > SQL Editor > New Query
-- ============================================================

-- Posts table
create table if not exists public.posts (
  id            uuid primary key default gen_random_uuid(),
  slug          text unique not null,
  title         text not null,
  excerpt       text not null default '',
  content       text not null default '',
  tags          text[] not null default '{}',
  type          text not null default 'essay'
                  check (type in ('essay','tutorial','deep-dive','photos','case-study')),
  published     boolean not null default false,
  published_at  timestamptz not null default now(),
  reading_time  int not null default 5,
  cover_image_url text,
  created_at    timestamptz not null default now(),
  updated_at    timestamptz not null default now()
);

-- Projects table
create table if not exists public.projects (
  id                uuid primary key default gen_random_uuid(),
  slug              text unique not null,
  name              text not null,
  description       text not null default '',
  long_description  text not null default '',
  stack             text[] not null default '{}',
  url               text,
  github_url        text,
  status            text not null default 'active'
                      check (status in ('active','archived','wip')),
  featured          boolean not null default false,
  accent_color      text not null default '#4ade80',
  glyph             text not null default '⌘',
  created_at        timestamptz not null default now()
);

-- Auto-update updated_at on posts
create or replace function update_updated_at()
returns trigger language plpgsql as $$
begin new.updated_at = now(); return new; end;
$$;

drop trigger if exists posts_updated_at on public.posts;
create trigger posts_updated_at
  before update on public.posts
  for each row execute function update_updated_at();

-- RLS: public read for published posts + projects
alter table public.posts enable row level security;
alter table public.projects enable row level security;

create policy "public posts are readable"
  on public.posts for select
  using (published = true);

create policy "public projects are readable"
  on public.projects for select
  using (true);

-- Authenticated users (you) can do everything
create policy "auth users manage posts"
  on public.posts for all
  using (auth.role() = 'authenticated')
  with check (auth.role() = 'authenticated');

create policy "auth users manage projects"
  on public.projects for all
  using (auth.role() = 'authenticated')
  with check (auth.role() = 'authenticated');

-- ── Seed data (optional — delete after testing) ──────────────

insert into public.projects (slug, name, description, long_description, stack, featured, accent_color, glyph, status) values
(
  'drift',
  'Drift',
  'Minimal writing app. Publishes to your own domain. No cloud.',
  '## What it is

Drift is a desktop writing app built with Tauri and React. You write in a distraction-free editor, and it publishes directly to your own server over SSH — no accounts, no subscriptions, no cloud vendor.

## Why I built it

I was tired of every writing tool wanting to own my content. Medium, Substack, Ghost — they all have lock-in somewhere. I wanted something that felt like writing in a text editor but published like a CMS.

## How it works

Under the hood it''s a Tauri app (Rust + React). Files are stored locally as MDX. When you hit publish, it bundles them and rsync''s to a directory on your server where a tiny static server handles routing.

```rust
// The publish pipeline
pub fn publish(config: &Config, post: &Post) -> Result<()> {
    let bundle = bundle_mdx(&post.content)?;
    rsync(&bundle, &config.remote_path)?;
    Ok(())
}
```

## What I learned

Building with Tauri was surprisingly pleasant. Rust for the system-level stuff, React for the UI, and a clean IPC bridge between them. The hardest part was getting the MDX bundler to run in a Rust subprocess without breaking.',
  ARRAY['Tauri','Rust','React','MDX'],
  true,
  '#4ade80',
  '⌘',
  'active'
),
(
  'querybook',
  'Querybook',
  'Local-first SQL notebook with AI-assisted query generation.',
  '## Overview

A lightweight SQL notebook that runs entirely on your machine. Connect to any Postgres, SQLite, or MySQL database and write queries with inline results. AI query suggestions are powered by the OpenAI API.',
  ARRAY['SQLite','Next.js','OpenAI','TypeScript'],
  true,
  '#60a5fa',
  '▦',
  'active'
);
