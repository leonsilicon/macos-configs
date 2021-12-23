import { execaCommandSync } from 'execa';

execaCommandSync('pnpm run tc', { stdio: 'inherit' });
