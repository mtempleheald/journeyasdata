import type { VehicleType } from '$lib/types/vehicle';
import { goto } from '$app/navigation';
import { state } from '$lib/stores/statestore';
import { PAYMENTGATEWAYURL } from '$lib/env';

export const actions = {
	simpleimagebutton: function () {
		let s: StateStoreType = {};
		const valueUnsubscriber = state.subscribe((x) => (s = x));
		console.debug(
			`Simple Image Button action was triggered with value ${s['simpleimagebutton']?.value}`
		);
		valueUnsubscriber();
	},
	vehicleregnum: lookup_vehicle,
	pagenext_outcome: go_to_payment_gateway,
	pageload_paymentprocessing: return_from_payment_gateway
};

async function lookup_vehicle() {
	console.debug('lookupVehicle()');
	let s: StateStoreType = {};
	let vehicle: VehicleType = {};
	const unsubscriber = state.subscribe((value) => (s = value));

	if (s['vehicleregnum']?.value) {
		console.debug('lookup vehicle by regnum');
		await fetch(`/api/vehicle/${s['vehicleregnum']?.value}`)
			.then((resp) => resp.json())
			.then((data) => (vehicle = data));
	}
	if (vehicle?.abicode) {
		console.debug('vehicle found');
		state.set('vehiclemake', { value: vehicle.make ?? '', display: vehicle.make, valid: true }); // TODO: work out how to standardise case to work with backend provider mapping (suggest UI only ever sees lowercase codes/keys)
		state.set('vehiclemanufactureyear', {
			value: vehicle.year?.toString() ?? '',
			display: vehicle.year?.toString(),
			valid: true
		});
		state.set('vehicleenginesize', {
			value: vehicle.enginecc ?? '',
			display: vehicle.enginecc ?? '',
			valid: true
		});
		state.set('vehiclefuel', {
			value: vehicle.fueltype ? mapFuel[vehicle.fueltype] ?? '' : '',
			display: vehicle.fueltype ? mapFuel[vehicle.fueltype] ?? '' : '',
			valid: true
		});
		state.set('vehicletransmission', {
			value: vehicle.transmission ? mapTransmission[vehicle.transmission] ?? '' : '',
			display: vehicle.transmission ? mapTransmission[vehicle.transmission] ?? '' : '',
			valid: true
		});
		state.set('vehicledoorcount', {
			value: vehicle.doors?.toString() ?? '',
			display: vehicle.doors?.toString() ?? '',
			valid: true
		});
		state.set('vehicleseatbeltcount', {
			value: vehicle.seatbelts?.toString() ?? '',
			display: vehicle.seatbelts?.toString() ?? '',
			valid: true
		});
	} else {
		console.debug('reset vehicle fields');
		state.set('vehiclemake', { value: undefined, display: undefined, valid: undefined });
		state.set('vehiclemanufactureyear', { value: undefined, display: undefined, valid: undefined });
		state.set('vehicleenginesize', { value: undefined, display: undefined, valid: undefined });
		state.set('vehiclefuel', { value: undefined, display: undefined, valid: undefined });
		state.set('vehicletransmission', { value: undefined, display: undefined, valid: undefined });
		state.set('vehicledoorcount', { value: undefined, display: undefined, valid: undefined });
		state.set('vehicleseatbeltcount', { value: undefined, display: undefined, valid: undefined });
	}
	// avoid memory leaks
	unsubscriber();
}
const mapFuel: { [key: string]: string } = {
	D: 'FuelDiesel',
	P: 'FuelPetrol',
	E: 'FuelElec'
};
const mapTransmission: { [key: string]: string } = {
	M: 'TransMan',
	A: 'TransAuto'
};

async function go_to_payment_gateway() {
	console.debug('go_to_payment_gateway()');
	const sessionId = 'demosessionid';
	const returnpath = 'paymentprocessing';

	state.cache(sessionId);

	// Jump out of the journey on to a separate website which will redirect us back when done with the same sessionId
	// TODO: parameterise this centrally (env)
	goto(`${PAYMENTGATEWAYURL}?sessionid=${sessionId}&returnpath=${returnpath}`);
}

async function return_from_payment_gateway() {
	console.debug('return_from_payment_gateway()');
	// TODO: consider adding a unique sessionid, more relevant for localStorage shared across tabs but may be required
	const sessionId = 'demosessionid';

	// Regenerate the in-memory stores with values from sessionStorage
	state.retrieve(sessionId);

	// redirect based on the payment status provided by the payment gateway
	const queryParams = new URLSearchParams(window.location.search);
	const paymentstatus = queryParams.get('paymentstatus');
	switch (paymentstatus) {
		case 'CANCELLED':
			goto('/outcome'); // back to just before payment, let the user decide what to do next
			break;
		case 'COMPLETED':
			goto('/confirmation'); // all successful, have paid, we just need to confirm details to the user
			break;
		case 'ERROR':
			goto('/payment-error'); // failed to take payment, tell the user this so that they can trust us
			break;
		default:
			goto('technical-error'); // We haven't handled all routes, best assume something went wrong here, fix and redeploy
	}
}
