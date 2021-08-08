<script lang="ts">
    import type { ComponentType } from '$lib/types/journey';
    import { blur } from 'svelte/transition';
	import { createEventDispatcher } from 'svelte';
    import Helptext from '$lib/components/Helptext.svelte';

    // expose component properties
    export let type = 'text';
    export let component: ComponentType;


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
        // validate
        if (event.target.validity.valid) {
            valid = true;
            fallbackError = '';            
        }
        else {
            valid = false;
            fallbackError = event.target.validationMessage;
        }
        // publish changes up to parent, let it handle state
        dispatch('valueChange', {key: component.id, value: val, valid: valid});
    }
    function focus(event) {
        dispatch('focus', component.id);
    }

</script>

<div class="question {active} {valid?'':'invalid'}" 
    transition:blur 
    on:mouseenter={enter} 
    on:mouseleave={leave} 
>
    <slot name="pre"></slot>

    <div class="container">
        {#if component.label}
        <label for="{component.id}">
            {component.label}
            {#if component.required}
            <span class="required">*</span>
            {/if}            
        </label>
        {/if}

        {#if component.id}        
        <input type="{html5type}"
            class="{type=='Upper'?'upper':''}"
            id="{component.id}" 
            name="{component.id}" 
            placeholder="{component.placeholder}" 
            required="{component.required}"
            value="{component.value}"
            on:blur={act}
            on:focus={focus}/>
        {/if}
        {#if component.help}
            <Helptext>{component.help}</Helptext>
        {/if}
    </div>

    {#if !valid}
    <div class="error">{component.errorMessage ?? fallbackError}</div>
    {/if}

    <slot name="post"></slot>
</div>
    

<style>
    .question {
        margin: 0.5rem 1rem;
        padding: 0.5rem 1rem;
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
    .upper {
        text-transform: uppercase;
    }
    .container {
        width: 100%;
    }
    label {
        display: inline-block;
        padding: 0.5rem;
        width: max(250px, 40%);
    }
    input {
        margin: 0.5rem;
    }
    .error {
        padding: 0.5rem;
        background-color: var(--input-error-msg-bg, red);
        color: var(--input-error-msg-txt, pink);
    }
</style>
