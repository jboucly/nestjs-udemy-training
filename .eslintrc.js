// Rules: https://eslint.org/docs/rules/
module.exports = {
    plugins: ['simple-import-sort', 'unused-imports'],
    parser: '@typescript-eslint/parser',
    extends: ['plugin:@typescript-eslint/recommended'],
    parserOptions: {
        ecmaVersion: 2015,
        sourceType: 'module',
        project: './tsconfig.json',
    },
    rules: {
        // @typescript-eslint
        '@typescript-eslint/no-explicit-any': 'off',
        '@typescript-eslint/explicit-module-boundary-types': 'off',
        '@typescript-eslint/member-ordering': ['error'],
        '@typescript-eslint/no-this-alias': [
            'error',
            {
                allowDestructuring: true,
                allowedNames: ['that'],
            },
        ],
        '@typescript-eslint/indent': 'off',
        '@typescript-eslint/no-unused-expressions': 'off',
        '@typescript-eslint/no-var-requires': 'off',
        '@typescript-eslint/interface-name-prefix': 'off',
        '@typescript-eslint/naming-convention': [
            'error',
            {
                selector: 'memberLike',
                modifiers: ['private'],
                format: ['camelCase'],
                leadingUnderscore: 'require',
            },
        ],

        // eslint-plugin-import
        'import/order': 'off',
        'import/prefer-default-export': 'off',
        'import/no-extraneous-dependencies': 'off',
        'import/no-cycle': 'off',

        // eslint
        'implicit-arrow-linebreak': 'off',
        'linebreak-style': 'off',
        camelcase: 'off',
        'no-unused-vars': 'error',
        'no-underscore-dangle': 'off',
        'no-console': [
            'error',
            {
                allow: ['error', 'info'],
            },
        ],
        'comma-dangle': [
            'error',
            {
                arrays: 'always-multiline',
                objects: 'always-multiline',
                imports: 'always-multiline',
                exports: 'always-multiline',
                functions: 'always-multiline',
            },
        ],
        indent: [
            'error',
            4,
            {
                SwitchCase: 1,
            },
        ],
        'lines-between-class-members': 'off',
        '@typescript-eslint/lines-between-class-members': 'off',
        'require-await': 'error',
        'object-curly-newline': 'off',
        'max-len': 'off',
        'no-else-return': 'off',
        'class-methods-use-this': 'off',
        'array-element-newline': ['error', 'consistent'],
        'dot-notation': 'off',
        'no-return-await': 'off',
        'require-await': 'off',
        'no-case-declarations': 'off',
        'no-restricted-globals': 'off',
        'no-param-reassign': 'off',
        'no-restricted-syntax': 'off',
        'array-callback-return': 'off',
        'no-prototype-builtins': 'off',
        'consistent-return': 'off',
        'max-classes-per-file': 'off',
    },
};
