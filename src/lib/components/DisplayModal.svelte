<script lang="ts">
    import type { DisplayComponentType } from '$lib/types/journey'

    export let component: DisplayComponentType

    let dismissed;
    let active;
    function enter() {
        active = "active";
    }
    function leave() {
        active = "";
    }
    function dismiss() {
        dismissed = "dismissed"
    }
</script>

<div class="modal-overlay {dismissed}">
    <div class="display {active}" on:mouseenter={enter} on:mouseleave={leave} >
        <p><slot name="pre"></slot></p>
        <div class="content">
            {#if Array.isArray(component.content)}
                {#each component.content as content}
                <p>{@html content}</p>
                {/each}
            {:else}
                <p>{@html component.content}</p>
            {/if}
        </div>
        <p><slot name="main"></slot></p>
        <p><slot name="post"></slot></p>
        <button type="button" on:click={dismiss}>dismiss</button>
    </div>    
</div>

<style>
    .display {
        position: fixed;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        width: min(calc(var(--page-width)*2/3), 100vw);/* fill smaller screens, 2/3 of desktop preferred size */
        margin: 0;
        padding: var(--display-padding, 0);
        background-color: var(--display-bg);
        color: var(--display-txt, black);
        border: var(--display-border, 1px solid black);
    }
    /* .display.active {
        background-color: var(--display-active-bg);
        color: var(--display-active-txt);
    } */

    .modal-overlay {
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        z-index: 100;
        background-color: rgba(0,0,0,0.5);/* opacity screws things up, should we always use RGBA?  Need consistency in theme */
    }
    .dismissed {
        display: none;
    }
    .content {
        display: flex;
        flex-flow: wrap;
    }
    p {
        flex: auto;
    }
</style>
