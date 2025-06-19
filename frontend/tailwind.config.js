/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        spark: {
          pink: '#ec4899',
          purple: '#8b5cf6',
          red: '#ef4444',
        }
      },
      backdropBlur: {
        'lg': '16px',
      }
    },
  },
  plugins: [],
} 