import {
	writeState,
	createInitializedWindowsManager,
	logDebug,
	main,
} from '../utils/index.js';

main(async () => {
	const { wm, state, space } = await createInitializedWindowsManager();

	if (state[space.id].numMasterWindows > 1) {
		// Update the state
		state[space.id].numMasterWindows -= 1;
		writeState(state);
		logDebug(() => 'Decreasing master window count.');
		await wm.updateWindows({
			targetNumMasterWindows: state[space.id].numMasterWindows,
		});
	}
});
