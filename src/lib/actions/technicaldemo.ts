import { inputStore } from '$lib/stores/inputstore';
import { validationStore } from '$lib/stores/validationstore';
import type { VehicleType } from '$lib/types/vehicle';

export let actions = {
    "simpleimagebutton": function () {
        console.log('Simple Image Button action was triggered');
    },
    "regnumber": lookupVehicle
}

async function lookupVehicle () {
    console.log("lookupVehicle()");
    let inputs;
    let vehicle: VehicleType;

    const inputUnsubscriber = inputStore.subscribe(value => inputs = value);
    
    if (!inputs["regnumber"]) {
        console.log("reset vehicle fields");
        inputStore.input("vehiclemake", '');
        inputStore.input("vehiclemodel", '');
        inputStore.input("vehiclebody", '');
        inputStore.input("vehicletransmission", '');
        inputStore.input("vehicleengine", '');
        inputStore.input("vehicleenginecc", '');
        inputStore.input("vehicleenginebhp", '');
        inputStore.input("vehiclecolour", '');
        inputStore.input("vehicleabicode", '');
        inputStore.input("vehicledoors", '');
    }
    else {
        console.log("searching for vehicle...");
        await fetch (`/api/vehicle/` + inputs["regnumber"])
                    .then(resp => resp.json())
                    .then(data => vehicle = data);
        
        inputStore.input("vehiclemake", vehicle.make);
        inputStore.input("vehiclemodel", vehicle.model);
        inputStore.input("vehiclebody", vehicle.body);
        inputStore.input("vehicletransmission", vehicle.transmission);
        inputStore.input("vehicleengine", vehicle.engine);
        inputStore.input("vehicleenginecc", vehicle.enginecc);
        inputStore.input("vehicleenginebhp", vehicle.enginebhp);
        inputStore.input("vehiclecolour", vehicle.colour);
        inputStore.input("vehicleabicode", vehicle.abicode);
        inputStore.input("vehicledoors", vehicle.doors);
    }
    // avoid memory leaks
    inputUnsubscriber();
}