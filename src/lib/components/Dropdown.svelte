<script lang="ts">
	import { createEventDispatcher, onMount } from 'svelte';
    import Helptext from '$lib/components/Helptext.svelte';

    // load refdata on component creation
    onMount(async () => {
        if (refdata) {
            const res = await fetch ('/api/refdata/' + refdata);
            values = await res.json();
        }
    });
    
    // expose component properties
    export let id = '';
    export let value = '';
    export let label = '';
    export let help = '';
    export let placeholder = '';
    export let required = false;
    export let errorMessage = '';
    export let refdata = ''; // pass data in by refdata lookup
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
        // publish value changes up to parent too
        dispatch('valueChange', {key: id, value: event.target.value, valid: (!required || !!event.target.value)});
        invalid = (required && !event.target.value);
    }
</script>


<div class="question {active} {invalid?'invalid':''}" 
    on:mouseenter={enter} 
    on:mouseleave={leave} >

    <slot name="pre"></slot>

    <div class="container">
        {#if label}
        <label for="{id}">
            {label}
            {#if required}
                <span class="required">*</span>
            {/if}
        </label>
        {/if}
        {#if id}        
        <select
            id="{id}" 
            name="{id}" 
            value="{value}"
            data-reference="{refdata}"
            required="{required}"
            on:blur={act}
            >
            <option value="">{!placeholder ? '-- select --' : placeholder}</option>
            {#each values as val}
                <option value="{val.key}" selected={value==val.value}>{val.value}</option>
            {/each}
        </select>
        {/if}
        {#if help}
        <Helptext>{help}</Helptext>
        {/if}
    </div>

    {#if invalid}
        <span class="error">{errorMessage ?? fallbackError}</span>
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