/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{html,js,svelte,ts}'],
  // Entries in safelist will always be included in the final build.
  // This allows dynamically assigning these values.
  safelist: [
    "text-yellow-400",
    "fill-yellow-400",
    "text-blue-300",
    "fill-blue-300",
    "stroke-blue-300",
    "fill-neutral-300",
    "text-neutral-300",
    "fill-neutral-500",
    "text-neutral-500"
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}
