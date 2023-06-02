module.exports = {
  mode: 'jit',
  content: ['./**/*.html', './**/*.hbs'],
  darkMode: 'class',
  theme: {
    extend: {
      fontFamily: {
        nunito: ['nunito', 'arial', 'sans-serif'],
      },
      keyframes: {
        slideIn: {
          '0%': { transform: 'translateX(-100%)' },
          '100%': { transform: 'translateX(0)' },
        },
        slideOut: {
          '0%': { transform: 'translateX(0)' },
          '100%': { transform: 'translateX(-100%)' },
        },
      },
      animation: {
        slideIn: 'slideIn 0.5s ease-in-out',
        slideOut: 'slideOut 0.5s ease-in-out',
      },
    },
  },
  variants: {},
  plugins: [],
};
