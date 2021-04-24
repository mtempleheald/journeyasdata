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
    import NavButtons from '$lib/navigation/NavButtons.svelte';
    import Section from '$lib/display/Section.svelte';
    import { questionSet } from '$lib/stores/questionset';
    import ComponentBuilder from '$lib/ComponentBuilder.svelte';
    export let pageurl;

</script>

{#each $questionSet.pages as p} 
  {#if p.page.url == pageurl}
    <h2>{p.page.title}</h2>
    {#each p.sections as s}
      <Section
        title={s.section.title}
        logo={s.section.logo}>
      {#each s.components as component}
        <ComponentBuilder component={component}/>
      {/each}
      </Section>
    {/each}
  {/if}
{/each}
<NavButtons 
      nextText = 'Next Page'
      backText = 'Back'
      pageurl = '{pageurl}'
>
</NavButtons>


<style>
  h2 {
    margin: 0;
    padding: 1rem;
    height: 1rem;
    line-height: 1rem;
  }
</style>