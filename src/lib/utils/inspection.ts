import type { JourneyType } from '$lib/types/journey';

export function get_component_from_id(journey: JourneyType, component_id: string) {
	return journey.pages.flatMap((p)=> {
		return p.sections.flatMap((s) => {
			if (s.type === 'repeatinggroup') {
				//return undefined;
			} else {
				return s.components.find((c) => c.id == component_id);
			}
		}).filter((s) => s)
	})[0];
}
