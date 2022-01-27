import type { ExecaChildProcess } from 'execa';
import getStream from 'get-stream';

export async function getYabaiOutput(yabaiProcess: ExecaChildProcess) {
	return new Promise<string>((resolve) => {
		void getStream(yabaiProcess.stdout!).then((output) => {
			resolve(output);
		});
	});
}
