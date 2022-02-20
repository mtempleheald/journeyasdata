// Alternative approach to valueStore + displayValueStore + validationStore, https://github.com/mtempleheald/journeyasdata/issues/103
import { writable } from 'svelte/store';

type StateType = {
    key: string;
    value: string;
    display_value: string;
    valid: boolean;
}

function upsert(store: {[key: string]: StateType}, key: string, state: StateType) {
	// create new entry or overwrite regardless of what was set
	store[key] = state;
	return store;
}

function store() {
	const { subscribe, set, update } = writable({});

	return {
		subscribe,
		set: (key: string, state: StateType) => update((store) => upsert(store, key, state)),
		reset: (value: {[key: string]: StateType}) => set(value)
	};
}

export const state = store();
