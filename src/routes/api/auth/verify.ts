// POST: /api/auth/verify { "user": "token", "token": "token" }
import jwt from "jsonwebtoken";

/**
 * @type {import('@sveltejs/kit').RequestHandler}
 */
 export async function post(request) {

    console.log(request) // TODO: remove this (obviously)

    let valid: boolean = false;
    const decoded = jwt.verify(request.body.token, 'secretTODO:inject');
    if (decoded == request.body.user)
        valid = true
    
    return valid ? { status: 200, body: "token valid" }
                 : { status: 403, body: "identify yourself!" }

}