<script lang="ts">
	import Page from '$lib/components/Framework/Page.svelte';
	import { journey } from '$lib/stores/journeystore';

	export let currentpage: string;
</script>

{#each $journey.pages as p}
	{#if p.url == currentpage}
		<Page page={p} />
	{/if}
{/each}
