import * as Hapi from '@hapi/hapi';
import * as JWT from 'jsonwebtoken';

const secret: JWT.Secret = <string>process.env.TOKEN_SECRET;

export const oauthLogin: Hapi.Lifecycle.Method = async (request, h, err) => {
	return request.auth.credentials
};
