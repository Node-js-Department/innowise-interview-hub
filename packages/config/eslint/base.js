// Migrate built-in rules to @stylistic/js namespace
/* eslint @stylistic/migrate/migrate-js: "error" */

// Migrate `@typescript-eslint` rules to @stylistic/ts namespace
/* eslint @stylistic/migrate/migrate-ts: "error" */
module.exports = {
	env: {
		browser: true,
		es2021: true,
		node: true,
	},
	ignorePatterns: ["vite.config.ts", "**/dist/", "**/out/", "**/build/", "clientPrisma","**/src/components"],
	extends: [
		"turbo",
		"eslint:recommended",
		"plugin:@typescript-eslint/recommended",
		"plugin:@typescript-eslint/eslint-recommended",
		"plugin:@typescript-eslint/recommended",
		'plugin:@stylistic/disable-legacy',
		'plugin:jsonc/recommended-with-json'
	],
	parser: "@typescript-eslint/parser",
	parserOptions: {
		ecmaVersion: "latest",
		sourceType: "module",
		project: ["./tsconfig.json", "./packages/*/tsconfig.json", "./apps/*/tsconfig.json"],
	},
	plugins: [
		"import",
		"@typescript-eslint",
		"decorator-position",
		'@stylistic',
		'@stylistic/migrate',
		'@stylistic/eslint-plugin-js',
	],
	settings: {
		"import/resolver": {
			node: {
				extensions: [".js", ".jsx", ".ts", ".tsx"],
			},
		},
	},
	rules: {
		"arrow-body-style": ["error", "as-needed"],
		"decorator-position/decorator-position": ["error", {properties: 'above'}],
		"default-param-last": "error",
		"dot-notation": 2,
		"func-names": 0,
		"new-cap": [
			2,
			{
				capIsNew: false,
				newIsCap: true,
			},
		],
		"no-async-promise-executor": 0,
		"no-class-assign": 0,
		"no-dupe-else-if": "error",
		"no-dupe-keys": "error",
		"no-empty": "error",
		"no-inline-styles": 0,
		"no-named-as-default": 0,
		"no-nested-ternary": 0,
		"no-param-reassign": 0,
		"no-plusplus": 0,
		"no-restricted-imports": ["error", { paths: [{
			name: "@mantine/core",
			importNames: ["Badge"],
			message: "Please import 'Badge' from 'apps/client/src/common/components/Badge/Badge.tsx' instead."
		}]}],
		"no-shadow": 0,
		"no-undef": 0,
		"no-underscore-dangle": 0,
		"no-use-before-define": "off",
		"no-useless-catch": 0,
		"prefer-destructuring": 0,
		"prefer-promise-reject-errors": [
			0,
			{
				allowEmptyReject: true,
			},
		],
		"import/no-extraneous-dependencies": "off",
		"import/no-named-as-default": 0,
		"import/order": [
			"error",
			{
				pathGroups: [
					{
						pattern: "@packages/**",
						group: "internal",
						position: "after",
					},
				],
				groups: ["builtin", "external", "internal", ["parent", "sibling"], "unknown"],
				"newlines-between": "always",
				pathGroupsExcludedImportTypes: ["**/*.css"],
			},
		],
		"@typescript-eslint/explicit-module-boundary-types": 0,
		"@typescript-eslint/no-explicit-any": 1,
		"@typescript-eslint/ban-ts-comment": "off",
		"@stylistic/type-annotation-spacing": 2,
		"@stylistic/indent": [
			"error",
			2,
			{
				ignoredNodes: ["JSXElement *", "JSXElement","PropertyDefinition"],
				SwitchCase: 1,
			},
		],
		"@stylistic/member-delimiter-style": [
			"error",
			{
				multiline: {
					delimiter: "comma",
					requireLast: true,
				},
				singleline: {
					delimiter: "comma",
					requireLast: false,
				},
			},
		],
		"@typescript-eslint/naming-convention": [
			"error",
			{
				format: ["StrictPascalCase"],
				prefix: ["I"],
				selector: "interface",
			},
			{
				format: ["StrictPascalCase"],
				prefix: ["T"],
				selector: ["typeAlias"],
			},
			{
				format: ["StrictPascalCase"],
				prefix: ["E"],
				selector: "enum",
			},
		],
		'@stylistic/semi': [
			"error",
			"always",
			{
				omitLastInOneLineBlock: true,
			},
		],
		"@stylistic/arrow-parens": ["error", "as-needed"],
		"@stylistic/arrow-spacing": 2,
		"@stylistic/comma-dangle": [
			2,
			{
				arrays: "always-multiline",
				exports: "always-multiline",
				functions: "never",
				imports: "always-multiline",
				objects: "always-multiline",
			},
		],
		"@stylistic/comma-spacing": 2,
		"@stylistic/comma-style": ["error", "last"],
		"@stylistic/function-paren-newline": 0,
		"@stylistic/implicit-arrow-linebreak": 0,
		"@stylistic/js/space-infix-ops": 2,
		"@stylistic/key-spacing": 2,
		"@stylistic/keyword-spacing": 2,
		"@stylistic/linebreak-style": 0,
		"@stylistic/lines-between-class-members": 0,
		"@stylistic/max-len": [
			2,
			{
				code: 130,
			},
		],
		"@stylistic/multiline-ternary": 0,
		"@stylistic/no-confusing-arrow": 0,
		"@stylistic/no-extra-semi": "error",
		"@stylistic/no-mixed-operators": 0,
		"@stylistic/no-multi-spaces": "error",
		"@stylistic/no-multiple-empty-lines": [
			"error",
			{
				max: 1,
			},
		],
		"@stylistic/no-trailing-spaces": "error",
		"@stylistic/object-curly-newline": 0,
		"@stylistic/object-curly-spacing": ["error", "always"],
		"@stylistic/operator-linebreak": ["error", "before"],
		"@stylistic/quotes": [
			"error",
			"single",
			{
				avoidEscape: true,
			},
		],
		"@stylistic/quote-props": ["error", "as-needed"],
		"@stylistic/space-before-blocks": 2,
		"@stylistic/space-in-parens": ["error", "never"],
		"@stylistic/switch-colon-spacing": 2,
	},
	overrides: [
		{
			files: ['*.json'],
			parser: "jsonc-eslint-parser",
			rules: {
				'jsonc/key-spacing': 2,
				'jsonc/no-comments': 0,
				'@typescript-eslint/naming-convention': 0,
				'@stylistic/max-len': 0
			}
		}
	]
};
