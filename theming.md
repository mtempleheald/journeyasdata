# Theming

The overarching design of this solution is about separating presentation from functionality.  

Presentation, including wording of questions, help text, and basic styling choices are to be managed using some sort of back office tool (a lightweight CMS approach)  

Functionality is just code, there is a single master/main version that gets updated over time - new features or bug fixes.  

Theming is what makes this possible.

## Principles

- Components are responsible for basic "quality" display, e.g. appropriate borders/margins to avoid looking unprofessional
- Website-level themes are responsible for the consistent look-and-feel and define the colour pallette.  See `src/$layout.svelte`.
- Each component defines its own defaults for relevant properties, but exposes customisable CSS variables
  e.g. --textquestion-background-colour would be exposed by the TextQuestion component
- Avoid `:global()` styles where possible, this breaks the component boundaries and we lose the benefits of scoped styling provided by Svelte
- Absolutely no hard-coded data in any low level components, ever - expose an optional parameter instead.

## CSS Variables

--question-colour-bg
--question-colour-bg-highlight
--question-colour-text
--question-colour-text-highlight
