// The state store is a key component of this framework, existing as an in-memory key-value object.
// Each component is responsible for setting its own state - value and validation status.
// Any component at any time is allowed to access the store and refer to values set by other components.
// At times the journey may jump off to a third-party hosted page, for this we use sessionStorage to cache and retrieve the state.
// 
// Important - Currently technical demo's pageload-paymentprocessing action is firing early, whilst still on the external payment gateway stub
//             This prevents us from clearing sessionStorage manually on return without losing all state.
//             The in-memory values can be considered as the single source of truth under normal use, sessionStorage will clear when the tab is closed.
//			   TODO: Work out why this is happening - pageload events are in onMount so [should not be an SSR issue](https://svelte.dev/tutorial/onmount).
//					 I suspect it is a dev mode thing only
//
import { writable } from 'svelte/store';

function fromSessionStorage(key: string): object {
	console.debug('Retrieving state from sessionStorage');
	const sessionValue = sessionStorage.getItem(key);
	if (!sessionValue) return {};
	return JSON.parse(sessionValue);
}
function toSessionStorage(key: string, value: object): void {
	console.debug('Persisting state to sessionStorage');
	sessionStorage.setItem(key, JSON.stringify(value));
}

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
		reset: (value: { [key: string]: StateValueType }) => set(value),
		cache: (sessionId: string) => update((store) => { toSessionStorage(`state-${sessionId}`, store); return {} }),
		retrieve: (sessionId: string) => set(fromSessionStorage(`state-${sessionId}`))
	};
}

export const state = store();
