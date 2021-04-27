<script lang="typescript">
	import { createEventDispatcher } from 'svelte';
    import { inputStore } from '$lib/stores/inputstore';
    import Helptext from '$lib/components/Helptext.svelte';

    // expose component properties
    export let id;
    export let value = $inputStore[id] ?? '';
    export let label;
    export let help = '';
    export let required = false;
    export let errorMessage = 'Please select an option';
    export let values : any[] = [];

    // internal properties to support component logic
    const dispatch = createEventDispatcher();
    let active;

    // component actions
    function enter() {
        active = "active";
    }
    function leave() {
        active = "";
    } 
    function updateValue(newValue) {
        if (value == newValue) {
            value = null; // toggle off
        }
        else {
            value = newValue;            
        }
        // publish value changes up to parent, let it handle state
        dispatch('valueChange', {key: id, value: value, valid: (!required || !!value) });   
    }
</script>


<div class="question {active} {required && value == null ? 'invalid' : ''}" 
    on:mouseenter={enter} 
    on:mouseleave={leave} >

    <slot name="pre"></slot>


    <input type="hidden" 
        id="{id}"
        bind:value={value}
        required="{required}"
    />
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
        <span class="buttons">
        {#each values as v}
            <button type="button" value="{v.value}" on:click="{() => updateValue(v.value)}" class="{value == v.value ? 'active' : ''}">
                {v.image != null ? '' : v.display ?? ''}
                {#if v.image != null}
                    <img src="{v.image}" width="{v.imageWidth}" height="{v.imageHeight}" class="{value == v.value ? 'active' : ''}" alt="{v.display}" />
                {/if}
            </button>
        {/each}        
        </span>
        {/if}     
        
        {#if help}
        <Helptext>{help}</Helptext>
        {/if}
    </div>

    {#if required && value == null}
    <div class="error">{errorMessage}</div>
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
    button.active {
        background-color: var(--input-active-bg, rgb(255, 255, 214));
        color: var(--input-active-txt, black);
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
    .buttons {
        display: inline-flex;
        flex-wrap: wrap;
        width: max(250px, 50%);/* TODO: calc to ensure a square grid with as few rows as possible in the space */
    }
    .buttons > * {
        flex-basis: 1;/* give all buttons equal space */
    }
</style>