/**
 * https://www.npmjs.com/search?q=eslint-config
 * https://www.npmjs.com/search?q=keywords:eslint
 * 
 * npm init @eslint/config@latest -- --config eslint-config-standard
 * https://eslint.org/docs/latest/rules
 */

import globals from 'globals' // https://www.npmjs.com/package/globals
// @ts-ignore
import importPlugin from 'eslint-plugin-import' // https://www.npmjs.com/package/eslint-plugin-import
import pluginPromise from 'eslint-plugin-promise' // https://www.npmjs.com/package/eslint-plugin-promise
import jsdoc from 'eslint-plugin-jsdoc'// https://github.com/gajus/eslint-plugin-jsdoc
// import nodePlugin from 'eslint-plugin-n' // https://www.npmjs.com/package/eslint-plugin-n, node.js only
import pluginJs from '@eslint/js'


/** @type {import('eslint').Linter.Config[]} */
export default [
    {
        // files: ['**/*.{js,mjs,cjs}'],
        languageOptions: {
            sourceType: 'module',
            ecmaVersion: 'latest',
            globals: globals.browser,
        },

        rules: {
            'prefer-const': 'error',
        },
    },
    pluginJs.configs.recommended,
    jsdoc.configs['flat/recommended'],
    pluginPromise.configs['flat/recommended'],
    importPlugin.flatConfigs.recommended,
    // nodePlugin.configs["flat/recommended-script"], // Node.js only
]
