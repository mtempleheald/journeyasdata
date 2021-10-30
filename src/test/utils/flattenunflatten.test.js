import { flatten, unflatten } from '$lib/utils/flattenunflatten'

test('unflatten value store', () => {
    let input = {
        "componentid.0": "value of first iteration of component",
        "componentid.1": "value of second iteration of component",
    }
    let expected = {
        "componentid": {
            0: "value of first iteration of component",
            1: "value of second iteration of component"
        }
    }
    expect(unflatten(input)).toEqual(expected)
})
test('flatten for rebuilding value store', () => {
    let input = {
        "componentid": {
            0: "value of first iteration of component",
            1: "value of second iteration of component"
        }
    }
    let expected = {
        "componentid.0": "value of first iteration of component",
        "componentid.1": "value of second iteration of component",
    }
    expect(flatten(input)).toEqual(expected)
})