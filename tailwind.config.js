/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    container: {
      center: true,          // Center the container
      padding: '1rem',       // Optional: Add horizontal padding
    },
    extend: {},
  },
  plugins: [],
}
