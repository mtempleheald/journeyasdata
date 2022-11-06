/*
This library is used by the admin screens, ensuring that credentials are included.
TODO: Consolidate with ../api.js
*/
export async function post(endpoint: string, data: unknown) {
	return fetch(endpoint, {
		method: 'POST',
		credentials: 'include',
		body: JSON.stringify(data || {}),
		headers: {
			'Content-Type': 'application/json'
		}
	}).then((r) => r.json());
}
