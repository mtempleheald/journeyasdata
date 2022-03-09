<!-- DEPRECATED - see action providers for alternative implementation -->
<script lang="ts">
	import type { AddressComponent } from '$lib/types/journey';
	import type { AddressType } from '$lib/types/address';
	import { createEventDispatcher } from 'svelte';
	import { state } from '$lib/stores/statestore';
	import InputTextbox from '$lib/components/InputTextbox.svelte';
	import OptionDropdown from '$lib/components/OptionDropdown.svelte';

	// expose component properties
	export let component: AddressComponent;

	// internal properties to support component logic
	let active = '';
	let addresses: AddressType[];
	let address: AddressType | null;
	let propertyLov = [];
	const dispatch = createEventDispatcher();
	//$: console.debug ($state);

	// component actions
	function enter() {
		active = 'active';
	}
	function leave() {
		active = '';
	}
	async function lookupAddresses(postcode: string) {
		await fetch(`/api/addresses?postcode=${postcode}`)
			.then((resp) => resp.json())
			.then((data) => {
				addresses = data;
				propertyLov = data.map((a) => ({
					value: a.property,
					display: a.property
				}));
			});
	}
	async function postcodeTouched(event) {
		// postcode state was set by base component
		// update dependent fields here
		state.set('property', {value: undefined, display: undefined, valid: undefined});
		state.set('addressline1', {value: undefined, display: undefined, valid: undefined});
		state.set('addressline2', {value: undefined, display: undefined, valid: undefined});
		state.set('addressline3', {value: undefined, display: undefined, valid: undefined});
		state.set('addressline4', {value: undefined, display: undefined, valid: undefined});
		addresses = [];
		propertyLov = [];
		address = null;

		if (event.detail.valid) {
			// if the postcode is valid, proceed to call the API
			await lookupAddresses($state['postcode']?.value);
		}
		else {
			state.set('address', {value: undefined, display: undefined, valid: false});
			dispatch('addressChange', { key: 'address', value: '', valid: false });
		}
	}
	function propertyTouched(event) {
		console.debug(
			`{key: "${event.detail.key}", value: "${event.detail.value}", valid: "${event.detail.valid}}"`
		);
		if (event.detail.value) {
			address = addresses.filter((a) => a.property == event.detail.value.toString())[0];
			state.set('addressline1', {value: address.addressline1, display: address.addressline1, valid: undefined});
			state.set('addressline2', {value: address.addressline2, display: address.addressline2, valid: undefined});
			state.set('addressline3', {value: address.addressline3, display: address.addressline3, valid: undefined});
			state.set('addressline4', {value: address.addressline4, display: address.addressline4, valid: undefined});

			state.set('address', {value: undefined, display: undefined, valid: true});
			dispatch('addressChange', { key: 'address', value: '', valid: true });
		} else {
			state.set('address', {value: undefined, display: undefined, valid: false});
			dispatch('addressChange', { key: 'address', value: '', valid: false });
		}
	}
</script>

<div
	class="address {active} {$state['address']?.valid ?? false ? '' : 'invalid'}"
	on:mouseenter={enter}
	on:mouseleave={leave}
>
	<InputTextbox
		component={{
			type: 'Upper',
			id: 'postcode',
			label: component.postcodeLabel,
			value: $state['postcode']?.value ?? '',
			placeholder: component.postcodePlaceholder,
			help: component.postcodeHelp,
			required: true,
			errorMessage: component.postcodeError
		}}
		on:valueChange={postcodeTouched}
	/>
	{#key propertyLov}<!-- redraw the LOV anytime the data changes because we are passing new object to (sub)components, not binding -->
		{#if propertyLov.length > 0 || !$state['property']?.value}
			<OptionDropdown
				component={{
					type: 'OptionDropdown',
					id: 'property',
					value: $state['property']?.value ?? '',
					label: component.propertyLabel,
					placeholder: component.propertyPlaceholder,
					values: propertyLov ?? []
				}}
				on:valueChange={propertyTouched}
			/>
		{:else}
			<InputTextbox
				component={{
					type: 'Text',
					id: 'property',
					value: $state['property']?.value ?? '',
					label: component.propertyLabel
				}}
			/>
		{/if}
	{/key}
	{#if $state['property']?.value}
		<InputTextbox
			component={{
				type: 'Text',
				id: 'addressline1',
				value: $state['addressline1']?.value,
				label: 'Address Line 1'
			}}
			on:valueChange={(e) => {
				state.set('addressline1', {value: e.detail.value, display: e.detail.value, valid: undefined});
			}}
		/>
		<InputTextbox
			component={{
				type: 'Text',
				id: 'addressline2',
				value: $state['addressline2']?.value,
				label: 'Address Line 2'
			}}
			on:valueChange={(e) => {
				state.set('addressline2', {value: e.detail.value, display: e.detail.value, valid: undefined});
			}}
		/>
		<InputTextbox
			component={{
				type: 'Text',
				id: 'addressline3',
				value: $state['addressline3']?.value,
				label: 'Address Line 3'
			}}
			on:valueChange={(e) => {
				state.set('addressline3', {value: e.detail.value, display: e.detail.value, valid: undefined});
			}}
		/>
		<InputTextbox
			component={{
				type: 'Text',
				id: 'addressline4',
				value: $state['addressline4']?.value,
				label: 'Address Line 4'
			}}
			on:valueChange={(e) => {
				state.set('addressline4', {value: e.detail.value, display: e.detail.value, valid: undefined});
			}}
		/>
	{/if}
</div>

<style>
	.address {
		margin: 0rem;
		padding: 0rem;
	}
	.postcode {
		text-transform: uppercase;
	}
	.invalid {
		background-color: var(--input-error-bg, pink);
		color: var(--input-error-txt, red);
	}
	.hidden {
		display: none;
	}
</style>
