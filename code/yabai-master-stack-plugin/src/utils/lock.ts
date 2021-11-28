import fs from 'fs';

const locks = new Map<string, true>();

export function releaseLock(lockPath: string, options?: { force?: boolean }) {
	if (options?.force || locks.has(lockPath)) {
		try {
			fs.rmdirSync(lockPath);
			locks.delete(lockPath);
		} catch (error: any) {
			if (error.code !== 'ENOENT') {
				throw error;
			}
		}
	}
}

export function acquireLock(lockPath: string) {
	try {
		// Using mkdir to create the lock because it is an atomic operation
		fs.mkdirSync(lockPath);
		locks.set(lockPath, true);
	} catch (error: any) {
		if (error.code === 'EEXIST') {
			throw new Error('Could not acquire lock.');
		} else {
			throw error;
		}
	}
}
