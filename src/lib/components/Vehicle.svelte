<script lang="ts">
    import type { VehicleComponentType } from '$lib/types/journey';
    import type { VehicleType } from '$lib/types/vehicle';
    import { valueStore } from '$lib/stores/valuestore';
    import Dropdown from '$lib/components/Dropdown.svelte';
    import Markdown from '$lib/components/Markdown.svelte';
    import Textbox from '$lib/components/Textbox.svelte';

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
            <Markdown source={component.pre}/>
        </svelte:fragment>
        <svelte:fragment slot="post">
            <Markdown source={component.post}/>
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
            <Markdown source={component.pre}/> 
        </svelte:fragment>
        <svelte:fragment slot="post">
            <Markdown source={component.post}/>
        </svelte:fragment>
    </Dropdown>
</div>


<style>
    .vehicle {
        margin: 0rem;
        padding: 0rem;
    }
</style>
