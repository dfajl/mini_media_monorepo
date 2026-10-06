import assert from 'node:assert/strict';
import { test } from 'node:test';
import prettier from '../web/node_modules/prettier/index.mjs';
import webPlugin from '../web/formatting/destructuring.mjs';
import apiPlugin from '../api/formatting/destructuring.mjs';

for (const [project, plugin] of [
	['web', webPlugin],
	['api', apiPlugin],
]) {
	for (const parser of ['typescript', 'babel-ts']) {
		test(`${project}/${parser}: named imports, type imports and default imports`, async () => {
			const options = {
				parser,
				plugins: [plugin],
				useTabs: true,
				semi: false,
				singleQuote: true,
			};
			assert.equal(
				await prettier.format('import { a, b, c } from "source"', options),
				"import { a, b, c } from 'source'\n",
			);
			assert.equal(
				await prettier.format('import { a, b, c, d } from "source"', options),
				"import {\n\ta,\n\tb,\n\tc,\n\td,\n} from 'source'\n",
			);
			const sources = [
				'import type { A, B, C, D } from "source"',
				'import main, { a, b, c, d } from "source"',
				'import { a as renamed, b, type C, d } from "source"',
				'import { a, /* explanation */ b, c, d } from "source"',
				'import { a, b, c, d } from "source" with { type: "json" }',
			];
			for (const source of sources) {
				const formatted = await prettier.format(source, options);
				assert.match(formatted, /\{\n/);
				assert.equal(await prettier.format(formatted, options), formatted);
			}
			assert.match(
				await prettier.format(sources[4], options),
				/with \{ type: 'json' \}/,
			);
			for (const source of [
				'import main, { a, b, c } from "source"',
				'import * as all from "source"',
				'import "source"',
			]) {
				assert.equal(
					await prettier.format(source, options),
					await prettier.format(source, { ...options, plugins: [] }),
				);
			}
		});
		test(`${project}/${parser}: threshold, props, comments and repeat formatting`, async () => {
			const options = {
				parser,
				plugins: [plugin],
				useTabs: true,
				semi: false,
				singleQuote: true,
				jsxSingleQuote: true,
			};
			assert.equal(
				await prettier.format('const { a, b, c } = source', options),
				'const { a, b, c } = source\n',
			);
			assert.equal(
				await prettier.format('const { a, b, c, d } = source', options),
				'const {\n\ta,\n\tb,\n\tc,\n\td,\n} = source\n',
			);
			assert.equal(
				await prettier.format('const { a, b, c, ...rest } = source', options),
				'const {\n\ta,\n\tb,\n\tc,\n\t...rest\n} = source\n',
			);
			const sources = [
				'function View({ a, b, c, d }: Props) { return <div title="example" /> }',
				'const { a: renamed, b = fn(1, 2), c: { nested }, d } = source',
				'const { a, /* explanation */ b, c, d } = source',
				'let a, b, c, d; ({ a, b, c, d } = source)',
				'const { inner: { a, b, c, d } } = source',
			];
			for (const source of sources) {
				const formatted = await prettier.format(source, options);
				assert.equal(await prettier.format(formatted, options), formatted);
				assert.match(formatted, /\{\n/);
			}
			const props = await prettier.format(sources[0], options);
			assert.match(props, /function View\(\{\n\ta,\n\tb,\n\tc,\n\td,/);
			const comment = await prettier.format(sources[2], options);
			assert.match(comment, /\/\* explanation \*\//);
			assert.equal(
				await prettier.format(
					'const value = { a: 1, b: 2, c: 3, d: 4 }',
					options,
				),
				await prettier.format('const value = { a: 1, b: 2, c: 3, d: 4 }', {
					...options,
					plugins: [],
				}),
			);
		});
	}
}
