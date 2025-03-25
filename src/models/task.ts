import {
	AllowNull,
	AutoIncrement,
	Column,
	DataType,
	ForeignKey,
	Model,
	PrimaryKey,
	Table,
} from 'sequelize-typescript';
import { User } from './user';
import { Optional } from 'sequelize';

type TaskStatus = 'PENDING' | 'DONE';

interface TaskAttributes {
	id: number;
	title: string;
	description: string;
	status: TaskStatus;
	createdAt: number;
	userId: number;
}

type TaskCreationAttributes = Optional<TaskAttributes, 'id'>;

@Table({
	tableName: 'task',
	timestamps: false,
	updatedAt: false,
	createdAt: false,
})
export class Task extends Model<TaskAttributes, TaskCreationAttributes> {
	@AutoIncrement
	@PrimaryKey
	@AllowNull(false)
	@Column({
		type: DataType.SMALLINT,
	})
	id!: number;

	@AllowNull(false)
	@Column
	title!: string;

	@AllowNull(false)
	@Column
	description!: string;

	@AllowNull(false)
	@Column({
		type: DataType.ENUM('PENDING', 'DONE'),
	})
	status!: string;

	@AllowNull(false)
	@Column({
		field: 'created_at',
		type: DataType.BIGINT,
	})
	createdAt!: number;

	@ForeignKey(() => User)
	@Column({
		field: 'user_id',
	})
	userId!: number;
}
