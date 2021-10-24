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
            valid: (component.required || !!component.value) 
        });   
    }
</script>


<div class="question {active} {component.required && component.value == null ? 'invalid' : ''}" 
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
                        
                        {#if v.display != null}
                            {#if v.textLocation == "top"}
                                <div class="{v.textLocation}">{v.display}</div>
                                <div class="bottom">[  ]</div>
                            
                            {:else if v.textLocation == "bottom"}
                                <div class="top">[  ]</div>
                                <div class="{v.textLocation}">{v.display}</div>

                            {:else if v.textLocation == "left"}
                                <div class="right">[  ]</div>
                                <div class="{v.textLocation}">{v.display}</div>

                            {:else if v.textLocation == "right"}
                                <div class="left">[  ]</div>
                                <div class="{v.textLocation}">{v.display}</div>

                            {/if}
                        {/if}

                        {#if v.image != null} 
                            <div class="image-container">
                                <span class="{v.textLocation == "right" ? 'left' : v.textLocation == "left" ? 'right' : '' };">
                                    {v.image != null ? '' : v.display ?? ''}
                                    <img src="{v.image.url}" 
                                        width="{v.image.width}" 
                                        height="{v.image.height}" 
                                        class="{component.value == v.value ? 'active' : ''}" 
                                        alt="{v.display}" />
                                </span>
                            </div>
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
    .question {
        margin: 0;
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
    button {
        background-color: var(--input-btn-bg, white);
        color: var(--input-btn-txt, black);
        border: var(--input-btn-border, 1px solid black);
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
