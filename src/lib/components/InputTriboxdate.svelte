<script lang="ts">
    import type { TriBoxDateComponentType } from '$lib/types/journey';
    import { blur } from 'svelte/transition';
	import { createEventDispatcher, onMount } from 'svelte';
    import Helptext from '$lib/components/Helptext.svelte';

    // expose component properties
    export let component: TriBoxDateComponentType;
    
    // internal properties to support component logic
    let fallbackError
    let valid = true
    let active
    let dateElem : HTMLInputElement
    let yearElem : HTMLInputElement
    let monthElem : HTMLInputElement
    let dayElem : HTMLInputElement
    let yearAttempted : boolean = false
    let monthAttempted : boolean = false
    let dayAttempted : boolean = false
    let display : string;

    onMount(async () => {
        if (component.value) {
            dayElem.value = component.value.substring(8,10)
            monthElem.value = component.value.substring(5,7)
            yearElem.value = component.value.substring(0,4)
            dayAttempted = true
            monthAttempted = true
            yearAttempted = true
        }
    })

    function updateDay(event) {
        // skip update if reset is clicked
        if(event.explicitOriginalTarget.parentNode.name != "reset") {
            dayAttempted = true
            update()
            if (!dayElem.validity.valid) {
                setTimeout(function() {
                    dayElem.focus()
                },0)
            }
        }
    }
    function updateMonth(event) {
        // skip update if reset is clicked or we are going back to day because it is invalid
        if ((event.explicitOriginalTarget.parentNode.name == "reset") || (event.relatedTarget == dayElem)) return

        monthAttempted = true
        update()
        if (!monthElem.validity.valid) {
            setTimeout(function() {
                monthElem.focus()
            },0)
        }        
    }
    function updateYear(event) {
        // skip update if reset is clicked or we are going back to month because it is invalid
        if ((event.explicitOriginalTarget.parentNode.name == "reset") || (event.relatedTarget == monthElem)) return
        
        yearAttempted = true
        update()
        if (!yearElem.validity.valid) {
            setTimeout(function() {
                yearElem.focus()
            },0)
        }        
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
    function formatDate() {
        if (!valid || !yearAttempted) return ""
        
        const date = new Date(component.value)


        return new Intl.DateTimeFormat([], { dateStyle: component.displayFormat ?? "short"}).format(date)
    }

    // component actions
    function enter() {
        active = "active";
    }
    function leave() {
        active = "";
    }
    function update() {
        // ensure that the date format is always respected, even if it isn't a valid date
        const y = yearElem.validity.valid  ? yearElem.value  : '0000'
        const m = monthElem.validity.valid ? monthElem.value : '00'
        const d = dayElem.validity.valid   ? dayElem.value   : '00'
        component.value = `${y.padStart(4,'0')}-${m.padStart(2,'0')}-${d.padStart(2,'0')}`        
        
        const parsedDate = Date.parse(component.value)
        const parsedMin = Date.parse(component.min)
        const parsedMax = Date.parse(component.max)

        if (!yearAttempted || !monthAttempted || !dayAttempted) {
            // don't show as error until the user has finished with all boxes
            valid = true 
        }
        else if (isNaN(parsedDate)) { 
            // each field may be valid, but a valid date it is not
            valid = false
        }
        else if ((( !isNaN(parsedMin) && parsedDate < parsedMin )) 
             ||  (( !isNaN(parsedMax) && parsedDate > parsedMax ))) {
            // date is outside allowed range
            console.log(parsedDate, parsedMin, parsedMax, valid)
            valid = false
        }
        else {
            valid = true
        }
        display = formatDate()
        
        // publish changes up to parent, let it handle state
        dispatch('dateChange', {key: component.id, value: component.value, displayValue: display, valid: valid});
    }
    const dispatch = createEventDispatcher();
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
                on:blur={updateDay}
            />
            <span>{component.separator ?? ""}</span>
            <input bind:this="{monthElem}"
                id="{component.id}-month"
                type="number"
                inputmode="numeric"
                placeholder="MM"             
                name="month"
                title="month"
                min="1"
                max="12"
                on:blur={updateMonth}
            />
            <span>{component.separator ?? ""}</span>
            <input bind:this="{yearElem}"
                id="{component.id}-year"
                type="number"
                inputmode="numeric"
                placeholder="YYYY"             
                name="year"
                title="year"
                min="0"
                max="9999"
                on:blur={updateYear}
            />
        {/if}

        <button type="button" name="reset" on:click="{reset}">{component.resetLabel ?? 'Reset'}</button>

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
