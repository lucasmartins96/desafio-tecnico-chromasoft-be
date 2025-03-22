import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import TestService from '../services/test';

class TestController {
	private readonly testService: TestService;

	constructor() {
		this.testService = new TestService();
	}

	async displayMessage(req: Request, res: Response) {
		try {
			const message = await this.testService.createTestMessage();
			res.status(StatusCodes.OK).json({ message });
		} catch (error) {
			throw new Error(error as string);
		}
	}
}

export default TestController;
