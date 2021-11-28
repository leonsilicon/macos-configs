import onExit from 'signal-exit';

import { acquireHandlerLock, releaseHandlerLock } from './handler';
import { logDebug } from './log';

export function handleMasterError(error: Error & { code?: string }) {
	if (error.code === 'ELOCKED') {
		logDebug(() => 'Lock found...aborting');
	} else {
		console.error(error);
	}
}

onExit(() => {
	releaseHandlerLock();
});

export function main(cb: () => Promise<void>) {
	acquireHandlerLock();
	cb()
		.catch(handleMasterError)
		.finally(() => {
			releaseHandlerLock();
		});
}
