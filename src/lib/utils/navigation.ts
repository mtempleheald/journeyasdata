import type { QuestionSetType } from "$lib/types/questionset";

// always return a valid page url
// next page if possible, current page otherwise
export function nextPageUrl(questionset: QuestionSetType, pageurl: string) {
    const pageUrls = questionset.pages?.map(p => p.url)
    if (pageUrls.length == 0)
        return pageurl
    else if (pageUrls.indexOf(pageurl) < pageUrls.length - 1)
        return pageUrls[pageUrls.indexOf(pageurl) + 1]
    else
        return pageurl
}

// always return a valid page url
// previous page if possible, current page otherwise
export function prevPageUrl(questionset: QuestionSetType, pageurl: string) {
    const pageUrls = questionset.pages?.map(p => p.url)
    if (pageUrls.length == 0)
        return pageurl
    else if (pageUrls.indexOf(pageurl) > 0)
        return pageUrls[pageUrls.indexOf(pageurl) - 1]
    else
        return pageurl
}

// Establish if target appears earlier in the user journey
// Useful for navigation purposes
export function targetPageEarlier(
    questionset: QuestionSetType,
    currentPageUrl: string,
    targetPageUrl: string) {
    
    const pageUrls = questionset.pages?.map(p => p.url)
    if (pageUrls.indexOf(targetPageUrl) < pageUrls.indexOf(currentPageUrl))
        return true
    else
        return false
}

// Establish if target appears later in the user journey
// Useful for navigation purposes
export function targetPageLater(
    questionset: QuestionSetType,
    currentPageUrl: string,
    targetPageUrl: string) {
    
    const pageUrls = questionset.pages?.map(p => p.url)
    if (pageUrls.indexOf(targetPageUrl) > pageUrls.indexOf(currentPageUrl))
        return true
    else
        return false
}