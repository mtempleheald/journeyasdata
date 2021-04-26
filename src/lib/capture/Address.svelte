<script lang="typescript">
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
        //console.log(`${event.detail.key} changed to ${event.detail.value}`);

        if (event.detail.value) {
            lookupAddresses(event.detail.value);
        }
        else {
            reset();
        }
    }
    function propertyChanged(event) {
        //console.log(`${event.detail.key} changed to ${event.detail.value}`);
        // Either we have selected a valid address (show outcome)
        // Or we've deselected to find another property and need to re-search
        if (event.detail.value) {
            address = addresses.filter(a => a.house == event.detail.value.toString())[0];
        }      
    }
    function reset() {
        searching = true;
        postcode = '';
        addresses = null;
        propertyLov = [];
        property = '';
        address = null;
        validpostcode = true;
    }
    
</script>


<div class="address {active} {validpostcode?'':'invalid'}" 
    on:mouseenter={enter} 
    on:mouseleave={leave}>

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
        value="{property}"
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


<style>
    .address {
        margin: 0rem;
        padding: 0rem;
    }
    .address-display span {
        display: block;
    }
    .postcode {
        text-transform: uppercase;
    }
    .invalid {
        background-color: var(--input-error-bg, pink);
        color: var(--input-error-txt, red);
    }
    .hidden {
        display: none;
    }
</style>