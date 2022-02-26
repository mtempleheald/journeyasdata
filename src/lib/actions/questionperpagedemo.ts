import type { JourneyType } from '$lib/types/journey';
import { browser } from '$app/env';
import { goto } from '$app/navigation';
import { get_page_url, nextPageUrl } from '$lib/utils/navigation';
import journey from './../../../static/questionperpagedemo/journey.json';
import { componentValid } from '$lib/utils/validators';

// TODO: move these to a generic component action based on journeyflow in journey config
export const actions = {
	component1: function () {
		validate_and_navigate('component1');
	},
	component2: function () {
		validate_and_navigate('component2');
	},
	component3: function () {
		validate_and_navigate('component3');
	}
};

async function validate_and_navigate(component_id: string) {
	if (browser) {
		console.debug(`validate_and_navigate(${component_id})`);
		// TODO: validate before navigating
		const this_page = get_page_url(journey as JourneyType, component_id);
		const next_page = nextPageUrl(journey as JourneyType, this_page);
		console.debug(`this page = ${this_page}, next page = ${next_page}`);
		goto(next_page);
	}
}
