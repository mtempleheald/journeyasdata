<script lang="ts">
    import type { SectionType } from '$lib/types/journey';
    import Component from '$lib/components/Component.svelte';

    export let section: SectionType;

    let hidden: boolean = false;
    
    function collapse() {
        if (section.collapsible)
        {
            hidden = !hidden;
        }
    }
</script>


<section>
    {#if section.logo || section.title}
    <header>
        {#if section.logo}
        <img src={section.logo.url} alt="{section.logo.alt} section logo" width="{section.logo.width}" height="{section.logo.height}" >
        {/if}
        {#if section.title}
        <h1>{section.title}</h1>
        {/if}
        {#if section.instanceid}
        <input type="hidden" id="instanceid" value="{section.instanceid}"/>
        {/if}
    </header>
    {/if}

    <div class="{hidden ? 'hidden' : ''}">
        {#each section.components as component}    
            <Component component={component}/>
        {/each}
    </div>
    
    <slot></slot>

</section>


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
    .hidden {
        display: none;
    }
</style>
