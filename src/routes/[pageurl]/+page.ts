/** @type {import('./$types').PageLoad} */
export async function load({ params, parent }) {
	const data = await parent();
	return {
		data,
		pageurl: params.pageurl as string
	};
}
