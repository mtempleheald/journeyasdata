<script lang="ts">
	import type { JourneyType, NavigationOptionsType } from '$lib/types/journey';
	import { DISABLEVALIDATION } from '$lib/env';
	import { getContext } from 'svelte';
	import { goto } from '$app/navigation';
	import { nextPageUrl, prevPageUrl } from '$lib/utils/navigation';
	import { pageValid } from '$lib/utils/validators';
	import { validationStore } from '$lib/stores/validationstore';
	import { valueStore } from '$lib/stores/valuestore';

	export let nav: NavigationOptionsType;
	export let pageurl: string;
	export let sectionid: string;

	const journey: JourneyType = getContext('journey');

	function backPage() {
		console.debug('Navigating to previous page');
		goto(prevPageUrl(journey, pageurl));
	}
	function nextPage() {
		if (DISABLEVALIDATION == 'Y') {
			console.debug('Validation disabled, redirecting to next page');
			goto(nextPageUrl(journey, pageurl));
		} else if (
			pageValid(
				journey.pages.find((p) => p.url == pageurl),
				$valueStore,
				$validationStore
			)
		) {
			console.debug('Page valid, redirecting to next page');
			goto(nextPageUrl(journey, pageurl));
		} else {
			console.debug('Page invalid, correct before trying again');
		}
	}
</script>

<nav class="button-navigation">
	{#if nav?.backlabel?.length > 0}
		{#if !!pageurl}
			<button type="button" class="page back" on:click={backPage}>{nav.backlabel ?? 'Back'}</button>
		{:else if !!sectionid}
			<button
				type="button"
				class="section back"
				on:click={() => {
					console.debug('not yet implemented section navigation');
				}}>{nav.backlabel ?? 'Back'}</button
			>
		{/if}
	{/if}
	<span class="spacer" />
	{#if nav?.nextlabel?.length > 0}
		{#if !!pageurl}
			<button type="button" class="page next" on:click={nextPage}>{nav.nextlabel ?? 'Next'}</button>
		{:else if !!sectionid}
			<button
				type="button"
				class="section next"
				on:click={() => {
					console.debug('not yet implemented section navigation');
				}}>{nav.nextlabel ?? 'Next'}</button
			>
		{/if}
	{/if}
</nav>

<style>
	.button-navigation {
		width: 100%;
		padding: 0;
		margin: auto;
		display: flex;
		align-content: stretch;
	}
	.spacer {
		flex-grow: 10;
	}
	button {
		flex-grow: 1;
	}
	button.page {
		padding: var(--page-btn-padding);
		color: var(--page-btn-txt);
		background-color: var(--page-btn-bg);
		font-weight: var(--page-btn-font-weight);
	}
	button.section {
		padding: var(--section-btn-padding);
		color: var(--section-btn-txt);
		background-color: var(--section-btn-bg);
		font-weight: var(--section-btn-font-weight);
	}
</style>
