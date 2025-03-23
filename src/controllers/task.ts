import { StatusCodes } from 'http-status-codes';
import TaskService from '../services/task';
import { NextFunction, Request, Response } from 'express';
import NotFoundError from '../common/request-errors/not-found';
import BadRequestError from '../common/request-errors/bad-request';

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

	async deleteUserTask(
		req: Request<unknown, unknown, { id?: number }, unknown>,
		res: Response,
		next: NextFunction,
	): Promise<void> {
		try {
			const taskId = req.body.id;

			if (!taskId) {
				return next(
					new BadRequestError({
						message: 'Erro ao identificar a tarefa a ser deletada!',
						showLogging: true,
					}),
				);
			}

			const userId = req.user!.id;
			const deletedRows = await this.service.deleteUserTask({
				userId,
				taskId,
			});

			if (deletedRows <= 0) {
				return next(
					new NotFoundError({
						message: 'Tarefa não identificada!',
						showLogging: true,
					}),
				);
			}

			res
				.status(StatusCodes.OK)
				.json({ message: 'Tarefa deletada com sucesso!' });
		} catch (error) {
			console.error(error);
			next(error);
		}
	}
}
