import { defineConfig } from 'eslint/config';
import globals from 'globals';
import js from '@eslint/js';
import pluginReact from 'eslint-plugin-react';
import dicodingConfig from 'eslint-config-dicodingacademy';
import pluginReactHooks from 'eslint-plugin-react-hooks';
import pluginCypress from 'eslint-plugin-cypress';

export default defineConfig([
  { files: ['**/*.{js,mjs,cjs,jsx}'] },
  {
    files: ['**/*.{js,mjs,cjs,jsx}'],
    languageOptions: {
      globals: {
        ...globals.browser,
        ...globals.node // Tambahkan ini untuk mengenali process
      }
    },
  },
  {
    files: ['**/*.{js,mjs,cjs,jsx}'],
    plugins: { js },
    extends: ['js/recommended'],
  },
  js.configs.recommended,
  pluginReact.configs.flat.recommended,
  dicodingConfig,
  {
    files: ['cypress/**/*.{js,jsx}', '**/*.cy.{js,jsx}'],
    plugins: {
      cypress: pluginCypress
    },
    languageOptions: {
      globals: {
        ...globals.mocha,
        ...globals.node,
        cy: true,
        Cypress: true,
        expect: true
      }
    },
    rules: {
      ...pluginCypress.configs.recommended.rules,
      'cypress/no-unnecessary-waiting': 'off'
    }
  },
  {
    files: ['**/*.test.jsx', '**/*.spec.jsx', '**/_test/**'],
    rules: {
      'react/prop-types': 'off',
      'react/jsx-props-no-spreading': 'off'
    }
  },
  {
    plugins: {
      'react-hooks': pluginReactHooks,
    },
    settings: {
      react: {
        version: 'detect',
      },
    },
    rules: {
      'linebreak-style': 'off',
      'no-alert': 'off',
      'no-underscore-dangle': 'off',
      'import/prefer-default-export': 'off',
      'react-hooks/rules-of-hooks': 'error',
      'react-hooks/exhaustive-deps': 'warn',
      'react/jsx-props-no-spreading': 'off',
    },
  }
]);
