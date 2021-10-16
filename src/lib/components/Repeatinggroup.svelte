<script lang="ts">
    import type { ComponentType, RepeatingGroupType, SectionType } from '$lib/types/journey'
    import Section from '$lib/components/Section.svelte'

    export let repeatinggroup: RepeatingGroupType;
    let iterations = repeatinggroup.maxrepeats;

    // need to ensure that component IDs are unique throughout journey and mappable to APIs
    function updateSection(section: SectionType, index: number) {
        let newComponents: ComponentType[] = section.components.map(comp => {
            return {
                ...comp, 
                id: `${comp.id}.${index}`
            }
        })
        return {...section, iteration: index, components: newComponents}
    }
    
</script>


{#each Array(iterations) as _, idx}
    {#each repeatinggroup.sections as s}
        <Section section={updateSection(s, idx)}/>
    {/each}
{/each}

