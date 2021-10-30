/**
 * @jest-environment jsdom
 */
import { render } from '@testing-library/svelte'
import Helptext from '$lib/components/Helptext.svelte'

test('Helptext renders default "help" label and no text', () => {
    const { queryByRole } = render(Helptext)
    console.log(queryByRole('button'))
    expect(queryByRole('button')).toHaveTextContent('help')
})

// TODO: Add tests to prove that passing in a slot will overwrite the default text and label