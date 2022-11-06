import { json as jsonResponse, type RequestHandler } from '@sveltejs/kit';
import type { ValueType } from '$lib/types/journey';
import { getMetadata } from './_metadata.v0';
import { stubRefdata } from './_stub';
import { STUBAPIS } from '$lib/env';

// GET: /api/refdata/context/list?filter=[filter]&parent=[parent]
export const GET: RequestHandler = async ({ params, url }) => {
	const context = params.context;
	const list = params.list;
	const filter = url.searchParams.get('filter'); // used for typeahead functionality
	const parent = url.searchParams.get('parent'); // used for cascading list of values
	console.debug(`GET: /api/refdata/${context}/${list}?filter=${filter}&parent=${parent}`);

	let result: ValueType[] = [];

	if (context && list) {
		if (STUBAPIS === 'Y') {
			result = await stubRefdata(context, list);
		} else {
			// standard reference data lookup
			result = await getMetadata(context, list);
		}
	} else {
		console.debug('parameters not provided');
	}

	return jsonResponse(result);
};
