import { writable } from 'svelte/store';

// The aim here is for a centralised key/value store of input id and value
// Eventually these will all be sent over to a remote API to complete the initial phase of the journey
// In the intermediate time values will be updated as soon as an input is changed
// Other inputs can subscribe to this value for validation and hide/show functionality

export const data = writable([]);
