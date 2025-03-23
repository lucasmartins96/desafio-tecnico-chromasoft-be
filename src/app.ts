import express, { Application, ErrorRequestHandler } from 'express';
import helmet from 'helmet';
import cors from 'cors';
import ErrorHandler from './middlewares/error-handler';
import Route from './interfaces/route';
import PostgresConnection from './config/db/postgres';
import SequelizeConnection from './interfaces/sequelize-connection';

class App {
	private readonly app: Application;
	private readonly port: number;
	private readonly routers: Route[];
	private readonly dbConnection: SequelizeConnection;

	constructor(port: number, routers: Route[]) {
		this.app = express();
		this.port = port;
		this.routers = routers;
		this.dbConnection = PostgresConnection.getInstance();
		this.initialize();
	}

	private initializeDatabaseConnection(): void {
		this.dbConnection.connectToDatabase();
	}

	private initializeMiddlewares(): void {
		this.app.use(cors());
		this.app.use(helmet());
		this.app.use(express.json());
		this.app.use(express.urlencoded({ extended: true }));
	}

	private initializeRoutes(): void {
		this.routers.forEach((route) => {
			this.app.use(`/api/v1/${route.path}`, route.router);
		});
	}

	private initializeErrorHandling(): void {
		this.app.use(
			ErrorHandler.handleRequestErrors as unknown as ErrorRequestHandler,
		);
	}

	private initialize(): void {
		this.initializeDatabaseConnection();
		this.initializeMiddlewares();
		this.initializeRoutes();
		this.initializeErrorHandling();
	}

	public listen(): void {
		this.app.listen(this.port, () => {
			console.log(`App listening on port ${this.port}`);
		});
	}
}

export default App;
