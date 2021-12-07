import type { JourneyType } from '$lib/types/journey';

// always return a valid page url
// next page if possible, current page otherwise
export function nextPageUrl(journey: JourneyType, pageurl: string) {
	const pageUrls = journey.pages?.map((p) => p.url);
	if (pageUrls.length == 0) return pageurl;
	else if (pageUrls.indexOf(pageurl) < pageUrls.length - 1)
		return pageUrls[pageUrls.indexOf(pageurl) + 1];
	else return pageurl;
}

// always return a valid page url
// previous page if possible, current page otherwise
export function prevPageUrl(journey: JourneyType, pageurl: string) {
	const pageUrls = journey.pages?.map((p) => p.url);
	if (pageUrls.length == 0) return pageurl;
	else if (pageUrls.indexOf(pageurl) > 0) return pageUrls[pageUrls.indexOf(pageurl) - 1];
	else return pageurl;
}

// Establish if target appears earlier in the user journey
// Useful for navigation purposes
export function targetPageEarlier(
	journey: JourneyType,
	currentPageUrl: string,
	targetPageUrl: string
) {
	const pageUrls = journey.pages?.map((p) => p.url);
	if (pageUrls.indexOf(targetPageUrl) < pageUrls.indexOf(currentPageUrl)) return true;
	else return false;
}

// Establish if target appears later in the user journey
// Useful for navigation purposes
export function targetPageLater(
	journey: JourneyType,
	currentPageUrl: string,
	targetPageUrl: string
) {
	const pageUrls = journey.pages?.map((p) => p.url);
	if (pageUrls.indexOf(targetPageUrl) > pageUrls.indexOf(currentPageUrl)) return true;
	else return false;
}
