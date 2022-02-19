/* eslint-disable @typescript-eslint/naming-convention */

declare global {
	namespace NodeJS {
		interface ProcessEnv {
			TWILIO_ACCOUNT_SID: string;
			TWILIO_AUTH_TOKEN: string;
			PHONE_NUMBER_TO_CALL: string;
			ORIGIN_PHONE_NUMBER: string;
		}
	}
}

export {};
