// POST: /api/auth/verify { "user": "token", "token": "token" }
import jwt from 'jsonwebtoken';

/**
 * @type {import('@sveltejs/kit').RequestHandler}
 */
 export async function post(request) {

    console.log(request.headers.cookie)

    let valid: boolean = false;
    const decoded = jwt.verify(request.body.token, 'secretTODO:inject');
    if (decoded == request.body.user)
        valid = true
    
    return {
        status: 200,         // request was successful
        body: {result: valid} // authentication may or may not have been
    }
}