<script lang="ts">
	import type { JourneyType } from '$lib/types/journey';
    import { getContext } from 'svelte';
	import Page from '$lib/components/Page.svelte';

	const journey: JourneyType = getContext("journey");
</script>
    

<Page page={journey.pages[0]}/>

