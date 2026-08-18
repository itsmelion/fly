import { jestConfig, nextConfig, queriesConfig } from '@fly/eslint-config';

import baseConfig from '../../eslint.config.mjs';

export default [
  ...baseConfig,
  ...nextConfig,
  ...jestConfig,
  ...queriesConfig,
  {
    ignores: ['.next/**/*', '**/out-tsc'],
  },
];
