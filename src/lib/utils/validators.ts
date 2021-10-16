import type { ComponentType, InputComponentType, JourneyType, PageType, RepeatingGroupType, SectionType } from '$lib/types/journey'

/**
 * Establish the validity for a component, trusting the component's judgement if provided
 * @param component         Component metadata from journey.json used to establish validation criteria
 * @param valueStore        $valueStore from the SvelteKit runtime, or an object consisting of simple string key value pairs
 * @param validationStore   $validationStore from the SvelteKit runtime, or an object consisting of simple string key value pairs
 * @returns                 boolean
 */
export function componentValid (
    component: InputComponentType, 
    valueStore: object, 
    validationStore: object
): boolean {

    // (ineligible) - component has no identifier, it must be a display component only, we have no reason to validate
    if (!component.id) return true 

    // (passed|failed) - input component has been attempted and has a status in the validationStore, trust this value
    if (validationStore[component.id] != null) return validationStore[component.id]

    // (skipped) - component is optional and has been skipped, don't need to validate
    if (!component.required??false) return true

    // (hidden) - component is hidden due to dependency on another component, don't fail validation
    if (component.dependsupon && valueStore[component.dependsupon.id] != component.dependsupon.value) return true

    // (missing) - component has not been answered, yet is required and not hidden, so it must be invalid
    return false
}

/**
 * Establish section validity by checking each component within it, if any component is invalid, so is the section
 * @param section           Section metadata from journey.json used to establish validation criteria
 * @param valueStore        $valueStore from the SvelteKit runtime, or an object consisting of simple string key value pairs
 * @param validationStore   $validationStore from the SvelteKit runtime, or an object consisting of simple string key value pairs
 * @returns                 boolean
 */
export function sectionValid (
    section: SectionType|RepeatingGroupType,
    valueStore: object,
    validationStore: object
): boolean {
    // function duplicated from Repeatinggroup.svelte
    function updateSection(section: SectionType, index: number) {
        let newComponents: ComponentType[] = section.components.map(comp => {
            return {
                ...comp, 
                id: `${comp.id}.${index}`
            }
        })
        return {...section, iteration: index, components: newComponents}
    }
    switch (section.type) {
        case "repeatinggroup":
            return section.sections.every((s, i) => sectionValid(updateSection(s, i), valueStore, validationStore));
        default:
            return section.components.every(c => componentValid(c as InputComponentType, valueStore, validationStore))
    }
    
}

/**
 * Establish page validity by checking each section within it, if any section is invalid, so is the page
 * @param page              Page metadata from journey.json used to establish validation criteria
 * @param valueStore        $valueStore from the SvelteKit runtime, or an object consisting of simple string key value pairs
 * @param validationStore   $validationStore from the SvelteKit runtime, or an object consisting of simple string key value pairs
 * @returns                 boolean
 */
 export function pageValid (
    page: PageType,
    valueStore: object,
    validationStore: object
): boolean {
    return page.sections.every(s => sectionValid(s, valueStore, validationStore))
}

/**
 * Establish journey validity by checking each page within it, if any page is invalid, so is the journey
 * @param journey           Journey metadata from journey.json used to establish validation criteria
 * @param valueStore        $valueStore from the SvelteKit runtime, or an object consisting of simple string key value pairs
 * @param validationStore   $validationStore from the SvelteKit runtime, or an object consisting of simple string key value pairs
 * @returns                 boolean
 */
 export function journeyValid (
    journey: JourneyType,
    valueStore: object,
    validationStore: object
): boolean {
    return journey.pages.every(p=> pageValid(p, valueStore, validationStore))
}

// Additional information
// Questionset structure = journey.page.section.component - sections can be repeated
// Value store uses identifier {section id}.{section index}.{component id} which can be unflattened to a similar struture
// For non-repeating sections this value store identifier is simply {component id}

