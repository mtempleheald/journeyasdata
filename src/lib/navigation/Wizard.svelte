<script>
    import { questionSet } from '$lib/stores/questionset';
</script>
    

<nav>
    <ul>
    {#each $questionSet.pages as p}
        <li><a href="{p.page.url}">{p.page.title}</a></li>
    {/each}
    </ul>
</nav>


<style>
    nav {
        width: 100%;
    }
    ul {
        text-align: center;
        background-color: gainsboro;
        padding: 1rem 0;
        margin: 0;
    }
    li {
        display: inline;
    }
    a {
        text-decoration: none;
        padding: 1rem 2rem;
        background-color: gainsboro;
    }
    a:hover {
        text-decoration: underline;
        background-color: goldenrod;
    }
</style>