import fs from 'fs';
import path from 'path';
import pkgDir from 'pkg-dir';

import type { State } from './types';
import { getSpaces } from './utils/space';

const stateFilePath = path.join(pkgDir.sync(__dirname)!, 'state.json');

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
