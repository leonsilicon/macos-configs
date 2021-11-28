/* eslint-env node */

module.exports = {
	extends: [
		'airbnb-base',
		'plugin:@typescript-eslint/eslint-recommended',
		'plugin:@typescript-eslint/recommended',
		'plugin:unicorn/recommended',
		'plugin:import/typescript',
		'prettier',
	],
	plugins: ['@typescript-eslint', 'simple-import-sort', 'import', 'unicorn'],
	parserOptions: {
		parser: '@typescript-eslint/parser',
		project: ['./tsconfig.eslint.json'],
		tsconfigRootDir: __dirname,
		ecmaVersion: 2018,
		sourceType: 'module',
	},
	rules: {
		// eslint rules
		'no-unused-vars': 'off',
		'no-debugger': 'off',
		'no-param-reassign': 'off',
		'prefer-destructuring': [
			'error',
			{
				array: false,
			},
		],
		'no-await-in-loop': 'off',
		'no-else-return': 'off',
		'no-lonely-if': 'off',
		'no-void': 'off',
		'no-underscore-dangle': 'off',
		'no-unused-expressions': 'off',
		'no-shadow': 'off',
		'no-console': 'off',
		'no-continue': 'off',
		'no-cond-assign': ['error', 'except-parens'],
		'default-case': 'off',

		// eslint-plugin-import rules
		'import/no-default-export': 'error',
		'import/prefer-default-export': 'off',
		'import/extensions': [
			'error',
			'ignorePackages',
			{
				js: 'never',
				ts: 'never',
			},
		],
		'import/no-extraneous-dependencies': [
			'error',
			{ devDependencies: true, packageDir: './' },
		],

		// eslint-config-airbnb-base style overrides
		'no-restricted-syntax': [
			'error',
			{
				selector: 'ForInStatement',
				message:
					'for..in loops iterate over the entire prototype chain, which is virtually never what you want. Use Object.{keys,values,entries}, and iterate over the resulting array.',
			},
			{
				selector: 'LabeledStatement',
				message:
					'Labels are a form of GOTO; using them makes code confusing and hard to maintain and understand.',
			},
			{
				selector: 'WithStatement',
				message:
					'`with` is disallowed in strict mode because it makes code impossible to predict and optimize.',
			},
		],

		// eslint-plugin-simple-import-sort rules
		'simple-import-sort/imports': 'error',
		'simple-import-sort/exports': 'error',

		// TypeScript ESLint rules
		'@typescript-eslint/explicit-module-boundary-types': 'off',
		'@typescript-eslint/explicit-function-return-type': 'off',
		'@typescript-eslint/no-unused-vars': 'off',
		'@typescript-eslint/no-unused-vars-experimental': [
			'error',
			{ ignoreArgsIfArgsAfterAreUsed: true },
		],
		'@typescript-eslint/no-unused-expressions': 'error',
		'@typescript-eslint/no-shadow': 'off',
		'@typescript-eslint/no-explicit-any': 'off',
		'@typescript-eslint/no-non-null-assertion': 'off',
		'@typescript-eslint/consistent-type-imports': 'error',
		'@typescript-eslint/no-floating-promises': 'error',

		// eslint-plugin-unicorn
		'unicorn/prefer-module': 'off',
		'unicorn/prefer-node-protocol': 'off',
		'unicorn/prefer-ternary': 'off',
		'unicorn/prevent-abbreviations': 'off',
		'unicorn/consistent-function-scoping': 'off',
		'unicorn/no-useless-undefined': 'off',
		'unicorn/filename-case': ['error', { case: 'kebabCase' }],
	},
};