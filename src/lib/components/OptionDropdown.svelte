<script lang="ts">
	import type { OptionComponent, ValueType } from '$lib/types/journey';
	import { createEventDispatcher, onMount } from 'svelte';
	import Helptext from '$lib/components/Helptext.svelte';

	// load refdata on component creation
	onMount(async () => {
		effectiveValues = component.values;
		if (component.refdata) {
			await fetch('/api/refdata/' + component.refdata)
				.then((resp) => resp.json())
				.then((data) => (effectiveValues = data));
		}
	});

	// expose component properties
	export let component: OptionComponent;

	// internal properties to support component logic
	const dispatch = createEventDispatcher();
	let fallbackError = 'Please select an option';
	let invalid = false;
	let active = '';
	let effectiveValues: ValueType[]; // overwriting component.values directly triggers an onMount loop

	// component actions
	function enter() {
		active = 'active';
	}
	function leave() {
		active = '';
	}
	function act(event: any) {
		// publish value changes up to parent too
		dispatch('valueChange', {
			key: component.id,
			value: event.target.value,
			display: event.target.value
				? component.values.find((v) => v.value === event.target.value).display
				: '',
			valid: !component.required || !!event.target.value
		});
		invalid = component.required && !event.target.value;
	}
</script>

<div
	class="component {active} {invalid ? 'invalid' : ''}"
	on:mouseenter={enter}
	on:mouseleave={leave}
>
	<slot name="pre" />

	<div class="container">
		{#if component.label}
			<label for={component.id}>
				{component.label}
				{#if component.required}
					<span class="required">*</span>
				{/if}
			</label>
		{/if}
		{#if component.id}
			<select
				id={component.id}
				name={component.id}
				value={component.value}
				data-reference={component.refdata}
				required={component.required}
				on:blur={act}
			>
				<option value="">{!component.placeholder ? '-- select --' : component.placeholder}</option>

				{#if effectiveValues}
					{#each effectiveValues as val}
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
		<span class="error">{component.errorMessage ?? fallbackError}</span>
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
