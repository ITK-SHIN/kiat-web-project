import js from '@eslint/js';
import prettierConfig from 'eslint-config-prettier';
import importPlugin from 'eslint-plugin-import';
import prettier from 'eslint-plugin-prettier';
import reactHooks from 'eslint-plugin-react-hooks';
import reactRefresh from 'eslint-plugin-react-refresh';
import globals from 'globals';

export default [
  { ignores: ['dist', 'node_modules'] },
  {
    files: ['**/*.{js,jsx}'],
    languageOptions: {
      ecmaVersion: 'latest',
      globals: {
        ...globals.browser,
        ...globals.node,
        ...globals.commonjs,
        ...globals.es2022,
        _: true,
      },
      parserOptions: {
        ecmaVersion: 'latest',
        ecmaFeatures: { jsx: true },
        sourceType: 'module',
      },
    },
    plugins: {
      'react-hooks': reactHooks,
      'react-refresh': reactRefresh,
      import: importPlugin,
      prettier: prettier,
    },
    rules: {
      ...js.configs.recommended.rules,
      ...reactHooks.configs.recommended.rules,
      ...reactRefresh.configs.vite.rules,
      ...prettierConfig.rules,
      'prettier/prettier': 'error',
      'no-console': 'warn',
      'no-plusplus': 'off',
      'no-shadow': 'off',
      'vars-on-top': 'off',
      'no-underscore-dangle': 'off',
      'comma-dangle': 'off',
      'func-names': 'off',
      'prefer-template': 'off',
      'no-nested-ternary': 'off',
      'max-classes-per-file': 'off',
      'consistent-return': 'off',
      'no-restricted-syntax': ['off', 'ForOfStatement'],
      'prefer-arrow-callback': 'error',
      'require-await': 'error',
      'arrow-parens': ['error', 'as-needed'],
      'no-param-reassign': ['error', { props: false }],
      'no-unused-expressions': [
        'error',
        {
          allowTernary: true,
          allowShortCircuit: true,
          allowTaggedTemplates: true,
        },
      ],
      'import/no-extraneous-dependencies': ['error', { devDependencies: true }],
      'max-len': [
        'error',
        {
          code: 120,
          ignoreComments: true,
          ignoreStrings: true,
          ignoreTemplateLiterals: true,
        },
      ],
      'no-unused-vars': ['error', { varsIgnorePattern: '^[A-Z_]', argsIgnorePattern: '^[A-Z_]' }],
    },
  },
];
