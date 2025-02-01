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
        },
        'orbit-1': {
          '0%': {
            transform:
              'translate(-50%, -50%) rotate(calc(var(--microplanet-1-start) + 360deg))'
          },
          '100%': {
            transform:
              'translate(-50%, -50%) rotate(var(--microplanet-1-start))'
          }
        },
        'orbit-2': {
          '0%': {
            transform:
              'translate(-50%, -50%) rotate(calc(var(--microplanet-2-start) + 360deg))'
          },
          '100%': {
            transform:
              'translate(-50%, -50%) rotate(var(--microplanet-2-start))'
          }
        },
        'orbit-3': {
          '0%': {
            transform:
              'translate(-50%, -50%) rotate(calc(var(--microplanet-3-start) + 360deg))'
          },
          '100%': {
            transform:
              'translate(-50%, -50%) rotate(var(--microplanet-3-start))'
          }
        },
        'orbit-4': {
          '0%': {
            transform:
              'translate(-50%, -50%) rotate(calc(var(--microplanet-4-start) + 360deg))'
          },
          '100%': {
            transform:
              'translate(-50%, -50%) rotate(var(--microplanet-4-start))'
          }
        },
        'orbit-5': {
          '0%': {
            transform:
              'translate(-50%, -50%) rotate(calc(var(--microplanet-5-start) + 360deg))'
          },
          '100%': {
            transform:
              'translate(-50%, -50%) rotate(var(--microplanet-5-start))'
          }
        },
        'orbit-6': {
          '0%': {
            transform:
              'translate(-50%, -50%) rotate(calc(var(--microplanet-6-start) + 360deg))'
          },
          '100%': {
            transform:
              'translate(-50%, -50%) rotate(var(--microplanet-6-start))'
          }
        }
      },
      animation: {
        'infinite-sliding': '1500s linear infinite both alternate full-slide',
        'orbit-1': 'orbit-1',
        'orbit-2': 'orbit-2',
        'orbit-3': 'orbit-3',
        'orbit-4': 'orbit-4',
        'orbit-5': 'orbit-5',
        'orbit-6': 'orbit-6'
      }
    }
  },
  plugins: []
} satisfies Config;
