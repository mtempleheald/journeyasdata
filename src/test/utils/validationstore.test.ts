import { test, expect } from 'vitest';

const storeObject = {
	trueKey: true,
	falseKey: false,
	nullKey: null
};
test('true in store returns true', () => {
	expect(storeObject['trueKey']).toBe(true);
});
test('false in store returns false', () => {
	expect(storeObject['falseKey']).toBe(false);
});
test('null in store returns null', () => {
	expect(storeObject['nullKey']).toBeNull();
});
test('missing from store returns undefined', () => {
	const val: { [key: string]: unknown } = storeObject;
	expect(val['missingKey']).toBeUndefined();
});

const emptyStore: { [key: string]: any } = {};
test('empty store key lookup returns undefined', () => {
	expect(emptyStore['someKey']).toBeUndefined();
});

// This should never happen because the store is set up as an empty object during initialisation
const undefinedStore = undefined;
test('undefined store key lookup crashes out', () => {
	expect(() => undefinedStore!['someKey']).toThrow(Error);
});
