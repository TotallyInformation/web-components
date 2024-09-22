module.exports = {
    env: {
        browser: true,
        es2019: true
    },
    extends: [
        'standard'
    ],
    parserOptions: {
        sourceType: 'module'
    },
    rules: {
        // Make Standard less annoying
        'brace-style': 'off',     // You should only use one-true-brace style but sometimes we want to compress things a bit.
        'comma-dangle': 'off',    // Lack of dangles wastes soo much time correcting lists
        'dot-notation': 'off',    // Turn off to allow for tslint's brain-dead treatment of expando objects in JS
        'indent': ['error', 4, { 'SwitchCase': 1 }],   // Standard wants 2, I like 4
        'space-before-function-paren': 'off', // No, don't need space between fn and arg!
        'no-multi-spaces': 'off', // Readability is more important than size (reduce size using uglify)
        'object-shorthand': ['error', 'consistent'],
        'padded-blocks': 'off',   // Sometimes you just need some space! See above.
        'space-in-parens': 'off', // Sometimes you just need some space!
        'spaced-comment': ['error', 'always', {
            'markers': ['html', '#region', '#endregion']
        }],
        'quote-props': 'off',     // Sometimes it is necessary and then much nice to be able to quote things that don't need it.
    }
}
