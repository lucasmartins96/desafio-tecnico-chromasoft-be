import { NextFunction, Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import AuthService from '../services/auth';
import BadRequestError from '../common/request-errors/bad-request';
import JWTService from '../common/jwt';

class AuthController {
	private readonly service: AuthService;
	private jwt: JWTService;

	constructor() {
		this.service = new AuthService();
		this.jwt = new JWTService();
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

	async signin(
		req: Request<
			unknown,
			unknown,
			{ name?: string; email?: string; password?: string },
			unknown
		>,
		res: Response,
		next: NextFunction,
	) {
		try {
			const { name, email, password } = req.body;

			if (name && email && password) {
				const isEmailRegistered = await this.service.checkEmailExists(email);

				if (isEmailRegistered) {
					return next(
						new BadRequestError({
							message: 'Erro ao criar o cadastro. O email já está cadastrado!',
						}),
					);
				}

				const newUser = await this.service.signin({ name, email, password });
				const newUserId = newUser!.dataValues.id;
				const newUserName = newUser!.dataValues.name;
				const newUserEmail = newUser!.dataValues.email;

				const token = this.jwt.generateToken({
					id: newUserId,
					name: newUserName,
					email: newUserEmail,
				});

				res.status(StatusCodes.OK).json({
					id: newUserId,
					name: newUserName,
					email: newUserEmail,
					token,
				});
			} else {
				next(
					new BadRequestError({
						message:
							'Erro ao criar o cadastro. Verifique se todos os campos estão preenchidos corretamente!',
					}),
				);
			}
		} catch (error) {
			console.error(error);
			next(error);
		}
	}
}

export default AuthController;
