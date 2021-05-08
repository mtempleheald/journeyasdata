import { extractAuthToken, verifyToken } from '$lib/helpers/auth'

/** @type {import('@sveltejs/kit').Handle} */
export async function handle({ request, render }) {
	// handle() runs server side on every request

	// Client side code can't access the authentication cookie set server side (httpOnly).
	// Add a client side session variable that the client side code can use to verify authentication under normal behaviour.
	// Any API calls/submissions must also validate the JWT cookie to verify authentication in case of dodgy behaviour.

	console.log('handle() request', request)

	const authToken = extractAuthToken(request.headers.cookie)
	// Validate cookie, cross-referenced to session user, update session accordingly
	const authenticated = verifyToken('mth', authToken)
	if (authenticated)
		request.locals.session = {authenticatedUser: 'mth'}

	const response = await render(request)

	return {
		...response,
		headers: {
			...response.headers,
			...request.locals.session,
		}
	};
}




/** @type {import('@sveltejs/kit').GetSession} */
export function getSession(request) {

	console.log ('getSession() request', request)

	return request.locals.session?.data;
}
