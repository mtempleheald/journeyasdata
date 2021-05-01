<script lang="ts">
    import Component from '$lib/components/Component.svelte';
    import type { SectionType } from '$lib/types/questionset';
import Address from './Address.svelte';

    export let section: SectionType;
</script>


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
        {#if section.id}
            {#each Array(section.maxrepeats ?? 1) as _, idx}
            <!-- 
                Prefix all component ids with the section ID and the repeat index.
                This ensures that all components have a unique id in the flattened store.
                Custom functions must be aware of this where this flat structure can be unflattened
            -->
            <Component component={{...component, id: `${section.id}.${idx}.${component.id}`}}/>
            {/each}
        {:else}
        <!-- If section id is not set just use the component id unchanged -->
        <Component component={component}/>
        {/if}
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