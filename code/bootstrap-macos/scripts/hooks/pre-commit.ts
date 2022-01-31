import { execaCommandSync } from 'execa';

execaCommandSync('pnpm exec lint-staged', { stdio: 'inherit' });
