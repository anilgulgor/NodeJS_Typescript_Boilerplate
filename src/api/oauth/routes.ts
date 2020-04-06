import * as Hapi from '@hapi/hapi';
import * as options from './routeOptions';
import * as controller from './controller';

export const routes: Array<Hapi.ServerRoute> = [
	{
		path: '/oauth',
		method: 'GET',
		options: options.oauthOptions,
		handler: controller.oauthLogin
	}
];
