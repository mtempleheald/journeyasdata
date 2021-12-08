import { writable } from 'svelte/store';

function setValue(values, key: string, value: string) {
	// create new entry or overwrite regardless of what was set
	values[key] = value;
	return values;
}

function store() {
	const { subscribe, set, update } = writable({});

	return {
		subscribe,
		set: (key: string, value: string) => update((store) => setValue(store, key, value)),
		reset: (value: object) => set(value)
	};
}

export const displayValueStore = store();
