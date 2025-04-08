import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/app/**/*.{js,ts,jsx,tsx}',
    './src/components/**/*.{js,ts,jsx,tsx}'
  ],
  theme: {
    extend: {
      colors: {
        primary: '#4B9EFF',
        secondary: '#FFD166'
      },
      fontFamily: {
        sans: ['Pretendard', 'sans-serif']
      }
    }
  },
  plugins: []
}

export default config
