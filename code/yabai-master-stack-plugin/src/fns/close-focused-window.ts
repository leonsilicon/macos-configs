import type { Window } from '../types.js';
import { createInitializedWindowsManager, main } from '../utils/index.js';

main(async () => {
	const { wm } = await createInitializedWindowsManager();
	const windowToClose = wm.getFocusedWindow();

	if (windowToClose === undefined) return;

	// Sort the windows from top to bottom
	const masterWindows = wm
		.getMasterWindows()
		.sort((w1, w2) => w1.frame.y - w2.frame.y);
	const stackWindows = wm
		.getStackWindows()
		.sort((w1, w2) => w1.frame.y - w2.frame.y);

	let windowToFocus: Window | undefined;
	if (wm.isStackWindow(windowToClose)) {
		// If the window is the only stack window, then focus on the master window
		if (stackWindows.length === 1) {
			windowToFocus = masterWindows[0];
		}
		// Focus on the window above it, or if there is no window above it, then the window below it
		else {
			const windowPosition = stackWindows.findIndex(
				(w) => w.id === windowToClose.id
			);
			if (windowPosition === 0) {
				windowToFocus = stackWindows[1];
			} else {
				windowToFocus = stackWindows[windowPosition - 1];
			}
		}
	} else if (wm.isMasterWindow(windowToClose)) {
		// If the window is the only master window and there is at least one stack window,
		// focus on the bottom stack window
		if (masterWindows.length === 1 && stackWindows.length > 0) {
			windowToFocus = stackWindows[stackWindows.length - 1];
		}
		// Focus on the window above it, or if there is no window above it, then the window below it
		else {
			const windowPosition = masterWindows.findIndex(
				(w) => w.id === windowToClose.id
			);
			if (windowPosition === 0) {
				windowToFocus = masterWindows[1];
			} else {
				windowToFocus = masterWindows[windowPosition - 1];
			}
		}
	}

	await wm.executeYabaiCommand(`-m window --close`);
	if (windowToFocus !== undefined) {
		await wm.executeYabaiCommand(`-m window --focus ${windowToFocus.id}`);
	}
});
