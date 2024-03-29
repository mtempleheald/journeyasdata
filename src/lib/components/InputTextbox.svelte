<script lang="ts">
	import type { InputComponent } from '$lib/types/journey';
	import { blur } from 'svelte/transition';
	import { createEventDispatcher } from 'svelte';
	import { state } from '$lib/stores/statestore';
	import Helptext from '$lib/components/Helptext.svelte';

	// expose component properties
	export let component: InputComponent;

	// internal properties to support component logic
	const dispatch = createEventDispatcher();
	let html5type: string;
	switch (component.type) {
		case 'Colour':
			html5type = 'color';
			break;
		case 'Datetime':
			html5type = 'datetime-local';
			break;
		case 'Range':
			html5type = 'range';
			break;
		case 'Telephone':
			html5type = 'tel';
			break;
		case 'Upper':
			html5type = 'text';
			break;
		default:
			html5type = component.type?.toLowerCase() ?? 'text';
	}
	let fallbackError: string;
	let valid: boolean;
	$: valid = $state[component.id]?.valid ?? true;
	let active: string;

	// component actions
	function enter() {
		active = 'active';
	}
	function leave() {
		active = '';
	}
	function act(event: Event) {
		const elem = <HTMLSelectElement>event.target;
		state.set(component.id, {
			value: elem.value,
			display: component.type == 'Upper' ? elem.value.toUpperCase() : elem.value,
			valid: elem.validity.valid
		});
		fallbackError = elem.validity.valid ? '' : elem.validationMessage;
		// publish changes up to parent, for any additional actions
		dispatch('valueChange', {
			key: component.id,
			value: elem.value,
			valid: elem.validity.valid
		});
	}
	function focus() {
		dispatch('focus', component.id);
	}
</script>

<div
	id={component.id}
	class="component {active} {valid ? '' : 'invalid'}"
	transition:blur
	on:mouseenter={enter}
	on:mouseleave={leave}
	role="presentation"
>
	<slot name="pre" />

	<div class="container">
		{#if component.label}
			<label for="_{component.id}">
				{component.label}
				{#if component.required}
					<span class="required">*</span>
				{/if}
			</label>
		{/if}

		{#if component.id}
			<input
				type={html5type}
				class={component.type?.toLowerCase()}
				id="_{component.id}"
				name={component.id}
				placeholder={component.placeholder ?? ''}
				required={component.required ?? false}
				value={($state[component.id] ? $state[component.id].value : component.value) ?? ''}
				on:blur={act}
				on:focus={focus}
			/>
		{/if}

		{#if component.help}
			<Helptext>
				<svelte:fragment slot="button">Help</svelte:fragment>
				{component.help}
			</Helptext>
		{/if}
	</div>

	{#if !valid}
		<div class="error">{component.error ?? fallbackError}</div>
	{/if}

	<slot name="post" />
</div>

<style>
	.component {
		margin: 0;
		padding: var(--component-padding);
		background-color: var(--component-bg);
		color: var(--component-txt);
		border: var(--component-border);
	}
	.component.active {
		background-color: var(--component-active-bg);
		color: var(--component-active-txt);
	}
	.component.invalid {
		background-color: var(--component-error-bg);
		color: var(--component-error-txt);
	}

	label {
		padding: var(--input-padding);
		color: var(--input-txt);
		background-color: var(--input-bg);
		display: inline-block;
		width: max(250px, 40%);
	}
	.component.active label {
		color: var(--input-active-txt);
		background-color: var(--input-active-bg);
	}
	.component.invalid label {
		color: var(--input-error-txt);
		background-color: var(--input-error-bg);
	}

	.required {
		color: var(--input-txt);
	}

	.error {
		background-color: var(--input-error-msg-bg);
		color: var(--input-error-msg-txt);
	}

	input {
		padding: var(--input-padding, 0.25rem);
		color: var(--input-txt);
		background-color: var(--input-bg);
	}
	.component.invalid input {
		background-color: var(--input-error-bg);
		color: var(--input-error-txt);
		border: var(--input-error-border);
	}
	input:active {
		background-color: var(--input-active-bg);
		color: var(--input-active-txt);
	}

	.upper {
		text-transform: uppercase;
	}

	.container {
		width: 100%;
	}
</style>
