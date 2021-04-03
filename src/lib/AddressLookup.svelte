<script>
import { validate_component } from "svelte/internal";

    // required data
    export let postcode = "";
    export let house = "";
    export let addressLine1 = "";
    export let addressLine2 = "";
    export let addressLine3 = "";
    export let addressLine4 = "";

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
    let houseList;
    let searching = true;
    let valid = true;  
    function lookupAddress(event) {
        searching = true;
        houseList = ["1","2","3","The pig sty"];
    }  
    function changePostcode(event) {
        let input = event.target;
        postcode = input.value.toUpperCase();
        if (input.validity.valid) {
            valid = true;
        }
        else {
            valid = false;
        }
    }
    function selectAddress(event) {
        valid = true;
        searching = false;
        // TODO: replace with endpoint call
        addressLine1 = "Fake St";
        addressLine2 = "Springfield";
        addressLine3 = "";
        addressLine4 = "Ohiya Maud";
    }
    function reset(event) {
        searching = true;
        postcode = '';
        houseList = '';
        house = '';
        addressLine1 = '';
        addressLine2 = '';
        addressLine3 = '';
        addressLine4 = '';
    }    
    
</script>


<div class="address {active} {valid?'':'invalid'}" on:mouseenter={enter} on:mouseleave={leave}>
    {#if searching }
    <label>
        <span>{postcodeLabel}</span>
        <input class="postcode"
            bind:value={postcode} 
            on:focus="{reset}" 
            on:blur="{changePostcode}"
            placeholder="{postcodePlaceholder}" 
            required 
            maxlength="8"/>
    </label>
    <button type="button" on:click="{lookupAddress}">{buttonLabel}</button>
    <br/>
        {#if houseList}
            <label>
                <span>{houseLabel}</span>
                <select 
                    bind:value={house} 
                    on:blur={selectAddress} 
                    required>
                    {#each houseList as h}
                        <option value="{h}" on:click={selectAddress}>{h}</option>
                    {/each}
                </select>
            </label>
        {/if}
    {/if}
    {#if !searching}
    <div class="address-display">
        <span>{house}</span>
        {#if addressLine1}<span>{addressLine1}</span>{/if}
        {#if addressLine2}<span>{addressLine2}</span>{/if}
        {#if addressLine3}<span>{addressLine3}</span>{/if}
        {#if addressLine4}<span>{addressLine4}</span>{/if}
        <span>{postcode}</span>
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
</style>