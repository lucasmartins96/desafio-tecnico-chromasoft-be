import { Router } from 'express';
import Route from '../interfaces/route';
import TaskController from '../controllers/task';
import AuthHandler from '../middlewares/auth-handler';

export default class TaskRoute implements Route {
	private readonly controller: TaskController;
	private readonly authHandler: AuthHandler;
	public readonly router: Router;
	public readonly path: string;

	constructor() {
		this.controller = new TaskController();
		this.authHandler = new AuthHandler();
		this.router = Router();
		this.path = 'tasks';
		this.initializeRoutes();
	}

	private initializeRoutes() {
		this.router
			.route('/')
			.get(
				this.authHandler.handleAuthorization.bind(this.authHandler),
				this.controller.getAllUserTasks.bind(this.controller),
			)
			.delete(
				this.authHandler.handleAuthorization.bind(this.authHandler),
				this.controller.deleteUserTask.bind(this.controller),
			)
			.post(
				this.authHandler.handleAuthorization.bind(this.authHandler),
				this.controller.addUserTask.bind(this.controller),
			)
			.patch(
				this.authHandler.handleAuthorization.bind(this.authHandler),
				this.controller.updateUserTask.bind(this.controller),
			);
	}
}
