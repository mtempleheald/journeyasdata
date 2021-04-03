<script>
    import { questionSet } from '$lib/stores';
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
        background-color: gainsboro;
        float:left;
        width: 100%;
    }
    ul {
        text-align: center;
    }
    li {
        display: inline;
    }
    a {
        text-decoration: none;
        padding: 1rem 2rem;
        background-color: gray;
    }
    a:hover {
        text-decoration: underline;
        background-color: goldenrod;
    }
</style>