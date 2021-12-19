// If login returns a valid user record, convert to jwt for future proof of identity
// This is a secure, httpOnly cookie that can't be manipulated using JavaScript
// Otherwise return unauthorised response

export function respond(body: any) {
	if (body.errors) {
		return { status: 401, body };
	}

	const json = JSON.stringify(body.user);
	const value = Buffer.from(json).toString('base64');

	return {
		headers: {
			'set-cookie': `jwt=${value}; Path=/; Secure; HttpOnly;`
		},
		body
	};
}
