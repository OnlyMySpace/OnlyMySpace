/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{html,js,svelte,ts}'],
  theme: {
    extend: {
      animation: {
        'rainbow': 'rainbow 10s ease-in-out infinite',
        'flicker': 'flicker 1s infinite alternate'
      },
      keyframes: {
        rainbow: {
          '0%, 100%': { color: 'rgb(236,100,75)' },
          '10%': { color: 'rgb(219,10,91)' },
          '20%': { color: 'rgb(174,168,211)' },
          '30%': { color: 'rgb(89,171,227)' },
          '40%': { color: 'rgb(37,116,169)' },
          '50%': { color: 'rgb(3,201,169)' },
          '60%': { color: 'rgb(22,160,133)' },
          '70%': { color: 'rgb(233,212,96)' },
          '80%': { color: 'rgb(243,156,18)' },
          '90%': { color: 'rgb(236,240,241)' },
        },
        flicker: {
          '0%': {
            opacity: 0.3,
            "box-shadow": "0 0 20px 10px rgba(255, 69, 0, 0.7)"
          },
          '100%': {
            opacity: 0.5,
            "box-shadow": "0 0 15px 5px rgba(255, 69, 0, 0.5)"
          }
        }
      }
    }
  },
  plugins: [require("daisyui")],
  daisyui: {
    themes: ["dracula"]
  }
};