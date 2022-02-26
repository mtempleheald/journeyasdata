import type { JourneyType } from '$lib/types/journey';
import { get_component_from_id } from '$lib/utils/inspection';

test('Get component object from id', () => {
	const journey: JourneyType = {
		title: 'Question per page demo',
		journeyflow: 'questionperpage',
		pages: [
			{
				url: '/one',
				title: 'Question per page introduction',
				sections: [
					{
						components: [
							{
								id: 'component1',
								type: 'Text'
							}
						]
					}
				]
			},
			{
				url: '/two',
				title: 'Second page',
				sections: [
					{
						components: [
							{
								id: 'component2',
								type: 'Text'
							}
						]
					}
				]
			}
		]
	};
	const component_id = 'component2';
	const expected = {
		id: 'component2',
		type: 'Text'
	};
	expect(get_component_from_id(journey, component_id)).toStrictEqual(expected);
});
