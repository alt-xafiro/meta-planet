import type { Config } from 'tailwindcss';

export default {
  content: ['./src/**/*.{js,ts,jsx,tsx,mdx}', './app/**/*.{js,ts,jsx,tsx,mdx}'],
  theme: {
    extend: {
      colors: {
        space: {
          '500': '#1d2948',
          '600': '#141d33',
          '700': '#0f1628',
          '800': '#050a16'
        }
      },
      backgroundImage: {
        'gradient-space':
          'linear-gradient(145deg, #1d2948 0%, #141d33 38%, #0f1628 51%, #050a16 100%)'
      },
      keyframes: {
        'full-slide': {
          '0%': {
            'background-position': 'calc(-100% - 5000px) calc(-100% - 10000px)'
          },
          '100%': {
            'background-position': 'calc(100% + 5000px) calc(100% + 10000px)'
          }
        }
      },
      animation: {
        'infinite-sliding': '1500s linear infinite both alternate full-slide'
      }
    }
  },
  plugins: []
} satisfies Config;
