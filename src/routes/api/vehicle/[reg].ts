// GET: /api/vehicle/[reg]
import type { VehicleType } from '$lib/types/vehicle'
import { STUBAPIS } from '$lib/env';
import { lookup } from './_lookup.v1';
import { stubVehicleData } from './_stub';

/** @type {import('@sveltejs/kit').RequestHandler} */
 export async function get({ params }) {

    const reg = params.reg;
    let result: VehicleType;

    if (STUBAPIS === "Y") {
        result = await stubVehicleData()
    }
    else {
        result = await lookup(reg)
    }

    return {
        body: result
    }
}

