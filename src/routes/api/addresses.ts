// GET: /api/addresses?postcode=[postcode]

/**
 * @type {import('@sveltejs/kit').RequestHandler}
 */
export async function get({ query }) {

    const postcode = query.get('postcode');
    
    return {
        body: [
            {
                postcode: "MK10 0BZ",
                house: "123",
                addressline1: 'Fake Street',
                addressline2: 'Springfield',
                addressline3: '',
                addressline4: 'Ohia Maud',
            },
            {
                postcode: "MK10 0BZ",
                house: "456",
                addressline1: 'Fake Street',
                addressline2: 'Springfield',
                addressline3: '',
                addressline4: 'Ohia Maud',
            },
            {
                postcode: "MK10 0BZ",
                house: "789",
                addressline1: 'Fake Street',
                addressline2: 'Springfield',
                addressline3: '',
                addressline4: 'Ohia Maud',
            },
            {
                postcode: "MK10 0BZ",
                house: "The pig sty",
                addressline1: 'Fake Street',
                addressline2: 'Springfield',
                addressline3: '',
                addressline4: 'Ohia Maud',
            }
        ]
    }
}