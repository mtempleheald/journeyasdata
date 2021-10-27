<script lang="ts">
    import type { ListComponentType } from '$lib/types/journey';
	import { createEventDispatcher } from 'svelte';
    import Helptext from '$lib/components/Helptext.svelte';

    // expose component properties
    export let component: ListComponentType;    

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
    function updateValue(newValue, newDisplay) {
        if (component.value == newValue) {
            component.value = null; // toggle off
        }
        else {
            component.value = newValue;            
        }
        // publish value changes up to parent, let it handle state
        dispatch('valueChange', {
            key: component.id, 
            value: component.value, 
            display: component.value ? newDisplay : "",
            valid: (!component.required || !!component.value) 
        });   
    }
</script>


<div class="component {active} {component.required && component.value == null ? 'invalid' : ''}" 
    on:mouseenter={enter} 
    on:mouseleave={leave} >

    <slot name="pre"></slot>


    <input type="hidden" 
        id="{component.id}"
        bind:value={component.value}
        required="{component.required}"
    />
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
            <span class="buttons">
                {#each component.values as v}
                    <button type="button" value="{v.value}" 
                        on:click="{() => updateValue(v.value, v.display)}" 
                        class="{component.value == v.value ? 'active' : ''}">
                        
                        {#if v.textLocation == "top" && v.display != null}
                            <div class="top">{v.display}</div>
                        {/if}

                        <div class="image-container">
                            {#if v.textLocation == "left" && v.display != null}
                                <span class="left">{v.display}</span>
                            {/if}
                            
                            <span class="{v.textLocation == "right" ? 'left' : v.textLocation == "left" ? 'right' : '' };">
                                {v.image != null ? '' : v.display ?? ''}
                                {#if v.image != null}
                                    <img src="{v.image.url}" 
                                        width="{v.image.width}" 
                                        height="{v.image.height}" 
                                        class="{component.value == v.value ? 'active' : ''}" 
                                        alt="{v.display}" />
                                {/if}
                            </span>

                            {#if v.textLocation == "right" && v.display != null}
                                <div class="right">{v.display}</div>
                            {/if}
                        </div>

                        {#if v.textLocation == "bottom" && v.display != null}
                            <div class="bottom">{v.display}</div>
                        {/if}
                    </button>
                {/each}
            </span>
        {/if}     
        
        {#if component.help}
        <Helptext>{component.help}</Helptext>
        {/if}
    </div>

    {#if component.required && component.value == null}
    <div class="error">{component.errorMessage}</div>
    {/if}

    <slot name="post"></slot>
</div>


<style>
    .component {
        margin: 0;
        padding: var(--component-padding, 0);
        background-color: var(--component-bg);
        color: var(--component-txt, black);
        border: var(--component-border, 1px solid black);
    }
    .component.active {
        background-color: var(--component-active-bg);
        color: var(--component-active-txt);
    }
    .component.invalid {
        background-color: var(--component-error-bg);
        color: var(--component-error-txt);
    }

    label {
        padding: var(--input-padding);
        color: var(--input-txt);
        background-color: var(--input-bg);
        display: inline-block;        
        width: max(250px, 40%);
    }
    .component.active label {
        color: var(--input-active-txt);
        background-color: var(--input-active-bg);
    }
    .component.invalid label {
        color: var(--input-error-txt);
        background-color: var(--input-error-bg);
    }

    .required {
        color: var(--input-txt);
    }

    .error {
        background-color: var(--input-error-msg-bg);
        color: var(--input-error-msg-txt);
    }

    button {
        background-color: var(--input-btn-bg);
        color: var(--input-btn-txt);
        border: var(--input-btn-border, 1px solid black);
        padding: var(--input-btn-padding);
    }
    button:hover {
        color: var(--input-btn-hover-txt);
        background-color: var(--input-btn-hover-bg);
    }
    button.active {
        background-color: var(--input-btn-active-bg);
        color: var(--input-btn-active-txt);
    }

    /* Layout only */
    .container {
        width: 100%;
    }
    .buttons {
        display: inline-flex;
        flex-wrap: wrap;
        width: max(250px, 50%);/* TODO: calc to ensure a square grid with as few rows as possible in the space */
    }
    .buttons > * {
        flex-basis: 1;/* give all buttons equal space */
    }
    .image-container {
        display: flex;
        justify-content: center;
        align-items: center;
    }
    .right {
        float: right;
    }
    .left {
        float: left;
    }
</style>