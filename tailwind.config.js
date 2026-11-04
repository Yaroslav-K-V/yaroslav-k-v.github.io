/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        canvas: 'var(--color-obsidian-canvas)',
        surface: 'var(--color-carbon-lift)',
        stroke: 'var(--color-ash-stroke)',
        graphite: 'var(--color-graphite-mid)',
        granite: 'var(--color-warm-granite)',
        stone: 'var(--color-pale-stone)',
        bone: 'var(--color-bone)',
        chalk: 'var(--color-chalk)',
        signal: '#ee6018',
        metric: '#a0ca92',
        dark: {
          bg: '#101010',
          surface: '#1d1a18',
          border: '#3d3a39',
          hover: '#4d4947',
        },
      },
      borderRadius: {
        control: '4px',
        panel: '8px',
      },
      fontFamily: {
        mono: ['"Geist Mono"', 'ui-monospace', 'monospace'],
        sans: ['"Geist Sans"', 'system-ui', 'sans-serif'],
      },
    },
  },
  plugins: [],
};
