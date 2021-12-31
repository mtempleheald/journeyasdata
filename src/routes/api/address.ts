// GET: /api/address?postcode=[postcode]&house=[house]
import type { AddressType } from '$lib/types/address';

/**
 * @type {import('@sveltejs/kit').RequestHandler}
 */
export async function get({ url }) {
	const postcode = url.searchParams.get('postcode');
	const house = url.searchParams.get('house');

	const result: AddressType = {
		postcode: postcode,
		property: house,
		addressline1: 'Fake Street',
		addressline2: 'Springfield',
		addressline3: '',
		addressline4: 'Ohia Maud'
	};

	return {
		body: result
	};
}
