import { json as jsonResponse, type RequestHandler } from '@sveltejs/kit';

// GET: /api/addresses/[postcode]
export const GET: RequestHandler = async ({ params }) => {
	const postcode = params.postcode;

	if (!postcode) {
		return jsonResponse([]);
	}

	// TODO: call actual API using https://www.npmjs.com/package/node-fetch

	const resp = [
		{
			postcode: postcode,
			property: '123',
			addressline1: 'Fake Street',
			addressline2: 'Springfield',
			addressline3: '',
			addressline4: 'Ohia Maud'
		},
		{
			postcode: postcode,
			property: '456',
			addressline1: 'Fake Street',
			addressline2: 'Springfield',
			addressline3: '',
			addressline4: 'Ohia Maud'
		},
		{
			postcode: postcode,
			property: '789',
			addressline1: 'Fake Street',
			addressline2: 'Springfield',
			addressline3: '',
			addressline4: 'Ohia Maud'
		},
		{
			postcode: postcode,
			property: 'The pig sty',
			addressline1: 'Fake Street',
			addressline2: 'Springfield',
			addressline3: '',
			addressline4: 'Ohia Maud'
		}
	];
	return jsonResponse(resp);
};
