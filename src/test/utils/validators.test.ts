import type { InputComponent } from '$lib/types/journey';
import { component_valid } from '$lib/utils/validators';

test('InputComponent valid if state valid', () => {
	const comp: InputComponent = {
		id: '1',
		type: 'Text'
	};
	const state: StateStoreType = {
		'1': {
			value: undefined,
			display: undefined,
			valid: true
		}
	};
	expect(component_valid(comp, state)).toBe(true);
});
test('InputComponent invalid if state invalid', () => {
	const comp: InputComponent = {
		id: '1',
		type: 'Text'
	};
	const state: StateStoreType = {
		'1': {
			value: undefined,
			display: undefined,
			valid: false
		}
	};
	expect(component_valid(comp, state)).toBe(false);
});
test('InputComponent valid if not required and skipped', () => {
	const comp: InputComponent = {
		id: '1',
		type: 'Text'
	};
	const state: StateStoreType = {};
	expect(component_valid(comp, state)).toBe(true);
});
test('InputComponent invalid if required and skipped', () => {
	const comp: InputComponent = {
		id: '1',
		type: 'Text',
		required: true
	};
	const state: StateStoreType = {};
	expect(component_valid(comp, state)).toBe(false);
});

test('InputComponent valid if required but skipped due to dependency', () => {
	const comp: InputComponent = {
		id: '2',
		type: 'Text',
		required: true,
		dependsupon: {
			id: '1',
			value: 'Y'
		}
	};
	const state: StateStoreType = {
		'1': {
			value: 'N',
			display: 'No',
			valid: true
		}
	};
	expect(component_valid(comp, state)).toBe(true);
});
test('InputComponent invalid if required and not skipped due to dependency', () => {
	const comp: InputComponent = {
		id: '2',
		type: 'Text',
		required: true,
		dependsupon: {
			id: '1',
			value: 'Y'
		}
	};
	const state: StateStoreType = {
		'1': {
			value: 'Y',
			display: 'Yes',
			valid: true
		}
	};
	expect(component_valid(comp, state)).toBe(false);
});
test('InputComponent valid within a repeating group', () => {
	const comp: InputComponent = {
		id: 'componentid.0',
		type: 'Text'
	};
	const state: StateStoreType = {
		'1': {
			value: undefined,
			display: undefined,
			valid: true
		}
	};
	expect(component_valid(comp, state)).toBe(true);
});

// Display components (no id required)
test('DisplayBlock valid regardless of state', () => {
	const comp = {
		type: 'Displayblock',
		content: 'test'
	};
	const state: StateStoreType = {};
	// @ts-ignore
	expect(component_valid(comp, state)).toBe(true);
});
