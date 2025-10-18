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
        primary: {
          50: '#f9f6f0',
          100: '#f2ede1',
          200: '#e5dbc3',
          300: '#d1c096',
          400: '#c0a876',
          500: '#b39560',
          600: '#a07c52',
          700: '#856245',
          800: '#6c5040',
          900: '#5a4437',
        },
        secondary: {
          50: '#f6f5f0',
          100: '#edebe1',
          200: '#dbd7c3',
          300: '#c4be96',
          400: '#b0a876',
          500: '#9d9360',
          600: '#897b52',
          700: '#726245',
          800: '#5f5040',
          900: '#514437',
        },
        beige: {
          50: '#faf9f6',
          100: '#f5f2ed',
          200: '#ebe5d9',
          300: '#ddd4c0',
          400: '#cdc0a2',
          500: '#bfab89',
          600: '#a8936f',
          700: '#8d7a5d',
          800: '#746650',
          900: '#5e5444',
        }
      },
      fontFamily: {
        'sans': ['Inter', 'ui-sans-serif', 'system-ui'],
        'serif': ['Playfair Display', 'ui-serif', 'Georgia'],
      },
      animation: {
        'fadeIn': 'fadeIn 0.8s ease-in-out',
        'slideUp': 'slideUp 0.6s ease-out',
        'bounce-slow': 'bounce 3s infinite',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { transform: 'translateY(30px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
      },
    },
  },
  plugins: [],
}