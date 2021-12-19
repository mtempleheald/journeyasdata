<script context="module">
	import { BRAND } from '$lib/env';
	/** @type {import('@sveltejs/kit').Load} */
	export async function load() {
		// or use the fetch API to import the journey
		//export async function load({ fetch }) {
		console.debug('Loading journey (should appear in browser dev tools only once)');
		return {
			props: {
				// TODO: resolve root path load error/ pick best approach for loading journey.json
				// dynamically load content, making use of HMR for quick feedback
				journey: await import(`./../../static/${BRAND}/journey.json`).then(
					(module) => module.default
				),
				// or use the fetch API to import the journey
				//journey: await fetch(`/api/journey/${BRAND}`).then(j => j.json()),
				brand: BRAND.toString()
			}
		};
	}
</script>

<script lang="ts">
	import type { JourneyType } from '$lib/types/journey';
	import { actionStore } from '$lib/stores/actionstore';
	import { browser } from '$app/env';
	import { getActions } from '$lib/actions/actionprovider';
	import { setContext } from 'svelte';

	export let brand: string;
	export let journey: JourneyType;

	// load journey once, reference throughout user journey
	setContext('journey', journey);
	// load bespoke actions once, call throughout user journey
	if (browser) {
		actionStore.load(getActions(brand));
		console.debug(`${Object.keys($actionStore).length} actions loaded for ${brand}`);
	}
</script>

<svelte:head>
	<title>{journey.title}</title>
	<link rel="stylesheet" href="/{brand}/theme.css" />
</svelte:head>

<slot />
