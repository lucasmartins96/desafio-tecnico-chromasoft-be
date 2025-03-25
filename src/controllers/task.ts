import { StatusCodes } from 'http-status-codes';
import TaskService from '../services/task';
import { NextFunction, Request, Response } from 'express';
import NotFoundError from '../common/request-errors/not-found';
import BadRequestError from '../common/request-errors/bad-request';
import { TaskSchema, TaskUpdateSchema } from '../schemas/task';

type TaskStatus = 'PENDING' | 'DONE';

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

	async addUserTask(
		req: Request<
			unknown,
			unknown,
			{ title?: string; description?: string; status?: TaskStatus },
			unknown
		>,
		res: Response,
		next: NextFunction,
	): Promise<void> {
		try {
			const userId = req.user!.id;
			const { title, description, status } = req.body;

			if (!title || !description || !status) {
				return next(
					new BadRequestError({
						message:
							'Erro ao adicionar tarefa. Verifique se todos os campos foram preenchidos corretamente!',
						showLogging: true,
					}),
				);
			}

			const result = TaskSchema.safeParse({
				title,
				description,
				status,
			});

			if (!result.success) {
				const formatted = result.error.format();
				const message =
					formatted.title?._errors ??
					formatted.description?._errors ??
					formatted.status?._errors;

				return next(
					new BadRequestError({
						message: message![0],
					}),
				);
			}

			const newTask = await this.service.addUserTask({
				...result.data,
				userId,
			});

			if (!newTask) {
				return next(
					new Error(
						'Erro desconhecido ao adicionar tarefa. Tente novamente ou contate o suporte!',
					),
				);
			}

			res
				.status(StatusCodes.OK)
				.json({ message: 'Nova tarefa adicionada com sucesso!' });
		} catch (error) {
			console.error(error);
			next(error);
		}
	}

	async updateUserTask(
		req: Request<
			unknown,
			unknown,
			{ id: number; title?: string; description?: string; status?: TaskStatus },
			unknown
		>,
		res: Response,
		next: NextFunction,
	): Promise<void> {
		try {
			const userId = req.user!.id;
			const { id, title, description, status } = req.body;

			if (!id) {
				return next(
					new BadRequestError({
						message: 'Erro ao identificar a tarefa a ser deletada!',
						showLogging: true,
					}),
				);
			}

			const result = TaskUpdateSchema.safeParse({
				title,
				description,
				status,
			});

			if (!result.success) {
				const formatted = result.error.format();
				const message =
					formatted.title?._errors ??
					formatted.description?._errors ??
					formatted.status?._errors;

				return next(
					new BadRequestError({
						message: message![0],
					}),
				);
			}

			const affectedCount = await this.service.updateUserTask({
				title,
				description,
				status,
				userId,
				taskId: id,
			});

			if (affectedCount <= 0) {
				return next(
					new NotFoundError({
						message: 'Tarefa não identificada!',
						showLogging: true,
					}),
				);
			}

			res
				.status(StatusCodes.OK)
				.json({ message: 'Tarefa atualizada com sucesso!' });
		} catch (error) {
			console.error(error);
			next(error);
		}
	}
}
