// GET: /api/address?postcode=[postcode]&house=[house]

/**
 * @type {import('@sveltejs/kit').RequestHandler}
 */
export async function get({ query }) {

    const postcode = query.get('postcode');
    const house = query.get('house');

    return {
        body: {
            postcode: "MK10 0BZ",
            property: "123",
            addressline1: 'Fake Street',
            addressline2: 'Springfield',
            addressline3: '',
            addressline4: 'Ohia Maud',
        }
    }
}