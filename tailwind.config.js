/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          50: '#f0fdf4', // Background sangat terang
          100: '#dcfce7',
          500: '#22c55e', // Hijau utama (Primary)
          600: '#16a34a', // Hover state
          800: '#166534', // Teks gelap / Sidebar
          900: '#14532d',
        }
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'], // Gunakan font modern seperti Inter
      }
    },
  },
  plugins: [],
}