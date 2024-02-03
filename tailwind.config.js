/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{vue,ts,tsx,js,jsx}",
    "./formkit.config.js"
  ],
  theme: {
    extend: {
      textStrokeWidth: {
        '1': '10px',  // Corrige el ancho del contorno del texto
      },
      textStrokeColor: {
        'black': '#000',  // Define el color del contorno del texto
      },
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

