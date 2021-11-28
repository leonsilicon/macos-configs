import { createInitializedWindowsManager } from '../utils';
import { logDebug } from '../utils/log';
import { main } from '../utils/main';

main(async () => {
	const { wm, space, state } = await createInitializedWindowsManager();
	logDebug(() => 'Starting to handle window_moved.');
	await wm.updateWindows({
		targetNumMasterWindows: state[space.id].numMasterWindows,
	});
	logDebug(() => 'Finished handling window_moved.');
});
