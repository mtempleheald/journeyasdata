<script lang="ts">
    import snarkdown from 'snarkdown';// https://github.com/developit/snarkdown/blob/master/test/index.js
    import Textbox from '$lib/components/Textbox.svelte';
    import type { VehicleComponentType } from '$lib/types/questionset';
    import type { VehicleType } from '$lib/types/vehicle';
    import Dropdown from '$lib/components/Dropdown.svelte';
    import { valueStore } from '$lib/stores/valuestore';
    
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
    
    TODO: Year Of Manufacture - Drop down in Vehicle.svelte
    <Dropdown
        component={{...component, 
            value:$valueStore[component.id] ?? ''}}>
        <svelte:fragment slot="pre">
        {#if component.pre}    
            {@html snarkdown(component.pre)}    
        {/if}
        </svelte:fragment>
        <svelte:fragment slot="post">
        {#if component.post}
            {@html snarkdown(component.post)}
        {/if}
        </svelte:fragment>
    </Dropdown>

    
    <Textbox
        component={{
            type: "Text",
            id: "make",
            label: "Make",
            value: vehicle?.make ?? ''
        }}
    ></Textbox>
    <Textbox
    component={{
        type: "Text",
        id: "enginecc",
        label: "Engine Size",
        value: vehicle?.enginecc ?? ''
    }}
    ></Textbox>
    <Textbox
    component={{
        type: "Text",
        id: "model",
        label: "Model",
        value: vehicle?.model ?? ''
    }}
    ></Textbox>

    TODO: Select Bike - Drop down component in Vehicle.svelte
    <Dropdown
        component={{...component, 
            value:$valueStore[component.id] ?? ''}}>
        <svelte:fragment slot="pre">
        {#if component.pre}    
            {@html snarkdown(component.pre)}    
        {/if}
        </svelte:fragment>
        <svelte:fragment slot="post">
        {#if component.post}
            {@html snarkdown(component.post)}
        {/if}
        </svelte:fragment>
    </Dropdown>
</div>


<style>
    .vehicle {
        margin: 0rem;
        padding: 0rem;
    }
</style>