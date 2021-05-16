import { actions as technicaldemo} from '$lib/actions/technicaldemo';
import { actions as dangertentinsurance} from '$lib/actions/dangertentinsurance';
import { actions as narolecash} from '$lib/actions/narolecash';

export const getActions = function(brand: string) {
    switch (brand) {
        case "technicaldemo": return technicaldemo;
        case "dangertentinsurance": return dangertentinsurance;
        case "narolecash" : return narolecash;
        default: return {}
    }
}
