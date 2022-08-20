import { json as jsonResponse } from '@sveltejs/kit';
// GET: /api/address/[postcode]/[residence]
import type { AddressType } from '$lib/types/address';

/**
 * @type {import('@sveltejs/kit').RequestHandler}
 */
export async function GET({ params }) {
	const postcode = params.postcode;
	const house = params.residence;

	const result: AddressType = {
		postcode: postcode,
		property: house,
		addressline1: 'Fake Street',
		addressline2: 'Springfield',
		addressline3: '',
		addressline4: 'Ohia Maud'
	};

	return jsonResponse(result);
}
