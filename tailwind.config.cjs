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
    "text-neutral-500",
    "bg-opacity-90",
  ],
  theme: {
    extend: {
      colors: {
        bronze: 'rgba(205, 127, 50, 0.5 )',
        silver: 'rgba(192, 192, 192, 0.5)',
        gold: 'rgba(255, 215, 0, 0.5)',
      },
      animation: {
        'bounce-sm': 'bounce 1s infinite',
        'border-spin': 'border-spin 5s linear infinite',
      },
      keyframes: {
        'border-spin': {
          '100%': {
            transform: 'rotate(-360deg)',
          },
        },
      },
      transitionDuration: {
        '2000': '2000ms',
      },
      transitionDelay: {
        '2000': '2000ms',
      }
    },
  },
  plugins: [],
}
