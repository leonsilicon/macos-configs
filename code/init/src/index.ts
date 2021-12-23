import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import { execaCommandSync as exec } from 'execa';
import { outdent } from 'outdent';
import open from 'open';

exec(`ssh-keygen -t ed25519 -C 'contact@leonzalion.com'`, {
	stdio: 'inherit'
});

exec(`eval "$(ssh-agent -s)"`, { shell: true });

fs.writeFileSync(path.join(os.homedir(), '.ssh/config'), outdent`
  Host *
    AddKeysToAgent yes
    UseKeychain yes
    IdentityFile ~/.ssh/id_ed25519
`)

exec('ssh-add -K ~/.ssh/id_ed25519', { shell: true })

exec('pbcopy < ~/.ssh/id_ed25519.pub', { shell: true });

console.info('SSH key was copied to clipboard.');

await open('https://github.com/settings/ssh/new');