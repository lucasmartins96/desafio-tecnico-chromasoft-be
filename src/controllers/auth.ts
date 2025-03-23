import { NextFunction, Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import AuthService from '../services/auth';

class AuthController {
	private readonly service: AuthService;

	constructor() {
		this.service = new AuthService();
	}

	async login(
		req: Request<unknown, unknown, { email?: string; password?: string }>,
		res: Response,
		next: NextFunction,
	): Promise<void> {
		try {
			const { email, password } = req.body;
			const result = await this.service.login(email, password);

			res.status(StatusCodes.OK).json(result);
		} catch (error) {
			console.error(error);
			next(error);
		}
	}
}

export default AuthController;
