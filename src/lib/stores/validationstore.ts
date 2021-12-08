import { writable } from 'svelte/store';

/*
    The validation store is a key-value store
    - key is a string defined by journey, matching a unique id for an input
    - value is a boolean, true if the input is valid, false otherwise.  Missing should be assumed invalid.
*/

function setValue(inputs, key: string, value: boolean) {
	// create new entry or overwrite regardless of what was set
	inputs[key] = value;
	return inputs;
}

function store() {
	const { subscribe, set, update } = writable({});

	return {
		subscribe,
		set: (key: string, value: boolean) => update((store) => setValue(store, key, value)),
		reset: (value: object) => set(value)
	};
}

export const validationStore = store();
