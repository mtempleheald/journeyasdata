// GET: /api/addresses?postcode=[postcode]

/**
 * @type {import('@sveltejs/kit').RequestHandler}
 */
export async function get({ query }) {

    const postcode = query.get('postcode');

    // TODO: call actual API using https://www.npmjs.com/package/node-fetch

    return {
        body: [
            {
                postcode: "MK10 0BZ",
                property: "123",
                addressline1: 'Fake Street',
                addressline2: 'Springfield',
                addressline3: '',
                addressline4: 'Ohia Maud',
            },
            {
                postcode: "MK10 0BZ",
                property: "456",
                addressline1: 'Fake Street',
                addressline2: 'Springfield',
                addressline3: '',
                addressline4: 'Ohia Maud',
            },
            {
                postcode: "MK10 0BZ",
                property: "789",
                addressline1: 'Fake Street',
                addressline2: 'Springfield',
                addressline3: '',
                addressline4: 'Ohia Maud',
            },
            {
                postcode: "MK10 0BZ",
                property: "The pig sty",
                addressline1: 'Fake Street',
                addressline2: 'Springfield',
                addressline3: '',
                addressline4: 'Ohia Maud',
            }
        ]
    }
}