<script context="module">
	/** @type {import('@sveltejs/kit').Load} */
	export async function load({ params }) {
		return {
			props: {
				pageurl: params.pageurl
			}
		};
	}
</script>

<script lang="ts">
	import Journey from '$lib/components/Journey.svelte';
	export let pageurl: string;
</script>

<Journey currentpage={pageurl} />
