import { replace_tokens } from '$lib/utils/replacetokens';

test('String identifier without whitespace, expect replacement', () => {
	const input = 'string containing {{componentid}}';
	const state = { componentid: {display:'displayvalue'} };
	const expected = 'string containing <output for="componentid">displayvalue</output>';
	expect(replace_tokens(input, state)).toEqual(expected);
});

test('string identifier with whitespace, expect replacement', () => {
	const input = 'string containing {{ componentid    }}';
	const state = { componentid: {display:'displayvalue'} };
	const expected = 'string containing <output for="componentid">displayvalue</output>';
	expect(replace_tokens(input, state)).toEqual(expected);
});

test('numeric identifier, numeric in store, expect replacement', () => {
	const input = 'string containing {{1}}';
	const state = { 1: {display:'displayvalue'} };
	const expected = 'string containing <output for="1">displayvalue</output>';
	expect(replace_tokens(input, state)).toEqual(expected);
});

test('numeric identifier, string in store, expect replacement', () => {
	const input = 'string containing {{1}}';
	const state = { '1': {display:'displayvalue'} };
	const expected = 'string containing <output for="1">displayvalue</output>';
	expect(replace_tokens(input, state)).toEqual(expected);
});

test('string identifier, with repeat index', () => {
	const input = 'string containing {{componentid.1}}';
	const state = { 'componentid.1': {display:'displayvalue'} };
	const expected = 'string containing <output for="componentid.1">displayvalue</output>';
	expect(replace_tokens(input, state)).toEqual(expected);
});

test('numeric identifier, string in store, with repeat index', () => {
	const input = 'string containing {{1.1}}';
	const state = { 1.1: {display:'displayvalue'} };
	const expected = 'string containing <output for="1.1">displayvalue</output>';
	expect(replace_tokens(input, state)).toEqual(expected);
});

test('numeric identifier, nummeric in store, with repeat index', () => {
	const input = 'string containing {{1.1}}';
	const state = { 1.1: {display:'displayvalue'} };
	const expected = 'string containing <output for="1.1">displayvalue</output>';
	expect(replace_tokens(input, state)).toEqual(expected);
});

test('identifier not in store should replace with empty string', () => {
	const input = 'string containing {{componentid}}';
	const state = {};
	const expected = 'string containing <output for="componentid"></output>';
	expect(replace_tokens(input, state)).toEqual(expected);
});

test('null input', () => {
	expect(replace_tokens(null, {})).toEqual('');
});
