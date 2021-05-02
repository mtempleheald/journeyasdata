<script lang="ts">
    import Textbox from '$lib/components/Textbox.svelte';
    import type { VehicleComponentType } from '$lib/types/questionset';
    import type { VehicleType } from '$lib/types/vehicle';
    
    // expose component properties
    export let component: VehicleComponentType;

    // internal properties to support component logic
    let regnum: string = '';
    let vehicle: VehicleType | null;
    let active: string;

    // component actions
    function enter() {
        active = "active";
    }
    function leave() {
        active = "";
    }        
    async function regUpdated(event) {
        if (event.detail.value) {
            await fetch (`/api/vehicle/` + event.detail.value.toUpperCase())
                .then(resp => resp.json())
                .then(data => vehicle = data);            
        }
        else {
            reset(event);
        }
    }          
    function reset(event) {
        regnum = '';
        vehicle = null;
    }

</script>
    

<div class="vehicle">
    <Textbox type="Upper"
        component={{
            type: "Upper",
            id: "regnum",
            value: '',
            label: component.regnumLabel,
            placeholder: component.regnumPlaceholder,
            help: "help us to help you",
            required: true,
            errorMessage: component.errorMessage
        }}        
        on:valueChange="{regUpdated}"
    ></Textbox>
    <button type="button">{component.buttonLabel}</button>
    <Textbox
        component={{
            type: "Text",
            id: "make",
            label: "make",
            value: vehicle?.make ?? ''
        }}
    ></Textbox>

</div>


<style>
    .vehicle {
        margin: 0rem;
        padding: 0rem;
    }
</style>