import eslint from '@eslint/js';
import tseslint from 'typescript-eslint';
import angulareslint from 'angular-eslint';
import prettierRecommended from 'eslint-plugin-prettier/recommended';

export default tseslint.config(
    {
        files: ['**/*.ts'],
        languageOptions: {
            parserOptions: {
                project: 'tsconfig.json',
                tsconfigRootDir: './',
            },
        },
        extends: [
            eslint.configs.recommended,
            angulareslint.configs.tsRecommended,
            tseslint.configs.recommended,
            prettierRecommended,
        ],
        processor: angulareslint.processInlineTemplates,
        rules: {
            '@angular-eslint/component-selector': [
                'error',
                {
                    type: 'element',
                    prefix: 'app',
                    style: 'kebab-case',
                },
            ],
            '@angular-eslint/directive-selector': [
                'error',
                {
                    type: 'attribute',
                    prefix: 'app',
                    style: 'camelCase',
                },
            ],
            'max-len': [
                'error',
                {
                    code: 150,
                    ignoreUrls: true,
                    ignorePattern: '^import\\s.+\\sfrom\\s.+;$',
                },
            ],
            'no-console': [
                'warn',
                {
                    allow: ['info', 'error'],
                },
            ],
            'lines-between-class-members': [
                'error',
                'always',
                {
                    exceptAfterSingleLine: true,
                },
            ],
            '@typescript-eslint/no-deprecated': 'warn',
            '@typescript-eslint/explicit-function-return-type': ['error'],
        },
    },
    {
        files: ['**/*.html'],
        extends: [
            ...angulareslint.configs.templateRecommended,
            ...angulareslint.configs.templateAccessibility,
        ],
    },
);
