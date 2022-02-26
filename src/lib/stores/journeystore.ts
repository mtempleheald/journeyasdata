import { BRAND, DEV } from '$lib/env';
import type { JourneyType } from '$lib/types/journey';
import { readable } from 'svelte/store';

async function load() {
	const j: JourneyType = await import(`./../../../static/${BRAND}/journey.json`).then(
		(module) => module.default
	);
	return j;
}

const journey = readable<JourneyType>(null, (set) => {
	load().then((j) => set(j));

	if (DEV) {
		// quick feedback when changing content in dev
		// static journey for user journey, reducing inconsistencies
		const interval = setInterval(() => {
			load().then((j) => set(j));
		}, 10000);

		return () => clearInterval(interval);
	}
});

export { journey };
