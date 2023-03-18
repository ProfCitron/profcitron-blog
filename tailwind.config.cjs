/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{html,js,svelte,ts}'],
  theme: {
    fontFamily: {
      'beVietnamPro' : ['Be Vietnam Pro', 'sans-serif'],
      'poppins' : ['Poppins', 'sans-serif'],
    },
    colors: {
      'white' : '#FFFFFF',
      'klein-blue' : '#0740AF',
      'french-sky-blue' : '#8BB7FC',
      'ribbon-red' : '#EC0B43',
      'candy-pink' : '#FFD4E2',
      'aurora-yellow' : '#FFCA2C',
      'naples-yellow' : '#FFE6A9',
      'inky-black' : '#151515',

    },
    extend: {
      screens: {
        'custom-max': 'max(100%, 1280px)',
      }
    },
  },
  plugins: [
    require('@tailwindcss/forms'),
  ],
}
