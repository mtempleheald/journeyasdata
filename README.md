# Journey as Data

There are very few distinct types of website out there:
1. wiki/documentation - best served by markdown, static site generators
1. journey - a series of questions culminating in the offer of a service
1. shop - data-driven, filter by as many things as possible
1. gaming/visualisation - can't really generalise but web assembly is the future here

The aim of this project is to prove that option 2 can be delivered in 3 distinct parts:
- journey as data - represent all questions/refdata/tooltips etc as a json file
- theming - distinct stylesheet for different brands.  Components handle the general styling.
- code - pull together the theme and journey data to generate a functioning journey.

Journey data:
- journey (identified by product + version)
  - page (url-aligned)
    - section (block of content, may have logo or other presentational elements)
      - display (paragraphs, images...)
      - question (input element with wrapping presentational elements)
      - composite (multiple fields combined into a single component, e.g. address lookup)
        - display
        - question 

# Extra features

- A/B testing - does NOT cover code, but does cover data
- URL based routing (not hash-based)
- Branding - The page must be brandable so it looks different depending on various factors (e.g. Linked from Google, URL, Cookie, etc.)
- Secure - No PII data to be left on the local machine


# Getting started

`npm install` to import dependencies  
`npm run dev` to launch locally with live reload  
`npm run build` to build for production  


# Contribution guide

Follow [Git Flow](https://guides.github.com/introduction/flow/) branching strategy - name branch according to intent, keep it small and focused, don't break anything.  Commits to be made on feature branches off develop, PR made to merge changes back into develop.  

Any PR should trigger CI (TBC), a PR which fails any step will not be merged until the issue is corrected.

Advised to use VS Code editor with default formatting settings for consistency and to avoid whitespace merge issues.

Proposed work items are available in the Projects tab.


# Components

The Journey is comprised of one or more "Components" which, when put together, can be used to gain information along the journey.

At some point in the journey, a special component will push all the collected data up to a specific location to be stashed for later use.

Components can be made up of other components.

A component can be made up of a Question.

A Question Component has the following distinct features

1. Id
1. Question Text
1. Help Icon
1. Help Text Header
1. Help Text Body
1. Answer Type
1. Answer Data Set
1. Default Answer
1. Answer Format
1. Css Class
1. Validation[]
1. Validation Messages[]

This will allow us to compose any type of question


# Thoughts and Ideas?

RL - Just wondering if we need to allow A component within a Question to allow us to do the type of question  "When did you buy your caravan [DD]/[MM]/[YYYY]  [X] I have not bought the caravan yet" option.
MTH - Perhaps this fits in with the composite component in the hierarchy above.  I would hope we don't need composite composite components, but worth considering.

RL - Do we want a Component to allow us to link JS?
    e.g. a Javascript snippet could be a Component?
MTH - Needs to be as simple as possible.  Simple validation should be exclusively data-driven - annotations + generic JS, from questionset data.
Each question could have a single additional action (blur,leave... depending on type) - trigger complex validations or other action - this would be based on id, injected by code, brand-specific and not subject to A/B testing.

RL - I know this is going further, but a our site needs a "default" brand.  When linking to us from a 3rd party site via URL, we may need to reload their data and rebrand accordingly.

RL - We also need to consider a mechanism whereby answering a question in a particular way prevents them from continuing the journey - e.g.  Do you wish to answer these questions? [Y]/[N].  Answering N would prevent them from contuing so we display a nice message saying "well thanks for wasting your own time" and prevent them form clicking the NEXT button.

MTH - [Svelte Themer](https://svelte-themer.now.sh/) could be an option if we need dynamic theming.

MTH - API security - is CORS sufficient?

MTH - A bit early right now but we need to consider Azure hosting - see [SvelteKit Adapters](https://kit.svelte.dev/docs#adapters)

