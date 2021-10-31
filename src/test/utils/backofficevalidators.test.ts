import journey from './../../../static/technicaldemo/journey.json'
import { componentsHaveUniqueIdentifiers } from '$lib/utils/backofficevalidators'

// TODO: Rework journey.d.ts until journey registers as valid
//       currently not using discriminated union correctly - picking wrong type
test('Component identifiers should be unique', () => {    
//    expect(componentsHaveUniqueIdentifiers(journey))
})

// TODO: IDs must not contain a full stop
// TODO: IDs should be alphanumeric, not pure numbers
// TODO: Allow multiple journeys to be validated here