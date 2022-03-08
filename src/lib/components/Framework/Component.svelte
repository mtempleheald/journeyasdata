<script lang="ts">
	import type { ComponentType, OptionComponent } from '$lib/types/journey';
	import { actionStore } from '$lib/stores/actionstore';
	import { browser } from '$app/env';
	import { displayValueStore } from '$lib/stores/displayvaluestore';
	import { replace_tokens } from '$lib/utils/replacetokens';
	import { state } from '$lib/stores/statestore';
	import { validationStore } from '$lib/stores/validationstore';
	import { valueStore } from '$lib/stores/valuestore';
	import Address from '$lib/components/Address.svelte';
	import DisplayBlock from '$lib/components/DisplayBlock.svelte';
	import DisplayModal from '$lib/components/DisplayModal.svelte';
	import DisplaySelections from '$lib/components/DisplaySelections.svelte';
	import InputTextbox from '$lib/components/InputTextbox.svelte';
	import markdown from '$lib/utils/markdown';
	import OptionButtons from '$lib/components/OptionButtons.svelte';
	import OptionDropdown from '$lib/components/OptionDropdown.svelte';
	import InputTriboxdate from '$lib/components/InputTriboxdate.svelte';
	import Vehicle from '$lib/components/Vehicle.svelte';
	import { journey } from '$lib/stores/journeystore';

	export let component: ComponentType;

	// TODO: break this function out to a dedicated place where it can be tested
	function componentUpdated(event) {
		console.debug(event.detail);
		// update value store with latest value, regardless of validity
		// ensure that the key is a string, even if the id entered as numeric, required for retrieval
		valueStore.set(event.detail.key.toString(), event.detail.value);
		// update display value in line with value store
		displayValueStore.set(event.detail.key, event.detail.display ?? event.detail.value);
		// update validation store for use by validators
		validationStore.set(event.detail.key, event.detail.valid);
		// execute action if applicable
		let f = $actionStore[event.detail.key];
		if (typeof f === 'function') f();

		if ($journey.journeyflow == 'questionperpage') {
			console.debug('Question changed, triggering validation and navigation...');
			let comp_change_trigger_nav = $actionStore['comp_change_trigger_nav'];
			// TODO: consider making this a direct function call rather than using actionStore (I had a reason for this but can't remember it)
			comp_change_trigger_nav($journey, event.detail.key.toString(), $valueStore, $validationStore);
		}
	}

	async function toListComponent(component: ComponentType): Promise<OptionComponent> {
		if (component.type == 'YesNo') {
			return {
				...component,
				value: $valueStore[component.id] ?? '',
				values: [
					{ value: 'Y', display: 'Yes' },
					{ value: 'N', display: 'No' }
				]
			};
		} else {
			const listComponent: OptionComponent = component as OptionComponent;
			let effectiveValues = listComponent.values;
			if (listComponent.refdata && browser) {
				const res = await fetch(
					`/api/refdata/${listComponent.refdata}?parent=${listComponent.refdataparent}`
				);
				effectiveValues = (await res.json()) ?? [];
			}
			return {
				...listComponent,
				value: $valueStore[listComponent.id] ?? '', // TODO: Verify that this is a valid value in the list of values
				values: effectiveValues,
				refdataparent: $valueStore[listComponent.refdataparent] ?? ''
			};
		}
	}
</script>

{#if !component.dependsupon || $valueStore[component.dependsupon.id] == component.dependsupon.value}
	{#if ['Colour', 'Date', 'Datetime', 'Email', 'Month', 'Number', 'Range', 'Search', 'Telephone', 'Text', 'Time', 'Upper', 'Url', 'Week', 'Year'].includes(component.type)}
		<svelte:component
			this={InputTextbox}
			component={{ ...component, value: $valueStore[component.id] ?? '' }}
			on:valueChange={componentUpdated}
		>
			<svelte:fragment slot="pre">
				{@html markdown(replace_tokens(component.pre, $state))}
			</svelte:fragment>
			<svelte:fragment slot="post">
				{@html markdown(replace_tokens(component.post, $state))}
			</svelte:fragment>
		</svelte:component>
	{:else if ['OptionButtons', 'OptionDropdown', 'YesNo'].includes(component.type)}
		{#await toListComponent(component)}
			<!-- looking up refdata (maybe) -->
		{:then comp}
			<svelte:component
				this={{
					OptionButtons: OptionButtons,
					OptionDropdown: OptionDropdown,
					YesNo: OptionButtons
				}[component.type]}
				component={comp}
				on:valueChange={componentUpdated}
			>
				<svelte:fragment slot="pre">
					{@html markdown(replace_tokens(comp.pre, $state))}
				</svelte:fragment>
				<svelte:fragment slot="post">
					{@html markdown(replace_tokens(comp.post, $state))}
				</svelte:fragment>
			</svelte:component>
		{/await}
	{:else if component.type == 'Displayblock' || component.type == 'Displaymodal'}
		<svelte:component
			this={{
				Displayblock: DisplayBlock,
				Displaymodal: DisplayModal
			}[component.type]}
			component={{
				...component,
				content: Array.isArray(component.content)
					? component.content.map((c) => markdown(replace_tokens(c, $state)))
					: markdown(replace_tokens(component.content, $state))
			}}
		>
			<svelte:fragment slot="pre">
				{@html markdown(replace_tokens(component.pre, $state))}
			</svelte:fragment>
			<!-- <svelte:fragment slot="main">
    {@html markdown(replace_tokens(comp.content, $state))}
  </svelte:fragment> -->
			<svelte:fragment slot="post">
				{@html markdown(replace_tokens(component.post, $state))}
			</svelte:fragment>
		</svelte:component>
	{:else if component.type == 'Displayselections'}
		<DisplaySelections {component}>
			<svelte:fragment slot="pre">
				{@html markdown(replace_tokens(component.pre, $state))}
			</svelte:fragment>
			<svelte:fragment slot="main">
				{@html markdown(replace_tokens(component.content, $state))}
			</svelte:fragment>
			<svelte:fragment slot="post">
				{@html markdown(replace_tokens(component.post, $state))}
			</svelte:fragment>
		</DisplaySelections>
	{:else if component.type == 'Address'}
		<Address {component} on:addressChange={componentUpdated} />
	{:else if component.type == 'TriBoxDate'}
		<InputTriboxdate
			component={{ ...component, value: $valueStore[component.id] ?? '' }}
			on:dateChange={componentUpdated}
		/>
	{:else if component.type == 'Vehicle'}
		<Vehicle {component} on:vehicleChange={componentUpdated} />
	{/if}
{/if}
