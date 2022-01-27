import 'dotenv/config';

import Benchmark from 'benchmark';

import { setDebug } from '../src/config';
import { createInitializedWindowsManager } from '../src/utils/window';
import { p } from './utils';

setDebug(false);

async function main() {
	const suite = new Benchmark.Suite();

	const { wm, state } = await createInitializedWindowsManager();
	const window = wm.getFocusedWindow()!;
	const stackWindows = wm.getStackWindows();

	// prettier-ignore
	suite
		.add('columnizeStackWindows', p(() => wm.columnizeStackWindows))
		.add('createStack', p(() => wm.createStack()))
		.add('doesStackExist', p(() => wm.doesStackExist()))
		.add('executeYabaiCommand', p(() => wm.executeYabaiCommand('-m query --window')))
		.add('getBottomMasterWindow', p(() => wm.getBottomMasterWindow()))
		.add('getBottomStackWindow', p(() => wm.getBottomStackWindow()))
		.add('getBottomWindow', p(() => wm.getBottomWindow(stackWindows)))
		.add('getDividingLineXCoordinate', p(() => wm.getDividingLineXCoordinate()))
		.add('getFocusedWindow', p(() => wm.getFocusedWindow()))
		.add('getMasterWindows', p(() => wm.getMasterWindows()))
		.add('getMiddleWindows', p(() => wm.getMiddleWindows()))
		.add('getStackWindows', p(() => wm.getStackWindows()))
		.add('getTopLeftWindow', p(() => wm.getTopLeftWindow()))
		.add('getTopMasterWindow', p(() => wm.getTopMasterWindow()))
		.add('getTopRightWindow', p(() => wm.getTopRightWindow()))
		.add('getTopStackWindow', p(() => wm.getTopStackWindow()))
		.add('getTopWindow', p(() => wm.getTopWindow(stackWindows)))
		.add('getUpdatedWindowData', p(() => wm.getUpdatedWindowData(window)))
		.add('getWidestMasterWindow', p(() => wm.getWidestMasterWindow()))
		.add('getWidestStackWindow', p(() => wm.getWidestStackWindow()))
		.add('getWindowData', p(() => wm.getWindowData({ windowId: window.id.toString() })))
		.add('initialize', p(() => wm.initialize()))
		.add('isBottomWindow', p(() => wm.isBottomWindow(stackWindows, window)))
		.add('isMasterWindow', p(() => wm.isMasterWindow(window)))
		.add('isMiddleWindow', p(() => wm.isMiddleWindow(window)))
		.add('isStackWindow', p(() => wm.isStackWindow(window)))
		.add('isTopWindow', p(() => wm.isTopWindow(stackWindows, window)))
		.add('isValidLayout', p(() => wm.isValidLayout()))
		.add('isWindowTouchingLeftEdge', p(() => wm.isWindowTouchingLeftEdge(window)))
		.add('moveWindowToMaster', p(() => wm.moveWindowToMaster(window)))
		.add('moveWindowToStack', p(() => wm.moveWindowToStack(window)))
		.add('refreshWindowsData', p(() => wm.refreshWindowsData()))
		.add('updateWindows', p(() => wm.updateWindows({ targetNumMasterWindows: 1 })))
		.add('validateState', p(() => wm.validateState(state)))
		.on('cycle', (event: any) => {
			console.log(String(event.target));
		})
		.run({ async: true });
}

void main();
