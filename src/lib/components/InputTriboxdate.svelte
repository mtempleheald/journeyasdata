<!-- TODO: Consider rewriting this based on InputComponentType
    - remove checkbox, act just as a Date Input replacement
    - limited options in favour of consistency
    - work with ISO date format only 
-->
<script lang="ts">
    import type { TriBoxDateComponentType } from '$lib/types/journey';
    import { blur } from 'svelte/transition';
	import { createEventDispatcher } from 'svelte';
    import Helptext from '$lib/components/Helptext.svelte';

    // expose component properties
    export let component: TriBoxDateComponentType;

    const dispatch = createEventDispatcher();
    
    // internal properties to support component logic
    let fallbackError
    let valid = true
    let active
    let dateElem : HTMLInputElement
    let yearElem : HTMLInputElement
    let monthElem : HTMLInputElement
    let dayElem : HTMLInputElement
    // let year : number = parseInt(extractYear())
    // let month : number = parseInt(extractMonth())
    // let day : number = parseInt(extractDay())
    let yearAttempted : boolean = false
    let monthAttempted : boolean = false
    let dayAttempted : boolean = false

    function extractYear() : string|null {
        if (component.value?.length != 10) return ''
        return component.value?.substring(0, 4)
    }
    function extractMonth() : string|null {
        if (component.value?.length != 10) return ''
        return component.value?.substring(5, 7)
    }
    function extractDay() : string|null {
        if (component.value?.length != 10) return ''
        return component.value?.substring(8, 10)
    }
    function setDay() {
        if (!dayElem.validity.valid) {
            valid = false;
        }
        else {
            component.value = `${extractYear().padStart(4,'0')}-${extractMonth().padStart(2, '0')}-${dayElem.value.padStart(2, '0')}`
        }
    }
    function setMonth() {
        if (!monthElem.validity.valid) {
            valid = false;
        }
        else {
            component.value = `${extractYear().padStart(4,'0')}-${monthElem.value.padStart(2, '0')}-${extractDay().padStart(2, '0')}`
        }
    }
    function setYear() {
        if (!yearElem.validity.valid) {
            valid = false;
        }
        else {
            component.value = `${yearElem.value.padStart(4,'0')}-${extractMonth().padStart(2, '0')}-${extractDay().padStart(2, '0')}`
        }
    }
    function validateDate() {
        // Don't show as error until the user has finished with all boxes
        if (!yearAttempted || !monthAttempted || !dayAttempted) { valid = true; return }
        if (isNaN(Date.parse(component.value))) { valid = false; return }
        valid = true
    }
    function getDisplayValue() {
        return `${extractDay()}/${extractMonth()}/${extractYear()}`
    }
    function reset() {
        yearElem.value = null
        monthElem.value = null
        dayElem.value = null
        yearAttempted = false
        monthAttempted = false
        dayAttempted = false
        valid = true
        update()
    }

    // component actions
    function enter() {
        active = "active";
    }
    function leave() {
        active = "";
    }
    function update() {
        console.log(dayElem, monthElem, yearElem)
        const y = yearElem.validity.valid  ? yearElem.value  : '0000'
        const m = monthElem.validity.valid ? monthElem.value : '00'
        const d = dayElem.validity.valid   ? dayElem.value   : '00'
        component.value = `${y.padStart(4,'0')}-${m.padStart(2,'0')}-${d.padStart(2,'0')}`
        
        validateDate()
        
        // publish changes up to parent, let it handle state
        dispatch('dateChange', {key: component.id, value: component.value, displayValue: getDisplayValue(), valid: valid});
    }
</script>

<div class="question {active} {valid?'':'invalid'}" 
    transition:blur 
    on:mouseenter={enter} 
    on:mouseleave={leave} 
>
    <slot name="pre"></slot>

    <div class="container">

        <!-- Use date field (hidden) to take advantage of browser validator api -->
        <input type="date"
            id="{component.id}"
            bind:value={component.value}
            bind:this="{dateElem}"
            required="{component.required}"
            class="hidden"
        />
        {#if component.label}
        <label for="{component.id}">
            {component.label}
            {#if component.required}
            <span class="required">*</span>
            {/if}
        </label>
        {/if}

        {#if component.id}
            <input bind:this="{dayElem}"
                id="{component.id}-day"
                type="number"
                inputmode="numeric"
                placeholder="DD"             
                name="day"
                title="day"                
                min="1"
                max="31"
                on:blur={() => {update(); dayAttempted = true}}
            />
            <span>/</span>
            <input bind:this="{monthElem}"
                id="{component.id}-month"
                type="number"
                inputmode="numeric"
                placeholder="MM"             
                name="month"
                title="month"
                min="1"
                max="12"
                on:blur={() => {update(); monthAttempted = true}}
            />
            <span>/</span>
            <input bind:this="{yearElem}"
                id="{component.id}-year"
                type="number"
                inputmode="numeric"
                placeholder="YYYY"             
                name="year"
                title="year"
                min="0"
                max="9999"
                on:blur={() => {update(); yearAttempted = true}}
            />
        {/if}

        <button type="button" on:click="{reset}">Reset</button>

        {#if component.help}
            <Helptext>{component.help}</Helptext>
        {/if}

    </div>

    {#if !valid}
        <div class="error">{component.errorMessage ?? fallbackError}</div>
    {/if}

    <slot name="post"></slot>
</div>


<style>
    .question {
        margin: 0;
        padding: 1rem;
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
    .hidden {
        display: none;
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
        padding: var(--input-padding);
    }
    .container input:invalid {
        background-color: var(--input-error-bg, pink);
        border: solid 1px var(--input-error-txt, red);
    }
    /* don't want arrows on date input */
    input[type=number]{
        appearance:textfield;
    }
    input[type=number]::-webkit-inner-spin-button,
    input[type=number]::-webkit-outer-spin-button {        
        appearance: none;
    }
    .error {
        padding: 0.5rem;
        background-color: var(--input-error-msg-bg, red);
        color: var(--input-error-msg-txt, pink);
    }
</style>
