import { writable } from 'svelte/store';

// questionSet referenced in many places, updated only once, on first page which requests it
// TODO: implement custom store to prevent write
export const questionSet = writable([]);
