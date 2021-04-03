<script lang="typescript">
    import { onMount } from 'svelte';
    import HelpText from '$lib/HelpText.svelte';

    export let id;
    export let label;
    export let refdata;
    export let help;
    export let placeholder;
    export let required = false;
    export let errorMessage = '';
    let fallbackError;
    let valid = true;
    let values = [];
    
    onMount(async () => {
        const res = await fetch ('/api/refdata/' + refdata);
        values = await res.json();
    });

    function validate(event) {
        let input = event.target;
        if (input.validity.valid) {
            valid = true;
            fallbackError = '';
        }
        else {
            valid = false;
            fallbackError = input.validationMessage;
            // could potentially stop and refocus here, but visible should be enough
        }
    }
    function selectValue(event) {
        // TODO: add to risk store
    }

    let active;
    function enter() {
        active = "active";
    }
    function leave() {
        active = "";
    }
</script>


<div class="question {active} {valid?'':'invalid'}" on:mouseenter={enter} on:mouseleave={leave} >
    <slot name="pre"></slot>
    {#if label}
        <label for="{id}">{label}</label>
    {/if}
    {#if id}
        {#if required}
            <span class="required">*</span>
        {/if}
        <select
            id="{id}" 
            name="{id}" 
            data-reference="{refdata}"
            required="{required}"
            on:blur={selectValue}
            >
            <option value="">{placeholder ? placeholder : '-- select --'}</option>
            {#each values as val}
                <option value="{val.key}" on:click={selectValue}>{val.value}</option>
            {/each}
        </select>
        
    {/if}
    {#if help}
        <HelpText>{help}</HelpText>
    {/if}
    {#if !valid}
        <span class="error">{errorMessage ?? fallbackError}</span>
    {/if}
    <slot name="post"></slot>
</div>


<style>
    :global(.question) {
        background-color: var(--question-colour-bg,white);
        color: var(--question-colour-text, black);
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
    .required {
        color: var(--question-colour-text, black);
    }
    .invalid {
        background-color: var(--question-color-bg-error, palevioletred);
        color: var(--question-color-text-error, black);
    }
</style>