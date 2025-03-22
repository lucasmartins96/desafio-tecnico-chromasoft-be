import { ReasonPhrases, StatusCodes } from 'http-status-codes';
import { RequestError } from '../../interfaces/request-error';

export default class NotFoundError extends RequestError {
	private static readonly _statusCode = StatusCodes.NOT_FOUND;
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

		super(message || ReasonPhrases.NOT_FOUND);
		this._code = code || NotFoundError._statusCode;
		this._showLogging = showLogging || false;
		this._context = params?.context || {};

		Object.setPrototypeOf(this, NotFoundError.prototype);
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
