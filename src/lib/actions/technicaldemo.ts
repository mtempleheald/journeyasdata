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
    console.log("__lookupVehicle__");
    let inputs;
    const inputUnsubscriber = inputStore.subscribe(value => inputs = value);
    
    const regnum = inputs["regnumber"];
    let vehicle: VehicleType;
    console.log(`Registration number: ${regnum}`);

    await fetch (`/api/vehicle/` + regnum)
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

    // avoid memory leaks
    inputUnsubscriber();
}