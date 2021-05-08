<script context="module">

	/**
	 * @type {import('@sveltejs/kit').Load}
	 */
	export async function load({ page, fetch, session, context }) {
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
	import type { QuestionSetType } from '$lib/types/questionset';

	export let pageurl: string;
	const questionset: QuestionSetType = getContext("questionset");
</script>

{#each questionset.pages as p}
	{#if p.url == pageurl}
		<Page page={p}/>
	{/if}
{/each}