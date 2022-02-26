import type { JourneyType, ValidationStoreType, ValueStoreType } from '$lib/types/journey';
import { browser } from '$app/env';
import { goto } from '$app/navigation';
import { get_page_url, nextPageUrl } from '$lib/utils/navigation';
import { componentValid } from '$lib/utils/validators';
import { get_component_from_id } from '$lib/utils/inspection';

export const actions = {
	comp_change_trigger_nav: validate_and_navigate
};

async function validate_and_navigate(
	journey: JourneyType,
	component_id: string,
	values: ValueStoreType,
	validations: ValidationStoreType
) {
	console.debug('comp_change_trigger_nav()');
	if (browser) {
		console.debug(`validate_and_navigate(${component_id})`);
		const component = get_component_from_id(journey, component_id);

		if (componentValid(component, values, validations)) {
			const this_page = get_page_url(journey, component_id);
			const next_page = nextPageUrl(journey, this_page);
			console.debug(`this page = ${this_page}, next page = ${next_page}`);
			goto(next_page);
		} else {
			console.debug('Page invalid, correct before trying again');
		}
	}
}
