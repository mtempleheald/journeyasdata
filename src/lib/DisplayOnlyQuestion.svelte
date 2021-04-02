<script>
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
    :global(.question) {
        background-color: var(--question-colour-bg,white);
        color: var(--question-colour-text, black);
        border: 1px var(--border-style, dashed) var(--question-colour-text, black);
    }
    :global(.question.active, .question:focus-within) {
        background-color: var(--question-colour-bg-highlight, lightyellow);
        color: var(--question-colour-text-highlight, var(--question-colour-text, black));
    }
    /* The rest is not global - the component controls how it is presented, other than skins (colours, borders etc) */
    .question {
        margin: 0.5rem;
        padding: 0.5rem;
    }
</style>


<div class="question {active}" on:mouseenter={enter} on:mouseleave={leave} hovering={hovering}>
    <slot name="pre"></slot>
    <slot name="main"></slot>
    <slot name="post"></slot>
</div>
  
