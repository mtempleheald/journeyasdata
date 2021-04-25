<script>
	import { createEventDispatcher } from 'svelte';
    import { blur } from 'svelte/transition';
    import { inputStore } from '$lib/stores/inputstore';
    import Helptext from '$lib/display/Helptext.svelte';

    // expose component properties
    export let id = '';
    export let value = $inputStore[id] ?? '';
    export let label;
    export let help = '';
    export let placeholder = '';
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
        // transform
        let val = (type=='Upper') ? event.target.value.toUpperCase() : event.target.value;
        console.log(event.target);
        // validate https://developer.mozilla.org/en-US/docs/Learn/Forms/Form_validation#the_constraint_validation_api
        if (event.target.validity.valid) {
            valid = true;
            fallbackError = '';            
        }
        else {
            valid = false;
            fallbackError = event.target.validationMessage;
        }
        // publish changes up to parent, let it handle state
        dispatch('valueChange', {key: id, value: val, valid: valid});
    }
    function focus(event) {
        dispatch('focus', id);
    }

</script>

<div class="question {active} {valid?'':'invalid'}" 
    transition:blur 
    on:mouseenter={enter} 
    on:mouseleave={leave} 
>
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
    .question {
        margin: 0.5rem;
        padding: 0.5rem;
        background-color: var(--input-bg, white);
        color: var(--input-txt, black);
        border: var(--input-border, 1px solid black);
    }
    .question.active {
        background-color: var(--input-active-bg, rgb(255, 255, 214));
        color: var(--input-active-txt, black);
    }
    .question.invalid {
        background-color: var(--input-error-bg, pink);
        color: var(--input-error-txt, red);
    }
    .required {
        color: var(--input-txt-required, black);
    }
    .error {
        background-color: var(--input-error-msg-bg, red);
        color: var(--input-error-msg-txt, pink);
    }
    .upper {
        text-transform: uppercase;
    }
</style>