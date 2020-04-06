import * as Hapi from '@hapi/hapi';
import * as Inert from '@hapi/inert';
import * as Vision from '@hapi/vision';
import * as Swagger from 'hapi-swagger';
import * as HapiPino from 'hapi-pino';
import * as HapiAuthJWT2 from 'hapi-auth-jwt2';
import * as fs from 'fs';
import { getCurrentDate } from '../helpers/dateHelper';

export const SwaggerOptions: Swagger.RegisterOptions = {
	info: {
		title: 'API Documentation ' + process.env.ENV,
		version: '1.0.0',
		contact: {
			name: 'Anıl Gülgör',
			email: 'anilgul@migros.com.tr'
		}
	}
};

export const Plugins: Array<Hapi.ServerRegisterPluginObject<any>> = [
	{
		plugin: Inert
	},
	{
		plugin: Vision
	},
	{
		plugin: Swagger,
		options: SwaggerOptions
	},
	{
		plugin: HapiAuthJWT2
	},
	{
		plugin: HapiPino,
		options: {
			prettyPrint:
				process.env.ENV === 'development'
					? true
					: {
							colorize: true
					  },
			customLevels: ['fatal', 'error', 'warn'],
			redact: ['req.headers.authorization'],
			stream:
				process.env.ENV === 'development'
					? false
					: fs.createWriteStream(__dirname + `/../../production_logs/${getCurrentDate()}.log`, {flags: 'a'}),
			ignorePaths: ['/documentation', '/swaggerui']
		}
	}
];
