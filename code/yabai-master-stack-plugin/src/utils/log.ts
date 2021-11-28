import { debug } from '../config';

export function logDebug(cb: () => unknown) {
	if (debug) {
		console.info(cb());
	}
}