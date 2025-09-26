import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        amazon: {
          orange: '#FF9900',
          'orange-dark': '#E6870A',
          'orange-light': '#FFB84D',
          blue: '#232F3E',
          'blue-light': '#37475A',
          gray: '#F3F3F3',
        }
      }
    },
  },
  plugins: [],
}
export default config