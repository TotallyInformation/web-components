// @ts-nocheck
/**
 * https://www.npmjs.com/search?q=eslint-config
 * https://www.npmjs.com/search?q=keywords:eslint
 *
 * npm init @eslint/config@latest -- --config eslint-config-standard
 * https://eslint.org/docs/latest/rules
 *
 * npx @eslint/config-inspector@latest
 * npx eslint --debug somefile.js
 * npx eslint --print-config file.js
 */

import globals from 'globals' // https://www.npmjs.com/package/globals
// @ts-ignore
import importPlugin from 'eslint-plugin-import' // https://www.npmjs.com/package/eslint-plugin-import
import pluginPromise from 'eslint-plugin-promise' // https://www.npmjs.com/package/eslint-plugin-promise
import jsdoc from 'eslint-plugin-jsdoc'// https://github.com/gajus/eslint-plugin-jsdoc
import stylistic from '@stylistic/eslint-plugin' // https://eslint.style
// import nodePlugin from 'eslint-plugin-n' // https://www.npmjs.com/package/eslint-plugin-n, node.js only
import pluginJs from '@eslint/js'

/** @type {import('eslint').Linter.Config[]} */
export default [
    pluginJs.configs.recommended,
    jsdoc.configs['flat/recommended'],
    pluginPromise.configs['flat/recommended'],
    importPlugin.flatConfigs.recommended,
    // nodePlugin.configs["flat/recommended-script"], // Node.js only
    {
        ignores: ['docs/jsdoc/*.html'],
    },
    {
        // files: ['**/*.{js,mjs,cjs}'],
        languageOptions: {
            sourceType: 'module',
            ecmaVersion: 'latest',
            globals: globals.browser,
        },
        plugins: {
            '@stylistic': stylistic,
        },
        rules: {
            'jsdoc/check-alignment': 'off',
            // "jsdoc/check-indentation": ["warn", {"excludeTags":['example', 'description']}],
            'jsdoc/check-indentation': 'off',
            'jsdoc/check-param-names': 'warn',
            'jsdoc/check-tag-names': ['warn', {
                definedTags: ['typicalname', 'element', 'memberOf', 'slot', 'csspart'],
            }],
            'jsdoc/multiline-blocks': ['error', {
                noZeroLineText: false,
            }],
            'jsdoc/no-multi-asterisk': 'off',
            'jsdoc/no-undefined-types': ['error', {
                'definedTypes': ['NodeListOf'],
            }],
            'jsdoc/tag-lines': 'off',

            '@stylistic/comma-dangle': ['error', {
                'arrays': 'only-multiline',
                'objects': 'always',
                'imports': 'never',
                'exports': 'always-multiline',
                'functions': 'never',
                'importAttributes': 'never',
                'dynamicImports': 'never',
            }],
            '@stylistic/eol-last': ['error', 'always'],
            '@stylistic/indent': ['error', 4, {
                'SwitchCase': 1,
            }],
            '@stylistic/linebreak-style': ['error', 'unix'],
            '@stylistic/lines-between-class-members': 'off',
            '@stylistic/newline-per-chained-call': ['error', {
                'ignoreChainWithDepth': 2,
            }],
            '@stylistic/no-confusing-arrow': 'error',
            '@stylistic/no-extra-semi': 'error',
            '@stylistic/no-mixed-spaces-and-tabs': 'error',
            '@stylistic/no-trailing-spaces': 'error',
            '@stylistic/semi': ['error', 'never'],
            '@stylistic/quotes': ['error', 'single', {
                'avoidEscape': true,
                'allowTemplateLiterals': 'always',
            }],

            'new-cap': 'error',
            'no-else-return': 'error',
            'no-empty': ['error', {
                allowEmptyCatch: true,
            }],
            'no-unused-vars': 'off',
            'no-useless-escape': 'off',
            'no-var': 'warn',
            'prefer-const': 'error',
        },
    },
]
