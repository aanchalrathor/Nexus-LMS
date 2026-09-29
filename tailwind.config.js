/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        forest: {
          50: '#f2f7f4',
          100: '#e1ede6',
          200: '#c5dcd0',
          300: '#9ec3b0',
          400: '#72a38c',
          500: '#4d836b',
          600: '#386954',
          700: '#2c5343',
          800: '#1b3b2f', // Core dark green
          900: '#132c23', // Deepest green
          950: '#0a1913',
        },
        ivory: {
          50: '#fbf9f5', // Main warm off-white background
          100: '#f6f3ea',
          200: '#ede6d6',
          300: '#dfd4be',
          400: '#ccbc9e',
          500: '#ba9f7f',
          800: '#4a3f35',
          900: '#2b241e',
        },
        charcoal: {
          50: '#f6f7f6',
          100: '#e2e5e3',
          200: '#c4cbc6',
          300: '#9faaa2',
          400: '#79857d',
          500: '#5a665e',
          600: '#444e47',
          700: '#343c37',
          800: '#262c28',
          900: '#191d1a', // Core dark text
          950: '#0d100e',
        },
        gold: {
          50: '#fefaee',
          100: '#fdf4d3',
          200: '#fae7a5',
          300: '#f6d46d',
          400: '#f1bd38',
          500: '#c9961d', // Core warm gold accent
          600: '#ab7914',
          700: '#875a13',
          800: '#6f4716',
          900: '#5e3c17',
        }
      },
      fontFamily: {
        serif: ['"Playfair Display"', 'Georgia', 'serif'],
        sans: ['"Inter"', 'system-ui', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'sans-serif'],
      }
    },
  },
  plugins: [],
}
