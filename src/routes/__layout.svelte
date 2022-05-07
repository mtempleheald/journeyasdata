<script context="module">
	import { BRAND } from '$lib/env';
	import { load_actions } from '$lib/actions/actionprovider';

	/** @type {import('@sveltejs/kit').Load} */
	export async function load({ fetch }) {
		console.debug('Loading journey (should appear in browser dev tools only once)');
		return {
			props: {
				brand: BRAND.toString(),
				actions: await load_actions(BRAND.toString()),
				journey: await fetch(`/api/journey/${BRAND}.json`)
					.then((res) => res.json())
					.catch((err) => console.error(err))
			}
		};
	}
</script>

<script lang="ts">
	import type { JourneyType } from '$lib/types/journey';
	import { actionStore } from '$lib/stores/actionstore';
	import { journey as journeyStore } from '$lib/stores/journeystore';
	import { browser } from '$app/env';

	export let brand: string;
	export let actions: never;
	export let journey: JourneyType;

	journeyStore.set(journey);

	// load bespoke actions once, call throughout user journey
	if (browser) {
		actionStore.load(actions);
		console.debug(`${Object.keys($actionStore).length} actions loaded for ${brand}`);
	}
</script>

<svelte:head>
	<title>{journey?.title}</title>
	<link rel="stylesheet" href="/{brand}/theme.css" />
</svelte:head>

<slot />
