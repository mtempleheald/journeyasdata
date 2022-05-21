import { describe, it, expect } from 'vitest';
import { render } from '@testing-library/svelte';
import '@testing-library/jest-dom';

import Helptext from '$lib/components/Helptext.svelte';

describe('Helptext component', () => {
	it('Helptext renders default "help" label and no text', () => {
		const { queryByRole } = render(Helptext);
		expect(queryByRole('button')).toHaveTextContent('help');
	});
});

// TODO: Add tests to prove that passing in a slot will overwrite the default text and label
