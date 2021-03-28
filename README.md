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



## Single-page app mode

By default, sirv will only respond to requests that match files in `public`. This is to maximise compatibility with static fileservers, allowing you to deploy your app anywhere.

If you're building a single-page app (SPA) with multiple routes, sirv needs to be able to respond to requests for *any* path. You can make it so by editing the `"start"` command in package.json:

```js
"start": "sirv public --single"
```

## Using TypeScript

This template comes with a script to set up a TypeScript development environment, you can run it immediately after cloning the template with:

```bash
node scripts/setupTypeScript.js
```
# Components
The Jounrney is comprised of one or more "Components" which, when put together, can be used to gain information along the journey.

At some point in the journey, a special component will push all the collected data up to a specific location to be stashed for later use.

Components can be made up of other components.

A coponent can be made up of a Question.

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

MTH - routing - [SvelteKit](https://kit.svelte.dev/docs) is worth considering, succeeds Sapper, pure client size url based routing is difficult to achieve otherwise. 

MTH - A bit early right now but we need to consider Azure hosting - see [SvelteKit Adapters](https://kit.svelte.dev/docs#adapters)

