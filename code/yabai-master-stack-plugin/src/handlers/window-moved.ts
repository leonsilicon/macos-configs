import {
	createInitializedWindowsManager,
	logDebug,
	main,
} from '../utils/index.js';

main(async () => {
	const { wm, space, state } = await createInitializedWindowsManager();
	logDebug(() => 'Starting to handle window_moved.');
	await wm.updateWindows({
		targetNumMasterWindows: state[space.id].numMasterWindows,
	});
	logDebug(() => 'Finished handling window_moved.');
});
