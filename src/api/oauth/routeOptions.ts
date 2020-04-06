import * as Hapi from '@hapi/hapi';
import * as Joi from '@hapi/joi';

export const oauthOptions: Hapi.RouteOptions = {
	validate: {
		headers: Joi.object()
			.keys({
				authorization: Joi.string().required()
			})
			.unknown(),
		query: {
			name: Joi.string().required()
		}
	},
	description: 'Login',
	notes: 'Login without OTP',
    tags: ['api'],
    auth: 'token'
};
