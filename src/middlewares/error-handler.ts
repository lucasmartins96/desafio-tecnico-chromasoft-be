/* eslint-disable @typescript-eslint/no-unused-vars */
import { NextFunction, Request, Response } from 'express';
import { ReasonPhrases, StatusCodes } from 'http-status-codes';
import { ErrorContent, RequestError } from '../interfaces/request-error';

class ErrorHandler {
	static handleRequestErrors(
		error: Error,
		_req: Request,
		res: Response<{ errors: ErrorContent[] }>,
		_next: NextFunction,
	) {
		if (error instanceof RequestError) {
			const { statusCode, errors, showLogging, stack } = error;

			if (showLogging) {
				const errorLogging = JSON.stringify(
					{
						code: statusCode,
						errors,
						stack,
					},
					null,
					2,
				);
				console.error(errorLogging);
			}

			return res.status(statusCode).send({ errors });
		}

		console.error(JSON.stringify(error, null, 2));

		return res
			.status(StatusCodes.INTERNAL_SERVER_ERROR)
			.send({ errors: [{ message: ReasonPhrases.INTERNAL_SERVER_ERROR }] });
	}
}

export default ErrorHandler;
