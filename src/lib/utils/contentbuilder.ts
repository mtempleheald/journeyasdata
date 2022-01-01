import snarkdown from 'snarkdown';

// Content is stored as a string, parsed as markdown, enriched with dynamic content
// TODO: Build up fluent API to improve readability by removing nested function calls e.g. content.injectDynamicContent().toHtml().sanitise()
// TypeScript example https://medium.com/@bensammons/building-a-fluent-interface-with-typescript-using-generics-in-typescript-3-4d206f00dba5
// VanillaJS example https://medium.com/simply-web-development/how-to-create-fluent-interfaces-the-easy-way-with-vanilla-javascript-2a61b6558f01
class ContentBuilder<
	RawMarkdown extends string = never, // as stored in journey.json
	DynamicContent extends string = never, // processed to inject values from session based on token replacement
	Html extends string = never, // After markdown parsing
	Sanitised extends string = never // Sanitise the rendered html (not essential given the content is managed internally)
> {}

class Content extends String {
	toHtml() {
		return snarkdown(this.toString());
	}
}

Object.assign(String.prototype, {
	toHtml() {
		return snarkdown(this);
	}
});

Object.defineProperty(String.prototype, 'toHtml', {
	value() {
		return snarkdown(this);
	}
});
