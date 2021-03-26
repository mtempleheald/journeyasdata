<script>
    export let id;
    export let label;
    export let help;
    export let placeholder;
    let active;
    let hovering;
    function enter() {
        hovering = true;
        active = "active";
    }
    function leave() {
        hovering = false;
        active = "";
    }
</script>


<style>
    /* CSS in Svelte https://css-tricks.com/what-i-like-about-writing-styles-with-svelte/ */
    /* We can refer to global styles here to grab variables for skinning */
    :global(.question) {
        background-color: var(--colour-background,white);
        color: var(--colour-text, black);
        border: 1px var(--border-style, dashed) var(--colour-text, black);
    }
    :global(.question.active, .question:focus-within) {
        background-color: var(--colour-highlight, yellow);
    }
    /* The rest is not global - the component controls how it is presented, other than skins (colours, borders etc) */
    .question {
        margin: 0.5rem;
        padding: 0.5rem;
    }
</style>


<div class="question {active}" on:mouseenter={enter} on:mouseleave={leave} hovering={hovering}>
    <slot name="pre"></slot>
    {#if label}
      <label for="{id}">{label}</label>
    {/if}
    {#if id}
    <input placeholder="{placeholder}" type="text" id="{id}" name="{id}"/>
    {/if}
    {#if help}
        <span class="tooltip">{help}</span>
    {/if}
    <slot name="post"></slot>
</div>
  
