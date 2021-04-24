<script>
    import { questionSet } from '$lib/stores/questionset';

    export let pageurl = '';
</script>
    

<nav>
    {#each $questionSet.pages as p}
        <a href="{p.page.url}" class="{pageurl == p.page.url?'active':''}">
            {p.page.title}
        </a>
    {/each}
</nav>


<style>
    nav {
        display: flex;
        justify-content: center;
        flex-wrap: wrap;
        margin: 0;
        background-color: var(--nav-bg, white);
        border: var(--nav-border, white);
    }
    nav > * {
        flex-grow: 1;        
    }
    a {
        display: inline-block;
        text-decoration: none;
        padding: 1rem 0rem;
        color: var(--nav-txt, black);
    }
    a:hover, a.active {
        /* text-decoration: underline; */
        background-color: var(--nav-highlight-bg, inherit);
        color: var(--nav-hightlight-txt, inherit);
    }
</style>