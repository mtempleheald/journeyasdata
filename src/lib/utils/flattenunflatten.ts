type FlatObjectType = { [key: string]: unknown };

export function flatten(input: object): FlatObjectType {
	const result: FlatObjectType = {};

	function recurse(source_object: object, target_property: string) {
		if (Object(source_object) !== source_object) {
			// source object can be converted to a standard JS type, so we are done
			// Object({}) == {} 				// false
			// Object([]) == [] 				// false
			// Object(null) == null 			// false
			// Object(undefined) == undefined 	// false
			// Object('a') == 'a' 				// true
			// Object(1) == 1					// true
			// let d = Date.now; Object(d) == d // true
			// Object(false) == false			// true
			result[target_property] = source_object;
		} else if (Array.isArray(source_object)) {
			// This is an array, so loop through children and append index to property name for each
			const l = source_object.length;
			for (let i = 0; i < l; i++) {
				recurse(source_object[i], `${target_property}.${i}`);
			}
			if (l == 0) {
				result[target_property] = [];
			}
		} else {
			// We're dealing with an object, so check for child properties
			let is_empty = true;
			for (const child_property in source_object) {
				// This object has child properties, so loop through children and build up property name
				is_empty = false;
				recurse(
					(source_object as FlatObjectType)[child_property] as object,
					target_property ? `${target_property}.${child_property}` : child_property
				);
			}
			if (is_empty && target_property) {
				// no child properties, so we're left with the empty object
				result[target_property] = {};
			}
		}
	}

	recurse(input, '');

	return result;
}

type IndexableObjectType = { [key: string]: unknown };

export function unflatten(input: FlatObjectType): object {
	if (Object(input) !== input || Array.isArray(input)) {
		// no need to unflatten primitive objects or arrays
		return input;
	}
	const result: object = {};

	// Only support alphanumeric and hyphens in component id/key
	// Expecting delimited by . but this is not explicit in the regex
	// match[0] will match either
	// match[1] will match alpha (map to object | property)
	// match[2] will match numeric (map to array)
	const regex = /([a-zA-Z-]+)|([0-9]+)/g;

	for (const input_property in input) {
		let current_object = result;
		let current_property = '';
		let match: RegExpExecArray | null;

		// Loop through .-separated parts of the property
		// Creating an empty {} for alpha or [] for numeric, don't override anything already there from a previous loop
		while ((match = regex.exec(input_property))) {
			current_object =
				(current_object as IndexableObjectType)[current_property] ??
				((current_object as IndexableObjectType)[current_property] = match[2] ? [] : {});
			current_property = match[2] ?? match[1];
		}
		// last accessed portion of the property name must be the one with the primitive value in it
		(current_object as FlatObjectType)[current_property] = input[input_property];
	}
	// Algorithm:
	// {"a.b.0.d": "x", "a.b.1.d": "y"}
	// 0. {}							start with a valid object
	// 1. {a: {}}						ensure that a exists if we're to add to it
	// 2. {a: {b: []}}					ensure that b exists and is actually an array
	// 3. {a: {b: [{d: "x"}]}}			add d object to the array,
	// 4. {a: {b: [{d: "x"}]}}  		a already exists, do nothing
	// 5. {a: {b: [{d: "x"}]}}  		b already exists, do nothing
	// 6. {a: {b: [{d: "x"}]}}  		b is already an array, do nothing
	// 7. {a: {b: [{d: "x"},{d: "y"}]}} add d to the existing array

	return (result as FlatObjectType)[''] ?? result;
}
