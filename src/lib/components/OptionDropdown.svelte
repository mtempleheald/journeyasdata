<script lang="ts">
	import type { OptionComponent } from '$lib/types/journey';
	import { createEventDispatcher } from 'svelte';
	import { state } from '$lib/stores/statestore';
	import Helptext from '$lib/components/Helptext.svelte';

	// expose component properties
	export let component: OptionComponent;

	// internal properties to support component logic
	const dispatch = createEventDispatcher();
	let fallbackError = 'Please select an option';
	$: invalid = !($state[component.id]?.valid ?? true);
	let active = '';

	// component actions
	function enter() {
		active = 'active';
	}
	function leave() {
		active = '';
	}
	function update_state(event: Event) {
		const elem = <HTMLSelectElement>event.target;
		state.set(component.id, {
			value: elem.value,
			display: component.values?.find((c) => c.value === elem.value)?.display,
			valid: elem.validity.valid
		});
		// publish value changes up to parent too
		dispatch('valueChange', {
			key: component.id,
			value: elem.value,
			display: elem.value ? component.values?.find((v) => v.value === elem.value)?.display : '',
			valid: !component.required || !!elem.value
		});
	}
</script>

<div
	id={component.id}
	class="component {active} {invalid ? 'invalid' : ''}"
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
			<select
				id="_{component.id}"
				name={component.id}
				value={component.value}
				data-reference={component.refdata}
				required={component.required}
				on:blur={update_state}
			>
				<option value="">{!component.placeholder ? '-- select --' : component.placeholder}</option>

				{#if component.values}
					{#each component.values as val}
						<option value={val.value} selected={component.value == val.value}>{val.display}</option>
					{/each}
				{/if}
			</select>
		{/if}
		{#if component.help}
			<Helptext>
				<svelte:fragment slot="button">Help</svelte:fragment>
				{component.help}
			</Helptext>
		{/if}
	</div>

	{#if invalid}
		<span class="error">{component.error ?? fallbackError}</span>
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

	.container {
		width: 100%;
	}

	select {
		padding: var(--input-padding);
	}
</style>
