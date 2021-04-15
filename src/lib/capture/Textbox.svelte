<script>
	import { createEventDispatcher } from 'svelte';
    import { blur } from 'svelte/transition';
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
    const dispatch = createEventDispatcher();
    let html5type;
    switch (type) {
        case 'Colour' : html5type = 'color'; break;
        case 'Datetime' : html5type = 'datetime-local'; break;
        case 'Slider' : html5type = 'range'; break;
        case 'Telephone' : html5type = 'tel'; break;
        case 'Upper' : html5type = 'text'; break;
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
        let val = (type=='Upper') ? event.target.value.toUpperCase() : event.target.value;
        // the store must reflect current state of user input
        inputStore.input(event.target.id, val);
        // also publish value changes up to parent
        dispatch('valueChange', {key: "" + id + "", value: "" + val+ ""});
        // validate https://developer.mozilla.org/en-US/docs/Learn/Forms/Form_validation#the_constraint_validation_api
        if (event.target.validity.valid) {
            valid = true;
            fallbackError = '';            
        }
        else {
            valid = false;
            fallbackError = event.target.validationMessage;
        }
    }
    function focus(event) {
        dispatch('focus', id);
    }

</script>

<div transition:blur class="question {active} {valid?'':'invalid'}" on:mouseenter={enter} on:mouseleave={leave} >
    <slot name="pre"></slot>
    {#if label}
        <label for="{id}">{label}</label>
    {/if}
    {#if id}
        {#if required}
            <span class="required">*</span>
        {/if}
        <input type="{html5type}"
            class="{type=='Upper'?'upper':''}"
            id="{id}" 
            name="{id}" 
            placeholder="{placeholder}" 
            required="{required}"
            value="{value}"
            on:blur={act}
            on:focus={focus}/>
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
    .upper {
        text-transform: uppercase;
    }
</style>