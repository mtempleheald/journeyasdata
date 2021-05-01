// GET: /api/refdata/context/list?filter=[filter]
import type { ValueType } from '$lib/types/questionset';

/**
 * @type {import('@sveltejs/kit').RequestHandler}
 */
 export async function get({ params, query }) {

    const context = params.context;
    const list = params.list;
    const filter = query.get('filter');

    // TODO: call actual API using https://www.npmjs.com/package/node-fetch
    const result: ValueType[] = [
        {
            "value": "1",
            "display": context + "." + list + " 1"
        },
        {
            "value": "2",
            "display": context + "." + list + " 2"
        },
        {
            "value": "3",
            "display": context + "." + list + " 3"
        },
        {
            "value": "four",
            "display": context + "." + list + " four"
        }
    ];

    return {
        body: result
    }
}