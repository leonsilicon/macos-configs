import execa from 'execa';

import { createInitializedWindowsManager } from '../utils';
import { focusDisplay } from '../utils/display';
import { main } from '../utils/main';

const openArguments = process.argv[2];

main(async () => {
	const { wm, display: focusedDisplay } =
		await createInitializedWindowsManager();
	execa.commandSync(`open ${openArguments}`);
	await wm.executeYabaiCommand(`-m window --display ${focusedDisplay.index}`);
	await focusDisplay(focusedDisplay.index);
});
