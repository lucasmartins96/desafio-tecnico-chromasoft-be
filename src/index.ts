import App from './app';
import environmentVar from './env';
import routes from './routes';

const app = new App(environmentVar.port, routes);

app.listen();
