<script context="module">
	export function load({ error, status }) {
		return {
			props: { error, status }
		};
	}
</script>

<script lang="ts">
	export let status: number;
	export let error: Error;
</script>

<svelte:head>
	<title>Error {status}</title>
</svelte:head>

<h1>{status}</h1>
<p>{error.message}</p>