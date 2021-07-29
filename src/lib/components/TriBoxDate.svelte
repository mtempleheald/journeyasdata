<script lang="ts">
	import { createEventDispatcher } from 'svelte';
    import { blur } from 'svelte/transition';
    import Helptext from '$lib/components/Helptext.svelte';
    import type { TriBoxDateComponentType } from '$lib/types/journey';

    // expose component properties
    export let component: TriBoxDateComponentType;

    // internal properties to support component logic
    const dispatch = createEventDispatcher();
    let fallbackError
    let valid = true
    let active
    let year : string = component.value?.substring(1, 4) ?? ''
    let month : string = component.value?.substring(6, 8) ?? ''
    let day : string = component.value?.substring(10, 11) ?? ''

    // component actions
    function enter() {
        active = "active";
    }
    function leave() {
        active = "";
    }
    function act(event) {
        if (event.target.id == `${component.id}-day`) {
            day = event.target.value            
        }
        else if (event.target.id == `${component.id}-month`) {
            month = event.target.value
        }
        else if (event.target.id == `${component.id}-year`) {
            year = event.target.value
        }
        else if (event.target.id == `${component.id}-unknown`) {
            year = ''
            month = ''
            day = ''
        }
        
        component.value = `${year}-${month.padStart(2, '0')}-${day.padStart(2, '0')}`
        console.log (component.value)
        // validate date format YYYY-MM-DD
        if (Date.parse(component.value) > 0) {
            valid = true;            
        }
        else {
            valid = false;
        }
        // publish changes up to parent, let it handle state
        dispatch('dateChange', {key: component.id, value: component.value, valid: valid});
    }
    function focus(event) {
        dispatch('focus', event.target.id);
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
        <input type="hidden" 
            id="{component.id}"
            bind:value={component.value}
            required="{component.required}"
        />

        <input type="{component.fields.type ?? 'Text'}"
            id="{component.id}-day" 
            name="{component.id}-day" 
            placeholder="{component.fields.dayPlaceholder ?? ''}" 
            required="{component.required}"
            value="{day}"
            maxlength="2"
            min="1"
            max="31"
            on:blur={act}
            on:focus={focus}
        />
        {component.fields.separator ?? ""}
        <input type="{component.fields.type ?? 'Text'}"
            id="{component.id}-month" 
            name="{component.id}-month" 
            placeholder="{component.fields.monthPlaceholder ?? ''}" 
            required="{component.required}"
            value="{month}"
            maxlength="2"
            min="1"
            max="12"
            on:blur={act}
            on:focus={focus}
        />
        {component.fields.separator ?? ""}
        <input type="{component.fields.type ?? 'Text'}"
            id="{component.id}-year" 
            name="{component.id}-year" 
            placeholder="{component.fields.yearPlaceholder ?? ''}" 
            required="{component.required}"
            value="{year}"
            maxlength="4"
            on:blur={act}
            on:focus={focus}
        />
            
        {/if}
        {#if component.help}
            <Helptext>{component.help}</Helptext>
        {/if}
        {#if component.fields.unknownOptionLabel}
        <br/>
        <input type="checkbox" 
            id="{component.id}-unknown"
            name="{component.id}-unknown"
            on:click={act}
            on:focus={focus}
            value="{component.value}" 
        />
        {component.fields.unknownOptionLabel}
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
        width: 30px;
    }
    .error {
        padding: 0.5rem;
        background-color: var(--input-error-msg-bg, red);
        color: var(--input-error-msg-txt, pink);
    }
</style>