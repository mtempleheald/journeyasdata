import { afterEach, describe, it, expect } from 'vitest';
import { cleanup, render } from '@testing-library/svelte';

import type { InputComponent } from '$lib/types/journey';
import InputTextbox from '$lib/components/InputTextbox.svelte';

describe('Textbox component', () => {
	// TODO: @testing-library/svelte claims to add this automatically but it doesn't work without explicit afterEach
	afterEach(() => cleanup());

	// An input component with neither a label nor pre-text isn't much use, but it still shouldn't crash the application
	it('renders with only required properties', () => {
		const component: InputComponent = {
			type: 'Text',
			id: 'uniqueidentifier'
		};
		const { container } = render(InputTextbox, { component: component });
		expect(container.querySelector('#_uniqueidentifier')).toBeInstanceOf(HTMLInputElement);
	});
});
// TODO: port over the remaining Jest tests (without depending on Jest), resolving issues such as:
// Error: Invalid Chai property: toBeInTheDocument
