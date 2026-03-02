import type { Config } from 'tailwindcss'

const config: Config = {
  content: ['./src/**/*.{js,ts,jsx,tsx,mdx}'],
  theme: {
    extend: {
      colors: {
        bg: '#050505',
        cyan: '#00e5ff',
        purple: '#7c3aed',
        green: '#00ff88',
        amber: '#f59e0b',
        pink: '#ec4899',
        'text-primary': '#f0f4f8',
        'text-secondary': '#4a5568',
        'text-dim': '#1e293b',
        'mono-color': '#64748b',
      },
      fontFamily: {
        satoshi: ['Satoshi', 'sans-serif'],
        mono: ['JetBrains Mono', 'monospace'],
      },
    },
  },
  plugins: [],
}
export default config
