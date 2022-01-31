/* eslint-disable unicorn/no-abusive-eslint-disable */
/* eslint-disable */

const createAliases = require('@leonzalion/eslint-config/alias');

module.exports = {
	extends: ['@leonzalion/eslint-config'],
	parserOptions: { tsconfigRootDir: __dirname },
	settings: createAliases({ '~': './src', '~test': './test' }),
};
