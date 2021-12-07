<!-- DEPRECATED - See action providers for alternative approach -->
<script lang="ts">
	import type { VehicleComponent } from '$lib/types/journey';
	import type { VehicleType } from '$lib/types/vehicle';
	import { displayValueStore } from '$lib/stores/displayvaluestore';
	import { parseMarkdown } from '$lib/utils/markdown';
	import { replaceTokens } from '$lib/utils/replacetokens';
	import { valueStore } from '$lib/stores/valuestore';
	import InputTextbox from '$lib/components/InputTextbox.svelte';
	import OptionDropdown from '$lib/components/OptionDropdown.svelte';

	// expose component properties
	export let component: VehicleComponent;

	// internal properties to support component logic
	let regnum: string = '';
	let vehicle: VehicleType | null;
	let active: string;

	// component actions
	function enter() {
		active = 'active';
	}
	function leave() {
		active = '';
	}
	async function regUpdated(event) {
		if (event.detail.value) {
			await fetch(`/api/vehicle/` + event.detail.value.toUpperCase())
				.then((resp) => resp.json())
				.then((data) => (vehicle = data));
		} else {
			reset(event);
		}
	}
	function reset(event) {
		regnum = '';
		vehicle = null;
	}
</script>

<div class="vehicle">
	<InputTextbox
		component={{
			type: 'Upper',
			id: 'regnum',
			value: '',
			label: component.regnumLabel,
			placeholder: component.regnumPlaceholder,
			help: 'help us to help you',
			required: true,
			errorMessage: component.errorMessage
		}}
		on:valueChange={regUpdated}
	/>
	<button type="button">{component.buttonLabel}</button>

	TODO: Year Of Manufacture - Drop down in Vehicle.svelte
	<OptionDropdown
		component={{ ...component, type: 'OptionDropdown', value: $valueStore[component.id] ?? '' }}
	>
		<svelte:fragment slot="pre">
			{@html parseMarkdown(replaceTokens(component.pre, $displayValueStore))}
		</svelte:fragment>
		<svelte:fragment slot="post">
			{@html parseMarkdown(replaceTokens(component.post, $displayValueStore))}
		</svelte:fragment>
	</OptionDropdown>

	<InputTextbox
		component={{
			type: 'Text',
			id: 'make',
			label: 'Make',
			value: vehicle?.make ?? ''
		}}
	/>
	<InputTextbox
		component={{
			type: 'Text',
			id: 'enginecc',
			label: 'Engine Size',
			value: vehicle?.enginecc ?? ''
		}}
	/>
	<InputTextbox
		component={{
			type: 'Text',
			id: 'model',
			label: 'Model',
			value: vehicle?.model ?? ''
		}}
	/>

	TODO: Select Bike - Drop down component in Vehicle.svelte
	<OptionDropdown
		component={{ ...component, type: 'OptionDropdown', value: $valueStore[component.id] ?? '' }}
	>
		<svelte:fragment slot="pre">
			{@html parseMarkdown(replaceTokens(component.pre, $displayValueStore))}
		</svelte:fragment>
		<svelte:fragment slot="post">
			{@html parseMarkdown(replaceTokens(component.post, $displayValueStore))}
		</svelte:fragment>
	</OptionDropdown>
</div>

<style>
	.vehicle {
		margin: 0rem;
		padding: 0rem;
	}
</style>
