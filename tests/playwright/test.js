import { expect, test } from '@playwright/test';
// import journey from '../../static/technicaldemo/journey.json' assert { type: 'json' }; // https://nodejs.org/api/esm.html#file-urls

// TODO: switch to TS over JS when this is resolved https://github.com/sveltejs/kit/issues/4194
// TODO: ensure that we are setting ENV to technical demo not assuming this is the loaded site
// TODO: import journey file dynamically to avoid maintaining data in two places.
test('Home page has correct title', async ({ page }) => {
	const expected = 'Journey Demo'; //journey.title;
	await page.goto('/');
	expect(await page.title()).toBe(expected);
});
