<script lang="typescript">
    import Helptext from '$lib/display/Helptext.svelte';
	import { createEventDispatcher } from 'svelte';

    export let id;
    export let value = '';
    export let label;
    export let help;
    export let required = false;
    export let errorMessage = 'Please select an option';
    export let datalist : any[] = [];

    function act(event) {
        if (value == event.target.value) {
            // toggle off
           value = null; 
        }
        else {
            // toggle on
            value = event.target.value;
        }
        dispatch('valueChange', {key: "" + id + "", value: "" + value + ""});
    }

    let active;
    function enter() {
        active = "active";
    }
    function leave() {
        active = "";
    }
    
    // publish any value changes up to parent (pages component)
    const dispatch = createEventDispatcher();
</script>


<div class="buttonselect {active} {required && value != null ? 'invalid' : ''}" on:mouseenter={enter} on:mouseleave={leave} >
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
        {#each datalist as d}
        <button type="button" value="{d.value}" on:click="{act}" class="{value == d.value ? 'active' : ''}">{d.display}</button>
        {/each}
    {/if}
    {#if help}
        <Helptext>{help}</Helptext>
    {/if}
    {#if required && value != null}
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