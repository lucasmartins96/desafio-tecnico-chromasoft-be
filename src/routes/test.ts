import { Router } from 'express';
import Route from '../interfaces/route';
import TestController from '../controllers/test';

class TestRoute implements Route {
	private readonly testController: TestController;
	public readonly router: Router;
	public readonly path: string;

	constructor() {
		this.testController = new TestController();
		this.router = Router();
		this.path = 'test';
		this.initializeRoutes();
	}

	private initializeRoutes() {
		this.router.get(
			'/',
			this.testController.displayMessage.bind(this.testController),
		);
	}
}

export default TestRoute;
