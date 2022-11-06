import { json as jsonResponse, type RequestHandler } from '@sveltejs/kit';
import type { AddressType } from '$lib/types/address';

// GET: /api/address/[postcode]/[residence]
export const GET: RequestHandler = async ({ params }) => {
	const postcode = params.postcode;
	const house = params.residence;

	if (!postcode || !house) {
		return jsonResponse({});
	}

	const result: AddressType = {
		postcode: postcode,
		property: house,
		addressline1: 'Fake Street',
		addressline2: 'Springfield',
		addressline3: '',
		addressline4: 'Ohia Maud'
	};

	return jsonResponse(result);
};
