import type { InputComponent } from '$lib/types/journey';
import { componentValid, component_valid } from '$lib/utils/validators';

test('InputComponent valid if state store says it is', () => {
	const comp: InputComponent = {
		id: '1',
		type: 'Text'
	};
	const state: StateStoreType = {
		'1': {
			value: '',
			display: '',
			valid: true
		}		
	}
	expect (component_valid(comp, state)).toBe(true);
})
// TODO: rework all below functions to use state store








test('input provided, valid', () => {
	const comp: InputComponent = {
		id: '1',
		type: 'Text'
	};
	const value = {
		'1': 'test'
	};
	const validity = {
		'1': true
	};
	expect(componentValid(comp, value, validity)).toBe(true);
});
test('input provided, invalid', () => {
	const comp: InputComponent = {
		id: '1',
		type: 'Text'
	};
	const value = {
		'1': 'test'
	};
	const validity = {
		'1': false
	};
	expect(componentValid(comp, value, validity)).toBe(false);
});
test('input optional, skipped', () => {
	const comp: InputComponent = {
		id: '1',
		type: 'Text'
	};
	expect(componentValid(comp, {}, {})).toBe(true);
});
test('input required, skipped', () => {
	const comp: InputComponent = {
		id: '1',
		type: 'Text',
		required: true
	};
	expect(componentValid(comp, {}, {})).toBe(false);
});
test('input required, skipped, hidden', () => {
	const comp: InputComponent = {
		id: '2',
		type: 'Text',
		required: true,
		dependsupon: {
			id: '1',
			value: 'Y'
		}
	};
	const value = {
		'1': 'N'
	};
	const validity = {
		'1': true
	};
	expect(componentValid(comp, value, validity)).toBe(true);
});
test('input required, skipped, not hidden', () => {
	const comp: InputComponent = {
		id: '2',
		type: 'Text',
		required: true,
		dependsupon: {
			id: '1',
			value: 'Y'
		}
	};
	const value = {
		'1': 'Y'
	};
	const validity = {
		'1': true
	};
	expect(componentValid(comp, value, validity)).toBe(false);
});
test('display component', () => {
	const comp = {
		type: 'Displayblock',
		content: 'test'
	};
	// @ts-ignore
	expect(componentValid(comp, {}, {})).toBe(true);
});
test('repeating group component', () => {
	const comp: InputComponent = {
		id: 'componentid.0',
		type: 'Text'
	};
	const value = {
		'componentid.0': 'test'
	};
	const validity = {
		'componentid.0': true
	};
	expect(componentValid(comp, value, validity)).toBe(true);
});

// TODO: Add section/page validation tests to cover repeating groups in particular

// TODO: this is more of a component test than a validator test, move it out of here...
test.skip('input (required, all fields) valid', () => {
	const comp: InputComponent = {
		id: '1',
		type: 'Text',
		label: 'Label',
		placeholder: 'Placeholder',
		errorMessage: 'Error message',
		help: 'Help text',
		pre: 'Pre-text',
		post: 'Post-text',
		required: true,
		value: 'default value'
	};
	const value = {
		'1': 'test'
	};
	const valid = {
		'1': true
	};
	expect(componentValid(comp, value, valid)).toBe(true);
});
