export function flatten(input: object) {
	const result = {};
	function recurse(cur, prop) {
		if (Object(cur) !== cur) {
			result[prop] = cur;
		} else if (Array.isArray(cur)) {
			for (var i = 0, l = cur.length; i < l; i++) {
				// eslint-disable-line
				recurse(cur[i], `${prop}[${i}]`);
			}
			if (l == 0) {
				// eslint-disable-line
				result[prop] = [];
			}
		} else {
			let isEmpty = true;
			for (const p in cur) {
				// eslint-disable-line
				isEmpty = false;
				recurse(cur[p], prop ? `${prop}.${p}` : p);
			}
			if (isEmpty && prop) {
				result[prop] = {};
			}
		}
	}
	recurse(input, '');
	return result;
}
export function unflatten(input: object) {
	if (Object(input) !== input || Array.isArray(input)) {
		return input;
	}
	let regex = /\.?([^.\[\]]+)|\[(\d+)\]/g;
	let resultholder = {};
	for (const p in input) {
		let cur = resultholder;
		let prop = '';
		let m;
		while ((m = regex.exec(p))) {
			// eslint-disable-line
			// console.debug('m[1]', m[1])
			// console.debug('m[2]', m[2])
			// cur = cur[prop] || (cur[prop] = ((m[2] || !isNaN(m[1])) ? [] : {}))
			cur = cur[prop] || (cur[prop] = m[2] ? [] : {});
			prop = m[2] || m[1];
			// remove placeholder
			prop = prop.replace(/XPERIOD/g, '.');
		}
		cur[prop] = input[p];
	}
	return resultholder[''] || resultholder;
}
