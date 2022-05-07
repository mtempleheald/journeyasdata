import { test, expect } from 'vitest';

import * as journey from '../../../static/technicaldemo/journey.json'
import { component_ids_are_unique } from '$lib/utils/backofficevalidators';
import type { JourneyType } from '$lib/types/journey';

test('Component IDs are unique', () => {
	expect(component_ids_are_unique(journey as JourneyType)); // Cast to map string to "enum" and remove type warnings
});
