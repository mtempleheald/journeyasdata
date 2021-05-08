<script lang="ts">
    let authenticated: boolean = true;
    
</script>


<header>
    <h1>Questionset Administration</h1>
</header>

{#if authenticated}
    <slot></slot>
{/if}


<style>
    :global(body) {
        margin: 0;
    }
    header {
        width: 100%;
        background-color: grey;
        margin: 0;
        padding: 0;
        display: flex;
    }
    header > * {
        flex-grow: 1;
    }
    h1 {
        margin: 0;
        padding: 1rem;
    }
</style>