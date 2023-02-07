/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/app/**/*.{js,ts,jsx,tsx}', // Note the addition of the `app` directory.
    './src/pages/**/*.{js,ts,jsx,tsx}',
    './src/components/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      keyframes: {
        hide: {
          from: {
            opacity: 1,
          },
          to: {
            opacity: 0,
          },
        },
        slideIn: {
          from: {
            transform: 'translateX(calc(100% + 1.5rem))',
          },
          to: {
            transform: 'translateX(0)',
          },
        },
        swipeOut: {
          from: {
            transform: 'translateX(var(--radix-toast-swipe-end-x))',
          },
          to: {
            transform: 'translateX(calc(100% + 1.5rem))',
          },
        },
      },
      animation: {
        slideIn: 'slideIn 150ms cubic-bezier(0.16, 1, 0.3, 1)',
        hide: 'hide 100ms ease-in',
        swipeOut: 'swipeOut 100ms ease-out',
      },
    },
  },
  plugins: [require('tailwindcss-radix')()],
};
