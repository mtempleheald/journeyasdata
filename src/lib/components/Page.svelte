<script lang="ts">
    import type { PageType, JourneyType } from '$lib/types/journey';
    import { getContext } from 'svelte';
    import Cookiepreference from '$lib/components/Cookiepreference.svelte';
    import DisplayBlock from './DisplayBlock.svelte';
    import Navbuttons from '$lib/components/Navbuttons.svelte';
    import Progressbar from '$lib/components/Progressbar.svelte';
    import Repeatinggroup from './Repeatinggroup.svelte';
    import Section from './Section.svelte';

    export let page: PageType;

    const journey: JourneyType = getContext("journey");

</script>


<Cookiepreference cookiepreferences={journey.cookiepreferences}/>

<header>  
  {#if journey.logo}
    <img class="logo" src="{journey.logo.url}" alt="{journey.logo.alt}" width="{journey.logo.width}" height="{journey.logo.height}" >
  {/if}
  {#if journey.title}
    <h1>{journey.title}</h1>
  {/if}  
</header>

{#if page.displayprogress ?? true}
  <Progressbar
    journey = {journey}
    pageurl={page.url}/>
  {/if}

<main>
<!-- require a form element for accessibility -->
<form on:submit|preventDefault={() => {}}>


{#if (page.displaytitle ?? false) && !!page.title}
<header>
  <h1>{page.title}</h1>
</header>
{/if}

{#if page.showtopnav}
<Navbuttons 
  nav = {page.navigation}
  pageurl = {page.url}
  sectionid = ''
/>
{/if}

{#each page.sections as s}
  {#if s.type == "repeatinggroup"}
    <Repeatinggroup repeatinggroup={s}/>
  {:else}
    <Section section={s}/>
  {/if}
{/each}


<Navbuttons 
  nav = {page.navigation}
  pageurl = {page.url}
  sectionid = ''
/>

</form>
</main>

<footer>
	<DisplayBlock
	  component={{
		type: "Displayblock",
		content: journey.footercontent
	  }}
	></DisplayBlock>
</footer>


<style>  
  header {
    margin: auto; /* centre content on larger screens */
    max-width: var(--page-hdr-width);
    background-color: var(--title-bg);
    color: var(--title-txt);
    border: var(--title-border);
    display: flex;
    flex-wrap: wrap;
  }
  header .logo {
    height: var(--page-logo-height);
    width: var(--page-logo-width);
  }
  header h1 {
    margin: 0;
    padding: var(--page-hdr-padding);
    line-height: var(--title-height);
    font-size: calc(var(--title-height) / 2); /* Some healthy padding, could vary if really needed */
  }
  main {
    margin: auto; /* centre content on larger screens */
    max-width: var(--page-width);
    background-color: var(--page-bg);
    padding: var(--page-padding);
  }
  main header {
    background-color: var(--page-hdr-bg);
    color: var(--page-hdr-txt);
    border: var(--page-hdr-border);
  }
  main header h1 {
    margin: 0;
    line-height: var(--page-hdr-height);
    font-size: calc(var(--page-hdr-height) / 2); /* Some healthy padding, could vary if really needed */
  }
  footer {
    margin: auto; /* centre content on larger screens */
    background-color: var(--page-ftr-bg);
    color: var(--page-ftr-txt);
    max-width: var(--page-ftr-width);
    padding: var(--page-ftr-padding);
    border: var(--page-ftr-border);
  }
</style>
