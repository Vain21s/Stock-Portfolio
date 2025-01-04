/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#4F46E5', // Deep Blue
        secondary: '#EC4899', // Pink
        accent: '#F59E0B', // Yellow
        lightGray: '#F3F4F6', // Light Gray
        darkGray: '#111827', // Dark Gray
      },
      backgroundImage: {
        'hero-pattern': "url('/path/to/your-image.jpg')", // Optional: For background image
      },
      boxShadow: {
        'card': '0 4px 6px rgba(0, 0, 0, 0.1)',
        'card-hover': '0 6px 12px rgba(0, 0, 0, 0.15)',
      },
    },
  },
  plugins: [],
}
