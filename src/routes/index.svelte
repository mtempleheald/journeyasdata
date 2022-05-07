<script lang="ts">
	import Page from '$lib/components/Framework/Page.svelte';
	import { journey } from '$lib/stores/journeystore';
</script>

<Page page={$journey?.pages[0]} />
