// eslint.config.mjs

import { dirname } from 'path'
import { fileURLToPath } from 'url'
import { FlatCompat } from '@eslint/eslintrc'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

const compat = new FlatCompat({
  baseDirectory: __dirname
})

const eslintConfig = [
  ...compat.extends(
    'next/core-web-vitals',
    'next',
    'eslint:recommended',
    'plugin:prettier/recommended' // prettier 충돌 방지용
  ),
  {
    rules: {
      'react/react-in-jsx-scope': 'off', // Next.js에서는 불필요
      'prettier/prettier': 'error'       // prettier 룰 적용
    }
  }
]

export default eslintConfig
