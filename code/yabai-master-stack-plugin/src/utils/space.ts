import { execaCommand } from 'execa';

import type { Space } from '../types.js';
import { getConfig } from './config.js';
import { getYabaiOutput } from './yabai.js';

export async function getSpaces() {
	const { yabaiPath } = getConfig();
	const yabaiProcess = execaCommand(`${yabaiPath} -m query --spaces`);
	const yabaiOutput = await getYabaiOutput(yabaiProcess);
	return JSON.parse(yabaiOutput) as Space[];
}

export async function getFocusedSpace() {
	const { yabaiPath } = getConfig();
	const yabaiProcess = execaCommand(`${yabaiPath} -m query --spaces --space`);
	const yabaiOutput = await getYabaiOutput(yabaiProcess);
	return JSON.parse(yabaiOutput) as Space;
}
