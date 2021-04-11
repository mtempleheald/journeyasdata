<script>
    // publish value changes up to parent
	import { createEventDispatcher } from 'svelte';
    const dispatch = createEventDispatcher();

    import { inputStore } from '$lib/stores/inputstore';
    import Helptext from '$lib/display/Helptext.svelte';

    // expose component properties
    export let id;
    export let value = '';
    export let label;
    export let help;
    export let placeholder;
    export let required = false;
    export let errorMessage = '';
    export let type = 'text';

    // internal properties to support component logic
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
        <input type="hidden" id="{id}_store" value="{$inputStore[id]}"/>
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