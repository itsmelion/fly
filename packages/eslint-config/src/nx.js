// src/nx.js
import nx from '@nx/eslint-plugin';

export const nxConfig = [
  ...nx.configs['flat/base'],
  ...nx.configs['flat/javascript'],
  ...nx.configs['flat/typescript'],
];
