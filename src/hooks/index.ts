import jwt from 'jsonwebtoken';

/** @type {import('@sveltejs/kit').Handle} */
export async function handle({ request, render }) {
	// handle() runs server side on every request

	// Client side code can't access the authentication cookie set server side (httpOnly).
	// Add a client side session variable that the client side code can use to verify authentication under normal behaviour.
	// Any API calls/submissions must also validate the JWT cookie to verify authentication in case of dodgy behaviour.

	console.log('handle() request', request)

	const authToken = extractAuthToken(request.headers.cookie)
	// Validate cookie, cross-referenced to session user, update session accordingly
	//request.locals.authenticated = verify('mth', authToken)
	//request.locals.session = {user: 'mth'};	

	const response = await render(request);

	return {
		...response,
		headers: {
			...response.headers,
			//...session,
		}
	};
}




/** @type {import('@sveltejs/kit').GetSession} */
export function getSession(request) {

	console.log ('getSession() request', request)

	//return request.locals.session.data;
}



/***************/
/** Utilities **/
/***************/

async function verifyToken(user: string, token: string) {
	
	// TODO: move this secret to environment variable and strengthen
    const decoded = jwt.verify(token, 'secretTODO:inject');
    if (decoded == user)
        return true
	
	return false
}

function extractAuthToken(cookies){
	// TODO: implement this properly
	return 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkYXRhIjoibXRoIiwiaWF0IjoxNjIwNDgyMjUyLCJleHAiOjE2MjA0ODIyNTN9.PDMd39pgayvLvIA58Z6v0WhZBX_-WXZ7ItOhkEJ5zFM'
}