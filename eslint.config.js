import { FlatCompat } from '@eslint/eslintrc';
import js from '@eslint/js';
import typescriptEslint from '@typescript-eslint/eslint-plugin';
import tsParser from '@typescript-eslint/parser';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const filename = fileURLToPath(import.meta.url);
const dirname = path.dirname(filename);
const compat = new FlatCompat({
    baseDirectory: dirname,
    recommendedConfig: js.configs.recommended,
    allConfig: js.configs.all,
});

export default [{
    ignores: ['**/stories/'],
}, ...compat.extends(
    'airbnb-base',
    'plugin:@typescript-eslint/eslint-recommended',
), {
    plugins: {
        '@typescript-eslint': typescriptEslint,
    },

    languageOptions: {
        parser: tsParser,
    },

    settings: {
        'import/resolver': {
            node: {
                extensions: ['.js', '.jsx', '.ts', '.tsx'],
            },
        },
    },

    rules: {
        indent: ['error', 4],
        'class-methods-use-this': 'off',
        'no-param-reassign': 'off',
        'no-return-await': 'off',
        'no-alert': 'off',
        'no-use-before-define': [0],
        'no-console': 'off',
        'no-unused-vars': 'off',
        'max-len': 'off',
        'import/no-unresolved': 'off',
        'import/no-extraneous-dependencies': 'off',
        'import/prefer-default-export': 'off',
        'no-underscore-dangle': 'off',
        'no-await-in-loop': 'off',
        'no-restricted-syntax': 'off',
        'import/extensions': ['error', 'ignorePackages', {
            js: 'never',
            jsx: 'never',
            ts: 'never',
            tsx: 'never',
        }],
        'import/order': [
            'error',
            {
                alphabetize: { order: 'asc', caseInsensitive: true },
                groups: [
                    ['builtin', 'external'],
                    ['internal'],
                    ['parent', 'sibling', 'index'],
                ],
                'newlines-between': 'always',
            },
        ],
    },
}];
