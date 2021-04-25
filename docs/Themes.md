# Theming

The overarching design of this solution is about separating presentation from functionality.  

Presentation, including wording of questions, help text, and basic styling choices are to be managed using some sort of back office tool (a lightweight CMS approach)  

Functionality is just code, there is a single master/main version that gets updated over time - new features or bug fixes.  

Theming is what makes this possible.

## Principles

- Components responsible for their own "quality" cosmetics, e.g. appropriate border/margin/padding to avoid looking unprofessional
- Components must be agnostic to screen/viewport/font size - design for mobile-first and use rem or other dynamic sizing where necessary
- Website-level themes are responsible for the consistent look-and-feel and define the colour pallette.
- Each component defines its own defaults for relevant properties, but exposes customisable CSS variables, set in `/static/themes/`
- Avoid `:global()` styles otherwise - breaks component boundaries, lose the benefits of Svelte's scoped styling
- Absolutely no hard-coded data in any low level components, ever - expose an optional parameter instead.

