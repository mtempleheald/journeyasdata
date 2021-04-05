// GET: /api/vehicle/[reg]

/**
 * @type {import('@sveltejs/kit').RequestHandler}
 */
 export async function get({ params }) {

    const context = params.reg;

    // TODO: call actual API using https://www.npmjs.com/package/node-fetch

    return {
        body: {
            "registration" : "DA69 GTZ",
            "make" : "Skoda",
            "model" : "Octavia",
            "body" : "Saloon",
            "doors" : "5",
            "engine" : "Petrol",
            "colour": "White",
            "transmission" : "DSG",
            "engineCC" : "1998",
            "engineBhp": "245",
            "abiCode" : "93836"
        }
    }
}