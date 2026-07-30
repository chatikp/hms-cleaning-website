/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx,ts,tsx}'],
  darkMode: 'class',
  theme: {
    container: {
      center: true,
      padding: {
        DEFAULT: '1.25rem',
        sm: '1.5rem',
        lg: '2rem',
        xl: '2.5rem',
      },
    },
    extend: {
      colors: {
        foreground: '#1F1F24',
        blue: {
          50: '#F0F7FC',
          100: '#DCEBF6',
          200: '#B9D7ED',
          300: '#8FBEE0',
          400: '#64A3D1',
          500: '#4488BE',
          600: '#33709F',
          700: '#2A5980',
          800: '#254A69',
          900: '#213F58',
          950: '#142838',
        },
        sand: {
          50: '#FBF8F4',
          100: '#F6EEE4',
          200: '#ECDAC6',
          300: '#DEBF9C',
          400: '#D0A471',
          500: '#C18644',
          600: '#9D6C34',
          700: '#7A5429',
          800: '#634421',
          900: '#4C351A',
          950: '#2A1D0E',
        },
        charcoal: {
          50: '#F7F7F8',
          100: '#EEEEF0',
          200: '#D9D9DE',
          300: '#B8B9C1',
          400: '#91929D',
          500: '#6F707C',
          600: '#575862',
          700: '#43434B',
          800: '#2E2E34',
          900: '#1F1F24',
          950: '#131316',
        },
        cream: '#1C1916',
      },
      fontFamily: {
        heading: ['Poppins', 'system-ui', 'sans-serif'],
        sans: ['Inter', 'system-ui', 'sans-serif'],
        accent: ['Poppins', 'system-ui', 'sans-serif'],
        script: ['"Great Vibes"', 'cursive'],
        helvetica: ['"Helvetica Neue"', 'Helvetica', 'Arial', 'sans-serif'],
      },
      boxShadow: {
        soft: '0 2px 8px -2px rgba(31, 31, 36, 0.06), 0 8px 24px -8px rgba(31, 31, 36, 0.08)',
        'soft-lg': '0 4px 16px -4px rgba(31, 31, 36, 0.08), 0 16px 40px -12px rgba(31, 31, 36, 0.12)',
        'soft-xl': '0 8px 30px -6px rgba(31, 31, 36, 0.10), 0 24px 60px -16px rgba(31, 31, 36, 0.14)',
        'glow-blue': '0 0 0 1px rgba(68, 136, 190, 0.12), 0 8px 24px -8px rgba(68, 136, 190, 0.35)',
        'glow-sand': '0 0 0 1px rgba(193, 134, 68, 0.14), 0 8px 24px -8px rgba(193, 134, 68, 0.35)',
      },
      borderRadius: {
        xl: '1rem',
        '2xl': '1.25rem',
        '3xl': '1.75rem',
      },
      keyframes: {
        fadeInUp: {
          '0%': { opacity: '0', transform: 'translateY(16px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        marquee: {
          '0%': { transform: 'translateX(0)' },
          '100%': { transform: 'translateX(-50%)' },
        },
        shimmer: {
          '0%': { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        slideUpFade: {
          '0%': { opacity: '0', transform: 'translateY(var(--offset, 10px))' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
      },
      animation: {
        'fade-in-up': 'fadeInUp 0.7s cubic-bezier(0.16, 1, 0.3, 1) both',
        'fade-in': 'fadeIn 0.6s ease both',
        marquee: 'marquee 32s linear infinite',
        shimmer: 'shimmer 2s linear infinite',
        float: 'float 6s ease-in-out infinite',
        'slide-up-fade': 'slideUpFade 0.5s cubic-bezier(0.16, 1, 0.3, 1) both',
      },
      transitionTimingFunction: {
        premium: 'cubic-bezier(0.16, 1, 0.3, 1)',
      },
    },
  },
  plugins: [require('@tailwindcss/forms'), require('@tailwindcss/typography')],
}
