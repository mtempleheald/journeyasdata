# Journey as Data

There are very few distinct types of website out there:

1. wiki/documentation - best served by markdown, static site generators
1. journey - a series of questions culminating in the offer of a service
1. shop - data-driven, filter by as many dimensions as possible
1. gaming/visualisation - can't really generalise but I think web assembly is the future here

The aim of this project is to prove that option 2 can be delivered in 3 distinct parts:

- journey as data - represent all questions/refdata/tooltips etc as a json file
- themes as css variables - distinct stylesheet for different brands. Components handle the general styling.
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

- URL based routing (not hash-based, better for SEO)
  - handled by [SvelteKit](https://kit.svelte.dev) filesystem based routing out of the box
- Custom components, all inputs optional, designed to be ultra flexible and responsive across browsers/devices
- Data-driven basic validation using HTML5 standard elements and [ValidationAPI](https://developer.mozilla.org/en-US/docs/Learn/Forms/Form_validation#the_constraint_validation_api)
- Configurable journey - content editors manage content (labels, helptext...), developers manage code.
- Configurable themes - components functional layout, responsible for responsive design, exposing key CSS variables for theming. Themes managed separately, decoupling services from brand elements such as colour palettes.
- Session data management
  - `state` is a key-value store which holds state for all components in the journey, see `/lib/stores/statestore.ts` and `/lib/types/stores.d.ts`.
  - Each components is responsible for updating its own state upon user action.
  - The state store may also be updated from a bespoke action, maybe after calling a backend API.
  - The state store relies on ids being unique across the journey but does not enforce that itself.
- Injectable functionality
  - The entire journey is dynamic, with the majority of validation and display logic being data-driven.
  - In order to perform bespoke actions we need a trigger mechanism.
  - This trigger mechanism is a component dispatching an event when a value changes, linked to the action by naming convention.
  - All defined actions are loaded when the site is first loaded, into the actionStore, which is distinct to a brand (global actions may come later). See `/lib/actions/actionprovider.ts`
- Repeating sections
  - Each element requires a unique identifier for use in stores, yet sometimes we require multiple inputs, e.g. drivers on a car insurance policy
  - To manage this we prefix the component id with a section id and index `${sectionid}.${sectionindex}.${componentid}`
  - The downside of this (for now) is that bespoke functionality needs to know about these nuances

# Extra features

- Data security - No PII data left on the local machine - data is held in memory only by default in [Svelte stores](https://svelte.dev/docs#svelte_store).
  If you refresh the page you lose all data, so we may need sessionStorage store capabilities too, especially when dealing with payment gateways.
- API security - [SvelteKit will server-render pages on demand](https://kit.svelte.dev/docs#ssr-and-javascript) and [endpoints only run on the server](https://kit.svelte.dev/docs#routing-endpoints)
- A/B testing - does NOT cover code, but does cover data - the current plan is to handle this by deployment, hosting multiple versions simultaneously.
- Source/Affinity based branding - If redirected from google or some other aggregator we may want to style certain aspects differently, e.g. logos
- Admin backend for journey generation
  - [JWT authentication](https://www.npmjs.com/package/jsonwebtoken) [using server side endpoints](https://stackoverflow.com/questions/67255874/where-should-i-refresh-my-jwt-in-sveltekit)
  - [Client side (stateless) JWT auth pattern](https://www.caktusgroup.com/blog/2020/10/20/jwt-authentication-rethinking-pattern/)
  - [Alternative to hand writing](https://www.npmjs.com/package/svelte-kit-cookie-session)
  - [Working example provided by SvelteKit team](https://github.com/sveltejs/realworld)

# Getting started

See [Svelte](https://svelte.dev) to learn about Svelte.  
See [SvelteKit](https://kit.svelte.dev) to learn about SvelteKit.  
See [Vite](https://vitejs.dev/) to learn about Vite, the modern bundler+ that SvelteKit uses.  
See [TypeScript](https://www.typescriptlang.org/) to learn about TypeScript. This is key to ensuring that this solution stays maintainable and helps reduce runtime errors (don't ignore TS warnings!).

To run the application locally:

`npm install` to import dependencies  
`npm run dev` to launch locally with live reload  
`npm run build` to build for production  
`npm run preview` to check the production build

SvelteKit depends on node v14 which is the latest LTS version.
`nvm ls` to list node versions
`nvm install --lts` to install latest LTS version of node
`nvm use --lts` to use the LTS version

# Contribution guide

I advise using VS Code with default configuration and using the extension 'Svelte for VS Code'.  
Errors and warnings must be addressed for a PR to be accepted.  
We may change the rules but we never ignore errors and warnings.

`npm run dev` to dev/test locally  
`npm run test` to run automation tests  
`npm run build` to verify the build, followed by `node build` or `npm run preview` to test this locally  
`npm run format` to reformat to prettier standards  
`npm run check` to resolve svelte-check warnings  
`npm run lint` to resolve eslint warnings

To toggle between websites for development add a new `.env.development` file as a copy of `.env`.  
This file is listed in `.gitignore` to facilitate different developers working with shared components and separate websites.

Since this project has such a heavy dependency on svelte and sveltekit I like to have my own local copy/fork.
This is mostly for investigations into bugs, but maybe one day I'll contribute, also it protects me in case the project goes in a different direction which no longer suits me.  
`git clone` (of the fork), followed by `git remote add upstream https://github.com/sveltejs/kit.git` gives me a local copy linked to the main kit repo.  
To keep this up to date is as simple as `git fetch upstream` and `git rebase upstream/master`.  
Check using `git remote` which should now include "origin" and "upstream".

# Testing approach

I am keen to include useful testing in this framework, but not go overboard.
Tests should provide developer confidence, improve technical design by considering edge cases.
Rely on type safety throughout and don't ignore warnings, to limit the need for some tests.

Utility functions

- should be built to be testable, framework-agnostic e.g. accept a JS object rather than the svelte store that holds it, expect the caller to pass this.
- should have tests to prove edge cases, particularly around null/undefined values, since developers don't control the content.

Svelte components

- should be tested such that they don't crash if they receive a valid object
  - a display component does not require an id
  - an input component may not require a label
  - a list component should handle 0 options gracefully
- should not be tested for presentation (yet)
  - consider a snapshot library for this later on

# Dependencies and Test setup

I like to keep dependencies to an absolute minimum, justfied, and if possible as devDependencies.

- core dependencies (sveltekit)
  - sveltejs/kit - core dependency, without this we have nothing
  - @sveltejs/adapter-node - current choice of hosting
  - svelte - core dependency, without this we have nothing
  - svelte-check - check code quality of .svelte files
  - svelte-preprocess - extend svelte parser to handle typescript, scss etc
  - svelte2tsx - required by [svelte-kit package](https://kit.svelte.dev/docs#packaging) if including types.
- extras
  - cookie - for secure cookie management
  - @types/cookie - for cookie types
  - snarkdown - for markdown processing, a key feature of the project
- type safety
  - typescript - building a new web app in JS post 2020 would be crazy
  - tslib - typescript runtime library containing helper functions
- code quality
  - eslint - identify/report patterns in ECMAScript code
  - eslint-config-prettier - turn off eslint rules that conflict with prettier
  - eslint-plugin-svelte3 - eslint idea ported to Svelte v3 components
  - @typescript-eslint/eslint-plugin - typescript plugin for eslint
  - @typescript-eslint/parser - An ESLint custom parser which leverages TypeScript ESTree
  - prettier - opinionated code formatter, helps to guarantee all contributors writing code in the same style.
  - prettier-plugin-svelte - prettier logic applied to svelte components
- playwright
  - @playwright/test - provides headless browser simulation for e2e tests
- vitest
  - vitest - use the vitest library to eventually remove jest dependencies, with the benefits of HMR etc.
  - vitest-svelte-kit - helps to configure vitest using existing svelte config
  - jsdom - required by vitest
  - @testing-library/svelte - svelte-specific testing library
  - @testing-library/jest-dom - provides DOM element matchers, convenience methods. To remove if/when possible.
  - c8 - test coverage when using vitest

# Testing

## Playwright

[Playwright](https://playwright.dev) now comes as an option in [create-svelte](https://github.com/sveltejs/kit/pull/4056).  
It does need installing first `npx playwright install --with-deps`  
Execute using `npm run test`

## Vitest & Svelte Testing Library

[Vitest](vitest.dev/) is in beta. Sveltekit is in beta. This is not stable yet, but work is progressing. [Watch this issue](https://github.com/sveltejs/kit/issues/4143).

[Svelte example in vitest repo](https://github.com/vitest-dev/vitest/tree/main/examples/svelte)  
[Simple explanation of sharing config with main app](https://github.com/vitest-dev/vitest/discussions/331)  
When I try to use this approach I get error: `Error: Vitest was initialized with native Node instead of Vite Node`. [vite-node](https://www.npmjs.com/package/vite-node).

[vitest-svelte-kit](https://github.com/nickbreaton/vitest-svelte-kit/blob/master/examples/svelte-kit-demo-app/src/routes/about.test.ts) seems to work better. This package finds svelte.config.js and imports config. Requires `vite.test.environment` to be set to `jsdom` in svelte.config.js.  
There's also a new dev dependency on [jsdom](https://www.npmjs.com/package/jsdom).  
`Error: Invalid Chai property: toBeInTheDocument` now appears though, this was provided by [testing-library/jest-dom](https://github.com/testing-library/jest-dom#tobeinthedocument).  
Someone has forked jest-dom to make [vitest-dom](https://github.com/AndrewLeedham/vitest-dom) but this is definitely not ready to use.  
Parking this for now.

## Jest & Svelte Testing Library

[Official Svelte Testing Library documentation](https://testing-library.com/docs/svelte-testing-library/setup)  
[Introductory blog to configuring SvelteKit with Jest](https://koenvg.medium.com/setting-up-jest-with-sveltekit-4f0a0e379668)  
[Svelte-jester documentation](https://github.com/mihar-22/svelte-jester#typescript)

## Upgrade process

Some people I'm trying to involve in this are less than comfortable fixing version issues.  
Therefore the upgrade process needs to be bulletproof.  
The main dependency this project has is Kit which is currently in beta and therefore subject to change.

See [create-svelte template](https://github.com/sveltejs/kit/tree/master/packages/create-svelte/templates/default) for defaults of various config files.  
See [kit dependencies](https://github.com/sveltejs/kit/blob/master/packages/kit/package.json) for versions of dependencies which kit itself has. When we use the same libraries it makes more sense to align to the version of kit than to try to be cutting edge since this requires multiple versions of the same package to co-exist or relies upon implicit up/downgrades.

Stick to Node LTS version, managed using NVM `nvm install --lts`  
Use the latest version of npm aligned with this `nvm install-latest-npm`

npm package versioning follows MAJOR.MINOR.PATCH format.  
`^` prefix allows install/update of the minor or patch versions  
`~` prefix allows install/update of only the patch version

Check for package vulnerabilities at any time `npm audit check`  
Compare current version against latest `npm outdated`

Upgrade a single package at a time and guarantee that nothing has broken by following the steps:

1. `npm update <package> --save` - update package version, saving latest in package.json to improve developer consistency.
1. `npm run test` | `npm run jest` to run automated tests - if anything breaks then this must be fixed or rolled back.
1. `npm run lint` does two things
   - verify file formatting (consistency) - if upgrading linters the standard may evolve, we need to make a conscious decision to roll back or run `npm run format` and then commit.
   - check type usage - we are aiming for 0 errors and 0 warnings but as long as we're not adding new issues we can continue with the upgrade.
1. `npm run check` runs svelte-check - any errors must be fixed, any warnings should be fixed, any hints should be reviewed.
1. `npm run dev` manual testing in dev mode - until we can automate all testing the entire application should be tested.
1. `npm run build` followed by `node build` - run in release mode, ideally with node_packages removed/renamed - this helps catch deployment issues
1. Commit changes when happy
   Repeat for all outdated packages.

The exceptions here are sveltekit itself and adapter-node.
Manually update package.json to match the latest version (`npm outdated`), do not use `^`, this way we can be certain which beta version we're using.

We use `npm ci` for environments (using package-lock.json) so this should always match the versions last verified by a developer.  
If we follow the steps above we should experience no deployment issues.

## Workflow

### Journey workflow

[![](https://mermaid.ink/img/eyJjb2RlIjoiZ3JhcGggVERcbiAganN0YXJ0KFN0YXJ0IEpvdXJuZXkpXG4gIGpzdGFydCAtLT4gaihMb2FkIEpvdXJuZXkpXG4gIGogICAgICAtLT4gY3NzKExvYWQgc3R5bGVzaGVldClcbiAgY3NzICAgIC0tPiBhY3Rpb24oTG9hZCBhY3Rpb25zKVxuICBhY3Rpb24gLS0-IHBhZ2VzW1tQYWdlIHdvcmtmbG93XV1cbiAgcGFnZXMgIC0tPiBqZW5kKEVuZCBKb3VybmV5KSIsIm1lcm1haWQiOnsidGhlbWUiOiJkZWZhdWx0In0sInVwZGF0ZUVkaXRvciI6ZmFsc2UsImF1dG9TeW5jIjp0cnVlLCJ1cGRhdGVEaWFncmFtIjpmYWxzZX0)](https://mermaid-js.github.io/mermaid-live-editor/edit##eyJjb2RlIjoiZ3JhcGggVERcbiAganN0YXJ0KFN0YXJ0IEpvdXJuZXkpXG4gIGpzdGFydCAtLT4gaihMb2FkIEpvdXJuZXkpXG4gIGogICAgIC0tPiBjc3MoTG9hZCBzdHlsZXNoZWV0KVxuICBjc3MgICAgLS0-IGFjdGlvbihMb2FkIGFjdGlvbnMpXG4gIGFjdGlvbiAtLT4gcGFnZXNbW1BhZ2Ugd29ya2Zsb3ddXVxuICBwYWdlcyAgLS0-IGplbmQoRW5kIEpvdXJuZXkpIiwibWVybWFpZCI6IntcbiAgXCJ0aGVtZVwiOiBcImRlZmF1bHRcIlxufSIsInVwZGF0ZUVkaXRvciI6ZmFsc2UsImF1dG9TeW5jIjp0cnVlLCJ1cGRhdGVEaWFncmFtIjpmYWxzZX0)

```
graph TD
  jstart(Start Journey)
  jstart --> j(Load Journey)
  j      --> css(Load stylesheet)
  css    --> action(Load actions)
  action --> pages[[Page workflow]]
  pages  --> jend(End Journey)
```

### Page workflow

[![](https://mermaid.ink/img/eyJjb2RlIjoiZ3JhcGggVERcbnBhZ2UoUGFnZSkgLS0-IHNlY3Rpb25zW1tTZWN0aW9uIHdvcmtmbG93XV1cbnNlY3Rpb25zIC0tPiBuYXZpZ2F0ZXtOYXZpZ2F0ZX1cbm5hdmlnYXRlIC0tPiBiYWNrKFByZXZpb3VzIFBhZ2UpXG5iYWNrIC0tPiBwYWdlcHJldltbR28gdG8gcHJldmlvdXMgcGFnZV1dXG5uYXZpZ2F0ZSAtLT4gbmV4dChOZXh0IHBhZ2UpXG5uZXh0IC0tPiB2YWxpZHtpcyBwYWdlPGJyLz4gdmFsaWQ_fVxudmFsaWQgLS0-fE5vfCBwYWdlXG52YWxpZCAgICAgIC0tPnxZZXN8IGFjdGlvbnMoRXhlY3V0ZSBwYWdlIGFjdGlvbnMpXG5hY3Rpb25zICAgIC0tPiBwYWdlbmV4dFtbR28gdG8gbmV4dCBwYWdlXV1cbiIsIm1lcm1haWQiOnsidGhlbWUiOiJkZWZhdWx0In0sInVwZGF0ZUVkaXRvciI6ZmFsc2V9)](https://mermaid-js.github.io/mermaid-live-editor/#/edit/eyJjb2RlIjoiZ3JhcGggVERcbnBhZ2UoUGFnZSkgLS0-IHNlY3Rpb25zW1tTZWN0aW9uIHdvcmtmbG93XV1cbnNlY3Rpb25zIC0tPiBuYXZpZ2F0ZXtOYXZpZ2F0ZX1cbm5hdmlnYXRlIC0tPiBiYWNrKFByZXZpb3VzIFBhZ2UpXG5iYWNrIC0tPiBwYWdlcHJldltbR28gdG8gcHJldmlvdXMgcGFnZV1dXG5uYXZpZ2F0ZSAtLT4gbmV4dChOZXh0IHBhZ2UpXG5uZXh0IC0tPiB2YWxpZHtpcyBwYWdlPGJyLz4gdmFsaWQ_fVxudmFsaWQgLS0-fE5vfCBwYWdlXG52YWxpZCAgICAgIC0tPnxZZXN8IGFjdGlvbnMoRXhlY3V0ZSBwYWdlIGFjdGlvbnMpXG5hY3Rpb25zICAgIC0tPiBwYWdlbmV4dFtbR28gdG8gbmV4dCBwYWdlXV1cbiIsIm1lcm1haWQiOnsidGhlbWUiOiJkZWZhdWx0In0sInVwZGF0ZUVkaXRvciI6ZmFsc2V9)

```
graph TD
page(Page) --> sections[[Section workflow]]
sections   --> navigate{Navigate}
navigate   --> back(Previous Page)
back       --> pageprev[[Go to previous page]]
navigate   --> next(Next page)
next       --> valid{is page<br/> valid?}
valid      -->|No| page
valid      -->|Yes| actions(Execute page actions)
actions    --> pagenext[[Go to next page]]
```

### Section workflow

[![](https://mermaid.ink/img/eyJjb2RlIjoiZ3JhcGggVERcbnNlY3Rpb24oU2VjdGlvbilcbnNlY3Rpb24gICAgLS0-IGNvbXBvbmVudHNbW0NvbXBvbmVudCB3b3JrZmxvd11dXG5jb21wb25lbnRzIC0tPiByZXBlYXRpbmd7UmVwZWF0aW5nIDxici8-c2VjdGlvbj99XG5yZXBlYXRpbmcgIC0tPnxOb3wgbmV4dChOZXh0IFNlY3Rpb24pXG5yZXBlYXRpbmcgIC0tPnxZZXN8IHJlcGVhdHtBZGQgbmV3IDxici8-aW5zdGFuY2U_fVxucmVwZWF0ICAgICAtLT58Tm98IG5leHQoTmV4dCBTZWN0aW9uKVxucmVwZWF0ICAgICAtLT4gc3dpdGNoKE5ldyBpbnN0YW5jZSlcbnN3aXRjaCAgICAgLS0-IHNlY3Rpb24iLCJtZXJtYWlkIjp7InRoZW1lIjoiZGVmYXVsdCJ9LCJ1cGRhdGVFZGl0b3IiOmZhbHNlfQ)](https://mermaid-js.github.io/mermaid-live-editor/#/edit/eyJjb2RlIjoiZ3JhcGggVERcbnNlY3Rpb24oU2VjdGlvbilcbnNlY3Rpb24gICAgLS0-IGNvbXBvbmVudHNbW0NvbXBvbmVudCB3b3JrZmxvd11dXG5jb21wb25lbnRzIC0tPiByZXBlYXRpbmd7UmVwZWF0aW5nIDxici8-c2VjdGlvbj99XG5yZXBlYXRpbmcgIC0tPnxOb3wgbmV4dChOZXh0IFNlY3Rpb24pXG5yZXBlYXRpbmcgIC0tPnxZZXN8IHJlcGVhdHtBZGQgbmV3IDxici8-aW5zdGFuY2U_fVxucmVwZWF0ICAgICAtLT58Tm98IG5leHQoTmV4dCBTZWN0aW9uKVxucmVwZWF0ICAgICAtLT4gc3dpdGNoKE5ldyBpbnN0YW5jZSlcbnN3aXRjaCAgICAgLS0-IHNlY3Rpb24iLCJtZXJtYWlkIjp7InRoZW1lIjoiZGVmYXVsdCJ9LCJ1cGRhdGVFZGl0b3IiOmZhbHNlfQ)

```
graph TD
section(Section)
section    --> components[[Component workflow]]
components --> repeating{Repeating <br/>section?}
repeating  -->|No| next(Next Section)
repeating  -->|Yes| repeat{Add new <br/>instance?}
repeat     -->|No| next(Next Section)
repeat     --> switch(New instance)
switch     --> section
```

### Component workflow

[![](https://mermaid.ink/img/eyJjb2RlIjoiZ3JhcGggVERcbmNvbXBvbmVudChDb21wb25lbnQpXG5jb21wb25lbnQgIC0tPiByZWZkYXRhe1JlZmVyZW5jZSBEYXRhIDxici8-cmVxdWlyZWQ_fVxucmVmZGF0YSAgICAtLT58Tm98IHJlbmRlcihSZW5kZXIgY29tcG9uZW50KVxucmVmZGF0YSAgICAtLT58WWVzfCBsb2FkKExvYWQgcmVmZXJlbmNlIGRhdGEpXG5sb2FkICAgICAgIC0tPiByZW5kZXJcbnJlbmRlciAgICAgLS0-IHVzZXIoVXNlciBpbnRlcmFjdGlvbilcbnVzZXIgICAgICAgLS0-IHZhbGlkYXRlKFVwZGF0ZSB2YWxpZGF0aW9uIFN0b3JlKVxudXNlciAgICAgICAtLT4gcHVibGlzaChVcGRhdGUgdmFsdWUgU3RvcmUpXG52YWxpZGF0ZSAgIC0tPiBhY3QoRXhlY3V0ZSBjb21wb25lbnQgYWN0aW9ucylcbnB1Ymxpc2ggICAgLS0-IGFjdFxuYWN0ICAgLS0-IG5leHRbW05leHQgY29tcG9uZW50XV1cbiIsIm1lcm1haWQiOnsidGhlbWUiOiJkZWZhdWx0In0sInVwZGF0ZUVkaXRvciI6ZmFsc2V9)](https://mermaid-js.github.io/mermaid-live-editor/#/edit/eyJjb2RlIjoiZ3JhcGggVERcbmNvbXBvbmVudChDb21wb25lbnQpXG5jb21wb25lbnQgIC0tPiByZWZkYXRhe1JlZmVyZW5jZSBEYXRhIDxici8-cmVxdWlyZWQ_fVxucmVmZGF0YSAgICAtLT58Tm98IHJlbmRlcihSZW5kZXIgY29tcG9uZW50KVxucmVmZGF0YSAgICAtLT58WWVzfCBsb2FkKExvYWQgcmVmZXJlbmNlIGRhdGEpXG5sb2FkICAgICAgIC0tPiByZW5kZXJcbnJlbmRlciAgICAgLS0-IHVzZXIoVXNlciBpbnRlcmFjdGlvbilcbnVzZXIgICAgICAgLS0-IHZhbGlkYXRlKFVwZGF0ZSB2YWxpZGF0aW9uIFN0b3JlKVxudXNlciAgICAgICAtLT4gcHVibGlzaChVcGRhdGUgdmFsdWUgU3RvcmUpXG52YWxpZGF0ZSAgIC0tPiBhY3QoRXhlY3V0ZSBjb21wb25lbnQgYWN0aW9ucylcbnB1Ymxpc2ggICAgLS0-IGFjdFxuYWN0ICAgLS0-IG5leHRbW05leHQgY29tcG9uZW50XV1cbiIsIm1lcm1haWQiOnsidGhlbWUiOiJkZWZhdWx0In0sInVwZGF0ZUVkaXRvciI6ZmFsc2V9)

```
graph TD
component(Component)
component  --> refdata{Reference Data <br/>required?}
refdata    -->|No| render(Render component)
refdata    -->|Yes| load(Load reference data)
load       --> render
render     --> user(User interaction)
user       --> validate(Update validation Store)
user       --> publish(Update value Store)
validate   --> act(Execute component actions)
publish    --> act
act   --> next[[Next component]]
```

## Intended deployment process

[![](https://mermaid.ink/img/eyJjb2RlIjoiZ3JhcGggVERcblxuICBjb2RlW0NvZGVdIC0tPiBjaVtDSV1cbiAgY2kgLS0-IGNkW0NEXVxuICBjZCAtLT4gZW52W0Vudmlyb25tZW50XVxuICBjZCAtLXVwZGF0ZS0tPiBwXG5cbiAgcXNbSm91cm5leV0gLS1wdWJsaXNoLS0-IHBbUHVibGlzaGVyXVxuICB0aGVtZVtUaGVtZV0gLS1wdWJsaXNoLS0-IHBbUHVibGlzaGVyXVxuXG4gIHAgLS0-IHZ7dmFsaWQ_fVxuICB2IC0tPnx5ZXN8IGVudlxuICB2IC0tPnxub3wgTm90aWZ5IiwibWVybWFpZCI6eyJ0aGVtZSI6ImRlZmF1bHQifSwidXBkYXRlRWRpdG9yIjpmYWxzZSwiYXV0b1N5bmMiOnRydWUsInVwZGF0ZURpYWdyYW0iOmZhbHNlfQ)](https://mermaid-js.github.io/mermaid-live-editor/edit##eyJjb2RlIjoiZ3JhcGggVERcblxuICBjb2RlW0NvZGVdIC0tPiBjaVtDSV1cbiAgY2kgLS0-IGNkW0NEXVxuICBjZCAtLT4gZW52W0Vudmlyb25tZW50XVxuICBjZCAtLXVwZGF0ZS0tPiBwXG5cbiAgcXNbSm91cm5lXSAtLXB1Ymxpc2gtLT4gcFtQdWJsaXNoZXJdXG4gIHRoZW1lW1RoZW1lXSAtLXB1Ymxpc2gtLT4gcFtQdWJsaXNoZXJdXG5cbiAgcCAtLT4gdnt2YWxpZD99XG4gIHYgLS0-fHllc3wgZW52XG4gIHYgLS0-fG5vfCBOb3RpZnkiLCJtZXJtYWlkIjoie1xuICBcInRoZW1lXCI6IFwiZGVmYXVsdFwiXG59IiwidXBkYXRlRWRpdG9yIjpmYWxzZSwiYXV0b1N5bmMiOnRydWUsInVwZGF0ZURpYWdyYW0iOmZhbHNlfQ)

```
graph TD

  code[Code] --> ci[CI]
  ci --> cd[CD]
  cd --> env[Environment]
  cd --update--> p

  qs[Journey]  --publish--> p[Publisher]
  theme[Theme] --publish--> p[Publisher]

  p --> v{valid?}
  v -->|yes| env
  v -->|no| Notify
```
