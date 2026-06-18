/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      // fontFamily: {
      //   poppins: ['var(--font-poppins)']
      // },
      colors: {
        grey: {
          800: '#18141c',
          900: '#120f16'
        },
        yellow: {
          400: '#FEDE00',
        }
      },
      backgroundImage: {
        heropattern: "url(/herobgc.jpg)",
      },
      keyframes: {
        'glow-pulse': {
          '0%, 100%': { boxShadow: '0 0 8px 2px rgba(124,58,237,0.25)' },
          '50%':       { boxShadow: '0 0 22px 8px rgba(124,58,237,0.55)' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%':      { transform: 'translateY(-10px)' },
        },
      },
      animation: {
        'glow-pulse': 'glow-pulse 2.5s ease-in-out infinite',
        float:        'float 3.5s ease-in-out infinite',
      },
    },
    plugins: [],
  }
}