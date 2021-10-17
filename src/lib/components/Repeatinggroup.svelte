<script lang="ts">
    import type { ComponentType, RepeatingGroupType, SectionType } from '$lib/types/journey'
    import { displayValueStore } from '$lib/stores/displayvaluestore';
    import { parseMarkdown } from '$lib/utils/markdown';
    import { replaceTokens } from '$lib/utils/replacetokens';
    import { validationStore } from '$lib/stores/validationstore';
    import { valueStore } from '$lib/stores/valuestore';
    import DisplayBlock from './DisplayBlock.svelte';
    import Section from '$lib/components/Section.svelte'


    export let repeatinggroup: RepeatingGroupType;
    
    // sections within a repeating group are just instances of the section template
    // must ensure that section instances are identifiable for hide/show/add/remove functionality
    // All input components across the entire journey must have unique identifier for integration purposes - componentid.repeatindex
    // (assume here that components have unique ids except for iterations which we're handling here)
    let sections: SectionType[] = updateSections(repeatinggroup.sections);

    function updateSections(sections: SectionType[]) {
        let newSections: SectionType[] = []

        for (var i = 1; i <= repeatinggroup.maxrepeats; i++) {
            sections.forEach(s => {
            let newComponents: ComponentType[] = s.components.map(comp => {
                return {
                    ...comp, 
                    id: `${comp.id}.${i}`
                }
            })
            newSections.push({...s, instanceid: i, components: newComponents})
        })
        }
        return newSections
    }

    function updateSummaryInstance(summary: string, instanceid: number) {
        const re = new RegExp(/\{\{\s*(\w|\.)*\s*\}\}/gi)
        function replacer(match, p1, p2, p3, offset, string) {
            const result = `{{${match.substring(2,match.length-2).trim()}.${instanceid}}}`
            return result
        }
        return summary.replace(re, replacer)
    }
    
    // Hide/show functionality
    let currentIinstance: number = 0;
    let totalInstances: number = 0;
    // add is simple - just grab the next id if we've not reached max instances
    function add() {
        if (currentIinstance < repeatinggroup.maxrepeats) {
            currentIinstance++
            totalInstances = currentIinstance
        }
    }
    // edit is simple - just toggle the selected instance into view
    function edit(instance: number) {
        if (instance <= repeatinggroup.maxrepeats) currentIinstance = instance
    }
    // remove is more complicated
    // if latest instance, just delete from value/displayValue/validation store and return to summary view
    // if not, we need to rejig all the store values to avoid sparse population, 2 becomes 1, 3 becomes 2 etc
    function remove(instanceid: number) {
        
        // TODO: Extend store with delete?  Or just stick with null checks later on?
        sections.filter(s => s.instanceid == instanceid)
                .forEach(s => s.components.forEach(c => {
                    valueStore.set(c.id, null)
                    displayValueStore.set(c.id, null)
                    validationStore.set(c.id, null)
                })
        )
        // TODO: Rejig higher indexed values to use lower indexes
        for (var i = instanceid + 1; i <= repeatinggroup.maxrepeats; i++) {

        }
        
        currentIinstance = 0
        totalInstances = totalInstances - 1
    }
</script>


{#each Array(totalInstances) as _, idx}
    <DisplayBlock>
        <svelte:fragment slot="main">
            {@html parseMarkdown(replaceTokens(updateSummaryInstance(repeatinggroup.summarycontent, idx + 1), $displayValueStore))}
        </svelte:fragment>
        <svelte:fragment slot="post">
            <button type="button" on:click="{() => edit(idx+1)}">{repeatinggroup.labeledit}</button>
            <button type="button" on:click="{() => remove(idx+1)}">{repeatinggroup.labelremove}</button>
        </svelte:fragment>
    </DisplayBlock>
{/each}

{#if currentIinstance < repeatinggroup.maxrepeats}
    <button type="button" on:click="{add}">{repeatinggroup.labeladd}</button>
{/if}

{#each sections as s}
    {#if s.instanceid == currentIinstance }
        <Section section={s}/>
    {/if}
{/each}

