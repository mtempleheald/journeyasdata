import { redirect } from '@sveltejs/kit';

/** @type {import('./$types').PageLoad} */
export async function load({ parent }) {
	const data = await parent();
	console.debug(`/ redirecting to first page in journey /${data.journey?.pages[0]?.url}`);
	throw redirect(307, `/${data.journey?.pages[0]?.url}`);
}
