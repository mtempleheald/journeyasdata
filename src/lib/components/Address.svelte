<script lang="ts">
	import { createEventDispatcher } from 'svelte';
    import { valueStore } from '$lib/stores/valuestore';
    import { validationStore } from '$lib/stores/validationstore';
    import type { AddressType } from '$lib/types/address';
    import type { AddressComponentType } from '$lib/types/questionset';
    import Dropdown from '$lib/components/Dropdown.svelte';
    import Textbox from '$lib/components/Textbox.svelte';
    
    // expose component properties
    export let component: AddressComponentType;

    // internal properties to support component logic
    let active: string;
    let addresses: AddressType[];
    let address : AddressType | null;
    let propertyLov : any[] = [];
    const dispatch = createEventDispatcher();

    // component actions
    function enter() {
        active = "active";
    }
    function leave() {
        active = "";
    }
    async function lookupAddresses(postcode) {
        await fetch (`/api/addresses?postcode=${postcode}`)
            .then(resp => resp.json())
            .then(data => {
                addresses = data;
                propertyLov = data.map((a) => (
                {
                    value: a.property,
                    display: a.property
                }));
            })
            .finally(() => console.log("lookupAddresses propertyLov", propertyLov));
    }
    async function postcodeTouched(event) {
        console.log(`{key: "${event.detail.key}", value: "${event.detail.value}", valid: "${event.detail.valid}}"`)
        // Address is a composite component meaning it is responsible for handling the store for its (sub)components
        // Textbox blur event.detail={key: "postcode", value: "<postcode>", valid: "<valid?>"}
        if (event.detail.value != $valueStore["postcode"]) {

            // value has changed, reset previous details
            valueStore.set("postcode", event.detail.value);
            valueStore.set("property", '');
            valueStore.set("addressline1", '');
            valueStore.set("addressline2", '');
            valueStore.set("addressline3", '');
            valueStore.set("addressline4", '');
            addresses = [];
            propertyLov = [];
            address = null;

            // check validity
            validationStore.set("postcode", event.detail.valid);        
            if (!$validationStore["postcode"]) {
                // postcode is invalid, update validationStore
                validationStore.set("address", false);
                // also communicate to parent
                dispatch('addressChange', {key: "address", value: "", valid: false});
            }
            else {
                // if the postcode is valid, proceed to call the API
                await lookupAddresses($valueStore["postcode"]);
                console.log("propertyLov", propertyLov);
            }
        }
    }
    function propertyTouched(event) {
        console.log(`{key: "${event.detail.key}", value: "${event.detail.value}", valid: "${event.detail.valid}}"`)
        if (event.detail.value) {
            address = addresses.filter(a => a.property == event.detail.value.toString())[0];
            valueStore.set("property",     address.property);
            valueStore.set("addressline1", address.addressline1);
            valueStore.set("addressline2", address.addressline2);
            valueStore.set("addressline3", address.addressline3);
            valueStore.set("addressline4", address.addressline4);
            
            validationStore.set("address", true);
            dispatch('addressChange', {key: "address", value: "", valid: true});
        }
        else {
            validationStore.set("address", false);
            dispatch('addressChange', {key: "address", value: "", valid: false});
        }
    }
</script>


<div class="address {active} {!!$validationStore["address"]?'':'invalid'}" 
    on:mouseenter={enter} 
    on:mouseleave={leave}
>
    <Textbox type="Upper"
        component={{
            id: "postcode",
            label: component.postcodeLabel,
            value: $valueStore["postcode"] ?? '',
            placeholder: component.postcodePlaceholder,
            help: component.postcodeHelp,
            required: true,
            errorMessage: component.postcodeError
        }}
        on:valueChange="{postcodeTouched}"
    />
    {#key propertyLov}<!-- redraw the LOV anytime the data changes because we are passing new object to (sub)components, not binding -->    
    {#if propertyLov.length > 0 || !$valueStore["property"]}
    <Dropdown 
        component={{
            id: "property",
            value: $valueStore["property"] ?? '',
            label: component.propertyLabel,
            placeholder: component.propertyPlaceholder,
            values: propertyLov ?? []
        }}        
        on:valueChange="{propertyTouched}"
    />
    {:else}
    <Textbox 
        component={{
            id: "property",
            value: $valueStore["property"] ?? '',
            label: component.propertyLabel,
        }}
    />
    {/if}
    {/key}
    {#if $valueStore["property"]}
    <Textbox
        component={{
            id: "addressline1",
            value: $valueStore["addressline1"],
            label: "Address Line 1"
        }}        
        on:valueChange={(e) => {valueStore.set("addressline1", e.detail.value)}}
    />
    <Textbox
        component={{
            id: "addressline2",
            value: $valueStore["addressline2"],
            label: "Address Line 2"
        }}
        on:valueChange={(e) => {valueStore.set("addressline2", e.detail.value)}}
    />
    <Textbox
        component={{
            id: "addressline3",
            value: $valueStore["addressline3"],
            label: "Address Line 3"
        }}
        on:valueChange={(e) => {valueStore.set("addressline3", e.detail.value)}}
    />
    <Textbox
        component={{
            id: "addressline4",
            value: $valueStore["addressline4"],
            label: "Address Line 4"
        }}
        on:valueChange={(e) => {valueStore.set("addressline4", e.detail.value)}}
    />
    {/if}
</div>


<style>
    .address {
        margin: 0rem;
        padding: 0rem;
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