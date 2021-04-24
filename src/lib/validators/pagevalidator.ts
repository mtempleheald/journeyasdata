import type { QuestionSet, Section } from '$lib/types/QuestionSet';

// Each component should do its own validation, this simply checks that they have confirmed valid
// Complex components should perform similar logic to here, reporting up the chain that based on what they know, all is valid

function SectionValid (
    section : Section,
    inputs: object,
    validations: object
){
    let valid =
    section.components.every(c => {
        return (
            !c.required                                                         // not required so don't validate
        ||  (c.dependsupon && inputs[c.dependsupon.id] != c.dependsupon.value)  // a hidden question so don't validate
        ||  (c.required && validations[c.id])                                   // required and valid
        )
    })
    return valid;
}

function PageValid (
    questionSet: QuestionSet, 
    pageUrl: string,
    inputs: object,
    validations: object
) {
    const sections = questionSet.pages.filter(p => p.page.url == pageUrl).pop().sections;
    let valid = 
    sections.every(s => {
        return SectionValid(s, inputs, validations)
    })
    return valid;
}

function validator() {
    return {
        valid: (qs, url, inputs, validations) => PageValid(qs, url, inputs, validations)
    }
}

export const pageValidator = validator();

// called externally using:
// import { questionSet } from '$lib/stores/questionset';
// import { validationStore } from '$lib/stores/validationstore';
// import { pageValidator } from '$lib/validators/pageValidator';
// if (pageValidator.valid($questionSet, "page-url", $validationStore)) ...