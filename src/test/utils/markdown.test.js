import { parseMarkdown } from '$lib/utils/markdown';

test('title', () => {
	let input = '# Title';
	let expected = '<h1>Title</h1>';
	expect(parseMarkdown(input)).toEqual(expected);
});
test('list', () => {
	let input = '- list item 1\n- list item 2';
	let expected = '<ul><li>list item 1</li><li>list item 2</li></ul>';
	expect(parseMarkdown(input)).toEqual(expected);
});
test('bold', () => {
	let input = 'some __bold__ text in the middle';
	let expected = 'some <strong>bold</strong> text in the middle';
	expect(parseMarkdown(input)).toEqual(expected);
});
test('italic', () => {
	let input = 'some _italic_ text in the middle';
	let expected = 'some <em>italic</em> text in the middle';
	expect(parseMarkdown(input)).toEqual(expected);
});
test('link', () => {
	let input = 'a hyperlink [BBC](https://bbc.co.uk) with some text after';
	let expected = 'a hyperlink <a href="https://bbc.co.uk">BBC</a> with some text after';
	expect(parseMarkdown(input)).toEqual(expected);
});
test('null input', () => {
	let input = null;
	let expected = '';
	expect(parseMarkdown(input)).toEqual(expected);
});

// TODO: allow these features by switching to a better markdown library (Remark?)
test.skip('horizontal rule', () => {
	let input = '---';
	let expected = '<hr/>';
	expect(parseMarkdown(input)).toEqual(expected);
});
test.skip('table', () => {
	let input = '|header1|header2|\n\n|--|--|\n\n|data1|data2|';
	let expected =
		'<table><tr><th>header1</th><th>header2</th></tr><tr><td>data1</td><td>data2</td></tr><table>';
	expect(parseMarkdown(input)).toEqual(expected);
});
