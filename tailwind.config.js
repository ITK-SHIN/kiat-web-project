export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        brand: {
          DEFAULT: "#6366F1", // indigo-500 등 원하는 값
          700: "#4338CA",
        },
      },
    },
  },
  plugins: [],
}