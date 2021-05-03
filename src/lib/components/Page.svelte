<script lang="ts">
    import { getContext } from 'svelte';
    import { BRAND } from '$lib/env/Env.svelte'
    import Wizard from '$lib/components/Wizard.svelte';
    import NavButtons from '$lib/components/NavButtons.svelte';
    import Section from './Section.svelte';
    import type { PageType, QuestionSetType } from '$lib/types/questionset';

    export let page: PageType;

    const questionset: QuestionSetType = getContext("questionset");

</script>



<header>
  <img src="https://fakeimg.pl/250x100/?text={BRAND}" alt="logo">
  <h1>{questionset.title}</h1>
</header>


{#if page.displaynavbar ?? true}
<Wizard 
  questionset = {questionset}
  pageurl={page.url}/>
{/if}

<!-- require a form element for accessibility -->
<form on:submit|preventDefault={() => {}}>


{#if page.displaytitle ?? true}
<h2>{page.title}</h2>
{/if}

{#each page.sections as s}
<Section section={s}/>
{/each}


<NavButtons 
      questionset = {questionset}
      pageurl = '{page.url}'
      nextText = 'Next Page'
      backText = 'Back'
/>

</form>


<style>  
header {
    background-color: var(--header-bg, white);
    color: var(--header-txt, black);
    border-bottom: var(--header-border, 1px solid black);
    display: flex;
    flex-direction: row;
}
img {
    height: 100px;
    width: 250px;
}
h1 {
    height: 100px;
    line-height: 100px;
    padding: 0 1rem;
    margin: 0;
    width: calc(100vw - 250px);
}
h2 {
  margin: 0;
  padding: 1rem;
  height: 1rem;
  line-height: 1rem;
}
</style>