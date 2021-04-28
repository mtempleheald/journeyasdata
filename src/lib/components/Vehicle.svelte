<script lang="typescript">
    import Textbox from '$lib/components/Textbox.svelte';
    
    // expose component properties    
    export let regnumLabel : string = 'Registration number';
    export let regnumPlaceholder : string = 'YOUR REG';
    export let buttonLabel : string = 'Search';
    export let errorMessage : string = 'Failed to find vehicle';

    // internal properties to support component logic
    let regnum : string = '';
    let vehicle : any;
    let active;

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
        vehicle = [];
    }

</script>
    

<div class="vehicle">
    <Textbox type="Upper"
        id="regnum"
        label="{regnumLabel}"
        placeholder="{regnumPlaceholder}"
        help="help us to help you"
        required={true}
        errorMessage="{errorMessage}"
        on:valueChange="{regUpdated}"
    ></Textbox>
    <button type="button">{buttonLabel}</button>
    <Textbox
        id="make"
        label="make"
        value="{vehicle?.make ?? ''}"
    ></Textbox>

</div>


<style>
    .vehicle {
        margin: 0rem;
        padding: 0rem;
    }
</style>