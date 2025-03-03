/** @type {import('eslint').Linter.Config} */
const config = {
	"plugins": [
		"react"
	],
	extends: [
		"plugin:react/recommended",
		"plugin:@next/next/recommended"
	],
	rules: {
		"@next/next/no-html-link-for-pages": "off",
		'react/react-in-jsx-scope': 'off',
		'react/jsx-closing-bracket-location': ["error", 'line-aligned'],
		"react/jsx-no-useless-fragment": "warn",
		"react/jsx-key": [
			"error",
			{
				checkFragmentShorthand: true,
				checkKeyMustBeforeSpread: true,
				warnOnDuplicates: true,
			},
		],
	},
};

module.exports = config;
