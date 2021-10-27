<script lang="ts">
    import type { DisplayComponentType } from '$lib/types/journey'

    export let component: DisplayComponentType

    let active;
    function enter() {
        active = "active";
    }
    function leave() {
        active = "";
    }
</script>


<div class="display {active}" on:mouseenter={enter} on:mouseleave={leave} >
    <p><slot name="pre"></slot></p>
    {#if component.content}
        <div class="content">
            {#if Array.isArray(component.content)}
                {#each component.content as content}
                <p>{@html content}</p>
                {/each}
            {:else}
                <p>{@html component.content}</p>
            {/if}
        </div>
    {/if}
    <p><slot name="main"></slot></p>
    <p><slot name="post"></slot></p>
</div>
  

<style>
    .display {
        margin: 0;
        padding: var(--display-padding, 0);
        background-color: var(--display-bg);
        color: var(--display-txt, black);
        border: var(--display-border, 1px solid black);
    }
    .display.active {
        background-color: var(--display-active-bg);
        color: var(--display-active-txt);
    }
    .content {
        display: flex;
        flex-flow: wrap;
    }
    p {
        flex: auto;
    }
</style>
