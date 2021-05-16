<script lang="ts">
	import { createEventDispatcher } from 'svelte';
    import { blur } from 'svelte/transition';
    import Helptext from '$lib/components/Helptext.svelte';
    import type { TriBoxDateComponentType } from '$lib/types/questionset';

    // expose component properties
    export let component: TriBoxDateComponentType;

    // internal properties to support component logic
    const dispatch = createEventDispatcher();
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
        let val = event.target.value;        
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
        <label for="{component.id}-day">
            {component.label}
            {#if component.required}
            <span class="required">*</span>
            {/if}            
        </label>
        {/if}

        {#if component.id} 
        <input type="{component.fields.type ?? 'Text'}"
            id="{component.id}-day" 
            name="{component.id}-day" 
            placeholder="{component.fields.dayPlaceholder ?? ''}" 
            required="{component.required}"
            value="{component.value}"
            maxlength="2"
            min="1"
            max="31"
            on:blur={act}
            on:focus={focus}/>
            {component.fields.seperator ?? ""}
          <input type="{component.fields.type ?? 'Text'}"
            id="{component.id}-month" 
            name="{component.id}-month" 
            placeholder="{component.fields.monthPlaceholder ?? ''}" 
            required="{component.required}"
            value="{component.value}"
            maxlength="2"
            min="1"
            max="12"
            on:blur={act}
            on:focus={focus}/>
            {component.fields.seperator ?? ""}
            <input type="{component.fields.type ?? 'Text'}"
            id="{component.id}-year" 
            name="{component.id}-year" 
            placeholder="{component.fields.yearPlaceholder ?? ''}" 
            required="{component.required}"
            value="{component.value}"
            maxlength="4"
            on:blur={act}
            on:focus={focus}/>
            {#if component.fields.unknownOptionLabel}
            <input type="checkbox" id="{component.id}-unknown"
              name="{component.id}-unknown"
              on:click={act}
              on:focus={focus}
              value="{component.value}" />
                {component.fields.unknownOptionLabel}
            {/if}
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