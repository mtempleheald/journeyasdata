<script lang="ts">
	import { getContext } from 'svelte';
	import Page from '$lib/components/Framework/Page.svelte';
	import type { JourneyType } from '$lib/types/journey';

	export let currentpage: string;
	const journey: JourneyType = getContext('journey');
</script>

{#each journey.pages as p}
	{#if p.url == currentpage}
		<Page page={p} />
	{/if}
{/each}
