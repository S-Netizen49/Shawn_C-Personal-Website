import type { Config } from 'tailwindcss'

const config: Config = {
  content: ['./src/**/*.{js,ts,jsx,tsx,mdx}'],
  theme: {
    extend: {
      fontFamily: {
        mono: ['var(--font-mono)', 'SF Mono', 'Fira Code', 'monospace'],
        sans: ['var(--font-sans)', 'Inter', 'system-ui', 'sans-serif'],
      },
      colors: {
        bg: {
          DEFAULT: '#080808',
          surface: '#111111',
          hover: '#161616',
        },
        border: {
          DEFAULT: '#1a1a1a',
          hover: '#2a2a2a',
        },
        text: {
          primary: '#d4d4d4',
          secondary: '#888888',
          muted: '#444444',
          dim: '#2d2d2d',
        },
        accent: {
          green: '#4ade80',
          blue: '#60a5fa',
          amber: '#f59e0b',
          purple: '#a78bfa',
        },
      },
      typography: {
        DEFAULT: {
          css: {
            color: '#888888',
            maxWidth: '65ch',
            'h1,h2,h3,h4': { color: '#d4d4d4', fontWeight: '500', letterSpacing: '-0.02em' },
            a: { color: '#d4d4d4', textDecoration: 'underline', textDecorationColor: '#2a2a2a' },
            'a:hover': { textDecorationColor: '#888888' },
            strong: { color: '#d4d4d4', fontWeight: '500' },
            code: { color: '#4ade80', background: '#111', padding: '2px 6px', borderRadius: '4px', fontSize: '0.875em' },
            'code::before': { content: 'none' },
            'code::after': { content: 'none' },
            pre: { background: '#0d0d0d', border: '1px solid #1a1a1a' },
            blockquote: { borderLeftColor: '#2a2a2a', color: '#666' },
            hr: { borderColor: '#1a1a1a' },
          },
        },
      },
    },
  },
  plugins: [require('@tailwindcss/typography')],
}

export default config
