import { createInitializedWindowsManager } from '../utils';
import { releaseHandlerLock } from '../utils/handler';
import { main } from '../utils/main';

releaseHandlerLock({ force: true });
main(async () => {
	const { wm, state, space } = await createInitializedWindowsManager();
	await wm.updateWindows({
		targetNumMasterWindows: state[space.id].numMasterWindows,
	});
});
