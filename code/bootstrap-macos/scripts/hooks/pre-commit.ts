import process from 'node:process';
import { execaCommandSync as exec } from 'execa';

try {
	exec('pnpm exec lint-staged', { stdio: 'inherit' });
} catch {
	process.exit(1);
}
