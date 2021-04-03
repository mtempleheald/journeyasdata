<script>
    export let id;
    export let label;
    export let help;
    export let placeholder;
    export let required = false;

    let active;
    function enter() {
        active = "active";
    }
    function leave() {
        active = "";
    }
</script>


<div class="question {active}" on:mouseenter={enter} on:mouseleave={leave} >
    <slot name="pre"></slot>
    {#if label}
      <label for="{id}">{label}</label>
    {/if}
    {#if id}
    <input placeholder="{placeholder}" type="text" id="{id}" name="{id}" required="{required}"/>
    {/if}
    {#if help}
        <span class="tooltip">{help}</span>
    {/if}
    <slot name="post"></slot>
</div>


<style>
    :global(.question) {
        background-color: var(--question-colour-bg,white);
        color: var(--colour-text, black);
        border: 1px var(--border-style, dashed) var(--question-colour-text, black);
    }
    :global(.question.active, .question:focus-within) {
        background-color: var(--question-colour-bg-highlight, yellow);
        color: var(--question-colour-text-highlight, var(--question-colour-text, black));
    }
    /* The rest is not global - the component controls how it is presented, other than skins (colours, borders etc) */
    .question {
        margin: 0.5rem;
        padding: 0.5rem;
    }
</style>