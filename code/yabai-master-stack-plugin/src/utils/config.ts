import { createRequire } from 'node:module';
import onetime from 'onetime';

const __require = createRequire(import.meta.url);

type YabaiPluginConfig = {
	yabaiPath: string;
	debug: boolean;
};

export const getConfig = onetime(
	() => __require('../plugin-config.cjs') as YabaiPluginConfig
);
