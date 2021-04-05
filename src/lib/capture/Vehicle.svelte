<script lang="typescript">
    import Textbox from '$lib/capture/Textbox.svelte';
    
    // parameters
    let regnum : string = '';
    export let regnumLabel : string = 'Registration number';
    export let regnumPlaceholder : string = 'YOUR REG';
    export let buttonLabel : string = 'Search';
    export let errorMessage : string = 'Failed to find vehicle';

    let vehicle : any;
    
    let active;
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
    <Textbox
        on:valueChange="{regUpdated}"
        id="regnum"
        label="{regnumLabel}"
        placeholder="{regnumPlaceholder}"
        help="help us to help you"
        required="true"
        errorMessage="{errorMessage}"
    ></Textbox>
    <button type="button">{buttonLabel}</button>
    <Textbox
        id="make"
        label="make"
        value="{vehicle?.make ?? ''}"
    ></Textbox>

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
    .vehicle {
        margin: 0.5rem;
        padding: 0.5rem;
    }
    /* needs to move to TextQuestion 
    .regnum {
        text-transform: uppercase; 
    }
    .invalid {
        background-color: var(--question-color-bg-error, palevioletred);
        color: var(--question-color-text-error, black);
    }
    .hidden {
        display: none;
    }
    */
</style>