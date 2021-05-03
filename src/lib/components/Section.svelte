<script lang="ts">
    import Component from '$lib/components/Component.svelte';
    import type { SectionType } from '$lib/types/questionset';
import Address from './Address.svelte';

    export let section: SectionType;
</script>


{#if section.id}
<!-- 
    Prefix all component ids with the section ID and the repeat index.
    This ensures that all components have a unique id in the flattened store.
    Custom functions must be aware of this where this flat structure can be unflattened
-->
    {#each Array(section.maxrepeats ?? 1) as _, idx}
    <section>
        <header>
            {#if section.logo}
            <img src={section.logo} alt="{section.title} section logo">
            {/if}
            {#if section.title}
            <h3>{section.title}[{idx}]</h3>
            {/if}
        </header>        
        {#each section.components as component}   
        <Component component={{...component, id: `${section.id}.${idx}.${component.id}`}}/>            
        {/each}        
    </section>
    {/each}
{:else}
<!-- Standard undefined section with no repeats, use component as defined in questionset -->
<section>
    <header>
        {#if section.logo}
        <img src={section.logo} alt="{section.title} section logo">
        {/if}
        {#if section.title}
        <h3>{section.title}</h3>
        {/if}
    </header>    
    {#each section.components as component}    
    <Component component={component}/>
    {/each}    
</section>
{/if}


<style>
    section {
        border: var(--section-border,1px solid black);
    }
    header {
        display: flex;
        flex-wrap: wrap;
    }
    h3 {
        height: 50px;
        line-height: 50px;
        margin: 0;
        padding: 0 1rem;
    }
</style>