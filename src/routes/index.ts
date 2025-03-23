import Route from '../interfaces/route';
import AuthRoute from './auth';
import TaskRoute from './task';
import TestRoute from './test';

const routes: Route[] = [
	new TestRoute(),
	new AuthRoute(),
	new TaskRoute(),
];

export default routes;
