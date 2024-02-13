/** @type {import('tailwindcss').Config} */
const colors = require('tailwindcss/colors')

export default {
  content: [
    "./index.html",
    "./src/**/*.{vue,ts,tsx,js,jsx}",
    "./formkit.config.js",
    './node_modules/vue-tailwind-datepicker/**/*.js'
  ],
  theme: {
    extend: {
      textStrokeWidth: {
        '1': '10px',  // Corrige el ancho del contorno del texto
      },
      textStrokeColor: {
        'black': '#000',  // Define el color del contorno del texto
      },
      colors: {
        "vtd-primary": colors.indigo
      }
    },
  },
  plugins: [
    require('@tailwindcss/forms'),
    function ({ addUtilities }) {
      const newUtilities = {
        '.text-stroke-1': {
          WebkitTextStrokeWidth: 'var(--text-stroke-width-1, 0)',
          WebkitTextStrokeColor: 'var(--text-stroke-color-black, #000)',
        },
      };

      addUtilities(newUtilities, ['responsive', 'hover']);
    },
  ],
};

