/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            backgroundImage: {
                'custom-gradient': 'linear-gradient(45deg, #4b1c5a, #9550b0)',
            },
        },
    },
    plugins: [],
}