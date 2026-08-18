import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
    './src/lib/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        viruj: {
          navy: {
            700: '#1A3560',
            800: '#0F2040',
            900: '#0A1628',
            950: '#070E1A',
          },
          teal: {
            50: '#E0F5EF',
            200: '#9FE0C8',
            500: '#0F9E72',
            600: '#0F6E56',
            800: '#085041',
          },
          violet: {
            50: '#F0EEFF',
            200: '#C4BAFC',
            500: '#7F5AF0',
            700: '#5B3DB8',
          },
          neutral: {
            50: '#F6F9FC',
            100: '#ECF1F8',
            200: '#D4DCE8',
            600: '#5A6A80',
            800: '#2C3A4E',
            950: '#0F1923',
          },
        },
      },
      fontFamily: {
        sans: ['var(--font-sans)', 'system-ui', 'sans-serif'],
      },
    },
  },
  plugins: [],
};

export default config;
