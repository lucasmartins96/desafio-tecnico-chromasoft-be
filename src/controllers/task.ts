import { StatusCodes } from 'http-status-codes';
import TaskService from '../services/task';
import { NextFunction, Request, Response } from 'express';
import NotFoundError from '../common/request-errors/not-found';

export default class TaskController {
	private readonly service: TaskService;

	constructor() {
		this.service = new TaskService();
	}

	async getAllUserTasks(
		req: Request,
		res: Response,
		next: NextFunction,
	): Promise<void> {
		try {
			const userPayload = req.user;
			const tasks = await this.service.getAllUserTasks(userPayload!.id);

			if (!tasks) {
				return next(
					new NotFoundError({
						message: 'Nenhuma tarefa encontrada para o usuário atual!',
						showLogging: true,
					}),
				);
			} else {
				res.status(StatusCodes.OK).json({ tasks });
			}
		} catch (error) {
			console.error(error);
			next(error);
		}
	}
}
