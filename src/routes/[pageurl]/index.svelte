<script context="module">
	/** @type {import('@sveltejs/kit').Load} */
	export async function load({ page }) {
		return {
			props: {
				pageurl: await `${page.params.pageurl}`
			}
		};
	}
</script>

<script lang="ts">
    import { getContext } from 'svelte';
	import Page from '$lib/components/Page.svelte';
	import type { JourneyType } from '$lib/types/journey';

	export let pageurl: string;
	const journey: JourneyType = getContext("journey");
</script>


{#each journey.pages as p}
	{#if p.url == pageurl}
		<Page page={p}/>
	{/if}
{/each}
