import { json as jsonResponse, type RequestHandler } from '@sveltejs/kit';
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

export const GET: RequestHandler = async ({ params }) => {
	const brand = params.brand;
	if (!brand) {
		console.debug('Parameter missing');
		return jsonResponse({});
	}
	//const journey: JourneyType = await import(`./${params.brand}.json`)
	// const journey: JourneyType = await import(`/static/${params.brand}/journey.json`)
	//     .then((module) => module.default)
	//     .catch((err) => console.error(err));
	let j = path.resolve('client', brand, 'journey.json');
	if (!fs.existsSync(j)) {
		// static files found in /static during development
		j = path.resolve('static', brand, 'journey.json');
	}
	//const journey: JourneyType = await import(j, { assert: { type: "json" } }) // Valid from Node 17
	//const journey: JourneyType = await import(j)
	//	.then((module) => module.default);
	const journey: JourneyType = await readFile(j)
		.then((data) => (data ? JSON.parse(data.toString()) : {}))
		.catch((err) => console.error(err));

	return jsonResponse(journey);
};
