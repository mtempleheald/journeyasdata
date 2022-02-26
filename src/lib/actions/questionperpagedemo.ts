import type { JourneyType } from '$lib/types/journey';
import { browser } from '$app/env';
import { goto } from '$app/navigation';
import { get_page_url, nextPageUrl } from '$lib/utils/navigation';
import journey from './../../../static/questionperpagedemo/journey.json';
import { componentValid } from '$lib/utils/validators';
import { get_component_from_id } from '$lib/utils/inspection';
import { sessionStorageStore } from '$lib/stores/sessionstoragestore';
import { valueStore } from '$lib/stores/valuestore';
import { get } from 'svelte/store';
import { validationStore } from '$lib/stores/validationstore';

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
		const component = get_component_from_id(journey as JourneyType, component_id);
		let values = {};
		let validations = {};
		const valueUnsubscriber = valueStore.subscribe((value) => (values = value));
		const validationUnsubscriber = validationStore.subscribe((value) => (validations = value));
		valueUnsubscriber();
		validationUnsubscriber();

		if (componentValid(component, values, validations)) {
			const this_page = get_page_url(journey as JourneyType, component_id);
			const next_page = nextPageUrl(journey as JourneyType, this_page);
			console.debug(`this page = ${this_page}, next page = ${next_page}`);
			goto(next_page);
		}
		else {
			console.debug('Page invalid, correct before trying again');
		}		
	}
}
