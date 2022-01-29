export {};

const validationStoreObject = {
	trueKey: true,
	falseKey: false,
	nullKey: null
};
test('true in store returns true', () => {
	expect(validationStoreObject['trueKey']).toBe(true);
});
test('false in store returns false', () => {
	expect(validationStoreObject['falseKey']).toBe(false);
});
test('null in store returns null', () => {
	expect(validationStoreObject['nullKey']).toBeNull();
});
test('missing from store returns undefined', () => {
	expect(validationStoreObject['missingKey']).toBeUndefined();
});

const emptyStore = {};
test('empty store key lookup returns undefined', () => {
	expect(emptyStore['someKey']).toBeUndefined();
});

// This should never happen because the store is set up as an empty object during initialisation
const undefinedStore = undefined;
test('undefined store key lookup crashes out', () => {
	expect(() => undefinedStore['someKey']).toThrow(Error);
});
