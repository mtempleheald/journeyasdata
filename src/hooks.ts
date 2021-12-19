import * as cookie from 'cookie';

/** @type {import('@sveltejs/kit').GetSession} */
export function getSession(request: any) {
	const cookies = cookie.parse(request.headers.cookie || '');
	const jwt = cookies.jwt && Buffer.from(cookies.jwt, 'base64').toString('utf-8');
	return {
		user: request.locals.user && {
			username: request.locals.user.username,
			jwt: jwt ? JSON.parse(jwt) : null
		}
	};
}
