// This is a helper function for integrating with `/api/reference-data/metadata`
// To avoid heavily coupling the generic UI implementation to 1 version of the API

import type { ValueType } from '$lib/types/journey';
import { APIHOSTNAME } from '$lib/env';
import { getToken } from '../_token';

export async function getMetadata(context: string, list: string) {
	const url = `${APIHOSTNAME}/api/reference-data/metadata`;
	console.debug(`calling url ${url} ...`);

	const token = await getToken();

	const options = {
		method: 'POST',
		headers: new Headers({
			'Content-Type': 'application/json',
			Context: context,
			Authorization: `Bearer ${token}`
		}),
		body: JSON.stringify({
			GetMetadataModel: [
				{
					ReferenceType: list
				}
			]
		})
	};

	const result: ValueType[] = await fetch(url, options)
		.then((res) => res.json())
		.then((json) =>
			json
				? json.ResultObj[0].Values.map((obj: any) => {
						const rObj = {};
						rObj['value'] = obj.Value;
						rObj['display'] = obj.Name;
						return rObj;
				  })
				: []
		)
		.catch((error) => console.debug(error));

	return result;
}
