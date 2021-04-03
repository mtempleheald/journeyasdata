// GET: /api/refdata/context/list?filter=[filter]

/**
 * @type {import('@sveltejs/kit').RequestHandler}
 */
 export async function get({ params, query }) {

    const context = params.context;
    const list = params.list;
    const filter = query.get('filter');

    // TODO: call actual API using https://www.npmjs.com/package/node-fetch

    return {
        body: [
            {
                "key": "1",
                "value": "value 1"
            },
            {
                "key": "2",
                "value": "value 2"
            },
            {
                "key": "3",
                "value": "value 3"
            },
            {
                "key": "four",
                "value": "value four"
            }
        ]
    }
}