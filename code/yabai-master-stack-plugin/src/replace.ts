import dotenv from 'dotenv';
import path from 'path';
import pkgDir from 'pkg-dir';
import replace from 'replace-in-file';

dotenv.config({
	path: path.join(pkgDir.sync(__dirname)!, '.env'),
});

replace.sync({
	files: 'dist/config.js',
	from: /process\.env\.\w+!?/g,
	to: (match) => {
		const envVar = match.slice(match.lastIndexOf('.') + 1);
		const envValue = process.env[envVar];
		if (envValue === undefined) {
			// If the environment variable is marked is mandatory
			if (match.endsWith('!')) {
				throw new Error(
					`Environment variable ${envVar} not defined in environment/.env file.`
				);
			} else {
				return "undefined";
			}
		}
		return JSON.stringify(envValue);
	},
});
