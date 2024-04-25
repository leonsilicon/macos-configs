#!/usr/bin/env tsx

import fs from 'node:fs';
import nullthrows from 'nullthrows-es';
import { outdent } from 'outdent';
import path from 'pathe';
import { packageDirectorySync } from 'pkg-dir';
import yaml from 'yaml';

const monorepoDirpath = nullthrows(
	packageDirectorySync({ cwd: import.meta.url }),
);

const superShortcuts = yaml.parse(
	fs.readFileSync(
		path.join(monorepoDirpath, 'data/super-shortcuts.yaml'),
		'utf8',
	),
) as Record<string, string | null>;

const longestShortcutLength = Math.max(
	...Object.keys(superShortcuts).map((shortcut) => shortcut.length),
);
// +2 for the backticks
const shortcutColumnContentWidth = longestShortcutLength + 2;

const longestDescriptionLength = Math.max(
	...Object.values(superShortcuts).map((description) =>
		description?.length ?? 0
	),
);
const descriptionColumnContentWidth = longestDescriptionLength;

const getShortcutTableRow = (shortcut: string, description: string | null) => {
	if (description === null) {
		return null;
	}

	return outdent`
		| ${('`' + shortcut + '`').padEnd(shortcutColumnContentWidth)} | ${
		description.padEnd(descriptionColumnContentWidth)
	} |
	`;
};

const markdown = outdent`
| ${'**Shortcut**'.padEnd(shortcutColumnContentWidth)} | ${
	'**Description**'.padEnd(descriptionColumnContentWidth)
} |
| ${'-'.repeat(shortcutColumnContentWidth)} | ${
	'-'.repeat(descriptionColumnContentWidth)
} |
${
	Object.entries(superShortcuts).flatMap(([shortcut, description]) => {
		const row = getShortcutTableRow(shortcut, description);
		return row === null ? [] : [row];
	}).join('\n')
}
`;

fs.writeFileSync(
	path.join(monorepoDirpath, 'generated/shortcuts.md'),
	markdown,
);
