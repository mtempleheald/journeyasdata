<script lang="ts">
    import type { DisplaySelectionsType } from '$lib/types/journey';
    export let component: DisplaySelectionsType;

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
    <p><slot name="main"></slot></p>
    <div class="container">
        <div class="selected">
            <h4>{component.selectedtitle}</h4>
            <ul>
            {#each component.items.filter(item=> item.selected) as i}
                <li>
                    <span>{i.title}</span>
                    {#if i.detail}
                        <span>{i.detail}</span>
                    {/if}
                </li>
            {/each}
            </ul>
        </div>
        <div class="unselected">
            <h4>{component.unselectedtitle}</h4>
            <ul>
            {#each component.items.filter(item=> item.selected == false) as i}
            <li>
                <span>{i.title}</span>
                {#if i.detail}
                    <span>{i.detail}</span>
                {/if}
            </li>
            {/each}
            </ul>
        </div>
    </div>
    <p><slot name="post"></slot></p>
</div>

<style>
    .display {
        margin: 0;
        padding: 0.5rem 1rem;
        background-color: var(--input-bg, white);
        color: var(--input-txt, black);
        border: var(--input-border, 1px solid black);
    }
    .display.active {
        background-color: var(--input-active-bg, rgb(255, 255, 214));
        color: var(--input-active-txt, black);
    }
    .display.invalid {
        background-color: var(--input-error-bg, pink);
        color: var(--input-error-txt, red);
    }
    .container {
        display: flex;
        flex-flow: wrap;
    }
    .container > * {
        flex-shrink: 1;
        flex-grow: 1;
        flex-basis: calc(var(--page-width)/4);
    }
    ul {
        list-style-type: none;
        padding: 0;
    }
    .selected ul li::before {
        content: "\2713";
        padding-right: 0.5rem;
    }
    .unselected ul li::before {
        content: "\2717";
        padding-right: 0.5rem;
    }

</style>
