/** @type {import('tailwindcss').Config} */
// eslint-disable-next-line
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      height: {
        screen: "100dvh",
      },
      colors: {
        grey: "#EEEEEE",
        navy1: "#76ABAE",
        navy2: "#31363F",
        navy3: "#222831",
      },
    },
  },
  plugins: [require("@xpd/tailwind-3dtransforms")],
};
