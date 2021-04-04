<script lang="typescript">
import { validate_component } from "svelte/internal";

    // required data
    export let postcode : string = "";
    export let house : string = "";    

    // display components & defaults
    export let postcodeLabel = "Postcode";
    export let postcodePlaceholder = "MK10 0BZ";
    export let buttonLabel = "Search";
    export let houseLabel = "Property";

    let active;
    function enter() {
        active = "active";
    }
    function leave() {
        active = "";
    }  

    // functional components
    let addresses: any[];
    let address : any;
    let searching = true;
    let postcodeInput;
    let validpostcode = true;  
    async function lookupAddress(event) {
        if (validpostcode) {
        searching = true;
        await fetch (`/api/addresses?postcode=` + postcode)
                .then(resp => resp.json())
                .then(data => addresses = data);
        }
    }  
    function changePostcode(event) {
        let input = event.target;
        postcode = input.value.toUpperCase();
        if (input.validity.valid) {
            validpostcode = true;
        }
        else {
            validpostcode = false;
            postcodeInput.focus();
        }
    }
    function selectAddress(event) {        
        searching = false;
        address = addresses.filter(a => a.house == house)[0];
    }
    function reset(event) {
        searching = true;
        postcode = '';
        addresses = null;
        house = '';
        address = null;
        validpostcode = true;
        postcodeInput.focus();
    }
    // https://developer.mozilla.org/en-US/docs/Learn/Tools_and_testing/Client-side_JavaScript_frameworks/Svelte_reactivity_lifecycle_accessibility
    // doesn't seem to work - why can't I type in a focused field?  
    function selectOnFocus(node) {
        if (node && typeof node.select === 'function' ) {               // make sure node is defined and has a select() method
            const onFocus = event => node.select()                        // event handler
            node.addEventListener('focus', onFocus)                       // when node gets focus call onFocus()
            return {
            destroy: () => node.removeEventListener('focus', onFocus)   // this will be executed when the node is removed from the DOM
            }
        }
    }

</script>


<div class="address {active} {validpostcode?'':'invalid'}" on:mouseenter={enter} on:mouseleave={leave}>
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
            use:selectOnFocus 
        />
    </label>
    <button type="button" on:click="{lookupAddress}">{buttonLabel}</button>
    <br/>
    {#if addresses}
    <label>
        <span>{houseLabel}</span>
        <select 
            bind:value={house} 
            on:blur={selectAddress} 
            required>
            <option value="">-- select --</option>
            {#each addresses as a}
                <option value="{a.house}" on:click={selectAddress}>{a.house}</option>
            {/each}
        </select>
    </label>
    {/if}
    </div>
    {#if !searching}
    <div class="address-display">
        <span>{address.house}</span>
        {#if address.addressline1}<span>{address.addressline1}</span>{/if}
        {#if address.addressline2}<span>{address.addressline2}</span>{/if}
        {#if address.addressline3}<span>{address.addressline3}</span>{/if}
        {#if address.addressline4}<span>{address.addressline4}</span>{/if}
        <span>{address.postcode}</span>
    </div>
    <button type="button" on:click="{reset}">Find another address</button>
    {/if}
</div>


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