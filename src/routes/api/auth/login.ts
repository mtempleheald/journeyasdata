// POST: /api/auth/login { "username": "someone", "password": "somepassword"}

// If login is successful a user record will be entered into session (request.locals)
// This can then be used by the application to direct users appropriately

import * as api from '$lib/api.js';
import { respond } from './_respond';

export async function post(request) {

    // TODO: call real API for authentication
    const body = {
        user: {
            username: request.body.username,
            password: request.body.password
        }
    }
    // const body = {
    //     errors: {
    //         "email or password": [
    //             "is invalid"
    //         ],
    //         "password": [
    //             "must be entered",
    //             "must be at least 8 characters"
    //         ]
    //     }
    // }

    // This example uses the conduit API (see manual tests)
	// const body = await api.post('users/login', {
	// 	user: {
	// 		email: request.body.email,
	// 		password: request.body.password
	// 	}
	// });

	return respond(body);
}
