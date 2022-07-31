<!-- DEPRECATED - See action providers for alternative approach -->
<script lang="ts">
	import type { VehicleComponent } from '$lib/types/journey';
	import type { VehicleType } from '$lib/types/vehicle';
	import { state } from '$lib/stores/statestore';
	import { replace_tokens } from '$lib/utils/replacetokens';
	import markdown from '$lib/utils/markdown';
	import InputTextbox from '$lib/components/InputTextbox.svelte';
	import OptionDropdown from '$lib/components/OptionDropdown.svelte';

	// expose component properties
	export let component: VehicleComponent;

	// internal properties to support component logic
	let vehicle: VehicleType | null;
	//let active: string;

	// component actions
	// function enter() {
	// 	active = 'active';
	// }
	// function leave() {
	// 	active = '';
	// }
	async function regUpdated(event) {
		if (event.detail.value) {
			await fetch(`/api/vehicle/${event.detail.value.toUpperCase()}`)
				.then((resp) => resp.json())
				.then((data) => (vehicle = data));
		} else {
			reset();
		}
	}
	function reset() {
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
		component={{ ...component, type: 'OptionDropdown', value: $state[component.id]?.value ?? '' }}
	>
		<svelte:fragment slot="pre">
			{@html markdown(replace_tokens(component.pre, $state))}
		</svelte:fragment>
		<svelte:fragment slot="post">
			{@html markdown(replace_tokens(component.post, $state))}
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
		component={{ ...component, type: 'OptionDropdown', value: $state[component.id]?.value ?? '' }}
	>
		<svelte:fragment slot="pre">
			{@html markdown(replace_tokens(component.pre, $state))}
		</svelte:fragment>
		<svelte:fragment slot="post">
			{@html markdown(replace_tokens(component.post, $state))}
		</svelte:fragment>
	</OptionDropdown>
</div>

<style>
	.vehicle {
		margin: 0rem;
		padding: 0rem;
	}
</style>
