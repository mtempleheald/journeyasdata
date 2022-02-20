<script lang="ts">
	import type { PageType, JourneyType } from '$lib/types/journey';
	import { getContext } from 'svelte';
	import { goto } from '$app/navigation';
	import { DISABLEVALIDATION } from '$lib/env';
	import { actionStore } from '$lib/stores/actionstore';
	import { validationStore } from '$lib/stores/validationstore';
	import { valueStore } from '$lib/stores/valuestore';
	import { nextPageUrl, prevPageUrl } from '$lib/utils/navigation';
	import { first_invalid_component_in_page, pageValid } from '$lib/utils/validators';
	import Cookiepreference from '$lib/components/Cookiepreference.svelte';
	import DisplayBlock from '$lib/components//DisplayBlock.svelte';
	import Navbuttons from '$lib/components/Navbuttons.svelte';
	import Progressbar from '$lib/components/Progressbar.svelte';
	import Repeatinggroup from '$lib/components/Framework/Repeatinggroup.svelte';
	import Section from '$lib/components/Framework/Section.svelte';

	export let page: PageType;

	const journey: JourneyType = getContext('journey');

	$: {
		// run bespoke action tied to page load
		let f = $actionStore[`pageload-${page.id}`];
		if (typeof f === 'function') f();
	}

	function backPage() {
		// Run any defined bespoke actions
		let f = $actionStore[`pageback-${page.id}`];
		if (typeof f === 'function') f();

		// Run the default action
		console.debug('Navigating to previous page');
		goto(prevPageUrl(journey, page.url));
	}
	function nextPage() {
		if (
			DISABLEVALIDATION != 'Y' &&
			!pageValid(
				journey.pages.find((p) => p.url == page.url),
				$valueStore,
				$validationStore
			)
		) {
			console.debug('Page invalid, correct before trying again');
			const first_error = first_invalid_component_in_page(page, $valueStore, $validationStore);
			console.debug('Error with component id ', first_error); // TODO: currently undefined, fix this
			goto(`#${first_error}`);
			return;
		}

		// Run any defined bespoke actions (may redirect, meaning that usual navigation is overwritten)
		let f = $actionStore[`pagenext-${page.id}`];
		if (typeof f === 'function') f();

		// Run the default action
		console.debug('Navigating to next page');
		goto(nextPageUrl(journey, page.url));
	}
</script>

<Cookiepreference cookiepreferences={journey.cookiepreferences} />

<header>
	{#if journey.logo}
		<img
			class="logo"
			src={journey.logo.url}
			alt={journey.logo.alt}
			width={journey.logo.width}
			height={journey.logo.height}
		/>
	{/if}
	{#if journey.title}
		<h1>{journey.title}</h1>
	{/if}
</header>

{#if page.displayprogress ?? true}
	<Progressbar {journey} pageurl={page.url} />
{/if}

<main>
	<!-- require a form element for accessibility -->
	<form on:submit|preventDefault>
		{#if (page.displaytitle ?? false) && !!page.title}
			<header>
				<h1>{page.title}</h1>
			</header>
		{/if}

		{#if page.showtopnav}
			<Navbuttons nav={page.navigation} pageurl={page.url} sectionid="" />
		{/if}

		{#each page.sections as s}
			{#if s.type == 'repeatinggroup'}
				<Repeatinggroup repeatinggroup={s} />
			{:else}
				<Section section={s} />
			{/if}
		{/each}

		<nav class="button-navigation">
			{#if page.navigation?.showback ?? true}
				<button type="button" class="page back" on:click={backPage}
					>{page.navigation?.backlabel ?? 'Back'}</button
				>
			{/if}
			<span class="spacer" />
			{#if page.navigation?.shownext ?? true}
				<button type="button" class="page next" on:click={nextPage}
					>{page.navigation?.nextlabel ?? 'Next'}</button
				>
			{/if}
		</nav>
	</form>
</main>

<footer>
	<DisplayBlock
		component={{
			type: 'Displayblock',
			content: journey.footercontent
		}}
	/>
</footer>

<style>
	header {
		margin: auto; /* centre content on larger screens */
		max-width: var(--page-hdr-width);
		background-color: var(--title-bg);
		color: var(--title-txt);
		border: var(--title-border);
		display: flex;
		flex-wrap: wrap;
	}
	header .logo {
		height: var(--page-logo-height);
		width: var(--page-logo-width);
	}
	header h1 {
		margin: 0;
		padding: var(--page-hdr-padding);
		line-height: var(--title-height);
		font-size: calc(
			var(--title-height) / 2
		); /* Some healthy padding, could vary if really needed */
	}
	main {
		margin: auto; /* centre content on larger screens */
		max-width: var(--page-width);
		background-color: var(--page-bg);
		padding: var(--page-padding);
	}
	main header {
		background-color: var(--page-hdr-bg);
		color: var(--page-hdr-txt);
		border: var(--page-hdr-border);
	}
	main header h1 {
		margin: 0;
		line-height: var(--page-hdr-height);
		font-size: calc(
			var(--page-hdr-height) / 2
		); /* Some healthy padding, could vary if really needed */
	}
	footer {
		margin: auto; /* centre content on larger screens */
		background-color: var(--page-ftr-bg);
		color: var(--page-ftr-txt);
		max-width: var(--page-ftr-width);
		padding: var(--page-ftr-padding);
		border: var(--page-ftr-border);
	}

	nav {
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
	button {
		padding: var(--page-btn-padding);
		color: var(--page-btn-txt);
		background-color: var(--page-btn-bg);
		font-weight: var(--page-btn-font-weight);
	}
</style>