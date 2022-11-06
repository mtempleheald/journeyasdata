import { json as jsonResponse, type RequestHandler } from '@sveltejs/kit';
import type { VehicleType } from '$lib/types/vehicle';
import { STUBAPIS } from '$lib/env';
import { lookup } from './_lookup.v1';
import { stubVehicleData } from './_stub';

// GET: /api/vehicle/[reg]
export const GET: RequestHandler = async ({ params }) => {
	const reg = params.reg;
	let result: VehicleType;

	if (STUBAPIS === 'Y') {
		result = await stubVehicleData();
	} else {
		result = reg ? await lookup(reg) : {};
	}

	return jsonResponse(result);
};
