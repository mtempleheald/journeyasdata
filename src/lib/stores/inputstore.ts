import { writable } from 'svelte/store';

/*
    The input store is a Dictionary of key-value pairs (JavaScript object, dict["key"] = "value")
    - key is a string defined by questionset
    - value is a string provided by the user
    Pure JS example https://www.poftut.com/how-create-and-use-dictionary-in-javascript-tutorial-with-examples/
    The difficulty comes with having both the key and the value dynamic, data driven

    Whenever an input component is changed the store should be immediately updated (not the store's responsibility).  
    {"key1":"value1","key2":"value2"...}

    Any actions (validation, submission...) can refer to this store for input values, whilst respecting component boundaries.  
    $inputStore["keyx"]

    If needed, we can persist the entire input store on the client, but we must encrypt data, assume a shared machine.
    Example without encryption https://dev.to/danawoodman/svelte-quick-tip-connect-a-store-to-local-storage-4idi
    This is a possible future extension, not for right now

    If we need more complex store structures mirroring the questionset json...
    Nested stores https://github.com/sveltejs/svelte/issues/1435
    Example https://github.com/bradphelan/immer.loves.svelte
*/

function setValue(inputs, key, value) {
    // create new entry or overwrite regardless of what was set
    inputs[key] = value;
    return inputs;
}

function store() {
    const { subscribe, set, update} = writable({});

    return {
        subscribe,
        input: (key, value) => update(store => setValue(store, key, value)),
        reset: () => set({})
    };
}

export const inputStore = store();