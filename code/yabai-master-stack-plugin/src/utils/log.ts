import { getConfig } from '~/utils/config.js';

export function logDebug(cb: () => unknown) {
	const { debug } = getConfig();
	if (debug) {
		console.info(cb());
	}
}
