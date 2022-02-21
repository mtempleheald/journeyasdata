# Component testing

Components MUST be well-defined.  
This means that they have typed inputs, typed outputs and defined behaviours.  
Unit testing of components is there to ensure that as long as we interact with the component in this way we can expect consistent results.  
More importantly, if we tweak the component in future we don't break this contract.

### Example 1 - Textbox component

A textbox is there to capture input, so we must have some form of `id` input or we can't use the input value.
Textboxes can take many forms - Text, Number, Date, Email ... so we must also have some form of `type` input.

The InputComponent type (which extends BaseComponent) was designed with this in mind.  
We also have many optional inputs designed for customisation, e.g. label.
A textbox input without a label may cause accessibility issues, but it is possible, so is supported.

### Example 2 - Select List component

This is an extension of a textbox, the difference being that it only allows constrained values from a list.

The OptionComponent type extends InputComponent, adding an input list of values.  
We need to know that this component works with 0, 1, many input values.  
An input containing 0 options isn't much use, but better to show as empty than crash the website.
