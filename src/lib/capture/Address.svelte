<script lang="typescript">
    import Displayblock from '$lib/display/Displayblock.svelte';
import { createEventDispatcher } from 'svelte';
    import Dropdown from './Dropdown.svelte';
    import Textbox from './Textbox.svelte';

    // expose component properties
    export let postcodeLabel = "Postcode";
    export let postcodePlaceholder = "MK10 0BZ";
    export let postcodeHelp = "";
    export let postcodeError = "Postcode is required";
    export let buttonLabel = "Search";
    export let houseLabel = "Property";

    // internal properties to support component logic
    const dispatch = createEventDispatcher();
    let postcode : string;
    let property : string = "";
    let propertyLov : any[] = [];
    let active;
    let addresses: any[];
    let address : any;
    let searching = true;
    let postcodeInput;
    let validpostcode = true;
    let propertyPlaceholder = '-- select --';

    // component actions
    function enter() {
        active = "active";
    }
    function leave() {
        active = "";
    }    
    async function lookupAddresses(postcode) {
        if (validpostcode) {
        searching = true;
        await fetch (`/api/addresses?postcode=` + postcode)
            .then(resp => resp.json())
            .then(data => {
                addresses = data;
                propertyLov = data.map((a) => (
                {
                    key: a.house,
                    value: a.house
                }));
            });
        }
    }
    function postcodeChanged(event) {
        // When the input changes it will update the store itself.
        // and emit data {key: "postcode", value: "<postcode>"}
        // we are tying separate components together to compose an address
        console.log(`${event.detail.key} changed to ${event.detail.value}`);

        if (event.detail.value) {
            lookupAddresses(event.detail.value);
        }
        else {
            reset();
        }
    }
    function propertyChanged(event) {
        console.log(`${event.detail.key} changed to ${event.detail.value}`);
        // Either we have selected a valid address (show outcome)
        // Or we've deselected to find another property and need to re-search
        if (event.detail.value) {
            address = addresses.filter(a => a.house == event.detail.value.toString())[0];
        }      
    }




    // function changePostcode(event) {
    //     let input = event.target;
    //     postcode = input.value.toUpperCase();
    //     if (input.validity.valid) {
    //         validpostcode = true;
    //     }
    //     else {
    //         validpostcode = false;
    //         postcodeInput.focus();
    //     }
    // }
    // function selectAddress(event) {        
    //     searching = false;
    //     address = addresses.filter(a => a.house == property)[0];
    // }
    function reset() {
        searching = true;
        postcode = '';
        addresses = null;
        propertyLov = [];
        property = '';
        address = null;
        validpostcode = true;
        postcodeInput.focus();
    }
    // https://developer.mozilla.org/en-US/docs/Learn/Tools_and_testing/Client-side_JavaScript_frameworks/Svelte_reactivity_lifecycle_accessibility
    // doesn't seem to work - why can't I type in a focused field?  
    // function selectOnFocus(node) {
    //     if (node && typeof node.select === 'function' ) {               // make sure node is defined and has a select() method
    //         const onFocus = event => node.select()                        // event handler
    //         node.addEventListener('focus', onFocus)                       // when node gets focus call onFocus()
    //         return {
    //         destroy: () => node.removeEventListener('focus', onFocus)   // this will be executed when the node is removed from the DOM
    //         }
    //     }
    // }
    
</script>

<div class="address {active} {validpostcode?'':'invalid'}" on:mouseenter={enter} on:mouseleave={leave}>
    <!-- 
        
        So here we focus only on 
    -->
    <Textbox type="Upper"
        id="postcode"
        label="{postcodeLabel}"
        placeholder="{postcodePlaceholder}"
        help="{postcodeHelp}"
        required=true
        errorMessage="{postcodeError}"
        on:valueChange="{postcodeChanged}"
        on:focus="{reset}" 
    ></Textbox>
    <Dropdown 
        id="property"
        value="property"
        label="Property"
        placeholder="{propertyPlaceholder}"
        values={propertyLov??[]}
        on:valueChange="{propertyChanged}"
    ></Dropdown>

    {#if address}
    <Textbox
        id="addressline1"
        value="{address.addressline1}"
        label="Address Line 1"
    ></Textbox>
    <Textbox
        id="addressline2"
        value="{address.addressline2}"
        label="Address Line 2"
    ></Textbox>
    <Textbox
        id="addressline3"
        value="{address.addressline3}"
        label="Address Line 3"
    ></Textbox>
    <Textbox
        id="addressline4"
        value="{address.addressline4}"
        label="Address Line 4"
    ></Textbox>
    {/if}
</div>



<!-- <div class="address {active} {validpostcode?'':'invalid'}" on:mouseenter={enter} on:mouseleave={leave}>
    <div class="{searching ? '' : 'hidden'}">
    <label>
        <span>{postcodeLabel}</span>
        <input class="postcode"
            type="text"
            bind:value={postcode} 
            bind:this={postcodeInput}
            on:focus="{reset}" 
            on:blur="{changePostcode}"
            placeholder="{postcodePlaceholder}" 
            required 
            maxlength="8"
        />
    </label>
    <button type="button" on:click="{lookupAddress}">{buttonLabel}</button>
    <br/>
    {#if addresses}
    <label>
        <span>{houseLabel}</span>
        <select 
            bind:value={property} 
            on:blur={selectAddress} 
            required>
            <option value="">-- select --</option>
            {#each addresses as a}
                <option value="{a.property}" on:click={selectAddress}>{a.property}</option>
            {/each}
        </select>
    </label>
    {/if}
    </div>
    {#if !searching}
    <div class="address-display">
        <span>{address.property}</span>
        {#if address.addressline1}<span>{address.addressline1}</span>{/if}
        {#if address.addressline2}<span>{address.addressline2}</span>{/if}
        {#if address.addressline3}<span>{address.addressline3}</span>{/if}
        {#if address.addressline4}<span>{address.addressline4}</span>{/if}
        <span>{address.postcode}</span>
    </div>
    <button type="button" on:click="{reset}">Find another address</button>
    {/if}
</div> -->


<style>
    /* grab global variables for skinning */
    :global(.address) {
        background-color: var(--address-colour-bg,white);
        color: var(--colour-text, black);
        border: 1px var(--border-style, dashed) var(--address-colour-text, black);
    }
    :global(.address.active, .address:focus-within) {
        background-color: var(--address-colour-bg-highlight, yellow);
        color: var(--address-colour-text-highlight, var(--address-colour-text, black));
    }
    /* The rest is not global - the component controls how it is presented, other than skins (colours, borders etc) */
    .address {
        margin: 0.5rem;
        padding: 0.5rem;
    }
    .address-display span {
        display: block;
    }
    .postcode {
        text-transform: uppercase;
    }
    .invalid {
        background-color: var(--question-color-bg-error, palevioletred);
        color: var(--question-color-text-error, black);
    }
    .hidden {
        display: none;
    }
</style>