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
          pageurl: await `${page.params.pageurl}`
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
    import AddressLookup from '$lib/AddressLookup.svelte';
    import DisplayOnlyQuestion from '$lib/DisplayOnlyQuestion.svelte';
    import TextQuestion from '$lib/TextQuestion.svelte';
    import SectionLayout from '$lib/SectionLayout.svelte';
    import { questionSet } from '$lib/stores';
    import snarkdown from 'snarkdown';// https://github.com/developit/snarkdown/blob/master/test/index.js
    export let pageurl;
    export let questionSetData;
    questionSet.set(questionSetData);
</script>


{#each $questionSet.pages as p} 
{#if p.page.url == pageurl}
<h1>{p.page.title}</h1>
{#each p.sections as s}
<SectionLayout 
  title={s.section.title}
  logo={s.section.logo}
>
{#each s.components as q}
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
{#if q.type == "DisplayOnlyQuestion"}
  <DisplayOnlyQuestion>
  <div slot="pre">
    {#if q.pre}
      {@html snarkdown(q.pre)}
    {/if}
  </div>
  <div slot="main">
    {@html snarkdown(q.content)}
  </div>
  <div slot="post">
    {#if q.post}
      {@html snarkdown(q.post)}
    {/if} 
  </div>
  </DisplayOnlyQuestion>
{/if}
{#if q.type == "AddressLookup"}
  <AddressLookup 
    postcodePlaceholder={q.postcodePlaceholder} 
    postcodeLabel={q.postcodeLabel} 
    buttonLabel={q.buttonLabel}
    houseLabel={q.houseLabel}/>
{/if}
{/each}
</SectionLayout>
{/each}
{/if}
{/each}