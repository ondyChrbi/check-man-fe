module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  safelist: [
    'border-r-4',
    'border-r-8'
  ],
  theme: {
    extend: {},
    fontFamily: {
      'roboto': ['Roboto'],
    }
  },
  variants: {
    width: ["responsive", "hover", "focus"]
  },
  plugins: [],
}
