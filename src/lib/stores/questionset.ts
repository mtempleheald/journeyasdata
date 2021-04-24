import { writable } from 'svelte/store';
import type { QuestionSet } from '$lib/types/QuestionSet'; // TODO use type safety in the store

// questionSet referenced in many places, updated only once, on first page which requests it
// TODO: implement custom store to prevent write
export const questionSet = writable([]);
