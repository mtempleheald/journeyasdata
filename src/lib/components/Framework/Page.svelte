<script lang="ts">
	import type { PageType } from '$lib/types/journey';
	import { onMount } from 'svelte';
	import { actionStore } from '$lib/stores/actionstore';
	import Cookiepreference from '$lib/components/Cookiepreference.svelte';
	import DisplayBlock from '$lib/components//DisplayBlock.svelte';
	import Navbuttons from '$lib/components/Navbuttons.svelte';
	import Progressbar from '$lib/components/Progressbar.svelte';
	import Repeatinggroup from '$lib/components/Framework/Repeatinggroup.svelte';
	import Section from '$lib/components/Framework/Section.svelte';
	import { journey } from '$lib/stores/journeystore';
	import type { PageParameterisedAction, ParameterlessAction } from '$lib/types/stores';

	export let page: PageType;

	onMount(async () => {
		// run bespoke action tied to page load, but not during SSR
		let f = $actionStore[`pageload_${page.id}`];
		if (typeof f === 'function') (f as ParameterlessAction)();
	});

	function backPage() {
		// Defer all page navigation logic to bespoke actions with a fallback default, for maximum flexibility
		let f = $actionStore[`pageback_${page.id}`] ?? $actionStore['pageback'];
		if (typeof f === 'function') (f as PageParameterisedAction)(page);
	}
	function nextPage() {
		// Defer all page navigation logic to bespoke actions with a fallback default, for maximum flexibility
		let f = $actionStore[`pagenext_${page.url}`] ?? $actionStore['pagenext'];
		if (typeof f === 'function') (f as PageParameterisedAction)(page);
	}
</script>

{#if $journey.cookiepreferences}
	<Cookiepreference cookiepreferences={$journey.cookiepreferences} />
{/if}
<header>
	{#if $journey.logo}
		<img
			class="logo"
			src={$journey.logo.url}
			alt={$journey.logo.alt}
			width={$journey.logo.width}
			height={$journey.logo.height}
		/>
	{/if}
	{#if $journey.title}
		<h1>{$journey.title}</h1>
	{/if}
</header>

{#if page.displayprogress ?? true}
	<Progressbar journey={$journey} pageurl={page.url} />
{/if}

<main>
	<!-- require a form element for accessibility -->
	<form on:submit|preventDefault>
		{#if (page.displaytitle ?? false) && !!page.title}
			<header>
				<h1>{page.title}</h1>
			</header>
		{/if}

		{#if page.navigation && page.showtopnav}
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
			{#if page.navigation?.backlabel}
				<button type="button" class="page back" on:click={backPage}
					>{page.navigation?.backlabel ?? 'Back'}</button
				>
			{/if}
			<span class="spacer" />
			{#if page.navigation?.nextlabel}
				<button type="button" class="page next" on:click={nextPage}
					>{page.navigation?.nextlabel ?? 'Next'}</button
				>
			{/if}
		</nav>
	</form>
</main>

<footer>
	{#if $journey.footercontent}
		<DisplayBlock
			component={{
				type: 'Displayblock',
				content: $journey.footercontent
			}}
		/>
	{/if}
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
