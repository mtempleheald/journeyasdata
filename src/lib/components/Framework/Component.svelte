<script lang="ts">
	import type { ComponentType, OptionComponent } from '$lib/types/journey';
	import { actionStore } from '$lib/stores/actionstore';
	import { browser } from '$app/env';
	import { replace_tokens } from '$lib/utils/replacetokens';
	import { state } from '$lib/stores/statestore';
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

	export let component: ComponentType;

	function componentUpdated(event) {
		// Defer all post-interaction logic to bespoke actions with fallback default
		let f = $actionStore[event.detail.key] ?? $actionStore['component'];
		if (typeof f === 'function') f(component);
	}

	async function toListComponent(component: ComponentType): Promise<OptionComponent> {
		if (component.type == 'YesNo') {
			return {
				...component,
				value: $state[component.id]?.value ?? '',
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
					`/api/refdata/${listComponent.refdata}.json?parent=${listComponent.refdataparent}`
				);
				effectiveValues = (await res.json()) ?? [];
			}
			return {
				...listComponent,
				value: $state[listComponent.id]?.value ?? '', // TODO: Verify that this is a valid value in the list of values
				values: effectiveValues,
				refdataparent: $state[listComponent.refdataparent]?.value ?? ''
			};
		}
	}
</script>

{#if !component.dependsupon || $state[component.dependsupon.id]?.value == component.dependsupon.value}
	{#if ['Colour', 'Date', 'Datetime', 'Email', 'Month', 'Number', 'Range', 'Search', 'Telephone', 'Text', 'Time', 'Upper', 'Url', 'Week', 'Year'].includes(component.type)}
		<svelte:component
			this={InputTextbox}
			component={{ ...component, value: $state[component.id]?.value ?? '' }}
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
			component={{ ...component, value: $state[component.id]?.value ?? '' }}
			on:dateChange={componentUpdated}
		/>
	{:else if component.type == 'Vehicle'}
		<Vehicle {component} on:vehicleChange={componentUpdated} />
	{/if}
{/if}
