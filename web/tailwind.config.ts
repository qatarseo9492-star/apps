import type { Config } from 'tailwindcss';

export default {
  content: ['src/app/**/*.{ts,tsx}', 'src/components/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        brand: {
          DEFAULT: '#0F172A',
          accent: '#06B6D4'
        }
      }
    }
  },
  plugins: []
} satisfies Config;
