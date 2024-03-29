import { BRAND } from '$lib/env';
import { load_actions } from '$lib/actions/actionprovider';
import type { JourneyType } from '$lib/types/journey';
import type { LayoutLoad } from './$types';

export const load: LayoutLoad = async ({ fetch }) => {
	console.debug('Loading journey (should appear in browser dev tools only once)');
	const journey: JourneyType = await fetch(`/api/journey/${BRAND}`)
		.then((res) => res.json())
		.catch((err) => console.error(err));
	return {
		brand: BRAND.toString() as string,
		actions: await load_actions(BRAND.toString()),
		journey
	};
};
