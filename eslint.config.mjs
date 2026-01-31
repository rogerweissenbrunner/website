import nextCoreWebVitals from 'eslint-config-next/core-web-vitals'
import nextTypeScript from 'eslint-config-next/typescript'

const config = [
  ...nextCoreWebVitals,
  ...nextTypeScript,
  {
    ignores: ['.next/**', 'dist/**', 'node_modules/**']
  },
  {
    rules: {
      // Keep existing mounted flag pattern for theme hydration control.
      'react-hooks/set-state-in-effect': 'off'
    }
  }
]

export default config