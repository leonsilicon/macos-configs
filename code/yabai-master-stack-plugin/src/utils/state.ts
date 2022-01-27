import fs from 'node:fs';
import path from 'node:path';
import { packageDirectorySync } from 'pkg-dir';

import type { State } from '../types.js';
import { getSpaces } from './space.js';

const stateFilePath = path.join(packageDirectorySync(), 'state.json');

export function writeState(state: State) {
	fs.writeFileSync(stateFilePath, JSON.stringify(state));
}

export async function readState(): Promise<State> {
	if (fs.existsSync(stateFilePath)) {
		const data = JSON.parse(fs.readFileSync(stateFilePath).toString()) as State;
		const spaces = await getSpaces();
		for (const space of spaces) {
			if (data[space.id] === undefined) {
				data[space.id] = { numMasterWindows: 1 };
			}
		}

		return data;
	} else {
		const defaultState: State = {};
		const spaces = await getSpaces();

		for (const space of spaces) {
			defaultState[space.id] = { numMasterWindows: 1 };
		}

		const defaultStateJson = JSON.stringify(defaultState);
		fs.writeFileSync(stateFilePath, defaultStateJson);
		return defaultState;
	}
}
