module.exports = {
	plugins: ["react", "react-hooks"],
	settings: {
		react: {
			version: "detect",
		},
	},
	rules: {
		"react-hooks/exhaustive-deps": 2,
		"react/display-name": 0,
		"react/jsx-curly-brace-presence": [2, "never"],
		"react/jsx-indent": ["error", 2],
		"react/jsx-indent-props": [2, 2],
		"react/jsx-wrap-multilines": [
			"error",
			{
				arrow: true,
				assignment: true,
				declaration: true,
				return: true,
			},
		],
		"react/no-unescaped-entities": 0,
		"react/no-unused-prop-types": 0,
		"react/prop-types": 0,
		"jsx-quotes": ["error", "prefer-single"],
	},
};
