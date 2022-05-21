import { test, expect } from 'vitest';

import type { JourneyType } from '$lib/types/journey';
import { get_page_url, nextPageUrl } from '$lib/utils/navigation';

test('Get correct page from component id', () => {
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
	expect(get_page_url(journey, component_id)).toBe('/two');
});

test('Get next page from current page', () => {
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
	const current_page = '/one';
	expect(nextPageUrl(journey, current_page)).toBe('/two');
});
