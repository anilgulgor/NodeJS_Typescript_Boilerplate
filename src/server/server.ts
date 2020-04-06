import * as hapi from '@hapi/hapi';
import * as joi from '@hapi/joi';
import * as glob from 'glob';
import * as path from 'path';
import { Plugins, SwaggerOptions } from './swaggerOptions';
import f from 'figlet';
import hapiAuthJwt2 from 'hapi-auth-jwt2';
import * as JWT from 'jsonwebtoken';
import _ from 'lodash';

class Server {
	port!: number;
	host!: string;
	docsRoute!: hapi.ServerRoute;

	constructor(_port: number, _host: string) {
		this.port = _port;
		this.host = _host;
	}

	verify(decoded: {}, request: hapi.Request ) {

        return new Promise<Object>((resolve, reject) => {
            
            resolve({
                isValid: true,
                credentials: decoded
            })

        })
		
	}

	async init() {
		const server: hapi.Server = new hapi.Server({
			port: this.port,
			host: this.host
		});

		server.validator(joi);

		try {
			await server.register(Plugins);
			console.log('Server plugins registered successfully');
		} catch (err) {
			return console.log(
				'An error occured while registering server plugins ' + err
			);
		}

		try {
            const secret = process.env.TOKEN_SECRET

			server.auth.strategy('token', 'jwt', {
				key: secret,
				validate: this.verify,
				verifyOptions: { algorithms: ['HS256'] }
			});
			server.auth.default('token');
			console.log('Server auth strategies set successfully');
		} catch (err) {
			return console.log(
				'An error occured while setting auth strategies ' + err
			);
		}

		const docsHandler: hapi.Lifecycle.Method = (request, h, err) => {
			if (err) {
				return `${err}`;
			}
			const protocol = request.server.info.protocol || 'http';
			const host = `${protocol}://${request.server.info.host}`;
			const message = {
				api: SwaggerOptions.info.title,
				name: SwaggerOptions.info.contact?.name,
				contact: SwaggerOptions.info.contact?.email,
				docs: `${host}/docs`
			};
			return message;
		};

		const docsRoute: hapi.ServerRoute = {
			path: '/',
			method: 'GET',
			handler: docsHandler,
			options: {
				auth: false
			}
		};

		server.route(docsRoute);

		glob.sync('/../api/**/routes.ts', { root: __dirname }).forEach((file) => {
			const routes: Array<hapi.ServerRoute> = require(path.join(file)).routes;
			try {
				server.route(routes);
			} catch (err) {
				console.log(err);
			}
		});

		await server.start();
		console.log('Server running on %s', server.info.uri);

		f(process.env.ENV, (err: any, data: any) => {
			if (err) return console.log(`Something went wrong. Error: ${err}`);
			console.log(data);
		});
	}
}

export = Server;
