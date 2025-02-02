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
      }
    }
  },
  plugins: []
} satisfies Config;
