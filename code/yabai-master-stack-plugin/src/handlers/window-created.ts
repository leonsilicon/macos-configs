import process from 'node:process';
import {
	createInitializedWindowsManager,
	logDebug,
	main,
} from '~/utils/index.js';

main(async () => {
	const { wm, state, space } = await createInitializedWindowsManager();
	logDebug(() => 'Starting to handle window_created.');

	const result = await wm.isValidLayout();
	if (result.status) {
		logDebug(() => 'Valid layout detected; no changes were made.');
		return;
	}

	const processId = process.env.YABAI_PROCESS_ID!;
	const windowId = process.env.YABAI_WINDOW_ID!;
	const curNumMasterWindows = wm.getMasterWindows().length;
	const window = wm.getWindowData({ windowId, processId });

	if (
		curNumMasterWindows > 1 &&
		curNumMasterWindows <= state[space.id].numMasterWindows
	) {
		// Move the window to the master
		logDebug(() => 'Moving newly created window to master.');
		await wm.moveWindowToMaster(window);
	}
	// If there are too many windows on the master
	else {
		logDebug(() => 'Moving newly created window to stack.');
		// Move the window to the stack
		await wm.moveWindowToStack(window);
	}

	await wm.updateWindows({
		targetNumMasterWindows: state[space.id].numMasterWindows,
	});
	logDebug(() => 'Finished handling window_created.');
});
