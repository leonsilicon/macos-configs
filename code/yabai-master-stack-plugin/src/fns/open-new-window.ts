import process from 'node:process';
import { execaCommandSync } from 'execa';

import {
	createInitializedWindowsManager,
	focusDisplay,
	main,
} from '../utils/index.js';

const openArguments = process.argv[2];

main(async () => {
	const { wm, display: focusedDisplay } =
		await createInitializedWindowsManager();
	execaCommandSync(`open ${openArguments}`);
	await wm.executeYabaiCommand(`-m window --display ${focusedDisplay.index}`);
	await focusDisplay(focusedDisplay.index);
});
