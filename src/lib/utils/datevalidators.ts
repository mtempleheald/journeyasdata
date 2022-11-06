import type { TriBoxDateComponent } from '$lib/types/journey';

// Expecting all date metadata to be in the format DD/MM/YYYY, if specified
// But browser could be set to the ridiculous US format MM/DD/YYYY
// So play it safe by converting to ISO format before using in calculations
function convert_uk_to_iso(input: string): string | undefined {
	if (!input) return undefined;

	const arr = input.split('/');

	if (arr?.length != 3) return undefined;
	return `${arr[2]}-${arr[1]}-${arr[0]}`;
}

export function date_valid(component: TriBoxDateComponent, value: string): boolean {
	//console.debug('Validating date:', value, ' against rules:', component?.validation);
	// Valid dates: 2020 | 2020-02 | 2020-02-02
	// Invalid dates: 2020- | 2020--
	const date = new Date(value);
	if (isNaN(date.valueOf())) {
		//console.debug('date not valid: ', value);
		return false;
	}
	// Must be a valid date, still need to check against the validation metadata

	// Date must be after the minimum date specified
	const miniso = convert_uk_to_iso(component.validation?.min ?? '');
    if (miniso) {
		const min = new Date(miniso);
		if (isNaN(min.valueOf())) {
			//console.debug('Cannot validate against min metadata');
		} else if (date < min) {
			//console.debug('Date earlier than allowed', min);
			return false;
		}
	}
	// Date must be before the maximum date specified
	const maxiso = convert_uk_to_iso(component.validation?.max ?? '');
	if (maxiso) {
		const max = new Date(maxiso);
		if (isNaN(max.valueOf())) {
			//console.debug('Cannot validate against min metadata');
		} else if (date > max) {
			//console.debug('Date later than allowed', max);
			return false;
		}
	}

	// Prepare base date for comparison, ignoring time elements
	const now = new Date();
	now.setUTCHours(0, 0, 0);

	// Dynamic date comparisons (beware of 0 when using ? operator)
    if (component.validation?.maxyearsago !== undefined || component.validation?.minyearsahead !== undefined) {
        const min_dyn = new Date(now);
        if (component.validation?.maxyearsago !== undefined) {
            min_dyn.setUTCFullYear(now.getUTCFullYear() - component.validation?.maxyearsago);
        } else if (component.validation?.minyearsahead !== undefined) {
            min_dyn.setUTCFullYear(now.getUTCFullYear() + component.validation?.minyearsahead);
        }
        if (date.valueOf() < min_dyn.valueOf()) {
            //console.debug('Date earlier than allowed (dynamic)', min_dyn);
            return false;
        }
    }

	if (component.validation?.maxyearsahead !== undefined || component.validation?.minyearsago !== undefined) {
		const max_dyn = new Date(now);
		if (component.validation?.maxyearsahead !== undefined) {
			max_dyn.setUTCFullYear(now.getUTCFullYear() + component.validation?.maxyearsahead);
        } else if (component.validation?.minyearsago !== undefined) {
			max_dyn.setUTCFullYear(now.getUTCFullYear() - component.validation?.minyearsago);
		}
		if (date.valueOf() > max_dyn.valueOf()) {
			//console.debug('Date later than allowed (dynamic)', max_dyn);
			return false;
		}
	}

	// Assume the best, we haven't failed any validation
	return true;
}
