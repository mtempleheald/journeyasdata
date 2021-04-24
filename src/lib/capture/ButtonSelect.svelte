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
    .buttonselect {
        margin: 0.5rem;
        padding: 0.5rem;
        background-color: var(--input-bg, white);
        color: var(--input-txt, black);
        border: var(--input-border, 1px solid black);
    }
    .buttonselect.active {
        background-color: var(--input-active-bg, rgb(255, 255, 214));
        color: var(--input-active-txt, black);
    }
    .buttonselect.invalid {
        background-color: var(--input-error-bg, pink);
        color: var(--input-error-txt, red);
    }
    .required {
        color: var(--question-colour-text, black);
    }
    .error {
        background-color: var(--input-error-msg-bg, red);
        color: var(--input-error-msg-txt, pink);
    }
    button.active {
        background-color: var(--input-active-bg, rgb(255, 255, 214));
        color: var(--input-active-txt, black);
    }
</style>