// Alternative approach to valueStore + displayValueStore + validationStore, https://github.com/mtempleheald/journeyasdata/issues/103
import type { StateRecordType, StateStoreType } from '$lib/types/journey';
import { writable } from 'svelte/store';


function upsert(store: StateStoreType, key: string, state: StateRecordType) {
	// create new entry or overwrite regardless of what was set
	store[key] = state;
	return store;
}

function store() {
	const { subscribe, set, update } = writable({});

	return {
		subscribe,
		set: (key: string, state: StateRecordType) => update((store) => upsert(store, key, state)),
		reset: (value: { [key: string]: StateRecordType }) => set(value)
	};
}

export const state = store();
