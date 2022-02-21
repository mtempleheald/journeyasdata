import type { ComponentType, RepeatingGroupType, SectionType } from '$lib/types/journey';

/**
 * Sections within a repeating group are just templates for the effective sections.
 * Generate all instances of sections/components by repeating as many times as allowed.
 * Once expanded we must guarantee that each component has a unique identifier - componentid.repeatindex
 */
export function to_section_list(rg: RepeatingGroupType): SectionType[] {
	const sections: SectionType[] = [];

	for (let i = 1; i <= rg.maxrepeats; i++) {
		rg.sections.forEach((s) => {
			const components: ComponentType[] = s.components.map((c) => {
				return {
					...c,
					id: c.id ? `${c.id}.${i}` : undefined
				};
			});
			sections.push({
				...s,
				instanceid: i,
				components: components
			});
		});
	}
	return sections;
}
