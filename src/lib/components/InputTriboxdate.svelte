<script lang="ts">
	import type { TriBoxDateComponent } from '$lib/types/journey';
	import { blur } from 'svelte/transition';
	import { createEventDispatcher, onMount } from 'svelte';
	import { state } from '$lib/stores/statestore';
	import Helptext from '$lib/components/Helptext.svelte';
	import { date_valid } from '$lib/utils/datevalidators';

	// expose component properties
	export let component: TriBoxDateComponent;

	// internal properties to support component logic
	let fallbackError = 'Date entered is invalid';
	let valid: boolean = $state[component.id]?.valid ?? true;
	let active = '';
	let dateElem: HTMLInputElement; // TODO: rework this to use the hidden date field and HTML5 validation
	let yearElem: HTMLInputElement;
	let monthElem: HTMLInputElement;
	let dayElem: HTMLInputElement;
	let yearAttempted = false;
	let monthAttempted = false;
	let dayAttempted = false;

	onMount(async () => {
		if (component.value) {
			dayElem.value = component.value.substring(8, 10);
			monthElem.value = component.value.substring(5, 7);
			yearElem.value = component.value.substring(0, 4);
			dayAttempted = true;
			monthAttempted = true;
			yearAttempted = true;
			update();
		}
	});

	function focus_day (event: FocusEvent) {
		dayElem.value = ''
		monthElem.value = '';
		yearElem.value = '';
		valid = true;
	}
	function focus_month (event: FocusEvent) {
		monthElem.value = '';
		yearElem.value = '';
	}
	function focus_year (event: FocusEvent) {
		yearElem.value = '';
	}

	function updateDay(event: FocusEvent) {
		console.log(event)
		// skip update if reset is clicked
		if (event.explicitOriginalTarget.parentNode.name != 'reset') {
			dayAttempted = true;
			update();
			if (!dayElem.validity.valid) {
				setTimeout(function () {
					dayElem.focus();
				}, 0);
			}
		}
	}
	function updateMonth(event) {
		// skip update if reset is clicked or we are going back to day because it is invalid
		if (event.explicitOriginalTarget.parentNode.name == 'reset' || event.relatedTarget == dayElem)
			return;

		monthAttempted = true;
		update();
		if (!monthElem.validity.valid) {
			setTimeout(function () {
				monthElem.focus();
			}, 0);
		}
	}
	function updateYear(event) {
		// skip update if reset is clicked or we are going back to month because it is invalid
		if (event.explicitOriginalTarget.parentNode.name == 'reset' || event.relatedTarget == monthElem)
			return;

		yearAttempted = true;
		update();
		if (!yearElem.validity.valid) {
			setTimeout(function () {
				yearElem.focus();
			}, 0);
		}
	}
	function reset() {
		yearElem.value = '';
		monthElem.value = '';
		dayElem.value = '';
		yearAttempted = false;
		monthAttempted = false;
		dayAttempted = false;
		valid = true;
		update();
	}
	function formatDate() {
		if (!valid || !yearAttempted) return '';

		const date = new Date(component.value);

		return new Intl.DateTimeFormat([], { dateStyle: component.displayFormat ?? 'short' }).format(
			date
		);
	}

	// component actions
	function enter() {
		active = 'active';
	}
	function leave() {
		active = '';
	}

	function update() {
		// ensure that the date format is always respected, even if it isn't a valid date
		const y = yearElem.validity.valid ? yearElem.value : '0000';
		const m = monthElem.validity.valid ? monthElem.value : '00';
		const d = dayElem.validity.valid ? dayElem.value : '00';
		component.value = `${y.padStart(4, '0')}-${m.padStart(2, '0')}-${d.padStart(2, '0')}`;

		// validate that this is an actual date and apply custom validation
		valid = date_valid(component, component.value);

		state.set(component.id, {
			value: component.value,
			display: formatDate(),
			valid: valid
		});

		// publish changes up to parent, let it handle state
		dispatch('dateChange', {
			key: component.id,
			value: component.value,
			displayValue: formatDate(),
			valid: valid
		});
	}
	const dispatch = createEventDispatcher();
</script>

<div
	id={component.id}
	class="component {active} {valid ? '' : 'invalid'}"
	transition:blur
	on:mouseenter={enter}
	on:mouseleave={leave}
>
	<slot name="pre" />

	<div class="container">
		<!-- Use date field (hidden) to take advantage of browser validator api -->
		<input
			type="date"
			id="_{component.id}"
			bind:value={component.value}
			bind:this={dateElem}
			required={component.required}
			class="hidden"
		/>
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
				bind:this={dayElem}
				id="{component.id}-day"
				type="number"
				inputmode="numeric"
				placeholder="DD"
				name="day"
				title="day"
				min="1"
				max="31"
				on:blur={updateDay}
			/>
			<span>{component.separator ?? ''}</span>
			<input
				bind:this={monthElem}
				id="{component.id}-month"
				type="number"
				inputmode="numeric"
				placeholder="MM"
				name="month"
				title="month"
				min="1"
				max="12"
				on:blur={updateMonth}
			/>
			<span>{component.separator ?? ''}</span>
			<input
				bind:this={yearElem}
				id="{component.id}-year"
				type="number"
				inputmode="numeric"
				placeholder="YYYY"
				name="year"
				title="year"
				min="0"
				max="9999"
				on:blur={updateYear}
			/>
		{/if}

		<button type="button" name="reset" on:click={reset}>{component.resetLabel ?? 'Reset'}</button>

		{#if component.help}
			<Helptext>
				<svelte:fragment slot="button">Help</svelte:fragment>
				{component.help}
			</Helptext>
		{/if}
	</div>

	{#if !valid}
		<div class="error">{component.errorMessage ?? fallbackError}</div>
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
		color: var(--input-txt-required);
	}

	.error {
		background-color: var(--input-error-msg-bg);
		color: var(--input-error-msg-txt);
	}

	.hidden {
		display: none;
	}

	.container {
		width: 100%;
	}
	input {
		width: 30px;
		padding: var(--input-padding);
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
	input:invalid {
		background-color: var(--input-error-bg);
		color: var(--input-error-txt);
		border: var(--input-error-border);
	}
	/* don't want arrows on date input */
	input[type='number'] {
		appearance: textfield;
	}
	input[type='number']::-webkit-inner-spin-button,
	input[type='number']::-webkit-outer-spin-button {
		appearance: none;
	}
</style>
