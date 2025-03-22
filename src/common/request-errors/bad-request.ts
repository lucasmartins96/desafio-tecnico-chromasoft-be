import { ReasonPhrases, StatusCodes } from 'http-status-codes';
import { RequestError } from '../../interfaces/request-error';

export default class BadRequestError extends RequestError {
	private static readonly _statusCode = StatusCodes.BAD_REQUEST;
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

		super(message || ReasonPhrases.BAD_REQUEST);
		this._code = code || BadRequestError._statusCode;
		this._showLogging = showLogging || false;
		this._context = params?.context || {};

		Object.setPrototypeOf(this, BadRequestError.prototype);
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
