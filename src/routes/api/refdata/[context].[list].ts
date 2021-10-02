// GET: /api/refdata/context/list?filter=[filter]&parent=[parent]
import type { ValueType } from '$lib/types/journey'
import { getMetadata } from './_metadata.v0'
import { stubRefdata } from './_stub'
import { ENV } from '$lib/env'

/**
 * @type {import('@sveltejs/kit').RequestHandler}
 */
 export async function get({ params, query }) {
    
    const context = params.context
    const list = params.list
    const filter = query.get('filter') // used for typeahead functionality
    const parent = query.get('parent') // used for cascading list of values

    let result: ValueType[]


    if (ENV.STUBAPIS === "Y") {
        result = await stubRefdata(context, list)
    }
    else {
        // standard reference data lookup
        result = await getMetadata(context, list)
    }

    return {
        body: result
    }
}