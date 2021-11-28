import { writeState } from '../state';
import { createInitializedWindowsManager } from '../utils';
import { logDebug } from '../utils/log';
import { main } from '../utils/main';

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
