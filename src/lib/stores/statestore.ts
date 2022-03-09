// Alternative approach to valueStore + displayValueStore + validationStore, https://github.com/mtempleheald/journeyasdata/issues/103
import { writable } from 'svelte/store';

function upsert(store: StateStoreType, key: string, state: StateValueType) {
	// create new entry or overwrite regardless of what was set
	store[key] = state;
	return store;
}

function store() {
	const { subscribe, set, update } = writable({});

	return {
		subscribe,
		set: (key: string, state: StateValueType) => update((store) => upsert(store, key, state)),
		reset: (value: { [key: string]: StateValueType }) => set(value)
	};
}

export const state = store();
