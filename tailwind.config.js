module.exports = {
    content: [
        "./src/**/*.{js,jsx,ts,tsx}",
    ],
    safelist: [
        'border-r-4',
        'border-r-8',
        'border-red-800',
        'border-green-600',
        'border-blue-400',
        'border-amber-300',
        'text-amber-300',
        'text-green-600',
        'text-blue-400',
        'text-red-800',
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
