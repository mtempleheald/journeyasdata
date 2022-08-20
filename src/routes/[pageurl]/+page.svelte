<script lang="ts">
	import type { PageData } from './$types';
	import Journey from '$lib/components/Framework/Journey.svelte';
	export let data: PageData;
</script>

<Journey currentpage={data.pageurl} />
