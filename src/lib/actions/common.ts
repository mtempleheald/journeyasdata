import type { ComponentType, PageType } from '$lib/types/journey';
import { goto } from '$app/navigation';
import { get_page_url, nextPageUrl, prevPageUrl } from '$lib/utils/navigation';
import {
	component_valid,
	get_first_invalid_component_in_page,
	page_valid
} from '$lib/utils/validators';
import { journey as journeystore } from '$lib/stores/journeystore';
import { state as statestore } from '$lib/stores/statestore';
import { get } from 'svelte/store';
import { DISABLEVALIDATION } from '$lib/env';

export const actions = {
	pagenext: pagenext,
	pageback: pageback,
	component: component
};

async function component(component: ComponentType) {
	console.debug(`component(${component.id})`);
	const journey = get(journeystore);
	const state = get(statestore);

	if (journey.journeyflow == 'questionperpage') {
		if (component_valid(component, state)) {
			console.debug('Question valid, navigating onwards');
			const this_page = get_page_url(journey, component.id);
			const next_page = nextPageUrl(journey, this_page);
			console.debug(`${this_page} -> ${next_page}`);
			goto(next_page);
		} else {
			console.debug('Question invalid, please try again');
		}
	}
}

// A pagenext action is expected to have a single parameter - PageType
async function pagenext(page: PageType) {
	console.debug(`pagenext(${page.url})`);

	const journey = get(journeystore);
	let state;
	const stateUnsubscriber = statestore.subscribe((x) => (state = x));

	if (DISABLEVALIDATION != 'Y' && !page_valid(page, state)) {
		console.debug('Page invalid, correct before trying again');
		const error_comp = get_first_invalid_component_in_page(page, state);
		if (error_comp != undefined) {
			statestore.set(error_comp.id, {
				value: state[error_comp.id]?.value ?? '',
				display: state[error_comp.id]?.display ?? '',
				valid: false
			});
			goto(`#${error_comp.id}`, { replaceState: true });
		}
		return;
	}
	stateUnsubscriber();

	goto(nextPageUrl(journey, page.url));
}

// A pageback action is expected to have a single parameter - PageType
async function pageback(page: PageType) {
	console.debug(`pageback(${page.url})`);
	const journey = get(journeystore);
	goto(prevPageUrl(journey, page.url));
}
