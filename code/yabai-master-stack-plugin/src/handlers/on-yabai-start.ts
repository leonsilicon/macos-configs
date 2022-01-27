import {
	createInitializedWindowsManager,
	releaseHandlerLock,
	main,
} from '../utils/index.js';

releaseHandlerLock({ force: true });
main(async () => {
	const { wm, state, space } = await createInitializedWindowsManager();
	await wm.updateWindows({
		targetNumMasterWindows: state[space.id].numMasterWindows,
	});
});
