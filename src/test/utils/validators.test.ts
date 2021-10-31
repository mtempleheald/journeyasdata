import type { DisplayComponent, InputComponent} from '$lib/types/journey'
import { componentValid } from '$lib/utils/validators'

test('input provided, valid', () => {
    let comp: InputComponent = {
        "id": "1",
        "type": "Text",
    }
    let value = {
        "1": "test"
    }
    let validity = {
        "1": true
    }
    expect(componentValid(comp, value, validity)).toBe(true)
})
test('input provided, invalid', () => {
    let comp: InputComponent = {
        "id": "1",
        "type": "Text",
    }
    let value = {
        "1": "test"
    }
    let validity = {
        "1": false
    }
    expect(componentValid(comp, value, validity)).toBe(false)
})
test('input optional, skipped', () => {
    let comp: InputComponent = {
        "id": "1",
        "type": "Text",
    }
    expect(componentValid(comp, {}, {})).toBe(true)
})
test('input required, skipped', () => {
    let comp: InputComponent = {
        "id": "1",
        "type": "Text",
        "required": true
    }
    expect(componentValid(comp, {}, {})).toBe(false)
})
test('input required, skipped, hidden', () => {
    let comp: InputComponent = {
        "id": "2",
        "type": "Text",
        "required": true,
        "dependsupon": {
            "id": "1",
            "value": "Y"
        },
    }
    let value = {
        "1": "N",
    }
    let validity = {
        "1": true
    }
    expect(componentValid(comp, value, validity)).toBe(true)
})
test('input required, skipped, not hidden', () => {
    let comp: InputComponent = {
        "id": "2",
        "type": "Text",
        "required": true,
        "dependsupon": {
            "id": "1",
            "value": "Y"
        },
    }
    let value = {
        "1": "Y",
    }
    let validity = {
        "1": true
    }
    expect(componentValid(comp, value, validity)).toBe(false)
})
test('display component', () => {
    let comp = {
        "type": "Displayblock", 
        "content": "test"
    }
    // @ts-ignore
    expect(componentValid(comp, {}, {})).toBe(true)
})
test('repeating group component', () => {
    let comp: InputComponent = {
        "id": "componentid.0",
        "type": "Text",
    }
    let value = {
        "componentid.0": "test"
    }
    let validity = {
        "componentid.0": true
    }
    expect(componentValid(comp, value, validity)).toBe(true)
})

// TODO: Add section/page validation tests to cover repeating groups in particular




// TODO: this is more of a component test than a validator test, move it out of here...
test.skip('input (required, all fields) valid', () => {
    let comp: InputComponent = {
        "id": "1",
        "type": "Text",
        "label": "Label",
        "placeholder": "Placeholder",
        "errorMessage": "Error message",
        "help": "Help text",
        "pre": "Pre-text",
        "post": "Post-text",
        "required": true,
        "value": "default value",
    }
    let value = {
        "1": "test"
    }
    let valid = {
        "1": true
    }
    expect(componentValid(comp, value, valid)).toBe(true)
})