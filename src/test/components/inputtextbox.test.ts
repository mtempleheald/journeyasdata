/**
 * @jest-environment jsdom
 */
import { render } from '@testing-library/svelte';
import type { InputComponent } from '$lib/types/journey';
import InputTextbox from '$lib/components/InputTextbox.svelte';

// An input component with neither a label nor pre-text isn't much use, but it still shouldn't crash the application
test('Textbox renders with only required properties', () => {
	const component: InputComponent = {
		type: 'Text',
		id: 'uniqueidentifier'
	};
	const { container } = render(InputTextbox, { component: component });
	expect(container).toContainHTML('id="_uniqueidentifier"');
});

test('Textbox renders label correctly', () => {
	const component: InputComponent = {
		type: 'Text',
		id: 'uniqueidentifier',
		label: 'My label'
	};
	const { getByLabelText } = render(InputTextbox, { component: component });
	expect(getByLabelText('My label')).toBeInTheDocument();
});

test('Textbox renders placeholder correctly', () => {
	const component: InputComponent = {
		type: 'Text',
		id: 'uniqueidentifier',
		placeholder: 'My placeholder'
	};
	const { getByPlaceholderText } = render(InputTextbox, { component: component });
	expect(getByPlaceholderText(component.placeholder)).toBeInTheDocument();
});

test('Textbox renders required if required', () => {
	const component: InputComponent = {
		type: 'Text',
		id: 'uniqueidentifier',
		label: 'My label',
		required: true
	};
	const { getByRole } = render(InputTextbox, { component: component });
	expect(getByRole('textbox', { name: `${component.label} *` })).toBeRequired();
});

test('Textbox does not render required if not required', () => {
	const component: InputComponent = {
		type: 'Text',
		id: 'uniqueidentifier',
		label: 'My label'
	};
	const { getByRole } = render(InputTextbox, { component: component });
	expect(getByRole('textbox', { name: component.label })).not.toBeRequired();
});

test('Textbox renders without value if not specified', () => {
	const component: InputComponent = {
		type: 'Text',
		id: 'uniqueidentifier',
		label: 'My label'
	};
	const { getByRole } = render(InputTextbox, { component: component });
	expect(getByRole('textbox', { name: component.label })).toHaveValue('');
});

test('Textbox renders with default value if specified', () => {
	const component: InputComponent = {
		type: 'Text',
		id: 'uniqueidentifier',
		label: 'My label',
		value: 'default value'
	};
	const { getByRole } = render(InputTextbox, { component: component });
	expect(getByRole('textbox', { name: component.label })).toHaveValue(component.value);
});

// TODO: test pre/post slots when this becomes possible (pending PRs)
test.skip('Textbox renders pre-text correctly', () => {
	const component: InputComponent = {
		type: 'Text',
		id: 'uniqueidentifier'
	};
	//const pre = 'Some text';
	const { getByText } = render(InputTextbox, { component: component });
	expect(getByText('Some text')).toBeInTheDocument();
});

// TODO: add tests for help text and error messages
