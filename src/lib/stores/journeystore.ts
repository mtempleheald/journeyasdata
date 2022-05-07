import type { JourneyType } from '$lib/types/journey';
import { writable } from 'svelte/store';

export const journey = writable<JourneyType>();

// TODO: Really want the journey/content store to be readable, but set on initial load (__layout.svelte)
// Referenced many places but set only once so that the journey is consistent even during content updates
// However, doing the fetch call in here caused nothing but trouble

//import { BRAND, DEV } from '$lib/env';
//import type { JourneyType } from '$lib/types/journey';
// import { readable } from 'svelte/store';

// async function load() {
// 	const j: JourneyType = await fetch(`http://localhost:3000/api/journey/${BRAND.toString()}.json`)
//         .then(j => j.json())
//         .catch((err) => console.error(err));
// 	return j;
// }
// const journey = readable<JourneyType>(null, set => {
// 	load().then((j) => set(j));
// 	if (DEV) {
// 		// quick feedback when changing content in dev
// 		// static journey for user journey, reducing inconsistencies
// 		const interval = setInterval(() => {
// 			load().then((j) => set(j));
// 		}, 10000);
// 		return () => clearInterval(interval);
// 	}
// });
// export { journey };
