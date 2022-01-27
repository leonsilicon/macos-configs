import * as fs from 'node:fs';
import dotenv from 'dotenv';
import { execaCommandSync as exec } from 'execa';
import { rmDist, chProjectDir } from 'lion-system';
import { join } from 'desm';

chProjectDir(import.meta.url);

if (!fs.existsSync('plugin-config.cjs')) {
	throw new Error('You must have a plugin-config.cjs in the project root.');
}

rmDist();
exec('tsc');
fs.copyFileSync('plugin-config.cjs', 'dist/plugin-config.cjs');

dotenv.config({
	path: join(import.meta.url, '..'),
});
