import eslint from '@eslint/js';
import eslintPluginImport from 'eslint-plugin-import';
import eslintPluginPrettier from 'eslint-plugin-prettier';
import eslintPluginSecurity from 'eslint-plugin-security';
import eslintPluginUnusedImports from 'eslint-plugin-unused-imports';
import * as typescriptEslint from 'typescript-eslint';
import * as fs from 'fs';
import path from 'path';

export const eslintIgnore = [
  'node_modules/',
  'dist/',
  'coverage/',
  '*.min.js',
  '*.d.ts',
  'tools/*',
  '.sum/*',
  'eslint.config.mjs',
  'eslint.config.strict.mjs',
  'package.json',
  'prettier.config.js',
  'tsconfig.json',
  '.husky',
  '.commitlintrc.js',
  '.releaserc.js',
  'tools/ngrok-auth.js',
  '**/*.e2e-spec.ts',
];

export const eslintFiles = ['./src/**/*.+(js|ts)', './**/*.test.+(js|ts)'];

export const typescriptEslintConfig = {
  languageOptions: {
    parser: typescriptEslint.parser,
    parserOptions: {
      project: ['./tsconfig.json'],
      tsconfigRootDir: process.cwd(),
      ecmaVersion: 'latest',
      sourceType: 'module',
    },
    globals: {
      process: 'readonly',
      console: 'readonly',
    },
  },
  ignores: eslintIgnore,
};

export const jsEslint = {
  files: ['*.js', '*.mjs'],
  ignores: ['eslint.config.mjs', 'eslint.config.strict.mjs'],
  languageOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
  },
};

export const eslintPluginImportConfig = {
  ...(eslintPluginImport.flatConfigs?.recommended || {}),
};

export const eslintPluginsConfig = {
  'unused-imports': eslintPluginUnusedImports,
  security: eslintPluginSecurity,
  import: eslintPluginImport,
  '@typescript-eslint': typescriptEslint.plugin,
};

export const eslintSettings = {
  'import/resolver': {
    typescript: {
      alwaysTryTypes: true,
      project: './tsconfig.json',
    },
    node: true,
  },
};

export const typescriptEslintConfigRecommended =
  typescriptEslint.configs.recommendedTypeChecked;

export function getDirectoriesToSort() {
  const ignoredSortingDirectories = [
    'node_modules',
    '.git',
    '.vscode',
    'dist',
    'coverage',
  ];
  try {
    return fs
      .readdirSync(process.cwd())
      .filter((file) => {
        try {
          return fs.statSync(path.join(process.cwd(), file)).isDirectory();
        } catch {
          return false;
        }
      })
      .filter((f) => !ignoredSortingDirectories.includes(f));
  } catch {
    return [];
  }
}

export default typescriptEslint.config(
  {
    files: ['**/*.ts', '**/*.tsx', '**/*.e2e-spec.ts'],
    ...typescriptEslintConfig,
    ignores: eslintIgnore,
  },
  eslint.configs.recommended,
  {
    plugins: {
      ...eslintPluginsConfig,
      prettier: eslintPluginPrettier,
    },
    rules: {
      'no-unused-vars': 'off',
      'security/detect-eval-with-expression': 'warn',
      'security/detect-no-csrf-before-method-override': 'warn',
      'security/detect-possible-timing-attacks': 'warn',
      'security/detect-non-literal-regexp': 'warn',
      'no-eval': 'warn',
      'no-implied-eval': 'warn',
      'no-new-func': 'warn',
      // '@typescript-eslint/no-explicit-any': 'warn',
      // '@typescript-eslint/ban-ts-comment': 'warn',
      // '@typescript-eslint/no-floating-promises': 'warn',
      // '@typescript-eslint/no-unsafe-argument': 'warn',
      // '@typescript-eslint/no-unsafe-assignment': 'warn',
      // '@typescript-eslint/no-unsafe-call': 'warn',
      // '@typescript-eslint/no-unsafe-return': 'warn',
      // '@typescript-eslint/await-thenable': 'warn',
      // '@typescript-eslint/no-unnecessary-type-assertion': 'warn',
      // '@typescript-eslint/no-misused-promises': 'warn',

      'import/no-duplicates': 'warn',
      'import/newline-after-import': 'warn',
      'import/first': 'warn',
      'import/no-cycle': 'warn',
      'unused-imports/no-unused-imports': 'warn',
      'no-undef': 'off',
      '@typescript-eslint/no-unused-vars': [
        'warn',
        {
          vars: 'all',
          varsIgnorePattern: '^_',
          args: 'after-used',
          argsIgnorePattern: '^_',
          ignoreRestSiblings: true,
          caughtErrors: 'none',
        },
      ],
      'no-console': ['warn', { allow: ['warn', 'error', 'info'] }],
      'sort-imports': [
        'warn',
        {
          ignoreCase: true,
          ignoreDeclarationSort: true,
        },
      ],
      'import/order': [
        'warn',
        {
          groups: [
            'external',
            'builtin',
            'internal',
            'sibling',
            'parent',
            'index',
          ],
          pathGroups: [
            ...getDirectoriesToSort().map((dir) => ({
              pattern: `${dir}/**`,
              group: 'internal',
            })),
            {
              pattern: 'env',
              group: 'internal',
            },
          ],
          pathGroupsExcludedImportTypes: ['internal'],
          alphabetize: {
            order: 'asc',
            caseInsensitive: true,
          },
        },
      ],
    },
  },
  {
    settings: eslintSettings,
  },
);
