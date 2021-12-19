import { APIHOSTNAME, APIPASSWORD, APIUSERNAME } from '$lib/env';

export async function getToken() {
	console.debug(`getting API bearer token...`);

	return fetch(`${APIHOSTNAME}/api/token/authorize?Username=${APIUSERNAME}&Password=${APIPASSWORD}`)
		.then((res) => res.json())
		.then((json) => json['access_token'])
		.catch((error) => console.debug(error));
}
