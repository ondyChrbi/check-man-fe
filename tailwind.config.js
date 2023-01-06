module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  safelist: [
    'border-r-4',
    'border-r-8'
  ],
  theme: {
    extend: {
      width: {
        '256': '64rem',
      }
    },
    fontFamily: {
      'roboto': ['Roboto', 'sans-serif'],
    }
  },
  variants: {
    width: ["responsive", "hover", "focus"]
  },
  plugins: [],
}
