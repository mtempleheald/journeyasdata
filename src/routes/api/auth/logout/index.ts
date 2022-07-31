// POST: /api/auth/logout

export async function POST() {
	return {
		status: 301,
		headers: {
			'set-cookie': 'jwt=deleted; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT',
			Location: '/admin/login'
		}
	};
}
