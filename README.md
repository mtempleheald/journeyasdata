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
