import type { PageLoad } from './$types';

export const load: PageLoad = async ({ params, parent }) => {
	const data = await parent();
	return {
		data,
		pageurl: params.pageurl as string
	};
};
