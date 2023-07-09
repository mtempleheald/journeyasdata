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
	let yearElem: HTMLInputElement;
	let monthElem: HTMLInputElement;
	let dayElem: HTMLInputElement;

	onMount(async () => {
		if (component.value) {
			dayElem.value = component.value.substring(8, 10);
			monthElem.value = component.value.substring(5, 7);
			yearElem.value = component.value.substring(0, 4);
			update();
		}
	});

	function focus_day() {
		dayElem.value = '';
		monthElem.value = '';
		yearElem.value = '';
		valid = true;
	}
	function leave_day() {
		if (!dayElem.validity.valid) {
			setTimeout(function () {
				dayElem.focus();
			}, 0);
		}
	}
	function focus_month() {
		monthElem.value = '';
		yearElem.value = '';
		valid = true;
	}
	function leave_month() {
		if (!monthElem.validity.valid) {
			setTimeout(function () {
				monthElem.focus();
			}, 0);
		}
	}
	function focus_year() {
		yearElem.value = '';
		valid = true;
	}
	function leave_year() {
		if (!yearElem.validity.valid) {
			setTimeout(function () {
				yearElem.focus();
			}, 0);
		}
		update();
	}

	function reset() {
		yearElem.value = '';
		monthElem.value = '';
		dayElem.value = '';
		valid = true;
		update();
	}
	function format_date(value: string) {
		const date = new Date(value);
		return new Intl.DateTimeFormat([], { dateStyle: component.displayformat ?? 'short' }).format(
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

		if (!component.required && component.value == '0000-00-00') {
			valid = true;
		} else {
			// validate that this is an actual date and apply custom validation
			valid = date_valid(component, component.value);
		}

		state.set(component.id, {
			value: component.value,
			display: valid ? format_date(component.value) : '',
			valid: valid
		});

		// publish changes up to parent, let it handle state
		dispatch('dateChange', {
			key: component.id,
			value: component.value,
			displayValue: valid ? format_date(component.value) : '',
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
	role="presentation"
>
	<slot name="pre" />

	<div class="container">
		<input
			type="date"
			id="_{component.id}"
			bind:value={component.value}
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
				on:focus={focus_day}
				on:blur={leave_day}
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
				on:focus={focus_month}
				on:blur={leave_month}
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
				on:focus={focus_year}
				on:blur={leave_year}
			/>
		{/if}

		<button type="button" name="reset" on:click={reset}>{component.resetlabel ?? 'Reset'}</button>

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
