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
        'border-gray-500',
        'border-teal-6000',
        'text-amber-300',
        'text-green-600',
        'text-blue-400',
        'text-red-800',
        'text-gray-500',
        'text-blue-600',
        'text-green-300',
        'text-purple-800',
        'text-red-800',
        'text-blue-400',
        'bg-teal-300',
        'bg-blue-400',
        'bg-red-500',
        'bg-gray-400',
        'text-gray-800'
    ],
    theme: {
        extend: {
            width: {
                '256': '64rem',
            },
            minWidth: {
                '14' : '3.5rem;',
            },
            colors: {
                'bing' : '#ffffff',
                'return-to-edit' : '#FFA500',
                'fail' : '#FF0000',
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
