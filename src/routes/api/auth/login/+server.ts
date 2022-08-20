// TODO: rework based on https://github.com/sveltejs/kit/discussions/5883
// POST: /api/auth/login { "username": "someone", "password": "somepassword"}

// Useful blog on JWT auth in Svelte Kit https://blog.satyam.life/blog/svelte-kit-jwt-auth

export async function POST({ request }) {
	const data = await request.formData();
	const username = data.get('username');
	const password = data.get('password');

	// TODO: call real API for authentication
	if (username === 'mth' && password === 'letmein') {
		const json = JSON.stringify({ username: username, password: password });
		console.debug(json);
		const value = Buffer.from(json).toString('base64');
		return new Response(null, {
			status: 302,
			headers: {
				'set-cookie': `jwt=${value}; Path=/; Secure; HttpOnly;`,
				Location: '/admin'
			}
		});
	} else {
		return new Response(null, {
			status: 301,
			headers: {
				'set-cookie': 'jwt=deleted; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT',
				Location: '/admin/login'
			}
		});
	}
}
