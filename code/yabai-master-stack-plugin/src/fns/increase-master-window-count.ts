import {
	writeState,
	createInitializedWindowsManager,
	logDebug,
	main,
} from '../utils/index.js';

main(async () => {
	const { wm, space, state } = await createInitializedWindowsManager();
	if (state[space.id].numMasterWindows < wm.windowsData.length - 1) {
		state[space.id].numMasterWindows += 1;
		writeState(state);
		logDebug(() => 'Increasing master window count.');
		await wm.updateWindows({
			targetNumMasterWindows: state[space.id].numMasterWindows,
		});
	}
});
