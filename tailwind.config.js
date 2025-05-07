module.exports = {
  mode: 'jit',
  content: ['./**/*.html', './**/*.hbs'],
  safelist: [
    'animate-slide-fade-in',
    'animate-slide-fade-out',
    'backdrop-blur-sm',
    'transition-all',
    'duration-300',
  ],
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
      translate: {
        'neg-120': '-120%',
      },
      keyframes: {
        'slide-fade-in': {
          '0%': { opacity: '0', transform: 'translateY(-20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        'slide-fade-out': {
          '0%': { opacity: '1', transform: 'translateY(0)' },
          '100%': { opacity: '0', transform: 'translateY(-20px)' },
        },
      },
      animation: {
        'slide-fade-in': 'slide-fade-in 300ms ease-out both',
        'slide-fade-out': 'slide-fade-out 300ms ease-in both',
      },
    },
  },
  variants: {},
  plugins: [],
};
