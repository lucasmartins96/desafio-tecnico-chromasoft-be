import { Optional } from 'sequelize';
import {
	Table,
	Column,
	Model,
	PrimaryKey,
	AutoIncrement,
	DataType,
	AllowNull,
} from 'sequelize-typescript';

interface UserAttributes {
	id: number;
	name: string;
	email: string;
	password: string;
}

type UserCreationAttributes = Optional<UserAttributes, 'id'>;

@Table({ tableName: 'user', updatedAt: false, createdAt: false })
export class User extends Model<UserAttributes, UserCreationAttributes> {
	@PrimaryKey
	@AutoIncrement
	@Column(DataType.SMALLINT)
	id!: number;

	@AllowNull(false)
	@Column
	email!: string;

	@AllowNull(false)
	@Column
	password!: string;

	@AllowNull(false)
	@Column
	name!: string;
}
