import type { VehicleType } from '$lib/types/vehicle';
import { validationStore } from '$lib/stores/validationstore';
import { valueStore } from '$lib/stores/valuestore';

export let actions = {
	simpleimagebutton: function () {
		let values;
		const valueUnsubscriber = valueStore.subscribe((x) => (values = x));
		console.log(
			`Simple Image Button action was triggered with value ${values['simpleimagebutton']}`
		);
		valueUnsubscriber();
	},
	vehicleregnum: lookupVehicle
};

async function lookupVehicle() {
	console.log('lookupVehicle()');
	let values;
	let vehicle: VehicleType;
	const inputUnsubscriber = valueStore.subscribe((value) => (values = value));

	if (!!values['vehicleregnum']) {
		console.log('lookup vehicle by regnum');
		await fetch(`/api/vehicle/` + values['vehicleregnum'])
			.then((resp) => resp.json())
			.then((data) => (vehicle = data));
	}
	if (!!vehicle?.abicode) {
		console.log('vehicle found');
		valueStore.set('vehiclemake', vehicle.make ?? ''); // TODO: work out how to standardise case to work with backend provider mapping (suggest UI only ever sees lowercase codes/keys)
		valueStore.set('vehiclemanufactureyear', vehicle.year?.toString() ?? '');
		valueStore.set('vehicleenginesize', vehicle.enginecc ?? '');
		valueStore.set('vehiclefuel', mapFuel[vehicle.fueltype] ?? '');
		valueStore.set('vehicletransmission', mapTransmission[vehicle.transmission] ?? '');
		valueStore.set('vehicledoorcount', vehicle.doors?.toString() ?? '');
		valueStore.set('vehicleseatbeltcount', vehicle.seatbelts?.toString() ?? '');
	} else {
		console.log('reset vehicle fields');
		valueStore.set('vehiclemake', '');
		valueStore.set('vehiclemanufactureyear', '');
		valueStore.set('vehicleenginesize', '');
		valueStore.set('vehiclefuel', '');
		valueStore.set('vehicletransmission', '');
		valueStore.set('vehicledoorcount', '');
		valueStore.set('vehicleseatbeltcount', '');
	}
	// avoid memory leaks
	inputUnsubscriber();
}
const mapFuel = {
	D: 'FuelDiesel',
	P: 'FuelPetrol',
	E: 'FuelElec'
};
const mapTransmission = {
	M: 'TransMan',
	A: 'TransAuto'
};
