<script context="module">
    export const prerender = true;

	export async function load({ page, fetch }) {
		return {
            props: {
                pagetitle: await `${page.params.pagetitle}`
            }
        }
	}
    import { getStores, navigating, page, session } from '$app/stores';
</script>
<script>
    export let pagetitle;
</script>

<svelte:head>
	<title>{pagetitle}</title>
</svelte:head>

<h1>{pagetitle}</h1>