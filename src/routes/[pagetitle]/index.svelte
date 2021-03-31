<script context="module">
	/**
	 * @type {import('@sveltejs/kit').Load}
	 */
	export async function load({ page, fetch, session, context }) {
		const url = `/questionsets/questionset.json`;
		const res = await fetch(url);
    
    if (res.ok) {
			return {
				props: {
					questionSetData: await res.json(),
                    pagetitle: await `${page.params.pagetitle}`
				}
			};
		}

    return {
			status: res.status,
			error: new Error(`Could not load ${url}`)
		};
	}
</script>

<script>
    import TextQuestion from '$lib/TextQuestion.svelte';
    import { questionSet } from '$lib/stores';
    import snarkdown from 'snarkdown';// https://github.com/developit/snarkdown/blob/master/test/index.js
    export let pagetitle;
    export let questionSetData;
    questionSet.set(questionSetData);
</script>

<svelte:head>
	<title>{pagetitle}</title>
</svelte:head>

<h1>{pagetitle}</h1>

<p>Currently showing all questions, need to limit to just the current page</p>

{#each $questionSet as q}
{#if q.type == "TextQuestion"}
  <TextQuestion
    id="{q.id}"
    label="{q.label}"
    placeholder="{q.placeholder ?? ''}"
    help="{q.help ?? ''}"
  >
  <div slot="pre">
    {#if q.pre}
      {@html snarkdown(q.pre)}
    {/if}
  </div>
  <div slot="post">
    {#if q.post}
      {@html snarkdown(q.post)}
    {/if} 
  </div>
  </TextQuestion>
{/if}
{/each}
