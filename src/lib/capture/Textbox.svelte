<script>
    import Helptext from '$lib/display/Helptext.svelte';
	import { createEventDispatcher } from 'svelte';
    import { getContext } from 'svelte'

    export let id;
    export let value = '';
    export let label;
    export let help;
    export let placeholder;
    export let required = false;
    export let errorMessage = '';
    export let type = 'text';
    let html5type;
    switch (type) {
        case 'Colour' : html5type = 'color'; break;
        case 'Datetime' : html5type = 'datetime-local'; break;
        case 'Slider' : html5type = 'range'; break;
        case 'Telephone' : html5type = 'tel'; break;
        default: html5type = type.toLowerCase();
    }

    let fallbackError;
    let valid = true;

    function act(event) {
        // https://developer.mozilla.org/en-US/docs/Learn/Forms/Form_validation#the_constraint_validation_api
        let input = event.target;
        if (input.validity.valid) {
            valid = true;
            fallbackError = '';
            dispatch('valueChange', {key: "" + id + "", value: "" + input.value + ""});
        }
        else {
            valid = false;
            fallbackError = input.validationMessage;
            // could potentially stop and refocus here, but visible should be enough
            dispatch('valueChange', {key: "" + id + "", value: ""});
        }
    }

    let active;
    function enter() {
        active = "active";
    }
    function leave() {
        active = "";
    }
    
    // publish any value changes up to parent (pages component)
    const dispatch = createEventDispatcher();
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
        <input type="{html5type}"
            id="{id}" 
            name="{id}" 
            placeholder="{placeholder}" 
            required="{required}"
            value="{value}"
            on:blur={act}/>
        
    {/if}
    {#if help}
        <Helptext>{help}</Helptext>
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