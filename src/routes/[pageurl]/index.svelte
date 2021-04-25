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
    import { getContext } from 'svelte';
    import Wizard from '$lib/navigation/Wizard.svelte';
    import NavButtons from '$lib/navigation/NavButtons.svelte';
    import Section from '$lib/display/Section.svelte';
    import ComponentBuilder from '$lib/ComponentBuilder.svelte';

    export let pageurl;
    const qs = getContext("questionset");

</script>


<Wizard 
  questionset = {qs}
  pageurl={pageurl}/>

{#each qs.pages as p} 
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
      questionset = {qs}
      pageurl = '{pageurl}'
      nextText = 'Next Page'
      backText = 'Back'
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