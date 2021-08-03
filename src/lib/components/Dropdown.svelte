<script lang="ts">
	import { createEventDispatcher, onMount } from 'svelte';
    import Helptext from '$lib/components/Helptext.svelte';
    import type { ComponentType, ValueType } from '$lib/types/journey';

    // load refdata on component creation
    onMount(async () => {
        effectiveValues = component.values;
        if (component.refdata) {
            await fetch ('/api/refdata/' + component.refdata)
            .then(resp => resp.json())
            .then(data => effectiveValues = data);
        }
    });
    

    // expose component properties
    export let component: ComponentType;

    // internal properties to support component logic
    const dispatch = createEventDispatcher();
    let fallbackError;
    let invalid = false;
    let active;
    let effectiveValues: ValueType[]; // overwriting component.values directly triggers an onMount loop
    
    
    // component actions    
    function enter() {
        active = "active";
    }
    function leave() {
        active = "";
    }    
    function act(event) {
        // publish value changes up to parent too
        dispatch('valueChange', {key: component.id, value: event.target.value, valid: (!component.required || !!event.target.value)});
        invalid = (component.required && !event.target.value);
    }
</script>


<div class="question {active} {invalid?'invalid':''}" 
    on:mouseenter={enter} 
    on:mouseleave={leave} >

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
        <select
            id="{component.id}" 
            name="{component.id}" 
            value="{component.value}"
            data-reference="{component.refdata}"
            required="{component.required}"
            on:blur={act}
            >
            <option value="">{!component.placeholder ? '-- select --' : component.placeholder}</option>

            {#if effectiveValues}
            {#each effectiveValues as val}
                <option value="{val.value}" selected={component.value==val.value}>{val.display}</option>
            {/each}
            {/if}
        </select>
        {/if}
        {#if component.help}
        <Helptext>{component.help}</Helptext>
        {/if}
    </div>

    {#if invalid}
    <span class="error">{component.errorMessage ?? fallbackError}</span>
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
        color: var(--question-colour-text, black);
    }
    .container {
        width: 100%;
    }
    label {
        display: inline-block;
        padding: 0.5rem;
        width: max(250px, 40%);
    }
    select {
        margin: 0.5rem;
    }
    .error {
        padding: 0.5rem;
        background-color: var(--input-error-msg-bg, red);
        color: var(--input-error-msg-txt, pink);
    }
</style>