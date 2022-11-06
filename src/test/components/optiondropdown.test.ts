import { afterEach, describe, it, expect } from 'vitest';
import { cleanup, render } from '@testing-library/svelte';
import '@testing-library/jest-dom';

import type { OptionComponent } from '$lib/types/journey';
import OptionDropdown from '$lib/components/OptionDropdown.svelte';

describe('Textbox component', () => {
	// TODO: @testing-library/svelte claims to add this automatically but it doesn't work without explicit afterEach
	afterEach(() => cleanup());

	// An option component with neither a label nor source values isn't much use, but it still shouldn't crash the application
	it('renders with only required properties', () => {
		const component: OptionComponent = {
			type: 'OptionDropdown',
			id: 'uniqueidentifier'
		};
		const { container } = render(OptionDropdown, { component: component });
		expect(container.querySelector('#_uniqueidentifier')).toBeInstanceOf(HTMLSelectElement);
	});

	it('renders label correctly', () => {
		const component: OptionComponent = {
			type: 'OptionDropdown',
			id: 'uniqueidentifier',
			label: 'My label'
		};
		const { getByLabelText } = render(OptionDropdown, { component: component });
		expect(getByLabelText('My label')).toBeInTheDocument();
	});

	it('renders all provided options', () => {
		const component: OptionComponent = {
			type: 'OptionDropdown',
			id: 'uniqueidentifier',
			label: 'My Label',
			values: [
				{ value: 'one', display: 'One' },
				{ value: 'two', display: 'Two' }
			]
		};
		const { getAllByRole } = render(OptionDropdown, { component: component });
		expect(getAllByRole('option')).toHaveLength((component.values?.length ?? 0) + 1);
	});

	it('renders a single default option if values not provided', () => {
		const component: OptionComponent = {
			type: 'OptionDropdown',
			id: 'uniqueidentifier',
			label: 'My Label',
			values: []
		};
		const { getAllByRole } = render(OptionDropdown, { component: component });
		expect(getAllByRole('option')).toHaveLength(1);
	});

	it('renders placeholder correctly', () => {
		const component: OptionComponent = {
			type: 'OptionDropdown',
			id: 'uniqueidentifier',
			label: 'My Label',
			placeholder: 'My placeholder',
			values: []
		};
		const { getByRole } = render(OptionDropdown, { component: component });
		expect(getByRole('combobox', { name: `${component.label}` })).toHaveTextContent(
			'My placeholder'
		);
	});

	it('renders default placeholder correctly', () => {
		const component: OptionComponent = {
			type: 'OptionDropdown',
			id: 'uniqueidentifier',
			label: 'My Label',
			values: []
		};
		const { getByRole } = render(OptionDropdown, { component: component });
		expect(getByRole('combobox', { name: `${component.label}` })).toHaveTextContent('-- select --');
	});

	it('renders required if required', () => {
		const component: OptionComponent = {
			type: 'OptionDropdown',
			id: 'uniqueidentifier',
			label: 'My label',
			required: true
		};
		const { getByRole } = render(OptionDropdown, { component: component });
		expect(getByRole('combobox', { name: `${component.label} *` })).toBeRequired();
	});

	it('does not render required if not required', () => {
		const component: OptionComponent = {
			type: 'OptionDropdown',
			id: 'uniqueidentifier',
			label: 'My label'
		};
		const { getByRole } = render(OptionDropdown, { component: component });
		expect(getByRole('combobox', { name: component.label })).not.toBeRequired();
	});

	it('renders with default value if specified', () => {
		const component: OptionComponent = {
			type: 'OptionDropdown',
			id: 'uniqueidentifier',
			label: 'My label',
			value: 'default',
			values: [
				{ value: 'x', display: 'Another Value' },
				{ value: 'default', display: 'Default Value' }
			]
		};
		const { getByRole } = render(OptionDropdown, { component: component });
		expect((getByRole('option', { name: 'Default Value' }) as HTMLOptionElement).selected).toBe(
			true
		);
	});

	// TODO: add tests for help text and error messages, pre and post markdown
});
