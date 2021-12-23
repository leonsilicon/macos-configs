import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import { execaCommandSync as exec } from 'execa';
import { outdent } from 'outdent';
import open from 'open';
import inquirer from 'inquirer'

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


await open('https://github.com/settings/ssh/new');
for (; ;) {
	// eslint-disable-next-line no-await-in-loop
	const input = await inquirer.prompt([
		{
			type: 'input',
			name: 'response',
			message: 'Enter c to copy SSH key to clipboard, q to quit:'
		}
	]) as { response: string };
	if (input.response === 'c') {

		exec('pbcopy < ~/.ssh/id_ed25519.pub', { shell: true });
		console.info('SSH key was copied to clipboard.');
	} else if (input.response === 'q') {
		break;
	} else {
		console.info('Invalid input.')
	}
}

