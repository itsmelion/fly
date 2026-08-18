import { jestConfig, nextConfig } from '@fly/eslint-config';

import baseConfig from '../../eslint.config.mjs';

export default [
  ...baseConfig,
  ...nextConfig,
  ...jestConfig,
  {
    ignores: ['.next/**/*', '**/out-tsc'],
  },
];
