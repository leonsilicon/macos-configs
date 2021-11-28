import { createInitializedWindowsManager } from '../utils';
import { logDebug } from '../utils/log';
import { main } from '../utils/main';

main(async () => {
	const { wm, state, space } = await createInitializedWindowsManager();
	logDebug(() => 'Starting to handle window_created.');

	if ((await wm.isValidLayout()).status === true) {
		logDebug(() => 'Valid layout detected; no changes were made.');
		return;
	}

	const processId = process.env.YABAI_PROCESS_ID as string;
	const windowId = process.env.YABAI_WINDOW_ID as string;
	const curNumMasterWindows = wm.getMasterWindows().length;
	const window = wm.getWindowData({ windowId, processId });

	if (
		curNumMasterWindows > 1 &&
		curNumMasterWindows <= state[space.id].numMasterWindows
	) {
		// move the window to the master
		logDebug(() => 'Moving newly created window to master.');
		await wm.moveWindowToMaster(window);
	}
	// if there are too many windows on the master
	else {
		logDebug(() => 'Moving newly created window to stack.');
		// move the window to the stack
		await wm.moveWindowToStack(window);
	}

	await wm.updateWindows({
		targetNumMasterWindows: state[space.id].numMasterWindows,
	});
	logDebug(() => 'Finished handling window_created.');
});
