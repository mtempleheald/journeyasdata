// TODO: rework based on https://github.com/sveltejs/kit/discussions/5883

import { redirect } from '@sveltejs/kit';

/** @type {import('./$types').PageLoad} */
export async function load({ session }) {
	const { user } = session;

	// TODO: Move this to Handle hook for all /admin/... paths
	if (!user) {
		throw redirect(302, '/admin/login');
	}

	return { user };
}
