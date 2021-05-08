import { extractCookieValue, verifyToken } from '$lib/helpers/auth'

/** @type {import('@sveltejs/kit').Handle} */
export async function handle({ request, render }) {

	// handle() runs server side on every request, only need auth for admin pages	
	if (request.path.startsWith('/admin')) {

		// Client side code can't access the authentication cookie set server side (httpOnly).
		// Add a client side session variable that the client side code can use to verify authentication under normal behaviour.
		// Any API calls/submissions must also validate the JWT cookie to verify authentication in case of dodgy behaviour.

		console.log('handle() request', request)
		console.log('handle() request.headers.cookie', request.headers.cookie)

		const authToken = extractCookieValue(request.headers.cookie, 'authToken')
		const user = extractCookieValue(request.headers.cookie, 'user')
		// Validate cookie, cross-referenced to session user, update session accordingly
		const authenticated = verifyToken(user, authToken)
		if (authenticated) {
			console.log('handle() - authentication success')
			request.locals.session = {authenticatedUser: user}
		} else {
			console.log('handle() - authentication failure')
			request.locals.session = null
			// redirect to login page
			request.path = '/admin/login'
		}
	}
	const response = await render(request)
	
	//console.log ('handle() response', response)

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

	//console.log ('getSession() request', request)

	return request.locals.session?.data;
}
