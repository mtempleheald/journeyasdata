// POST: /api/auth/login { "user": "someone", "pass": "somepassword"}
import jwt from 'jsonwebtoken';

/**
 * @type {import('@sveltejs/kit').RequestHandler}
 */
 export async function post(request) {
    
    console.log(`login attempt by ${request.body.user}...`)

    let valid: boolean = false;
    // TODO: Replace with real authentication store
    if (request.body.user == 'mth' && request.body.pass == 'letmein') {
        
        valid = true
        // generate JWT
        const token = jwt.sign(
            { data: request.body.user }, 
            'secretTODO:inject', 
            { expiresIn: '1800'} // kill session after 30 minutes (rolling 30 mins from last update, refreshed after valid use elsewhere)
        )
        // set the token into a cookie which can't be accessed via JS (httpOnly)
        return {
            status: 200,
            headers: {
                'Set-Cookie': [`authToken=${token}; MaxAge=1800; Secure; HttpOnly;`, `user=${request.body.user}`]
            },
            body: {result:'success'}
        }
    }
    return {
        status: 200,
        body: {result:'error'}
    }
}