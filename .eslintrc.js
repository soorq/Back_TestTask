module.exports = {
	parser: '@typescript-eslint/parser',
	parserOptions: {
		ecmaVersion: 2020,
		sourceType: 'module',
	},
	extends: ['plugin:prettier/recommended'],
	rules: {
		complexity: 'warn',
		'no-unused-vars': 'off',
		'@typescript-eslint/no-unused-vars': 'off',
		'@typescript-eslint/no-non-null-assertion': 'off',
		'@typescript-eslint/no-inferrable-types': 'off',
	},
};

// TODO: Add for naming_spaces
// '@typescript-eslint/naming-convention': [
// 	'error',
// 	{
// 		selector: ['parameter', 'variable'],
// 		leadingUnderscore: 'require',
// 		format: ['camelCase'],
// 		modifiers: ['unused'],
// 	},
// 	{
// 		selector: ['parameter', 'variable'],
// 		leadingUnderscore: 'allowDouble',
// 		format: ['camelCase', 'PascalCase', 'UPPER_CASE'],
// 	},
// ],
