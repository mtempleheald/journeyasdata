// TODO: rework based on https://github.com/sveltejs/kit/discussions/5883

/** @type {import('./$types').LayoutServerLoad} */
export async function load({ request, setHeaders }) {
	return {
		user: request.headers.get('cookie')
	};
}
