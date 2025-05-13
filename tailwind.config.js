/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        montserrat: ['Montserrat', 'sans-serif'],
      },
      colors: {
        dark: '#0f0f0f',
        cigar: {
          gold: '#f7931e',
          ember: '#e25822',
          ash: '#c0c0c0',
          smoke: '#f5f5f5',
        }
      },
      animation: {
        'smoke-1': 'smoke 3s ease-in infinite',
        'smoke-2': 'smoke 3s ease-in 1s infinite',
        'smoke-3': 'smoke 3s ease-in 2s infinite',
        'float': 'float 6s ease-in-out infinite',
      },
      keyframes: {
        smoke: {
          '0%': { opacity: 0, transform: 'translateY(0) scale(1)' },
          '10%': { opacity: 0.5 },
          '100%': { opacity: 0, transform: 'translateY(-60px) scale(3)' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-10px)' },
        }
      }
    },
  },
  plugins: [],
};