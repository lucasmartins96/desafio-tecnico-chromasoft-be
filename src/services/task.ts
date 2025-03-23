import { Task } from '../models/task';

type DeleteProps = {
	userId: number;
	taskId: number;
};

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

	async deleteUserTask(props: DeleteProps): Promise<number> {
		try {
			return Task.destroy({
				where: {
					id: props.taskId,
					userId: props.userId,
				},
			});
		} catch (error) {
			console.error(error);
			throw error;
		}
	}
}
