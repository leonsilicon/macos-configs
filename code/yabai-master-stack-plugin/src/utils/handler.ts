import path from 'path';
import pkgDir from 'pkg-dir';

import { acquireLock, releaseLock } from './lock';

const handlerLockPath = path.join(pkgDir.sync(__dirname)!, 'handler.lock');

export function acquireHandlerLock() {
	acquireLock(handlerLockPath);
}

export function releaseHandlerLock(options?: { force?: boolean }) {
	releaseLock(handlerLockPath, options);
}
