import { replaceTokens } from '$lib/utils/replacetokens';

test('string identifier', () => {
	const identifier = 'string containing {{componentid}}';
	const displayValueStore = { componentid: 'displayvalue' };
	const expected = 'string containing displayvalue';
	expect(replaceTokens(identifier, displayValueStore)).toEqual(expected);
});

test('string identifier with whitespace', () => {
	const identifier = 'string containing {{ componentid    }}';
	const displayValueStore = { componentid: 'displayvalue' };
	const expected = 'string containing displayvalue';
	expect(replaceTokens(identifier, displayValueStore)).toEqual(expected);
});

test('numeric identifier, numeric in store', () => {
	const identifier = 'string containing {{1}}';
	const displayValueStore = { 1: 'displayvalue' };
	const expected = 'string containing displayvalue';
	expect(replaceTokens(identifier, displayValueStore)).toEqual(expected);
});

test('numeric identifier, string in store', () => {
	const identifier = 'string containing {{1}}';
	const displayValueStore = { 1: 'displayvalue' };
	const expected = 'string containing displayvalue';
	expect(replaceTokens(identifier, displayValueStore)).toEqual(expected);
});

test('string identifier, with repeat index', () => {
	const identifier = 'string containing {{componentid.1}}';
	const displayValueStore = { 'componentid.1': 'displayvalue' };
	const expected = 'string containing displayvalue';
	expect(replaceTokens(identifier, displayValueStore)).toEqual(expected);
});

test('numeric identifier, string in store, with repeat index', () => {
	const identifier = 'string containing {{1.1}}';
	const displayValueStore = { 1.1: 'displayvalue' };
	const expected = 'string containing displayvalue';
	expect(replaceTokens(identifier, displayValueStore)).toEqual(expected);
});

test('numeric identifier, nummeric in store, with repeat index', () => {
	const identifier = 'string containing {{1.1}}';
	const displayValueStore = { 1.1: 'displayvalue' };
	const expected = 'string containing displayvalue';
	expect(replaceTokens(identifier, displayValueStore)).toEqual(expected);
});

test('identifier not in store should replace with empty string', () => {
	const identifier = 'string containing {{componentid}}';
	const displayValueStore = {};
	const expected = 'string containing ';
	expect(replaceTokens(identifier, displayValueStore)).toEqual(expected);
});

test('null input', () => {
	expect(replaceTokens(null, {})).toEqual('');
});
