import type { VehicleType } from '$lib/types/vehicle';
import { APIHOSTNAME } from '$lib/env';
import { getToken } from '../_token';

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
		.then((json) =>
			json && json.IsSuccess
				? json.ResultObj.map((obj: any) => {
						const rObj: VehicleType = {};
						rObj['abicode'] = obj.AbiCode ?? '';
						rObj['doors'] = obj.Doors ?? '';
						rObj['enginecc'] = obj.Engine ?? '';
						rObj['fueltype'] = obj.Fuel ?? '';
						rObj['make'] = obj.Make ?? '';
						rObj['model'] = obj.Model ?? '';
						rObj['registration'] = regnum ?? '';
						rObj['seatbelts'] = obj.Seats ?? '';
						rObj['transmission'] = obj.Transmission ?? '';
						rObj['year'] = obj.FromToYear?.substring(0, 3);
						return rObj;
				  })
				: []
		)
		.catch((error) => console.debug(error));
	console.debug(result);
	return result ? result[0] : {};
}
