<script lang="ts">
    import Component from '$lib/components/Component.svelte';
    import type { SectionType } from '$lib/types/questionset';

    export let section: SectionType;
</script>


<section>
    <header>
        <img src={section.logo} alt="{section.title} section logo">
        <h3>{section.title}</h3>
    </header>
    {#each section.components as component}
  <Component component={component}/>
{/each}
</section>



<style>
    section {
        border: var(--section-border,1px solid black);
    }
    header {
        display: flex;
        flex-direction: row;
    }
    h3 {
        height: 50px;
        line-height: 50px;
        width: calc(100vw - 100px);
        margin: 0;
        padding: 0 1rem;
    }
</style>