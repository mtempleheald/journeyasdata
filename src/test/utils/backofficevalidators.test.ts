export {};
import journey from './../../../static/demo_imaginary_autos/journey.json';
import { componentsHaveUniqueIdentifiers, componentIdentifiersMustNotHaveAFullStop, componentIdentifiersMustNotBeNumerical } from '$lib/utils/backofficevalidators';

// TODO: Rework journey.d.ts until journey registers as valid
//       currently not using discriminated union correctly - picking wrong type
describe('', () => {
	test.todo('Component identifiers should be unique'); 
	expect(componentsHaveUniqueIdentifiers(journey))
});

describe('', () => {
	test.todo('Component identifiers must not contain a full stop'); 
	expect(componentIdentifiersMustNotHaveAFullStop(journey))
});

describe('', () => {
	test.todo('Component identifiers must not be numerical'); 
	expect(componentIdentifiersMustNotBeNumerical(journey))
});

// TODO: Allow multiple journeys to be validated here
