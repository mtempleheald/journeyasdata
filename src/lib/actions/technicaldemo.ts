import type { VehicleType } from '$lib/types/vehicle';
import { displayValueStore } from '$lib/stores/displayvaluestore';
import { goto } from '$app/navigation';
import { sessionStorageStore } from '$lib/stores/sessionstoragestore';
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
	vehicleregnum: lookupVehicle,
	'page-outcomeid': gotoPaymentGateway, // TODO: trigger this from page navigation button
	sessionstoretestvalue: gotoPaymentGateway // TODO: remove when above works
};

async function lookupVehicle() {
	console.debug('lookupVehicle()');
	let values;
	let vehicle: VehicleType;
	const valueUnsubscriber = valueStore.subscribe((value) => (values = value));

	if (!!values['vehicleregnum']) {
		console.debug('lookup vehicle by regnum');
		await fetch(`/api/vehicle/` + values['vehicleregnum'])
			.then((resp) => resp.json())
			.then((data) => (vehicle = data));
	}
	if (!!vehicle?.abicode) {
		console.debug('vehicle found');
		valueStore.set('vehiclemake', vehicle.make ?? ''); // TODO: work out how to standardise case to work with backend provider mapping (suggest UI only ever sees lowercase codes/keys)
		valueStore.set('vehiclemanufactureyear', vehicle.year?.toString() ?? '');
		valueStore.set('vehicleenginesize', vehicle.enginecc ?? '');
		valueStore.set('vehiclefuel', mapFuel[vehicle.fueltype] ?? '');
		valueStore.set('vehicletransmission', mapTransmission[vehicle.transmission] ?? '');
		valueStore.set('vehicledoorcount', vehicle.doors?.toString() ?? '');
		valueStore.set('vehicleseatbeltcount', vehicle.seatbelts?.toString() ?? '');
	} else {
		console.debug('reset vehicle fields');
		valueStore.set('vehiclemake', '');
		valueStore.set('vehiclemanufactureyear', '');
		valueStore.set('vehicleenginesize', '');
		valueStore.set('vehiclefuel', '');
		valueStore.set('vehicletransmission', '');
		valueStore.set('vehicledoorcount', '');
		valueStore.set('vehicleseatbeltcount', '');
	}
	// avoid memory leaks
	valueUnsubscriber();
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

async function gotoPaymentGateway() {
	console.debug('gotoPaymentGateway()');
	const sessionId = 'demosessionid';
	const returnpath = 'paymentprocessing';
	let session: object;
	let values: object;
	let displayValues: object;
	let validations: object;
	const valueUnsubscriber = valueStore.subscribe((val) => (values = val));
	const displayValueUnsubscriber = displayValueStore.subscribe((val) => (displayValues = val));
	const validationUnsubscriber = validationStore.subscribe((val) => (validations = val));

	const persistentValues = sessionStorageStore(`values-${sessionId}`, {});
	const persistentDisplayValues = sessionStorageStore(`display-${sessionId}`, {});
	const persistentValidations = sessionStorageStore(`valid-${sessionId}`, {});

	// copy the in-memory store data into a sessionStorage object
	// TODO: encrypt before storing
	persistentValues.set(values);
	persistentDisplayValues.set(displayValues);
	persistentValidations.set(validations);

	// avoid memory leaks
	valueUnsubscriber();
	displayValueUnsubscriber();
	validationUnsubscriber();

	// Jump out of the journey on to a separate website which will redirect us back when done with the same sessionId
	// TODO: parameterise this centrally (env)
	goto(
		`https://kind-grass-07eb6d703.azurestaticapps.net?sessionid=${sessionId}&returnpath=${returnpath}}`
	);
}
