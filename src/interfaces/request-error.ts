export type ErrorContent = {
	message: string;
	context?: { [key: string]: unknown };
};

export abstract class RequestError extends Error {
	abstract readonly statusCode: number;
	abstract readonly errors: ErrorContent[];
	abstract readonly showLogging: boolean;

	constructor(message: string) {
		super(message);

		Object.setPrototypeOf(this, RequestError.prototype);
	}
}
