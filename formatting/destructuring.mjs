// Keep Prettier's standard printer, forcing large patterns and named imports to break.
export function createDestructuringPlugin(estreePrinter, { builders, utils }) {
	return {
		printers: {
			estree: {
				...estreePrinter,
				print(path, ...args) {
					const printed = estreePrinter.print(path, ...args);
					if (
						path.node.type === 'ImportDeclaration' &&
						path.node.specifiers.filter(
							(specifier) => specifier.type === 'ImportSpecifier',
						).length >= 4
					) {
						// Only break the named specifier group; keep import attributes unchanged.
						let found = false;
						return utils.mapDoc(printed, (part) => {
							if (
								!found &&
								part?.type === 'group' &&
								part.contents?.[0] === '{'
							) {
								found = true;
								return { ...part, break: true };
							}
							return part;
						});
					}
					if (
						path.node.type !== 'ObjectPattern' ||
						path.node.properties.length < 4
					) {
						return printed;
					}
					return [
						builders.group(printed, { shouldBreak: true }),
						builders.breakParent,
					];
				},
			},
		},
	};
}
