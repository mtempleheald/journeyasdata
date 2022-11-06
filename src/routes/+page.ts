import type { PageLoad } from './$types';
import { redirect } from '@sveltejs/kit';

export const load: PageLoad = async ({ parent }) => {
	const data = await parent();
	console.debug(`/ redirecting to first page in journey /${data.journey?.pages[0]?.url}`);
	throw redirect(307, `/${data.journey?.pages[0]?.url}`);
};
