import { ReasonPhrases, StatusCodes } from 'http-status-codes';
import { RequestError } from '../../interfaces/request-error';

export default class UnauthorizedError extends RequestError {
	private static readonly _statusCode = StatusCodes.UNAUTHORIZED;
	private readonly _code: number;
	private readonly _showLogging: boolean;
	private readonly _context: { [key: string]: unknown };

	constructor(params?: {
		code?: number;
		message?: string;
		showLogging?: boolean;
		context?: { [key: string]: unknown };
	}) {
		const { code, message, showLogging } = params || {};

		super(message || ReasonPhrases.UNAUTHORIZED);
		this._code = code || UnauthorizedError._statusCode;
		this._showLogging = showLogging || false;
		this._context = params?.context || {};

		Object.setPrototypeOf(this, UnauthorizedError.prototype);
	}

	get errors() {
		return [{ message: this.message, context: this._context }];
	}

	get statusCode() {
		return this._code;
	}

	get showLogging() {
		return this._showLogging;
	}
}
