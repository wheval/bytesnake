/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        'snake-green': '#10B981',
        'snake-dark': '#065F46',
        'food-red': '#EF4444',
        'bg-dark': '#1F2937',
      },
    },
  },
  plugins: [],
}
