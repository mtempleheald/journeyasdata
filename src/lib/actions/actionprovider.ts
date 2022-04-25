import { actions as common } from '$lib/actions/common';

export const getActions = async function (brand: string) {

	// Expects to find a const array of functions
	const brand_actions = await import(`./${brand}`)
		.then((module) => module.actions ?? {});
	// Make all common actions available plus all brand actions (which may override common)
	return Object.assign(common, brand_actions);
};
