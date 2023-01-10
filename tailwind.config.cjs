const colors = require("tailwindcss/colors");

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{html,js,svelte,ts}'],
  theme: {
    extend: {
      colors: {
        background: colors.blue[900],
        primary: colors.blue,
        accent: colors.orange,
        attribute: {
          all: "#ffd87f",
          smile: "#fa7dca",
          pure: "#84cc91",
          cool: "#a2e3ff"
        }
      },
      borderRadius: {
        "card-v": "4.66% / 3.33%",
        "card-h": "3.33% / 4.66%",
        "card-fallback": "6px",
        "4xl": "2rem"
      },
      fontSize: {
        "none": ["0px", "1.25rem"]
      }
    }
  },
  plugins: [],
}
