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

<script>
    import AddressLookup from '$lib/AddressLookup.svelte';
    import DisplayOnlyQuestion from '$lib/DisplayOnlyQuestion.svelte';
    import TextQuestion from '$lib/TextQuestion.svelte';
    import SectionLayout from '$lib/SectionLayout.svelte';
    import { questionSet } from '$lib/stores';
    import snarkdown from 'snarkdown';// https://github.com/developit/snarkdown/blob/master/test/index.js
    export let pageurl;
</script>


{#each $questionSet as qs}
{#each qs.pages as p} 
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
    required="{q.required ?? false}"
    errorMessage="{q.errorMessage ?? ''}"
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
{/each}