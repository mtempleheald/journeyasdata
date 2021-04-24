<script lang="typescript">
	import { createEventDispatcher } from 'svelte';
    import { inputStore } from '$lib/stores/inputstore';
    import Helptext from '$lib/display/Helptext.svelte';

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
        // update store to reflect current state
        inputStore.input(id, value);
        // publish value changes up to parent too
        dispatch('valueChange', {key: id, value: value, valid: (!required || !!value) });   
    }
</script>


<div class="buttonselect {active} {required && value == null ? 'invalid' : ''}" on:mouseenter={enter} on:mouseleave={leave} >
    <slot name="pre"></slot>
    {#if label}
        <label for="{id}">{label}</label>
    {/if}
    {#if required}
        <span class="required">*</span>
    {/if}
    {#if id}
        <input type="hidden" 
            id="{id}"
            bind:value={value}
            required="{required}"
        />
        <input type="hidden" id="{id}_store" value="{$inputStore[id]}"/>
        {#each values as v}
            <button type="button" value="{v.value}" on:click="{() => updateValue(v.value)}" class="{value == v.value ? 'active' : ''}">
                {v.image != null ? '' : v.display ?? ''}
                {#if v.image != null}
                    <img src="{v.image}" width="{v.imageWidth}" height="{v.imageHeight}" class="{value == v.value ? 'active' : ''}" alt="{v.display}" />
                {/if}
            </button>
        {/each}
    {/if}
    {#if help}
        <Helptext>{help}</Helptext>
    {/if}
    {#if required && value == null}
        <span class="error">{errorMessage}</span>
    {/if}
    <slot name="post"></slot>
</div>


<style>
    :global(.buttonselect) {
        background-color: var(--question-colour-bg,white);
        color: var(--question-colour-text, black);
        border: 1px var(--border-style, dashed) var(--question-colour-text, black);
    }
    :global(.buttonselect.active, .buttonselect:focus-within) {
        background-color: var(--question-colour-bg-highlight, yellow);
        color: var(--question-colour-text-highlight, var(--question-colour-text, black));
    }
    /* The rest is not global - the component controls how it is presented, other than skins (colours, borders etc) */
    .buttonselect {
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
    button.active {
        background-color: var(--question-color-bg-highlight, yellow);
        color: var(--question-color-text-highlight, black);
    }
</style>