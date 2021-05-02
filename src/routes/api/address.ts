// GET: /api/address?postcode=[postcode]&house=[house]
import type { AddressType } from '$lib/types/address';

/**
 * @type {import('@sveltejs/kit').RequestHandler}
 */
export async function get({ query }) {

    const postcode = query.get('postcode');
    const house = query.get('house');

    const result: AddressType = {
        postcode: "MK10 0BZ",
        property: "123",
        addressline1: 'Fake Street',
        addressline2: 'Springfield',
        addressline3: '',
        addressline4: 'Ohia Maud',
    };

    return {
        body: result
    }
}