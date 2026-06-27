/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        paper: '#F5F0DC',
        yellow: '#FFE500',
        pink: '#FF2D78',
        ink: '#0A0A0A',
        panel: '#1A1A1A',
        green: '#B6FF39',
        'ink-faint': '#3a3a3a',
        muted: '#6b6b6b',
      },
      fontFamily: {
        display: ['"Archivo Black"', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'monospace'],
        body: ['"Plus Jakarta Sans"', 'system-ui', 'sans-serif'],
      },
      borderRadius: {
        DEFAULT: '0',
        none: '0',
        sm: '0',
        md: '0',
        lg: '0',
        xl: '0',
        '2xl': '0',
        full: '9999px',
      },
    },
  },
  plugins: [],
}
