import type {
	ComponentType,
	InputComponent,
	JourneyType,
	PageType,
	RepeatingGroupType,
	SectionType
} from '$lib/types/journey';
import { to_section_list } from './converters';

/**
 * Establish whether a component's value is valid, trusting the component's judgement if provided
 * @param component Component metadata from journey.json used to establish validation criteria
 * @param state 	Application state
 * @returns         boolean
 */
export function component_valid(component: InputComponent, state: StateStoreType): boolean {
	// (ineligible) - component has no identifier, it must be a display component only, we have no reason to validate
	if (!component.id) {
		return true;
	}
	// (passed|failed) - input component has been attempted and has a validation status, trust this value
	if (state[component.id]?.valid != null) {
		return state[component.id]?.valid;
	}
	// (skipped) - component is optional and has been skipped, don't need to validate
	if (!component.required ?? false) {
		return true;
	}
	// (hidden) - component is hidden due to dependency on another component, don't fail validation
	if (
		component.dependsupon &&
		component.dependsupon.value != state[component.dependsupon.id]?.value
	) {
		return true;
	}
	// (missing) - component has not been answered, yet is required and not hidden, so it must be invalid
	return false;
}

/**
 * Establish section validity by checking each component within it, if any component is invalid, so is the section
 * @param section   Section metadata from journey.json used to establish validation criteria
 * @param state 	Application state
 * @returns         boolean
 */
export function section_valid(
	section: SectionType | RepeatingGroupType,
	state: StateStoreType
): boolean {
	// function duplicated from Repeatinggroup.svelte
	function update_section(section: SectionType, index: number) {
		const newComponents: ComponentType[] = section.components.map((comp) => {
			return {
				...comp,
				id: comp.id ? `${comp.id}.${index}` : undefined
			};
		});
		return { ...section, iteration: index, components: newComponents };
	}
	switch (section.type) {
		case 'repeatinggroup':
			return section.sections.every((s, i) => section_valid(update_section(s, i), state));
		default:
			return section.components.every((c) => component_valid(c as InputComponent, state));
	}
}

/**
 * Establish page validity by checking each section within it, if any section is invalid, so is the page
 * @param page  Page metadata from journey.json used to establish validation criteria
 * @param state Application state
 * @returns     boolean
 */
export function page_valid(page: PageType, state: StateStoreType): boolean {
	return page.sections.every((s) => section_valid(s, state));
}

/**
 * Establish page validity by checking each section within it, if any section is invalid, so is the page
 * @param page  Page metadata from journey.json used to establish validation criteria
 * @param state Application state
 * @returns     boolean
 */
export function journey_valid(journey: JourneyType, state: StateStoreType): boolean {
	return journey.pages.every((p) => page_valid(p, state));
}

export function get_first_invalid_component_in_section(
	section: SectionType,
	state: StateStoreType
): string | null {
	return section.components.find((c) => !component_valid(c, state));
}

export function get_first_invalid_component_in_page(
	page: PageType,
	state: StateStoreType
): ComponentType | null {
	return page.sections
		.flatMap((s) => {
			if (s.type == 'repeatinggroup') {
				return to_section_list(s).flatMap((ss) => {
					return ss.components.map((c) => {
						return c;
					});
				});
			} else {
				return s.components.map((c) => {
					return c;
				});
			}
		})
		.find((x) => !component_valid(x, state));
}
