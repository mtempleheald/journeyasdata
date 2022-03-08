<script lang="ts">
	import type { RepeatingGroupType, SectionType } from '$lib/types/journey';
	import { displayValueStore } from '$lib/stores/displayvaluestore';
	import { to_section_list } from '$lib/utils/converters';
	import { replaceTokens } from '$lib/utils/replacetokens';
	import { validationStore } from '$lib/stores/validationstore';
	import { valueStore } from '$lib/stores/valuestore';
	import DisplayBlock from '$lib/components/DisplayBlock.svelte';
	import markdown from '$lib/utils/markdown';
	import Section from '$lib/components/Framework/Section.svelte';
	import { state } from '$lib/stores/statestore';

	export let repeatinggroup: RepeatingGroupType;

	let sections: SectionType[] = to_section_list(repeatinggroup);
	
	// expand repeating group out into its sections based on maxrepeats
	// find {{ componentid }} and replace with {{ componentid.instanceid }}
	// whitespace in the brackets should not matter but the component id should be alphanumeric
	function updateSummaryInstance(summary: string, instanceid: number) {
		const re = new RegExp(/\{\{\s*(\w*)\s*\}\}/gi);

		function replacer(_match: string, p1) {
			const result = `{{${p1}.${instanceid}}}`;
			return result;
		}
		return summary.replace(re, replacer);
	}

	// Hide/show functionality (use state to guarantee behaviour after navigation)
	$: totalInstances = parseInt($state[repeatinggroup.id]?.value ?? 0);
	let currentInstance = 0;
	$: console.debug($state[repeatinggroup.id], currentInstance);
	
	// add is simple - just grab the next id if we've not reached max instances
	function add() {
		if (currentInstance < repeatinggroup.maxrepeats) {
			currentInstance = totalInstances + 1;
			state.set(repeatinggroup.id, {value: JSON.stringify(currentInstance), display: null, valid: null});
		}
	}
	// edit is simple - just toggle the selected instance into view
	function edit(instance: number) {
		if (instance <= repeatinggroup.maxrepeats) {
			currentInstance = instance;
		}
	}
	// remove is more complicated
	// if latest instance, just delete from value/displayValue/validation store and return to summary view
	// if not, we need to rejig all the store values to avoid sparse population, 2 becomes 1, 3 becomes 2 etc
	function remove(instanceid: number) {
		for (var i = instanceid; i <= repeatinggroup.maxrepeats; i++) {
			repeatinggroup.sections.forEach((s) =>
				s.components
					.filter((c) => !!c.id)
					.forEach((c) => {
						valueStore.set(`${c.id}.${i}`, $valueStore[`${c.id}.${i + 1}`]);
						displayValueStore.set(`${c.id}.${i}`, $valueStore[`${c.id}.${i + 1}`]);
						validationStore.set(`${c.id}.${i}`, $valueStore[`${c.id}.${i + 1}`]);
					})
			);
		}
		currentInstance = 0;
		state.set(repeatinggroup.id, {value: JSON.stringify(totalInstances - 1), display: null, valid: null});
	}

	function save() {
		currentInstance = 0;
	}
</script>

<section class="repeat-summary">
	{#if currentInstance == 0}
		{#each Array(totalInstances) as _, idx}
			<DisplayBlock
				component={{
					...repeatinggroup,
					type: 'Displayblock',
					content: Array.isArray(repeatinggroup.summarycontent)
						? repeatinggroup.summarycontent.map((c) =>
								markdown(replaceTokens(updateSummaryInstance(c, idx + 1), $displayValueStore))
						  )
						: markdown(
								replaceTokens(
									updateSummaryInstance(repeatinggroup.summarycontent, idx + 1),
									$displayValueStore
								)
						  )
				}}
			>
				<svelte:fragment slot="post">
					<button type="button" on:click={() => edit(idx + 1)}>{repeatinggroup.labeledit}</button>
					<button type="button" on:click={() => remove(idx + 1)}
						>{repeatinggroup.labelremove}</button
					>
				</svelte:fragment>
			</DisplayBlock>
		{/each}

		{#if totalInstances < repeatinggroup.maxrepeats}
			<button type="button" on:click={add}>{repeatinggroup.labeladd}</button>
		{/if}
	{/if}
</section>

{#each sections as s}
	{#if s.instanceid == currentInstance}
		<Section section={s} />
	{/if}
{/each}
<!-- TODO: save might need to be part of section, the key thing is setting current back to 0 for display -->
{#if currentInstance > 0}
	<button type="button" on:click={save}>Save</button>
{/if}

<!-- Keep styles aligned to Section component -->
<style>
	section {
		border: var(--section-border);
	}
</style>
