// GET: /api/refdata/context/list?filter=[filter]&parent=[parent]
import { json as jsonResponse } from '@sveltejs/kit';
import type { ValueType } from '$lib/types/journey';
import { getMetadata } from './_metadata.v0';
import { stubRefdata } from './_stub';
import { STUBAPIS } from '$lib/env';

/** @type {import('@sveltejs/kit').RequestHandler} */
export async function GET({ params, url }) {
	const context = params.context;
	const list = params.list;
	const filter = url.searchParams.get('filter'); // used for typeahead functionality
	const parent = url.searchParams.get('parent'); // used for cascading list of values
	console.debug(`GET: /api/refdata/${context}/${list}?filter=${filter}&parent=${parent}`);

	let result: ValueType[];

	if (STUBAPIS === 'Y') {
		result = await stubRefdata(context, list);
	} else {
		// standard reference data lookup
		result = await getMetadata(context, list);
	}

	return jsonResponse(result);
}
