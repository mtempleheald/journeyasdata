<script lang="ts">
    import { getContext } from 'svelte';
    import Wizard from '$lib/components/Wizard.svelte';
    import NavButtons from '$lib/components/NavButtons.svelte';
    import Section from './Section.svelte';
    import type { QuestionSetType } from '$lib/types/questionset';

    export let pageurl;
    const qs: QuestionSetType = getContext("questionset");

</script>


<Wizard 
  questionset = {qs}
  pageurl={pageurl}/>

<!-- require a form element for accessibility -->
<form on:submit|preventDefault={() => {}}>

{#each qs.pages as p} 
  {#if p.url == pageurl}
    <h2>{p.title}</h2>
    {#each p.sections as s}
        <Section section={s}/>
    {/each}
  {/if}
{/each}

<NavButtons 
      questionset = {qs}
      pageurl = '{pageurl}'
      nextText = 'Next Page'
      backText = 'Back'
/>
</form>


<style>
  h2 {
    margin: 0;
    padding: 1rem;
    height: 1rem;
    line-height: 1rem;
  }
</style>