import { actions as technicaldemo} from '$lib/actions/technicaldemo';
import { actions as dangertentinsurance} from '$lib/actions/dangertentinsurance';

export const getActions = function(brand: string) {
    switch (brand) {
        case "technicaldemo": return technicaldemo;
        case "dangertentinsurance": return dangertentinsurance;
        default: return {}
    }
}
