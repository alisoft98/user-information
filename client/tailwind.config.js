/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    // "./src/**/*.{html,ts}",
    "./projects/panel-admin/src/**/*.{html,ts}",
    "./node_modules/flowbite/**/*.js"
  ],
  theme: {
    extend: {},
    colors: {
      primary: "#9cd67d",
      blue: "#8116f3",
   },
  },
  plugins: [],
}