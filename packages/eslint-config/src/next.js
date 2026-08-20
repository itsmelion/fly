import nextPlugin from '@next/eslint-plugin-next';
import nx from '@nx/eslint-plugin';
import jsxA11y from 'eslint-plugin-jsx-a11y';

import { reactConfig, reactPlugins } from './react.js';

export const nextConfig = [
  ...nx.configs['flat/react-typescript'],
  jsxA11y.flatConfigs.recommended,
  {
    files: ['**/*.{js,jsx,ts,tsx}'],
    plugins: {
      ...reactPlugins,
      '@next/next': nextPlugin,
    },
    rules: {
      ...reactConfig[1].rules,
      ...nextPlugin.configs.recommended.rules,
      ...nextPlugin.configs['core-web-vitals'].rules,
    },
  },
  {
    files: [
      '**/app/**/error.{js,jsx,ts,tsx}',
      '**/app/**/global-error.{js,jsx,ts,tsx}',
      '**/app/**/layout.{js,jsx,ts,tsx}',
      '**/app/**/loading.{js,jsx,ts,tsx}',
      '**/app/**/not-found.{js,jsx,ts,tsx}',
      '**/app/**/page.{js,jsx,ts,tsx}',
      '**/app/**/template.{js,jsx,ts,tsx}',
    ],
    rules: {
      'import-x/no-default-export': 'off',
    },
  },
];
