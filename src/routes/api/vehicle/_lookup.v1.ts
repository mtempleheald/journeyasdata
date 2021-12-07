import type { VehicleType } from '$lib/types/vehicle';
import { APIHOSTNAME } from '$lib/env';
import { getToken } from '../_token';

export async function lookup(regnum) {
	const url = `${APIHOSTNAME}/api/V1/vehicle/lookup?RegistrationNumber=${regnum}`;
	console.log(`calling url ${url} ...`);

	let token = await getToken();

	let options = {
		method: 'GET',
		headers: new Headers({
			'Content-Type': 'application/json',
			Authorization: `Bearer ${token}`
		})
	};

	var result: VehicleType[] = await fetch(url, options)
		.then((res) => res.json())
		.then((json) =>
			json && json.IsSuccess
				? json.ResultObj.map((obj) => {
						let rObj: VehicleType = {};
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
		.catch((error) => console.log(error));
	console.log(result);
	return !!result ? result[0] : {};
}
