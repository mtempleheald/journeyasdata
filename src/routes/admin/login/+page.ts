// TODO: rework based on https://github.com/sveltejs/kit/discussions/5883

import { redirect } from '@sveltejs/kit';

/** @type {import('@sveltejs/kit').PageLoad} */
export async function load({ session }) {
	// An authorised user will have a user record in session
	// Redirect them to the admin home page
	if (session.user) {
		throw redirect(302, '/admin');
	}
	return {};
}
