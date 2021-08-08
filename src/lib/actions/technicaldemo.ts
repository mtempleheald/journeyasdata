import type { VehicleType } from '$lib/types/vehicle';
import { validationStore } from '$lib/stores/validationstore';
import { valueStore } from '$lib/stores/valuestore';

export let actions = {
    "simpleimagebutton": function () {
        let values;
        const valueUnsubscriber = valueStore.subscribe(x => values = x);
        console.log(`Simple Image Button action was triggered with value ${values["simpleimagebutton"]}`);
        valueUnsubscriber();
    },
    "regnumber": lookupVehicle
}

async function lookupVehicle () {
    console.log("lookupVehicle()");
    let values;
    let vehicle: VehicleType;

    const valueUnsubscriber = valueStore.subscribe(x => values = x);
    
    if (!values["regnumber"]) {
        console.log("reset vehicle fields");
        valueStore.set("vehiclemake", '');
        valueStore.set("vehiclemodel", '');
        valueStore.set("vehiclebody", '');
        valueStore.set("vehicletransmission", '');
        valueStore.set("vehicleengine", '');
        valueStore.set("vehicleenginecc", '');
        valueStore.set("vehicleenginebhp", '');
        valueStore.set("vehiclecolour", '');
        valueStore.set("vehicleabicode", '');
        valueStore.set("vehicledoors", '');
    }
    else {
        console.log("searching for vehicle...");
        await fetch (`/api/vehicle/` + values["regnumber"])
                    .then(resp => resp.json())
                    .then(data => vehicle = data);
        
        valueStore.set("vehiclemake", vehicle.make);
        valueStore.set("vehiclemodel", vehicle.model);
        valueStore.set("vehiclebody", vehicle.body);
        valueStore.set("vehicletransmission", vehicle.transmission);
        valueStore.set("vehicleengine", vehicle.engine);
        valueStore.set("vehicleenginecc", vehicle.enginecc);
        valueStore.set("vehicleenginebhp", vehicle.enginebhp);
        valueStore.set("vehiclecolour", vehicle.colour);
        valueStore.set("vehicleabicode", vehicle.abicode);
        valueStore.set("vehicledoors", vehicle.doors);
    }
    // avoid memory leaks
    valueUnsubscriber();
}