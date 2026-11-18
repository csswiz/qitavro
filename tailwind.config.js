/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // PRIMARY: Burgundy
        primary: {
          DEFAULT: '#652E3C', // Deep rich Burgundy
          light: '#7B3B4B',
          dark: '#4E202B',
          hover: '#54222E',
          wine: '#3A151F',
          subtle: '#FAF3F4',
        },
        burgundy: {
          DEFAULT: '#652E3C',
          light: '#7B3B4B',
          dark: '#4E202B',
          hover: '#54222E',
          deep: '#3A151F',
        },
        wine: {
          DEFAULT: '#4E202B',
          deep: '#35121B',
          hover: '#421923',
        },

        // SECONDARY: Light Brown
        secondary: {
          DEFAULT: '#B8926A', // Elegant Light Brown / Warm Camel
          light: '#D9C3AB',   // Soft light brown tint
          dark: '#966F47',    // Warm roasted light brown
          hover: '#A9835D',
          subtle: '#F4EDE4',
        },
        brown: {
          DEFAULT: '#B8926A',
          light: '#D9C3AB',
          dark: '#966F47',
          hover: '#A9835D',
          subtle: '#F4EDE4',
        },
        // Mapping gold & warm accents to secondary Light Brown for seamless consistency
        gold: {
          DEFAULT: '#B8926A', // Light Brown
          light: '#D9C3AB',   // Soft Light Brown
          dark: '#966F47',    // Rich Light Brown
          hover: '#A9835D',
        },

        // BACKGROUNDS & NEUTRALS
        ivory: {
          DEFAULT: '#F8F5EE', // Warm Ivory with light brown warmth
          light: '#FCFAF6',
          dark: '#EDE5D8',
        },
        charcoal: {
          DEFAULT: '#282320', // Warm Espresso / Dark Charcoal
          light: '#3F3834',
          muted: '#685E58',
        },
        rose: {
          DEFAULT: '#C9A89B', // Warm Toasted Rose-Brown
          light: '#DDC5BC',
        },
        stone: {
          DEFAULT: '#E0D7CB', // Light Brown tinted Stone borders
          light: '#ECE5DC',
          dark: '#C5B9AA',
        },
      },
      fontFamily: {
        serif: ['"Cormorant Garamond"', 'Playfair Display', 'Georgia', 'serif'],
        editorial: ['"Playfair Display"', '"Cormorant Garamond"', 'serif'],
        sans: ['Inter', '"DM Sans"', 'system-ui', 'sans-serif'],
      },
      boxShadow: {
        'book': '0 8px 24px -4px rgba(40, 35, 32, 0.12), 0 2px 6px -1px rgba(40, 35, 32, 0.06)',
        'book-hover': '0 20px 32px -8px rgba(101, 46, 60, 0.22), 0 6px 12px -2px rgba(40, 35, 32, 0.08)',
        'subtle': '0 2px 8px rgba(40, 35, 32, 0.05)',
        'modal': '0 25px 50px -12px rgba(40, 35, 32, 0.25)',
      },
    },
  },
  plugins: [],
};
