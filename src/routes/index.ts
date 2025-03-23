import Route from '../interfaces/route';
import AuthRoute from './auth';
import TestRoute from './test';

const routes: Route[] = [
	new TestRoute(),
	new AuthRoute(),
];

export default routes;
