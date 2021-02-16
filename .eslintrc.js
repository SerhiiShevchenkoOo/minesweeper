module.exports = {
	env: {
		browser: true,
		es2021: true,
	},
	plugins: ['react', 'prettier', 'unicorn'],
	extends: [
		'airbnb-base',
		'plugin:unicorn/recommended',
		'plugin:react/recommended',
		'plugin:prettier/recommended',
		'prettier',
		'prettier/unicorn',
	],
	parserOptions: {
		ecmaFeatures: {
			jsx: true,
		},
		ecmaVersion: 12,
		sourceType: 'module',
	},

	rules: {
		'prettier/prettier': [
			'error',
			{
				endOfLine: 'auto',
			},
		],
		'unicorn/prevent-abbreviations': 'off',
		quotes: ['error', 'single'],
		'react/jsx-uses-react': 'error',
		'react/jsx-uses-vars': 'error',
	},
};
