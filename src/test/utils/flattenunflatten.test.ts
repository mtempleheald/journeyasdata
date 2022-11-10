import { expect } from 'vitest';

import { flatten, unflatten } from '$lib/utils/flattenunflatten';

describe('Flattener/Unflattener', () => {
	it('should return the original object if flattened and unflatted', () => {
		let original = {
			'string-key': {
				'string-value': {
					value: 'string',
					display: 'string',
					valid: true
				}
			},
			'date-key': {
				'string-value': {
					value: '2000-01-01',
					display: '01/01/2000',
					valid: true
				}
			},
			'number-key': {
				'string-value': {
					value: 123,
					display: 123,
					valid: true
				}
			}
		};
		let flattened = {
			'string-key.string-value.value': 'string',
			'string-key.string-value.display': 'string',
			'string-key.string-value.valid': true,
			'date-key.string-value.value': '2000-01-01',
			'date-key.string-value.display': '01/01/2000',
			'date-key.string-value.valid': true,
			'number-key.string-value.value': 123,
			'number-key.string-value.display': 123,
			'number-key.string-value.valid': true
		};
		expect(flatten(original)).toEqual(flattened);
		expect(unflatten(flattened)).toEqual(original);
	});

	it('should treat number as array index', () => {
		const original = {
			a: [
				{
					b: 1,
					c: 'x'
				},
				{
					b: 2,
					c: 'y'
				}
			]
		};
		const flattened = {
			'a.0.b': 1,
			'a.0.c': 'x',
			'a.1.b': 2,
			'a.1.c': 'y'
		};
		expect(flatten(original)).toEqual(flattened);
		expect(unflatten(flattened)).toEqual(original);
	});

	it('should unflatten store', () => {
		let input = {
			'componentid.0': 'value of first iteration of component',
			'componentid.1': 'value of second iteration of component'
		};
		let expected = {
			componentid: [
				'value of first iteration of component',
				'value of second iteration of component'
			]
		};
		expect(unflatten(input)).toEqual(expected);
	});
	it('should flatten for rebuilding store', () => {
		let input = {
			componentid: [
				'value of first iteration of component',
				'value of second iteration of component'
			]
		};
		let expected = {
			'componentid.0': 'value of first iteration of component',
			'componentid.1': 'value of second iteration of component'
		};
		expect(flatten(input)).toEqual(expected);
	});
});
