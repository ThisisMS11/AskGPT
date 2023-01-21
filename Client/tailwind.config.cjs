/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      backgroundColor: theme => ({
        ...theme('colors'),
        'AuthBackground': 'white',
        'AuthForm': '#151515',
        'AuthButton': '#273c75',
        'AuthSignup': '#495b94',
        'AuthInput': '#1e1e1e'
      })
    },
  },
  plugins: [],
}