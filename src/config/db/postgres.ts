import { Sequelize } from 'sequelize-typescript';
import environmentVar from '../../env';
import dbConfigs from '../../constants/db-configs';
import SequelizeConnection from '../../interfaces/sequelize-connection';
import models from '../../models';

class PostgresConnection implements SequelizeConnection {
	sequelize?: Sequelize | undefined;
	static instance: PostgresConnection;

	private constructor() {}

	static getInstance(): PostgresConnection {
		if (!PostgresConnection.instance) {
			PostgresConnection.instance = new PostgresConnection();
		}

		return PostgresConnection.instance;
	}

	async connectToDatabase(): Promise<void> {
		const { name, user, password, port, host } = environmentVar.db;

		this.sequelize = new Sequelize({
			database: name,
			username: user,
			password,
			host,
			port,
			dialect: 'postgres',
			pool: {
				acquire: dbConfigs.ACQUIRE_TIME_IN_MILLISECONDS,
				idle: dbConfigs.IDLE_TIME_IN_MILLISECONDS,
			},
			models,
		});

		await this.sequelize
			.authenticate()
			.then(() => {
				console.log('Conexão ao BD foi estabelecida com sucesso!');
			})
			.catch((err) => {
				console.error('Não é possível conectar ao banco de dados:', err);
			});
	}
}

export default PostgresConnection;
