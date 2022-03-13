/*
 * Self-service is a key driver for this solution.
 * This means that everything needs to be validated to ensure that the data and components work together as designed.
 * Note: headless CMS vs roll our own solution hasn't been decided, this logic is required regardless.
 * Note: Unit tests are required for each of these helper functions - find the simplest cases that break or prove the logic
 */

import type { JourneyType } from '$lib/types/journey';

/**
 * Journey cannot be empty (contain no pages)
 */
export function journey_is_not_empty(journey: JourneyType): boolean {
	// TODO: implement this
	return true;
}
/**
 * Journey must have a title
 */
export function journey_has_title(journey: JourneyType): boolean {
	// TODO: implement this
	return true;
}

/**
 * Pages are identified by their url, these must be unique across the journey
 */
export function page_urls_are_unique(journey: JourneyType): boolean {
	// TODO: implement this
	return true;
}
/**
 * Pages are identified by their url, all pages must have a url
 */
export function pages_have_url(journey: JourneyType): boolean {
	// TODO: implement this
	return true;
}
/**
 * Page must not be empty (contain no sections)
 */
export function page_is_not_empty(journey: JourneyType, page_url: string): boolean {
	// TODO: implement this
	return true;
}
/**
 * Pages must not be empty across the journey
 */
export function pages_are_not_empty(journey: JourneyType): boolean {
	// TODO: implement this
	return true;
}

/**
 * Section ids must be unique in a journey - check before adding an invalid one
 */
export function section_id_is_available(journey: JourneyType, section_id: string): boolean {
	// TODO: implement this
	return true;
}
/**
 * Section ids must be unique in a journey - confirm this
 */
export function section_ids_are_unique(journey: JourneyType): boolean {
	// TODO: implement this
	return true;
}
/**
 * Section must not be empty (contain no child components or sections)
 */
export function section_is_not_empty(journey: JourneyType, section_id: string): boolean {
	// TODO: implement this
	return true;
}
/**
 * Sections must not be empty across the journey (contain no child components or sections)
 */
export function sections_are_not_empty(journey: JourneyType): boolean {
	// TODO: implement this
	return true;
}
/**
 * Section must have a type (repeatinggroup or section)
 */
export function section_has_a_type(journey: JourneyType, section_id: string): boolean {
	// TODO: implement this
	return true;
}
/**
 * Sections must have a type across the journey
 */
export function sections_have_a_type(journey: JourneyType): boolean {
	// TODO: implement this
	return true;
}

/**
 * Check that a component id is available before using it
 */
export function component_id_is_available(journey: JourneyType, component_id: string): boolean {
	// TODO: implement this
	return true;
}
/**
 * Component ids must be unique across the journey
 */
export function component_ids_are_unique(journey: JourneyType): boolean {
	// TODO: implement this
	// don't worry about repeating groups, if the ids are unique within then they will be unique afterwards
	return true;
}
/**
 * Component ids must not contain full stops
 * This breaks the repeating group functionality
 */
export function component_ids_do_not_contain_full_stop(journey: JourneyType): boolean {
	// TODO: implement this
	return true;
}
/**
 * Component ids must not contain tildes
 * This would clash with input identifiers
 */
export function component_ids_do_not_contain_tilde(journey: JourneyType): boolean {
	// TODO: implement this
	return true;
}
/**
 * Component must have a type
 */
export function component_has_a_type(journey: JourneyType, component_id: string): boolean {
	// TODO: implement this
	return true;
}
/**
 * Components must have a type across the journey
 */
export function components_have_a_type(journey: JourneyType): boolean {
	// TODO: implement this
	return true;
}
/**
 * Components of type InputComponent must have ids
 */
export function input_components_have_ids(journey: JourneyType): boolean {
	// TODO: implement this
	return true;
}
/**
 * Components of type OptionComponent must have values
 * Either refdata or values must be set
 */
export function option_components_have_values(journey: JourneyType): boolean {
	// TODO: implement this
	return true;
}
/**
 * Components of type DisplayComponent must have content
 */
export function display_components_have_content(journey: JourneyType): boolean {
	// TODO: implement this
	return true;
}

/**
 * Check if any bespoke actions are linked to a page before deletion
 * Actions are dev-controlled, content is not, yet can still break code
 */
export function page_has_bespoke_actions(journey: JourneyType, page_url: string): boolean {
	// TODO: figure out how to implement this
	return true;
}
/**
 * Check if any bespoke actions are linked to a section before deletion
 * Actions are dev-controlled, content is not, yet can still break code
 */
export function section_has_bespoke_actions(journey: JourneyType, section_id: string): boolean {
	// TODO: figure out how to implement this
	return true;
}
/**
 * Check if any bespoke actions are linked to a component before deletion
 * Actions are dev-controlled, content is not, yet can still break code
 */
export function component_has_bespoke_actions(journey: JourneyType, component_id: string): boolean {
	// TODO: figure out how to implement this
	return true;
}
