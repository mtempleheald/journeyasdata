<script lang="typescript">
	import { createEventDispatcher, onMount } from 'svelte';    
    import { inputStore } from '$lib/stores/inputstore';
    import Helptext from '$lib/display/Helptext.svelte';

    // load refdata on component creation
    onMount(async () => {
        const res = await fetch ('/api/refdata/' + refdata);
        values = await res.json();
    });

    
    // expose component properties
    export let id;
    export let value = '';
    export let label;
    export let help;
    export let placeholder;
    export let required = false;
    export let errorMessage = '';
    export let refdata; // pass data in by refdata lookup
    export let values : any[] = []; // pass data in directly, overwritten by refdata

    // internal properties to support component logic
    const dispatch = createEventDispatcher();
    let fallbackError;
    let invalid = false;
    let active;
    
    // component actions
    function enter() {
        active = "active";
    }
    function leave() {
        active = "";
    }
    function act(event) {
        // regardless of any validation the store must reflect current state of user input
        inputStore.input(event.target.id, event.target.value);
        // publish value changes up to parent too
        dispatch('valueChange', {key: "" + id + "", value: "" + event.target.value + ""});
        invalid = (required && !event.target.value);
    }
</script>


<div class="question {active} {invalid?'invalid':''}" on:mouseenter={enter} on:mouseleave={leave} >
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
            on:blur={act}
            >
            <option value="">{placeholder ? placeholder : '-- select --'}</option>
            {#each values as val}
                <option value="{val.key}">{val.value}</option>
            {/each}
        </select>
        <input type="hidden" id="{id}_store" value="{$inputStore[id]}"/>
    {/if}
    {#if help}
        <Helptext>{help}</Helptext>
    {/if}
    {#if invalid}
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