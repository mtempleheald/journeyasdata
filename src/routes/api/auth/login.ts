// POST: /api/auth/login { "user": "someone", "pass": "somepassword"}
import jwt from "jsonwebtoken";

/**
 * @type {import('@sveltejs/kit').RequestHandler}
 */
 export async function post(request) {

    console.log(request) // TODO: remove this (obviously)

    let valid: boolean = false;
    if (request.body.user == 'mth' && request.body.pass == 'letmein') // TODO: Replace with real authentication store
        valid = true

    const token = jwt.sign(
        { data: request.body.user }, 
        'secretTODO:inject', 
        { expiresIn: '1h'}
    );
    
    return {
        status: 200,
        headers: {
            'Set-Cookie': [`authToken=${token}`]
        },
        body: valid ? { status: 'authenticated', token: token } : { status: 'failed to authenticate' }
    }
}