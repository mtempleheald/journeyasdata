import { actions as common } from '$lib/actions/common';
import { actions as dangertentinsurance } from '$lib/actions/dangertentinsurance';
import { actions as technicaldemo } from '$lib/actions/technicaldemo';

export const getActions = function (brand: string) {
	switch (brand) {
		case 'technicaldemo':
			return Object.assign(common, technicaldemo);
		case 'dangertentinsurance':
			return Object.assign(common, dangertentinsurance);
		default:
			return {};
	}
};
