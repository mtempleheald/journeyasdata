<script lang="ts">
    import type { SectionType } from '$lib/types/journey';
    import Component from '$lib/components/Component.svelte';

    export let section: SectionType;
    let currentSection: number = 0;
</script>


{#if section.id}
<!-- 
    Prefix all component ids with the section ID and the repeat index.
    This ensures that all components have a unique id in the flattened store.
    Custom functions must be aware of this where this flat structure can be unflattened
-->
    {#key currentSection}
    {#each Array(section.maxrepeats ?? 1) as _,idx}
    {#if idx == currentSection}
        <section>
            <header>
                {#if section.logo}
                <img src={section.logo.url} alt="{section.logo.alt} section logo" width="{section.logo.width}" height="{section.logo.height}" >
                {/if}
                {#if section.title}
                <h3>{section.title}[{idx}]</h3>
                {/if}
            </header>        
            {#each section.components as component}   
            <Component component={{...component, id: `${section.id}.${idx}.${component.id}`}}/>            
            {/each}        
        </section>
    {:else}
        <section>
            <button type="button" on:click={() => currentSection = idx}>Edit section</button>
        </section>
    {/if}
    {/each}
    {/key}
{:else}
<!-- Standard undefined section with no repeats, use component as defined in journey -->
<section>
    {#if section.logo || section.title}
    <header>
        {#if section.logo}
        <img src={section.logo.url} alt="{section.logo.alt} section logo" width="{section.logo.width}" height="{section.logo.height}" >
        {/if}
        {#if section.title}
        <h1>{section.title}</h1>
        {/if}
    </header>
    {/if}

    {#each section.components as component}    
    <Component component={component}/>
    {/each}

</section>
{/if}


<style>
    section {
        margin-top: var(--section-margin);
        border: var(--section-border);
    }
    header {
        display: flex;
        flex-wrap: wrap;
        color: var(--section-txt);
        background-color: var(--section-bg);
        border-bottom: var(--section-hdr-border);
    }
    header img {
        height: var(--section-logo-height);
    }
    header h1 {
        height: var(--section-hdr-height);
        line-height: var(--section-hdr-height);
        margin: 0;
        padding: 0 1rem;
    }
</style>
