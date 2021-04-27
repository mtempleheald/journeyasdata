import { actions as technicaldemo} from '$lib/actions/technicaldemo';

export const getActions = function(brand: string) {
    switch (brand) {
        case "technicaldemo": return technicaldemo;       
    }
}
