<script lang="ts">
    import { getContext } from 'svelte';
	import Page from '$lib/components/Page.svelte';
	import type { JourneyType } from '$lib/types/journey';

	const journey: JourneyType = getContext("journey");
</script>
    

<Page page={journey.pages[0]}/>

