import { NextFunction, Request, Response } from 'express';
import UnauthorizedError from '../common/request-errors/unauthorized';
import { JsonWebTokenError, TokenExpiredError } from 'jsonwebtoken';
import JWTService from '../common/jwt';

class AuthHandler {
	private jwtService: JWTService;

	constructor() {
		this.jwtService = new JWTService();
	}

	async handleAuthorization(req: Request, res: Response, next: NextFunction) {
		try {
			const token = req.header('Authorization')?.replace('Bearer ', '');

			if (!token) {
				return next(
					new UnauthorizedError({
						message:
							'Autenticação necessária. Por favor, entre com suas credenciais!',
					}),
				);
			}

			const decodedToken =
				await this.jwtService.verifyTokenAsynchronously(token);
			req.user = decodedToken;
			return next();
		} catch (error) {
			if (error instanceof TokenExpiredError) {
				return next(
					new UnauthorizedError({
						message:
							'Token de autenticação inválido ou expirado. Por favor, faça login novamente!',
					}),
				);
			} else if (error instanceof JsonWebTokenError) {
				return next(
					new UnauthorizedError({
						message:
							'Permissão insuficiente. Verifique suas permissões e tente novamente!',
					}),
				);
			}

			throw error;
		}
	}
}

export default AuthHandler;
