import type { Config } from 'tailwindcss';

const config: Config = {
  content: ['./src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        brand: {
          50:'#f0f7ff',100:'#e0efff',200:'#bdddff',300:'#8ec5ff',
          400:'#5ea8ff',500:'#2b86ff',600:'#1569e6',700:'#0f52b3',
          800:'#0c3c80',900:'#092a59'
        }
      },
      boxShadow: {
        glow: '0 0 .75rem rgba(34,211,238,.4)'
      }
    }
  },
  plugins: []
};
export default config;
