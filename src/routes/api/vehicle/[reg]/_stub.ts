import type { VehicleType } from '$lib/types/vehicle';

export async function stubVehicleData(): Promise<VehicleType> {
	return {
		abicode: 'ABI Code',
		doors: 4,
		enginecc: 'CC',
		fueltype: 'Fuel',
		make: 'Make',
		model: 'Model',
		registration: 'UNKN OWN',
		seatbelts: 4,
		transmission: 'Transmission',
		year: 2020
	};
}
