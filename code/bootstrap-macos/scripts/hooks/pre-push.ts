import process from 'node:process';
import { execaCommandSync as exec } from 'execa';

try {
	exec('pnpm run tc', { stdio: 'inherit' });
} catch {
	process.exit(1);
}
