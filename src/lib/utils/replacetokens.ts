/**
 * Replace dynamic content tokens with display values from the state store
 */
export const replace_tokens = function (input: string | null | undefined, state: StateStoreType) {
	if (!input) return '';

	let output: string = input;

	// a valid key can only consist of alphanumeric characters or . (full stop) which is only allowed within repeating groups
	const re = new RegExp(/\{\{\s*(\w|\.)*\s*\}\}/gi);
	const tokens = input.match(re); // ['{{ tokentobereplaced }}', '{{anothertokentobereplaced}}']

	tokens &&
		tokens.forEach((t) => {
			// extract token id minus the brackets and any whitespace
			const id = t.substring(2, t.length - 2).trim();
			// Replace tokens with their values from the store, empty string if not found
			output = output.replace(
				t,
				`<output for="${id}">${state[id.toString()]?.display ?? ''}</output>`
			);
		});

	return output;
};
