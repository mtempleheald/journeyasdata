# Journey as Data

There are very few distinct types of website out there:
1. wiki/documentation - best served by markdown, static site generators
1. journey - a series of questions culminating in the offer of a service
1. shop - data-driven, filter by as many things as possible
1. gaming/visualisation - can't really generalise but web assembly is the future here

The aim of this project is to prove that option 2 can be delivered in 3 distinct parts:
- journey as data - represent all questions/refdata/tooltips etc as a json file
- themes as css variables - distinct stylesheet for different brands.  Components handle the general styling.
- code - pull together the theme and journey data to generate a functioning journey.


## Data Structure

The basic data structure which drives the entire solution:

- journey (identified by brand/product + version)
  - page (url-aligned)
    - section (block of content, may have logo or other presentational elements)
      - display (paragraphs, images...)
      - question (input element with optional additional presentational elements)
      - composite (multiple fields combined into a single component, e.g. address lookup)
        - display
        - question 


## Key Features

- URL based routing (not hash-based, ideal for SEO) 
  - handled by [SvelteKit](https://kit.svelte.dev) filesystem based routing out of the box
- Custom components, all inputs optional, designed to be ultra flexible and responsive across browsers/devices
- Data-driven basic validation using HTML5 standard elements and [ValidationAPI](https://developer.mozilla.org/en-US/docs/Learn/Forms/Form_validation#the_constraint_validation_api)
- Configurable questionset - content editors manage content (labels, helptext...), developers manage code, see `/lib/types/questionset.ts`
- Configurable themes - components manage layout, responsible for responsive design, exposing key CSS variables for theming, see `/static/questionsets/`
- Session data management
  - The `inputStore` is a key-value store holding the component id against its value, see `/lib/stores/inputstore.ts`
  - This is updated whenever a user action triggers a change, this could be direct or via a custom function.
- Injectable functionality
  - The entire journey is dynamic, with the majority of validation and display logic being data-driven.
  - In order to perform bespoke functions we need a trigger mechanism.  
  - This trigger mechanism is a component dispatching an event when a value changes.
  - The convention is to name the triggered function (action) to match the component id.
  - All defined actions are loaded when the site is first loaded, into the actionStore, which is distinct to a brand (global actions may come later).  See `/lib/actions/actionprovider.ts`
- Repeating sections
  - Each element requires a unique identifier for use in stores, yet sometimes we require multiple inputs, e.g. drivers on a car insurance policy
  - To manage this we prefix the component id with a section id and index `${sectionid}.${sectionindex}.${componentid}`
  - The downside of this (for now) is that bespoke functionality need to know about these nuances
- 


# Extra features


- Data security - No PII data left on the local machine - data is held in memory only by default in [Svelte stores](https://svelte.dev/docs#svelte_store).
  If you even refresh the page you lose all data, so we may need sessionStorage store capabilities too.
- API security - [SvelteKit will server-render pages on demand](https://kit.svelte.dev/docs#ssr-and-javascript) and [endpoints only run on the server](https://kit.svelte.dev/docs#routing-endpoints)
- A/B testing - does NOT cover code, but does cover data - the current plan is to handle this by deployment, hosting multiple versions simultaneously.
- Source/Affinity based branding - If redirected from google or some other aggregator we may want to style certain aspects differently, e.g. logos
- Admin backend for questionset generation
  - [JWT authentication](https://www.npmjs.com/package/jsonwebtoken) [using server side endpoints](https://stackoverflow.com/questions/67255874/where-should-i-refresh-my-jwt-in-sveltekit)
  - [Client side (stateless) JWT auth pattern](https://www.caktusgroup.com/blog/2020/10/20/jwt-authentication-rethinking-pattern/)
  - [Alternative to hand writing](https://www.npmjs.com/package/svelte-kit-cookie-session)


# Getting started

See [Svelte](https://svelte.dev) to learn about Svelte.
See [SvelteKit](https://kit.svelte.dev) to learn about SvelteKit.
See [Vite](https://vitejs.dev/) to learn about Vite, the modern bundler+ that SvelteKit uses
See [TypeScript](https://www.typescriptlang.org/) to learn about TypeScript.  This is key to ensuring that this solution stays maintainable and helps reduce runtime errors (don't ignore TS warnings!).

To run the application locally:

`npm install` to import dependencies  
`npm run dev` to launch locally with live reload  
`npm run build` to build for production
`npm run preview` to check the production build


# Contribution guide

Follow [Git Flow](https://guides.github.com/introduction/flow/) branching strategy 
  - Create feature branch off develop  
  - name branch according to intent, keep it small and focused, try not to break anything.  
  - Create PR to merge changes back into develop.  
  - This PR should trigger CI processes (TODO)

Continuous Deployment to our Azure demo environment is triggered from a PR to main.  
All PRs to main should come from develop, at a time we know develop to be stable with a tested production build.

Advised to use VS Code editor with default formatting settings for consistency and to avoid whitespace merge issues.


## Intended deployment process

[![](https://mermaid.ink/img/eyJjb2RlIjoiZ3JhcGggVERcblxuICBjb2RlW0NvZGVdIC0tPiBjaVtDSV1cbiAgY2kgLS0-IGNkW0NEXVxuICBjZCAtLT4gZW52W0Vudmlyb25tZW50XVxuICBjZCAtLXVwZGF0ZS0tPiBwXG5cbiAgcXNbUXVlc3Rpb25TZXRdIC0tcHVibGlzaC0tPiBwW1B1Ymxpc2hlcl1cbiAgdGhlbWVbVGhlbWVdIC0tcHVibGlzaC0tPiBwW1B1Ymxpc2hlcl1cblxuICBwIC0tPiB2e3ZhbGlkP31cbiAgdiAtLT58eWVzfCBlbnZcbiAgdiAtLT58bm98IE5vdGlmeSIsIm1lcm1haWQiOnsidGhlbWUiOiJkZWZhdWx0In0sInVwZGF0ZUVkaXRvciI6ZmFsc2V9)](https://mermaid-js.github.io/mermaid-live-editor/#/edit/eyJjb2RlIjoiZ3JhcGggVERcblxuICBjb2RlW0NvZGVdIC0tPiBjaVtDSV1cbiAgY2kgLS0-IGNkW0NEXVxuICBjZCAtLT4gZW52W0Vudmlyb25tZW50XVxuICBjZCAtLXVwZGF0ZS0tPiBwXG5cbiAgcXNbUXVlc3Rpb25TZXRdIC0tcHVibGlzaC0tPiBwW1B1Ymxpc2hlcl1cbiAgdGhlbWVbVGhlbWVdIC0tcHVibGlzaC0tPiBwW1B1Ymxpc2hlcl1cblxuICBwIC0tPiB2e3ZhbGlkP31cbiAgdiAtLT58eWVzfCBlbnZcbiAgdiAtLT58bm98IE5vdGlmeSIsIm1lcm1haWQiOnsidGhlbWUiOiJkZWZhdWx0In0sInVwZGF0ZUVkaXRvciI6ZmFsc2V9)



---
---
To be tidied up below here


# Components - review and raise anything not already implemented as an issue

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


# Thoughts and Ideas? - Move these to Issues so we can discuss properly

RL - Just wondering if we need to allow A component within a Question to allow us to do the type of question  "When did you buy your caravan [DD]/[MM]/[YYYY]  [X] I have not bought the caravan yet" option.
MTH - Perhaps this fits in with the composite component in the hierarchy above.  I would hope we don't need composite composite components, but worth considering.
MTH update - We have dependent questions now, would recommend reordering as "Have you bought the caravan?"..."When did you buy it?"  This is more intuitive and easier to implement dynamically.

RL - Do we want a Component to allow us to link JS?
    e.g. a Javascript snippet could be a Component?
MTH - Needs to be as simple as possible.  Simple validation should be exclusively data-driven - annotations + generic JS, from questionset data.
Each question could have a single additional action (blur,leave... depending on type) - trigger complex validations or other action - this would be based on id, injected by code, brand-specific and not subject to A/B testing.
MTH update - We have an actionStore now, a way to inject custom functions that take no parameters and interact only with the stores.  I haven't thought of any examples that this wouldn't cover, yet.

RL - I know this is going further, but a our site needs a "default" brand.  When linking to us from a 3rd party site via URL, we may need to reload their data and rebrand accordingly.

RL - We also need to consider a mechanism whereby answering a question in a particular way prevents them from continuing the journey - e.g.  Do you wish to answer these questions? [Y]/[N].  Answering N would prevent them from contuing so we display a nice message saying "well thanks for wasting your own time" and prevent them form clicking the NEXT button.
MTH - We can easily enough redirect a page using goto() on user action (blur,click etc).  This needs to be dynamic so possibly need a kill-conditions property on the component type.

MTH - [Svelte Themer](https://svelte-themer.now.sh/) could be an option if we need dynamic theming.

MTH - API security - is CORS sufficient?



RL - Idea!

QUESTION PAGES
==============
Question = id, Text, Type, ValidationCollection, Helptext {Header, Body}, PlaceholderText, DefaultAnswer + other items

Component = Question(s) + Component(s)

Section = Component(s)

VirtualPage = Section(s) + Component(s)

Journey = VirtualPage(s)

PRESENTATION PAGES
==================
Presentation Item = ????  to be defined ???

Presentation Panel = Presentation Item(s)

Presentation Page = Presentation Items + Component(s)



