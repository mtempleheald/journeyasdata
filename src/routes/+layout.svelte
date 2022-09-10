<script lang="ts">
	import type { LayoutData } from './$types';
	import { actionStore } from '$lib/stores/actionstore';
	import { journey as journeyStore } from '$lib/stores/journeystore';
	import { browser } from '$app/environment';

	export let data: LayoutData;

	journeyStore.set(data.journey);
	console.debug(`layout: update '${data.journey?.title}' journey store`);

	if (browser) {
		// load bespoke actions once, available everywhere via actionStore
		actionStore.load(data.actions);
		console.debug(`${Object.keys($actionStore).length} actions loaded for ${data.brand}`);
	}
</script>

<svelte:head>
	<title>{data.journey?.title}</title>
	<link rel="stylesheet" href="/{data.brand}/theme.css" />
</svelte:head>

<slot />
