import { Task } from '../models/task';

export default class TaskService {
	constructor() {}

	async getAllUserTasks(userId: number): Promise<Task[] | null> {
		try {
			return Task.findAll({ where: { userId } });
		} catch (error) {
			console.error(error);
			throw error;
		}
	}
}
