import { json as jsonResponse } from '@sveltejs/kit';
import type { JourneyType } from '$lib/types/journey';
import * as path from 'path';
import * as fs from 'fs';

const readFile = (filePath: string) => {
	return new Promise((resolve, reject) => {
		fs.readFile(filePath, 'utf8', (err, data) => {
			if (!err && data) {
				resolve(data);
			} else {
				reject(err);
			}
		});
	});
};

/** @type {import('./$types').RequestHandler} */
export async function GET({ params }) {
	//const journey: JourneyType = await import(`./${params.brand}.json`)
	// const journey: JourneyType = await import(`/static/${params.brand}/journey.json`)
	//     .then((module) => module.default)
	//     .catch((err) => console.error(err));
	let j = path.resolve('client', params.brand, 'journey.json');
	if (!fs.existsSync(j)) {
		// static files found in /static during development
		j = path.resolve('static', params.brand, 'journey.json');
	}
	//const journey: JourneyType = await import(j, { assert: { type: "json" } }) // Valid from Node 17
	//const journey: JourneyType = await import(j)
	//	.then((module) => module.default);
	const journey: JourneyType = await readFile(j)
		.then((data) => JSON.parse(data.toString()))
		.catch((err) => console.error(err));

	return jsonResponse(journey);
}
