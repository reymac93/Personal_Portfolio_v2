// eslint-config-next 16 ships native flat config arrays — no FlatCompat needed.
import coreWebVitals from 'eslint-config-next/core-web-vitals'
import typescript from 'eslint-config-next/typescript'

/** @type {import('eslint').Linter.Config[]} */
const eslintConfig = [
  { ignores: ['.next/**', 'node_modules/**', 'next-env.d.ts', 'scripts/**'] },
  ...coreWebVitals,
  ...typescript,
]

export default eslintConfig
