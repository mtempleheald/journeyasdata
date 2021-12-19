import { writable } from 'svelte/store';

/*
  We normally hold session data within in-memory svelte stores.
  This won't work with navigation to/from another website, e.g. payment gateway.
  Session storage persists for tab lifetime (IE11 has a bug) so is ideal.

  Store a single value in sessionStorage containing all data from memory.
  On return extract this object and regenerate individual in-memory stores.
*/

// TODO: decrypt before returning
function getValue(key: string): object {
	const sessionValue = sessionStorage.getItem(key);
	if (!sessionValue) return {};
	return JSON.parse(sessionValue);
}
// TODO: encrypt before storing
function setValue(key: string, value: object): void {
	sessionStorage.setItem(key, JSON.stringify(value));
}
// TODO: Consider tidying up, or rely on browser tab close
// function removeValue(key: string): void {
// 	sessionStorage.removeItem(key);
// }

// Use the svelte writable store as a base
// Example: https://developer.mozilla.org/en-US/docs/Learn/Tools_and_testing/Client-side_JavaScript_frameworks/Svelte_stores#implementing_our_custom_todos_store
export const sessionStorageStore = (key: string) => {
	// initialise sessionStorage
	if (sessionStorage.getItem(key) === null) {
		setValue(key, {});
	}

	// create the store
	const { subscribe, set, update } = writable(getValue(key));

	return {
		subscribe,
		set: (value: object) => {
			setValue(key, value);
			return set(value);
		},
		update
	};
};

// Implement Svelte's store contract directly without dependency on svelte/store
// Example: https://developer.mozilla.org/en-US/docs/Learn/Tools_and_testing/Client-side_JavaScript_frameworks/Svelte_stores#how_to_implement_a_store_contract_the_theory
export const sessionStorageStoreManual = (key: string, initial: any = {}) => {
	let value = getValue(key) ?? initial;
	let subscribers = [];

	const subscribe = (handler: any) => {
		subscribers = [...subscribers, handler]; // add this handler to array of subscribers
		handler(getValue(key)); // call handler with current value
		return () => (subscribers = subscribers.filter((sub) => sub !== handler)); // return unsubscribe function
	};

	const set = (new_value: any) => {
		if (value === new_value) return;
		// value has changed, update store and sessionStorage
		value = new_value;
		setValue(key, value);
		subscribers.forEach((sub) => sub(value)); // update all current subscribers
	};

	const update = (update_fn: any) => set(update_fn(value));

	return { subscribe, set, update }; // store contract
};
