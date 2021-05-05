<script lang="ts">
    //let authenticated: boolean = true;
    function authenticated() {
        return true; // TODO grab token from cookie or replace this whole thing with https://kit.svelte.dev/docs#hooks
    }
</script>

<h1>Administration</h1>

{#if authenticated}
    <slot></slot>
{/if}