import { actions as dangertentinsurance } from '$lib/actions/dangertentinsurance';
import { actions as technicaldemo } from '$lib/actions/technicaldemo';
import { actions as questionperpagedemo } from '$lib/actions/questionperpagedemo';

export const getActions = function (brand: string) {
	switch (brand) {
		case 'technicaldemo':
			return technicaldemo;
		case 'dangertentinsurance':
			return dangertentinsurance;
		case 'questionperpagedemo':
			return questionperpagedemo;
		default:
			return {};
	}
};
