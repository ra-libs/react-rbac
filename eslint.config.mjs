import pluginJs from '@eslint/js'
import eslintPluginImport from 'eslint-plugin-import'
import simpleImportSort from 'eslint-plugin-simple-import-sort'
import unusedImports from 'eslint-plugin-unused-imports'
import globals from 'globals'
import tseslint from 'typescript-eslint'
import eslintPluginReact from 'eslint-plugin-react';
import eslintPluginReactHooks from 'eslint-plugin-react-hooks';
import { fixupPluginRules } from '@eslint/compat'

export default [
  pluginJs.configs.recommended,
  ...tseslint.configs.recommended,
  {
    ignores: ['dist', 'node_modules', 'coverage'],
    plugins: {
      'eslint-plugin-import': eslintPluginImport,
      'simple-import-sort': simpleImportSort,
      'unused-imports': unusedImports,
      'react': eslintPluginReact,
      'react-hooks': fixupPluginRules(eslintPluginReactHooks),
    },
    languageOptions: {
      parserOptions: { ecmaFeatures: { jsx: true } },
      globals: { ...globals.browser },
    },
    rules: {
      '@typescript-eslint/no-explicit-any': 'off',
      'interface-name-prefix': 'off',
      'explicit-function-return-type': 'off',
      'explicit-module-boundary-types': 'off',
      'simple-import-sort/imports': 'error',
      'unused-imports/no-unused-imports': 'error',
      camelcase: [
        'error',
        {
          properties: 'never',
        },
      ],
      ...eslintPluginReactHooks.configs.recommended.rules,
    },
  },
]
