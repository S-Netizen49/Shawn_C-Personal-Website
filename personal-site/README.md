# personal-site

A dark, minimal personal blog built with Next.js 14, Supabase, and Framer Motion.

## Stack

- **Next.js 14** (App Router, TypeScript)
- **Supabase** (Postgres + Auth + Storage)
- **Tailwind CSS** + `@tailwindcss/typography`
- **next-mdx-remote** for MDX rendering in blog posts
- **Framer Motion** for page transitions (add as needed)

## Getting started

### 1. Clone and install

```bash
git clone https://github.com/you/personal-site
cd personal-site
npm install
```

### 2. Set up Supabase

1. Create a project at [supabase.com](https://supabase.com)
2. Go to **SQL Editor** and run `supabase/schema.sql`
3. Go to **Authentication > Users** and create your account
4. Copy your project URL and anon key from **Settings > API**

### 3. Configure env

```bash
cp .env.example .env.local
# Fill in NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY
```

### 4. Run locally

```bash
npm run dev
# → http://localhost:3000
```

## Writing posts

Visit `http://localhost:3000/admin` — sign in with your Supabase auth credentials.

Posts are written in **MDX** — Markdown + React components. You can use the `<Callout>` component inline:

```mdx
## My heading

Normal markdown paragraph here.

<Callout type="info">
  This renders as a styled callout box.
</Callout>

\`\`\`typescript
const x: number = 42
\`\`\`
```

## Customising

- **Your name / city / bio** → `src/app/page.tsx` (top of file)
- **Nav links** → `src/components/Nav.tsx`
- **Ticker tags** → `src/components/Ticker.tsx`
- **Accent colors** → `tailwind.config.ts`
- **Social links** → `src/app/about/page.tsx` and footer in `src/app/page.tsx`

## Deploying to Vercel

```bash
npx vercel
# Add the same env vars in Vercel dashboard > Settings > Environment Variables
```

That's it — push to `main` and it auto-deploys.
