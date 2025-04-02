/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{ts,tsx}","./node_modules/flowbite-react/lib/**/*.{js,ts}"],
  theme: {
    extend: {},
    colors: {
      "main-border-light": "#F0F000",
      "main-border-dark": "#F0C000",
    },
    fontFamily: {
      mono: [
        "monospace",
      ],
      comic: [
          "Comic Sans MS",
          "cursive"
      ]
    }
  },
  plugins: [require("flowbite/plugin")],
}