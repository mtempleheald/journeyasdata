import type { JourneyType } from '$lib/types/journey';

/**
 * Establish journey validity by checking each page within it, if any page is invalid, so is the journey
 * @param journey           Journey metadata from journey.json used to establish validation criteria
 * @returns                 boolean
 */
export function componentsHaveUniqueIdentifiers(journey: JourneyType): boolean {
	// TODO: map journey to single value array containing IDs,
	// check for presence before inserting, if already present we have a problem
	// don't worry about repeating groups, if the ids are unique within then they will be unique afterwards
	return true;
}

// TODO: componentIdentifiersDoNotContainFullStops - this could clash with repeating group functionality

// TODO: inputComponentsHaveIdentifiers (this includes Option/Multi)
