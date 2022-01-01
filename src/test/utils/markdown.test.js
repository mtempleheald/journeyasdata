import markdown from '$lib/utils/markdown';

test('title', () => {
	const input = '# Title';
	const expected = '<h1>Title</h1>';
	expect(markdown(input)).toEqual(expected);
});
test('list', () => {
	const input = '- list item 1\n- list item 2';
	const expected = '<ul><li>list item 1</li><li>list item 2</li></ul>';
	expect(markdown(input)).toEqual(expected);
});
test('bold', () => {
	const input = 'some __bold__ text in the middle';
	const expected = 'some <strong>bold</strong> text in the middle';
	expect(markdown(input)).toEqual(expected);
});
test('italic', () => {
	const input = 'some _italic_ text in the middle';
	const expected = 'some <em>italic</em> text in the middle';
	expect(markdown(input)).toEqual(expected);
});
test('link', () => {
	const input = 'a hyperlink [BBC](https://bbc.co.uk) with some text after';
	const expected = 'a hyperlink <a href="https://bbc.co.uk">BBC</a> with some text after';
	expect(markdown(input)).toEqual(expected);
});
test('null input', () => {
	const input = null;
	const expected = '';
	expect(markdown(input)).toEqual(expected);
});

// TODO: allow these features by switching to a better markdown library (Remark?)
test.skip('horizontal rule', () => {
	const input = '---';
	const expected = '<hr/>';
	expect(markdown(input)).toEqual(expected);
});
test.skip('table', () => {
	const input = '|header1|header2|\n\n|--|--|\n\n|data1|data2|';
	const expected =
		'<table><tr><th>header1</th><th>header2</th></tr><tr><td>data1</td><td>data2</td></tr><table>';
	expect(markdown(input)).toEqual(expected);
});
