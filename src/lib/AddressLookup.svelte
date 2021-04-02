<script>
    // required data
    export let postcode = "";
    export let house = "";
    export let addressLine1 = "";
    export let addressLine2 = "";
    export let addressLine3 = "";
    export let addressLine4 = "";

    // display components & defaults
    export let postcodeLabel = "Postcode:";
    export let postcodePlaceholder = "MK10 0BZ";
    export let buttonLabel = "Search";
    export let houseLabel = "Select property:";

    export let active;
    export let hovering;
    function enter() {
        hovering = true;
        active = "active";
    }
    function leave() {
        hovering = false;
        active = "";
    }  

    // functional components
    export let houseList = [];
    export let searching = false;
    function lookupAddress(event) {
        searching = true;
        houseList = ["1","2","3","The pig sty"];
    }
    function selectAddress(event) {
        searching = false;
        addressLine1 = "Fake St";
        addressLine2 = "Springfield";
        addressLine3 = "";
        addressLine4 = "Ohiya Maud";
    }
    function reset(event) {
        searching = false;
        house = "";
        addressLine1 = "";
        addressLine2 = "";
        addressLine3 = "";
        addressLine4 = "";
    }
</script>


<div class="address" on:mouseenter={enter} on:mouseleave={leave} hovering={hovering}>
    <label>
        <span>{postcodeLabel}</span>
        <input bind:value={postcode} on:focus="{reset}" placeholder="{postcodePlaceholder}"/>
    </label>
    <button type="button" on:click="{lookupAddress}">{buttonLabel}</button>
    <br/>
    {#if searching && postcode}
        <label>
            <span>{houseLabel}</span>
            <select bind:value={house} on:blur={selectAddress}>
                {#each houseList as h}
                    <option value="{h}" on:click={selectAddress}>{h}</option>
                {/each}
            </select>
        </label>
    {/if}
    <br/>
    {#if !searching && house}
    <div class="address-display">
        <span>{house}</span>
        {#if addressLine1}<span>{addressLine1}</span>{/if}
        {#if addressLine2}<span>{addressLine2}</span>{/if}
        {#if addressLine3}<span>{addressLine3}</span>{/if}
        {#if addressLine4}<span>{addressLine4}</span>{/if}
        <span>{postcode}</span>
    </div>
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
</style>