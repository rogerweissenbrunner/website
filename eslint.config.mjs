import nextCoreWebVitals from 'eslint-config-next/core-web-vitals'
import nextTypeScript from 'eslint-config-next/typescript'
import prettierPlugin from 'eslint-plugin-prettier'

const config = [
  ...nextCoreWebVitals,
  ...nextTypeScript,
  {
    ignores: ['.next/**', 'dist/**', 'node_modules/**']
  },
  {
    plugins: {
      prettier: prettierPlugin
    },
    rules: {
      'prettier/prettier': 'error',
      // Keep existing mounted flag pattern for theme hydration control.
      'react-hooks/set-state-in-effect': 'off'
    }
  }
]

export default config
