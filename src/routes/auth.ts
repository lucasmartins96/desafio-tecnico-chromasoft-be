import { Router } from 'express';
import Route from '../interfaces/route';
import AuthController from '../controllers/auth';

class AuthRoute implements Route {
	private readonly controller: AuthController;
	public readonly router: Router;
	public readonly path: string;

	constructor() {
		this.controller = new AuthController();
		this.router = Router();
		this.path = 'auth';
		this.initializeRoutes();
	}

	private initializeRoutes() {
		this.router.post('/login', this.controller.login.bind(this.controller));
		this.router.post('/signin', this.controller.signin.bind(this.controller));
	}
}

export default AuthRoute;
