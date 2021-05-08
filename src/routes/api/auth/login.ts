// POST: /api/auth/login { "user": "someone", "pass": "somepassword"}
import { generateToken, credentialsValid } from '$lib/helpers/auth'

/**
 * @type {import('@sveltejs/kit').RequestHandler}
 */
 export async function post(request) {
    
    console.log(`login attempt by ${request.body.user}...`)

    
    if (credentialsValid(request.body.user, request.body.pass)) {
        console.log(`login successful`)
        // set the token into a cookie which can't be accessed via JS (httpOnly)
        return {
            status: 200,
            headers: {
                'Set-Cookie': [`authToken=${generateToken(request.body.user)}; MaxAge=18000; Secure; HttpOnly;`, `user=${request.body.user}; MaxAge=1800; Secure; HttpOnly;`]
            },
            body: {result:'success'}
        }
    }
    console.log(`login failed`)
    return {        
        status: 200,
        headers: {
            'Set-Cookie': [`authToken=; expires=Thu, Jan 01 1970 00:00:00 UTC; Secure; HttpOnly;`, `user=; Secure; HttpOnly; expires=Thu, Jan 01 1970 00:00:00 UTC;`]
        },
        body: {result:'error'}
    }
}