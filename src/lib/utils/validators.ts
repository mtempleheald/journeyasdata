import type { ComponentType, QuestionSetType, SectionType } from '$lib/types/questionset';

// Each component is responsible for its own (simple) validation, here we trust that this is the case.
// Component validation logic:
// (failed)  - validation entry is false - return false
// (passed)  - validation record is true - return true
// (missing) - question required (including dependsUpon condition), validation record missing - return false
// (skipped) - question not required - return true
//
// Section validation logic:
// For each instance of each component defer to the component validator
// return false if any components are invalid
// 
// Page validation logic:
// For each section on the page defer to the section validator
// return false if any sections are invalid

// Additional information
// Questionset structure = questionset.page.section.component - sections can be repeated
// Value store uses identifier {section id}.{section index}.{component id} which can be unflattened to a similar struture
// For non-repeating sections this value store identifier is simply {component id}

function SectionValid (
    section : SectionType,
    inputs: object,
    validations: object
){
    // TODO: update to calculate correct identifier for component based on repeated section index before validating component
    let valid =
    section.components.every(c => {
        return (
        //     !c.required                                                         // not required so don't validate
        // ||  (c.dependsupon && inputs[c.dependsupon.id] != c.dependsupon.value)  // a hidden question so don't validate
        // ||  (c.required && validations[c.id])                                   // required and valid
        true
        )
    })
    return valid;
}

function PageValid (
    questionSet: QuestionSetType, 
    pageUrl: string,
    inputs: object,
    validations: object
) {
    // TODO: update to handle repeated sections (pass index down to section validator)
    const sections = questionSet.pages.filter(p => p.url == pageUrl).pop().sections;
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