import execa from 'execa';
import { parse } from 'shell-quote';

import { yabaiPath } from '../config';
import { readState, writeState } from '../state';
import type { Display, Space, State, Window } from '../types';
import { getFocusedDisplay } from './display';
import { logDebug } from './log';
import { getFocusedSpace } from './space';
import { getYabaiOutput } from './yabai';

type CreateWindowsManagerProps = {
	display: Display;
	space: Space;
	expectedCurrentNumMasterWindows: number;
};

/**
 * Creates a windows manager.
 * @param props
 * @param props.expectedCurrentNumMasterWindows The expected current number of master
 * windows active on the screen (used as part of a heuristic for determining the master
 * windows).
 */
export function createWindowsManager({
	display,
	space,
	expectedCurrentNumMasterWindows,
}: CreateWindowsManagerProps) {
	type GetWindowDataProps = { processId?: string; windowId?: string };

	async function getWindowsData() {
		const yabaiProcess = execa(yabaiPath, ['-m', 'query', '--windows']);
		const yabaiOutputPromise = getYabaiOutput(yabaiProcess);
		const yabaiOutput = await yabaiOutputPromise;
		const windowsData = (JSON.parse(yabaiOutput) as Window[]).filter(
			(window) => {
				// Window should not be floating
				if (
					window.floating !== 0 ||
					window.display !== display.index ||
					window.space !== space.index
				) {
					return false;
				}

				if (window.minimized) return false;

				return true;
			}
		);
		return windowsData;
	}

	const windowsManager = {
		validateState(state: State) {
			if (this.windowsData.length < this.expectedCurrentNumMasterWindows) {
				this.expectedCurrentNumMasterWindows = this.windowsData.length;
				state[space.id].numMasterWindows = this.windowsData.length;
			}

			if (state[space.id].numMasterWindows <= 0) {
				state[space.id].numMasterWindows = 1;
			}

			writeState(state);
		},
		expectedCurrentNumMasterWindows,
		windowsData: [] as Window[],
		async initialize() {
			this.windowsData = await getWindowsData();
		},
		async refreshWindowsData() {
			const newWindowsData = await getWindowsData();
			this.windowsData = newWindowsData;
		},
		getUpdatedWindowData(window: Window) {
			return this.windowsData.find((win) => window.id === win.id)!;
		},
		async executeYabaiCommand(command: string) {
			const yabaiProcess = execa(yabaiPath, parse(command) as string[]);
			const yabaiOutput = await getYabaiOutput(yabaiProcess);
			await this.refreshWindowsData();
			return yabaiOutput;
		},
		getWindowData({ processId, windowId }: GetWindowDataProps): Window {
			if (processId === undefined && windowId === undefined) {
				throw new Error('Must provide at least one of processId or windowId');
			}

			const windowData = this.windowsData.find(
				(window) =>
					window.pid === Number(processId) || window.id === Number(windowId)
			);

			if (windowData === undefined) {
				if (processId !== undefined) {
					throw new Error(`Window with pid ${processId} not found.`);
				} else {
					throw new Error(`Window with id ${windowId} not found.`);
				}
			}

			return windowData;
		},
		getFocusedWindow(): Window | undefined {
			return this.windowsData.find((w) => w.focused === 1);
		},
		/**
		 * There is always a line dividing the master windows from the secondary windows. To find this line,
		 * we use two master observations:
		 * 1. The top-right window is always on the right side of the dividing line.
		 * 2. If there is more than one master window, the dividing line must cross the left side of two
		 * windows
		 * Using these observations, we can loop through the windows in descending x-coordinate starting from the top-right window
		 * and for each pair of windows that share x-coordinates, we check if the numMasterWindows is less
		 * than the number of windows we've iterated through, and if so, return the x-coordinate of the currently
		 * processed window
		 */
		getDividingLineXCoordinate() {
			const topRightWindow = this.getTopRightWindow();
			if (topRightWindow === undefined) {
				throw new Error(
					'getDivingLineXCoordinate() was called when there are no windows.'
				);
			}
			logDebug(() => `Top-right window: ${topRightWindow.app}`);

			if (this.expectedCurrentNumMasterWindows === 1)
				return topRightWindow.frame.x;

			const nonStackWindows = this.windowsData.filter(
				(window) => !this.isStackWindow(window)
			);
			// Get all the windows to the left of the top-right window which are not a stack window
			const eligibleWindows = nonStackWindows
				.filter((window) => window.frame.x <= topRightWindow.frame.x)
				.sort((window1, window2) => window2.frame.x - window1.frame.x);

			const numWindowsToRightOfTopRightWindow =
				nonStackWindows.length - eligibleWindows.length;

			// If there are enough windows that are to the right of the top-right window, then return
			// the top-right window's x-coordinate
			if (
				numWindowsToRightOfTopRightWindow >=
				this.expectedCurrentNumMasterWindows
			) {
				return topRightWindow.frame.x;
			}

			// Otherwise, iterate through the eligible windows in order and find pairs of windows
			for (let i = 0; i < eligibleWindows.length - 1; i += 1) {
				const curWindow = eligibleWindows[i];
				const nextWindow = eligibleWindows[i + 1];
				if (
					curWindow.frame.x === nextWindow.frame.x &&
					numWindowsToRightOfTopRightWindow + i + 2 >=
						this.expectedCurrentNumMasterWindows
				) {
					return curWindow.frame.x;
				}
			}

			// If a pair of windows could not be found (which means all the windows are side-by-side), just
			// return the top-right window's x-coordinate
			return topRightWindow.frame.x;
		},
		/**
		 * The top-left window is the window with the lowest y-coordinate and the lowest x-coordinate.
		 */
		getTopLeftWindow() {
			const leftWindows = this.windowsData.filter((window) =>
				this.isStackWindow(window)
			);
			let topLeftWindow = leftWindows[0];
			for (const window of leftWindows) {
				if (window.frame.y <= topLeftWindow.frame.y) {
					topLeftWindow = window;
				}
			}
			return topLeftWindow;
		},
		/*
		 * The top-right window is the rightmost window with the lowest y-coordinate.
		 */
		getTopRightWindow(): Window | undefined {
			if (this.windowsData.length === 0) return undefined;

			let lowestYCoordinate = this.windowsData[0].frame.y;
			for (const window of this.windowsData) {
				if (window.frame.y < lowestYCoordinate) {
					lowestYCoordinate = window.frame.y;
				}
			}

			const topWindows = this.windowsData.filter(
				(window) => window.frame.y === lowestYCoordinate
			);
			let topRightWindow = topWindows[0];
			for (const window of topWindows) {
				if (window.frame.x > topRightWindow.frame.x) {
					topRightWindow = window;
				}
			}
			return topRightWindow;
		},
		getWidestStackWindow() {
			let widestStackWindow: Window | undefined;
			for (const window of this.getStackWindows()) {
				if (
					widestStackWindow === undefined ||
					window.frame.w > widestStackWindow.frame.w
				) {
					widestStackWindow = window;
				}
			}
			return widestStackWindow;
		},
		getWidestMasterWindow() {
			let widestMasterWindow: Window | undefined;
			for (const window of this.getMasterWindows()) {
				if (
					widestMasterWindow === undefined ||
					window.frame.w > widestMasterWindow.frame.w
				) {
					widestMasterWindow = window;
				}
			}
			return widestMasterWindow;
		},
		// In the event that the windows get badly rearranged and all the windows span the entire width of
		// the screen, split the top-right window vertically and then move the windows into the split
		async createStack() {
			logDebug(() => 'Creating stack...');
			let topRightWindow = this.getTopRightWindow();
			if (topRightWindow === undefined) return;
			logDebug(() => `Top-right window: ${topRightWindow?.app}`);

			if (topRightWindow.split === 'horizontal') {
				await this.executeYabaiCommand(
					`-m window ${topRightWindow.id} --toggle split`
				);
				topRightWindow = this.getTopRightWindow();
			}

			await this.columnizeStackWindows();
		},
		/**
		 * If the top-right window has a x-coordinate of 0, or if the stack dividing
		 * line is equal to 0, then the stack does not exist
		 */
		doesStackExist() {
			const topRightWindow = this.getTopRightWindow();
			if (topRightWindow === undefined) return false;
			return topRightWindow.frame.x !== 0;
		},
		/**
		 * Turns the stack into a column by making sure the split direction of all the stack windows
		 * is horizontal
		 */
		async columnizeStackWindows() {
			// In this case, we want to columnize all the windows to the left of the dividing line
			const dividingLineXCoordinate = this.getDividingLineXCoordinate();

			const stackWindows = this.windowsData.filter(
				(window) => window.frame.x < dividingLineXCoordinate
			);
			if (stackWindows.length > 1) {
				for (const stackWindow of stackWindows) {
					const window = this.getUpdatedWindowData(stackWindow);
					if (window.split === 'vertical') {
						await this.executeYabaiCommand(
							`-m window ${window.id} --toggle split`
						);
					}
				}
			}
		},
		async moveWindowToStack(window: Window) {
			logDebug(() => `Moving window ${window.app} to stack.`);

			logDebug(() => 'moving window west');
			// Use a small heuristic that helps prevent "glitchy" window rearrangements
			try {
				await this.executeYabaiCommand(`-m window ${window.id} --warp west`);
			} catch {
				// empty
			}

			await this.columnizeStackWindows();

			// If there's only two windows, make sure that the window stack exists
			if (this.windowsData.length === 2) {
				if (window.split === 'horizontal') {
					await this.executeYabaiCommand(
						`-m window ${window.id} --toggle split`
					);
				}
				return;
			}

			// Don't do anything if the window is already a stack window
			if (this.isStackWindow(window)) {
				return;
			}

			// Find a window that's touching the left side of the screen
			const stackWindow = this.getWidestStackWindow();

			if (stackWindow === undefined || stackWindow.id === window.id) {
				return;
			}

			await this.executeYabaiCommand(
				`-m window ${window.id} --warp ${stackWindow.id}`
			);
			window = this.getUpdatedWindowData(window);

			if (this.windowsData.length === 2) {
				if (window.split === 'horizontal') {
					await this.executeYabaiCommand(
						`-m window ${window.id} --toggle split`
					);
				}
			} else {
				if (window.split === 'vertical') {
					await this.executeYabaiCommand(
						`-m window ${window.id} --toggle split`
					);
				}
			}
		},
		async moveWindowToMaster(window: Window) {
			logDebug(() => `Moving window ${window.app} to master.`);
			// Use a small heuristic that helps prevent "glitchy" window rearrangements
			try {
				await this.executeYabaiCommand(`-m window ${window.id} --warp east`);
			} catch {
				// empty
			}

			// If the window is already a master window, then don't do anything
			if (this.isMasterWindow(window)) return;

			// Find a window that's touching the right side of the screen
			const masterWindow = this.getWidestMasterWindow();

			if (masterWindow === undefined || masterWindow.id === window.id) return;
			await this.executeYabaiCommand(
				`-m window ${window.id} --warp ${masterWindow.id}`
			);
			window = this.getUpdatedWindowData(window);

			if (window.split === 'vertical') {
				await this.executeYabaiCommand(`-m window ${window.id} --toggle split`);
			}
		},
		/**
		 * A window which is to the right of the dividing line is considered a master window.
		 */
		isMasterWindow(window: Window) {
			const dividingLineXCoordinate = this.getDividingLineXCoordinate();
			return window.frame.x >= dividingLineXCoordinate;
		},
		isWindowTouchingLeftEdge(window: Window) {
			return window.frame.x === display.frame.x;
		},
		/**
		 * If the window's frame has an x equal to the x of the display, it is a stack window
		 */
		isStackWindow(window: Window) {
			return this.isWindowTouchingLeftEdge(window);
		},
		isMiddleWindow(window: Window) {
			return !this.isStackWindow(window) && !this.isMasterWindow(window);
		},
		getMiddleWindows() {
			return this.windowsData.filter((window) => this.isMiddleWindow(window));
		},
		getMasterWindows() {
			const dividingLineXCoordinate = this.getDividingLineXCoordinate();
			return this.windowsData.filter(
				(window) => window.frame.x >= dividingLineXCoordinate
			);
		},
		getStackWindows() {
			return this.windowsData.filter((window) => this.isStackWindow(window));
		},
		async isValidLayout(props?: {
			targetNumMasterWindows?: number;
		}): Promise<{ status: true } | { status: false; reason: string }> {
			logDebug(() => 'Starting valid layout check...');

			// If there are no windows, it is a valid layout
			if (this.windowsData.length === 0) {
				return { status: true };
			}

			const targetNumMasterWindows =
				props?.targetNumMasterWindows ?? this.expectedCurrentNumMasterWindows;

			// If targetNumMasterWindows is greater or equal to the number of windows, all windows must be touching the left side
			if (
				targetNumMasterWindows >= this.windowsData.length &&
				!this.windowsData.every((window) =>
					this.isWindowTouchingLeftEdge(window)
				)
			) {
				return {
					status: false,
					reason:
						'The number of master windows is greater or equal to the number of windows and not all windows are touching the left edge.',
				};
			} else {
				// Verify that the number of master windows equals the target number of master windows
				const curNumMasterWindows = this.getMasterWindows().length;
				if (targetNumMasterWindows !== curNumMasterWindows) {
					return {
						status: false,
						reason: `Number of master windows does not equal expected number of master windows (${curNumMasterWindows}/${targetNumMasterWindows})`,
					};
				}

				// Verify that there is no middle window
				for (const window of this.windowsData) {
					if (this.isMiddleWindow(window)) {
						return {
							status: false,
							reason: `A middle window (${window.app}) was detected.`,
						};
					}
				}

				return { status: true };
			}
		},
		async updateWindows({
			targetNumMasterWindows,
		}: {
			targetNumMasterWindows: number;
		}) {
			logDebug(
				() =>
					`updateWindows() called with targetNumMasterWindows = ${targetNumMasterWindows}`
			);
			const layoutValidity = await this.isValidLayout({
				targetNumMasterWindows,
			});
			if (layoutValidity.status === true) {
				logDebug(() => 'Valid layout detected; no changes were made.');
				return;
			} else {
				logDebug(
					() =>
						`Invalid layout detected: ${layoutValidity.reason}. Updating windows...`
				);
			}

			const numWindows = this.windowsData.length;

			// If the stack is supposed to exist but doesn't exist
			if (targetNumMasterWindows !== numWindows && !this.doesStackExist()) {
				logDebug(() => 'Stack does not exist, creating it...');
				await this.createStack();
			}

			if (numWindows > 2) {
				const masterWindows = this.getMasterWindows();
				logDebug(
					() => `Master windows: ${masterWindows.map((window) => window.app)}`
				);
				let curNumMasterWindows = masterWindows.length;

				// If there are too many master windows, move them to stack
				if (curNumMasterWindows > targetNumMasterWindows) {
					logDebug(
						() =>
							`Too many master windows (${curNumMasterWindows}/${targetNumMasterWindows}).`
					);
					// Sort the windows from bottom to top and then right to left
					masterWindows.sort((window1, window2) =>
						window1.frame.y !== window2.frame.y
							? window1.frame.y - window2.frame.y
							: window1.frame.x - window2.frame.x
					);

					while (curNumMasterWindows > targetNumMasterWindows) {
						// Remove the window with the greatest y-coordinate first
						const masterWindow = masterWindows.pop()!;

						logDebug(
							() => `Moving master window ${masterWindow.app} to stack.`
						);
						await this.moveWindowToStack(masterWindow);
						curNumMasterWindows -= 1;
					}
				}

				// If there are windows that aren't touching either the left side or the right side
				// after the move, fill up master and then move the rest to stack
				let middleWindows;
				while ((middleWindows = this.getMiddleWindows()).length > 0) {
					const middleWindow = middleWindows[0];
					logDebug(() => `Middle window ${middleWindow.app} detected.`);
					if (curNumMasterWindows < targetNumMasterWindows) {
						logDebug(
							() => `Moving middle window ${middleWindow.app} to master.`
						);
						await this.moveWindowToMaster(middleWindow);
						curNumMasterWindows += 1;
					} else {
						logDebug(
							() => `Moving middle window ${middleWindow.app} to stack.`
						);
						await this.moveWindowToStack(middleWindow);
					}
				}

				// If there are still not enough master windows, move some of the stack windows to master
				const stackWindows = this.getStackWindows();
				// Sort the stack windows by reverse y-coordinate and reverse x-coordinate to move the
				// bottom-rightmost windows first
				stackWindows.sort((window1, window2) =>
					window1.frame.x !== window2.frame.x
						? window2.frame.x - window1.frame.x
						: window2.frame.y - window1.frame.y
				);

				while (curNumMasterWindows < targetNumMasterWindows) {
					console.info(
						`Not enough master windows (${curNumMasterWindows}/${targetNumMasterWindows})`
					);
					const stackWindow = stackWindows.pop()!;
					logDebug(() => `Moving stack window ${stackWindow.app} to master.`);
					await this.moveWindowToMaster(stackWindow);
					curNumMasterWindows += 1;
				}
			}

			// Note: the following should never be called
			if (
				(await this.isValidLayout({ targetNumMasterWindows })).status === false
			) {
				throw new Error(
					`updateLayout() ended with an invalid layout; reason: ${layoutValidity.reason}`
				);
			} else {
				logDebug(() => 'updateLayout() was successful.');
			}

			this.expectedCurrentNumMasterWindows = targetNumMasterWindows;
		},
		getTopWindow(windows: Window[]) {
			if (windows.length === 0) {
				throw new Error('List of windows provided was empty.');
			}
			let topWindow = windows[0];
			for (const w of windows) {
				if (w.frame.y < topWindow.frame.y) {
					topWindow = w;
				}
			}
			return topWindow;
		},
		isTopWindow(windows: Window[], window: Window) {
			return this.getTopWindow(windows).id === window.id;
		},
		getBottomWindow(windows: Window[]) {
			if (windows.length === 0) {
				throw new Error('List of windows provided was empty.');
			}

			let bottomWindow = windows[0];
			for (const w of windows) {
				if (w.frame.y > bottomWindow.frame.y) {
					bottomWindow = w;
				}
			}
			return bottomWindow;
		},
		isBottomWindow(windows: Window[], window: Window) {
			return this.getBottomWindow(windows).id === window.id;
		},
		getTopStackWindow() {
			return this.getTopWindow(this.getStackWindows());
		},
		getBottomStackWindow() {
			return this.getBottomWindow(this.getStackWindows());
		},
		getTopMasterWindow() {
			return this.getTopWindow(this.getMasterWindows());
		},
		getBottomMasterWindow() {
			return this.getBottomWindow(this.getMasterWindows());
		},
	};

	return windowsManager;
}

export async function createInitializedWindowsManager() {
	const state = await readState();
	const display = await getFocusedDisplay();
	const space = await getFocusedSpace();
	const wm = createWindowsManager({
		display,
		space,
		expectedCurrentNumMasterWindows: state[space.id].numMasterWindows,
	});
	await wm.initialize();
	wm.validateState(state);
	return { wm, state, display, space };
}
