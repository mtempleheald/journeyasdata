// TODO: rework based on https://github.com/sveltejs/kit/discussions/5883
// POST: /api/auth/logout

export async function POST() {
	return new Response(null, {
		status: 307,
		headers: {
			'set-cookie': 'jwt=deleted; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT',
			Location: '/admin/login'
		}
	});
}
