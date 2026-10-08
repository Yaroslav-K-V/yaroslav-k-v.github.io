/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        accent: {
          light: '#1d6b55',
          DEFAULT: '#1d6b55',
          dark: '#34d399',
          hover: '#165342',
        },
      },
    },
  },
  plugins: [],
};
