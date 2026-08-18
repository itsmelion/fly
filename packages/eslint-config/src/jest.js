import jest from 'eslint-plugin-jest';

export const jestConfig = [
  {
    files: ['**/*.spec.{js,jsx,ts,tsx}', '**/*.test.{js,jsx,ts,tsx}'],
    plugins: {
      jest,
    },
    ...jest.configs['flat/recommended'],
    rules: {
      ...jest.configs['flat/recommended'].rules,
    },
  },
];
