import type { VehicleType } from '$lib/types/vehicle';
import { APIHOSTNAME } from '$lib/env';
import { getToken } from '../../_token';

export async function lookup(regnum: string) {
	const url = `${APIHOSTNAME}/api/V1/vehicle/lookup?RegistrationNumber=${regnum}`;
	console.debug(`calling url ${url} ...`);

	const token = await getToken();

	const options = {
		method: 'GET',
		headers: new Headers({
			'Content-Type': 'application/json',
			Authorization: `Bearer ${token}`
		})
	};

	const result: VehicleType[] = await fetch(url, options)
		.then((res) => res.json())
		.then((json) => {
			const values: [{ [key: string]: unknown }] =
				json && json.IsSuccess ? json.ResultObj ?? [] : [];
			return (
				values.map((obj) => {
					return {
						abicode: (obj.AbiCode as string) ?? '',
						doors: (obj.Doors as number) ?? null,
						enginecc: (obj.Engine as string) ?? '',
						fueltype: (obj.Fuel as string) ?? '',
						make: (obj.Make as string) ?? '',
						model: (obj.Model as string) ?? '',
						registration: (regnum as string) ?? '',
						seatbelts: (obj.Seats as number) ?? null,
						transmission: (obj.Transmission as string) ?? '',
						year: parseInt((obj.FromToYear as string).substring(0, 3)) ?? null
					};
				}) ?? []
			);
		})
		.catch((error) => {
			console.debug(error);
			return [];
		});
	console.debug(result);
	return result ? result[0] : {};
}
