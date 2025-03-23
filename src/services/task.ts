import { Task } from '../models/task';

enum TaskStatus {
  PENDING,
  DONE,
}

type DeleteProps = {
	userId: number;
	taskId: number;
};

type AddProps = {
	title: string;
	description: string;
	status: TaskStatus;
	userId: number;
}

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

	async addUserTask(props: AddProps): Promise<Task | null> {
		try {
			const createdAt = new Date().getTime();
			const newTask = new Task({ ...props, createdAt });
			const created = await newTask.save();
			return created;
		} catch (error) {
			console.error(error);
			throw error;
		}
	}
}
