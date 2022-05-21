import { actions as common } from '$lib/actions/common';

export const load_actions = async function (brand: string) {
	// Expects to find a const array of functions
	const brand_actions = await import(`./${brand}/index.ts`)
		.then((module) => module?.actions ?? {})
		.catch(() => console.debug(`No bespoke actions found for ${brand}`));
	// Make all common actions available plus all brand actions (which may override common)
	return Object.assign(common, brand_actions);
};
