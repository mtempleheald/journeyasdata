import type { ActionStoreType } from '$lib/types/stores';
import { writable, type Writable } from 'svelte/store';

/*
    The action store is a Dictionary of key-value pairs (JavaScript object, dict["key"] = "value")
    - key is a string defined by journey
    - value is a function written by a developer
    Defined to be loaded once, and referenced where needed.
    Actions will vary by context, allowing bespoke logic for different sites
*/

function store() {
	const { subscribe, set }: Writable<ActionStoreType> = writable({});

	return {
		subscribe,
		load: (store: ActionStoreType) => set(store),
		reset: () => set({})
	};
}

export const actionStore = store();
