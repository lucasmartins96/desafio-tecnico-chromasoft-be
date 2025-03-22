import { Sequelize } from 'sequelize-typescript';

interface SequelizeConnection {
	sequelize?: Sequelize;

	connectToDatabase(): Promise<void>;
}

export default SequelizeConnection;
