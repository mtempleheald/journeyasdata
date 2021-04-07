<script>
    import Helptext from '$lib/display/Helptext.svelte';
	import { createEventDispatcher } from 'svelte';

    export let id;
    export let value = '';
    export let label;
    export let help;
    export let required = false;
    export let errorMessage = 'Please select an option';

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


<div class="yesno {active} {required && value != null ? 'invalid' : ''}" on:mouseenter={enter} on:mouseleave={leave} >
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
        <button type="button" value="Y" on:click="{act}" class="{value == 'Y' ? 'active' : ''}">Yes</button>
        <button type="button" value="N" on:click="{act}" class="{value == 'N' ? 'active' : ''}">No</button>
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
    :global(.yesno) {
        background-color: var(--question-colour-bg,white);
        color: var(--question-colour-text, black);
        border: 1px var(--border-style, dashed) var(--question-colour-text, black);
    }
    :global(.yesno.active, .yesno:focus-within) {
        background-color: var(--question-colour-bg-highlight, yellow);
        color: var(--question-colour-text-highlight, var(--question-colour-text, black));
    }
    /* The rest is not global - the component controls how it is presented, other than skins (colours, borders etc) */
    .yesno {
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