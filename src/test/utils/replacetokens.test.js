import { replaceTokens } from '$lib/utils/replacetokens';

test('string identifier', () => {
	let identifier = 'string containing {{componentid}}';
	let displayValueStore = { componentid: 'displayvalue' };
	let expected = 'string containing displayvalue';
	expect(replaceTokens(identifier, displayValueStore)).toEqual(expected);
});

test('string identifier with whitespace', () => {
	let identifier = 'string containing {{ componentid    }}';
	let displayValueStore = { componentid: 'displayvalue' };
	let expected = 'string containing displayvalue';
	expect(replaceTokens(identifier, displayValueStore)).toEqual(expected);
});

test('numeric identifier, numeric in store', () => {
	let identifier = 'string containing {{1}}';
	let displayValueStore = { 1: 'displayvalue' };
	let expected = 'string containing displayvalue';
	expect(replaceTokens(identifier, displayValueStore)).toEqual(expected);
});

test('numeric identifier, string in store', () => {
	let identifier = 'string containing {{1}}';
	let displayValueStore = { 1: 'displayvalue' };
	let expected = 'string containing displayvalue';
	expect(replaceTokens(identifier, displayValueStore)).toEqual(expected);
});

test('string identifier, with repeat index', () => {
	let identifier = 'string containing {{componentid.1}}';
	let displayValueStore = { 'componentid.1': 'displayvalue' };
	let expected = 'string containing displayvalue';
	expect(replaceTokens(identifier, displayValueStore)).toEqual(expected);
});

test('numeric identifier, string in store, with repeat index', () => {
	let identifier = 'string containing {{1.1}}';
	let displayValueStore = { 1.1: 'displayvalue' };
	let expected = 'string containing displayvalue';
	expect(replaceTokens(identifier, displayValueStore)).toEqual(expected);
});

test('numeric identifier, nummeric in store, with repeat index', () => {
	let identifier = 'string containing {{1.1}}';
	let displayValueStore = { 1.1: 'displayvalue' };
	let expected = 'string containing displayvalue';
	expect(replaceTokens(identifier, displayValueStore)).toEqual(expected);
});

test('identifier not in store should replace with empty string', () => {
	let identifier = 'string containing {{componentid}}';
	let displayValueStore = {};
	let expected = 'string containing ';
	expect(replaceTokens(identifier, displayValueStore)).toEqual(expected);
});

test('null input', () => {
	expect(replaceTokens(null, {})).toEqual('');
});
