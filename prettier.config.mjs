import { fileURLToPath } from 'node:url';

const webPlugin = fileURLToPath(new URL('./web/formatting/destructuring.mjs', import.meta.url));

export default {
	plugins: [webPlugin],
	semi: true,
	printWidth: 100,
	singleQuote: true,
	jsxSingleQuote: true,
	useTabs: true,
	tabWidth: 2,
	trailingComma: 'all',
};
