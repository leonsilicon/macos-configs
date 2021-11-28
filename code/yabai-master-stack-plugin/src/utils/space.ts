import execa from 'execa';

import { yabaiPath } from '../config';
import type { Space } from '../types';
import { getYabaiOutput } from './yabai';

export async function getSpaces() {
	const yabaiProcess = execa.command(`${yabaiPath} -m query --spaces`);
	const yabaiOutput = await getYabaiOutput(yabaiProcess);
	return JSON.parse(yabaiOutput) as Space[];
}

export async function getFocusedSpace() {
	const yabaiProcess = execa.command(`${yabaiPath} -m query --spaces --space`);
	const yabaiOutput = await getYabaiOutput(yabaiProcess);
	return JSON.parse(yabaiOutput) as Space;
}
