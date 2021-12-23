import { execaSync } from 'execa';

const message = process.argv[process.argv.length - 1];

if (message === undefined) {
	throw new Error('No message provided.');
}

execaSync('pnpm', ['exec', 'commitlint', '--edit', message]);
