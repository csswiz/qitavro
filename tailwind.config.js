/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#652E3C', // Royal Burgundy (Primary Brand Identity)
          light: '#7A3849',
          dark: '#522531',
          deep: '#421F2A',
        },
        secondary: {
          DEFAULT: '#231713', // Dark Luxury Brown (Espresso / Dark Mahogany)
          light: '#31211B',
          deep: '#1A100C',
          surface: '#2D1E18',
          border: '#453026',
        },
        darkBrown: {
          DEFAULT: '#231713', // Dark Luxury Brown
          deep: '#1A100C',
          light: '#31211B',
          surface: '#2D1E18',
          muted: '#453026',
        },
        warmBrown: {
          50: '#FDFCF9',
          100: '#FAF5EE', // Warm premium light brown (card & container surface)
          200: '#F4ECE1', // Warm premium light brown (subtle elevation)
          300: '#E8DCCF',
          400: '#D5C3AF',
          500: '#B69A72', // Muted Gold / Warm Brown Accent
          DEFAULT: '#FAF5EE',
          light: '#FAF5EE',
          dark: '#F4ECE1',
        },
        white: {
          DEFAULT: '#FAF5EE', // Warm premium brown light (replacing cold stark white)
          pure: '#FFFFFF',
          warm: '#F4ECE1',
        },
        ivory: {
          DEFAULT: '#F6F0E8',
          light: '#FAF6F0',
          dark: '#EBE2D5',
          warm: '#FAF5EE',
        },
        burgundy: {
          DEFAULT: '#652E3C',
          light: '#7A3849',
          dark: '#522531',
        },
        wine: {
          DEFAULT: '#421F2A',
          deep: '#331720',
          hover: '#3A1B25',
        },
        charcoal: {
          DEFAULT: '#272321',
          light: '#3C3734',
          muted: '#635C57',
        },
        gold: {
          DEFAULT: '#B69A72',
          light: '#C7B08E',
          dark: '#9E825A',
        },
        rose: {
          DEFAULT: '#C7A7A2',
          light: '#DAC1BD',
        },
        stone: {
          DEFAULT: '#DED6CC',
          light: '#EBE5DC',
          dark: '#C8BEB2',
        },
      },
      fontFamily: {
        serif: ['"Cormorant Garamond"', 'Playfair Display', 'Georgia', 'serif'],
        editorial: ['"Playfair Display"', '"Cormorant Garamond"', 'serif'],
        sans: ['Inter', '"DM Sans"', 'system-ui', 'sans-serif'],
      },
      boxShadow: {
        'book': '0 8px 24px -4px rgba(35, 23, 19, 0.14), 0 2px 6px -1px rgba(35, 23, 19, 0.08)',
        'book-hover': '0 20px 32px -8px rgba(101, 46, 60, 0.25), 0 8px 16px -2px rgba(35, 23, 19, 0.15)',
        'subtle': '0 2px 8px rgba(35, 23, 19, 0.06)',
        'modal': '0 25px 50px -12px rgba(26, 16, 12, 0.35)',
        'luxury': '0 12px 36px -6px rgba(35, 23, 19, 0.22), 0 4px 12px -2px rgba(101, 46, 60, 0.12)',
      },
    },
  },
  plugins: [],
};
