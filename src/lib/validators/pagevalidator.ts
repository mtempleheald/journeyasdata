import type { QuestionSet, Section } from '$lib/types/QuestionSet';

// Each component should do its own validation


function SectionValid (
    section : Section, 
    inputs: object
){
    let valid =
    section.components.every(c => {
        return (
            !c.required                                                        // not required at all
        ||  !(c.required && !inputs[c.id])                                     // not (required and unanswered)
        ||  (c.dependsupon && inputs[c.dependsupon.id] != c.dependsupon.value) // not a hidden question
        )
    })
    return valid; // if we got this far then there are no invalid components
}

function PageValid (
    questionSet: QuestionSet, 
    pageUrl: string,
    inputs: object
) {
    const sections = questionSet.pages.filter(p => p.page.url == pageUrl).pop().sections;
    let valid = 
    sections.every(s => {
        return SectionValid(s, inputs)
    })
    return valid;
}

function validator() {
    return {
        valid: (qs, url, inputs) => PageValid(qs, url, inputs)
    }
}

export const pageValidator = validator();

// called externally using:
// import { questionSet } from '$lib/stores/questionset';
// import { inputStore } from '$lib/stores/inputstore';
// import { pageValidator } from '$lib/validators/pageValidator';
// if (pageValidator.valid($questionSet, "page-url", $inputStore)) ...