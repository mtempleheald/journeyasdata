<script lang='ts'>
    import type { JourneyType } from '$lib/types/journey';
    import { targetPageEarlier } from '$lib/utils/navigation';

    export let pageurl = '';
    export let journey: JourneyType;
</script>


<nav>
    <div class="progress">
    {#each journey.pages as p}
    {#if p.displayprogress ?? true}
        {#if targetPageEarlier(journey, pageurl, p.url)}
        <a href="{p.url}" class="{pageurl == p.url?'active':''}">
            {p.title}
        </a>
        {:else}
        <span class="{pageurl == p.url?'active':''}">
            {p.title}
        </span>
        {/if}
    {/if}
    {/each}
    </div>
</nav>


<style>
    nav {
        margin: auto; /* centre content on larger screens */
        max-width: var(--page-width);
    }
    .progress {
        display: flex;
        justify-content: center;
        flex-wrap: wrap;
        margin: 0;
        background-color: var(--nav-bg);
        border: var(--nav-border);
    }
    .progress > * {
        flex-grow: 1;
    }
    a, span {
        display: inline-block;
        text-decoration: none;
        padding: 1rem 1rem;
        color: var(--nav-txt);
    }
    a:hover, a.active, span.active {
        /* text-decoration: underline; */
        background-color: var(--nav-highlight-bg);
        color: var(--nav-hightlight-txt);
    }
</style>
