# Journey as Data

There are very few distinct types of website out there:
1. wiki/documentation - best served by markdown, static site generators
1. journey - a series of questions culminating in the offer of a service
1. shop - data-driven, filter by as many dimensions as possible
1. gaming/visualisation - can't really generalise but I think web assembly is the future here

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

- URL based routing (not hash-based, better for SEO) 
  - handled by [SvelteKit](https://kit.svelte.dev) filesystem based routing out of the box
- Custom components, all inputs optional, designed to be ultra flexible and responsive across browsers/devices
- Data-driven basic validation using HTML5 standard elements and [ValidationAPI](https://developer.mozilla.org/en-US/docs/Learn/Forms/Form_validation#the_constraint_validation_api)
- Configurable journey - content editors manage content (labels, helptext...), developers manage code.
- Configurable themes - components  functional layout, responsible for responsive design, exposing key CSS variables for theming.  Themes managed separately, decoupling services from brand elements such as colour palettes.
- Session data management
  - The `valueStore` is a key-value store holding the component id against its value, see `/lib/stores/valueStore.ts`
  - This is updated whenever a user action triggers a change, this could be direct or via a custom action.
- Injectable functionality
  - The entire journey is dynamic, with the majority of validation and display logic being data-driven.
  - In order to perform bespoke actions we need a trigger mechanism.  
  - This trigger mechanism is a component dispatching an event when a value changes, linked to the action by naming convention.
  - All defined actions are loaded when the site is first loaded, into the actionStore, which is distinct to a brand (global actions may come later).  See `/lib/actions/actionprovider.ts`
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
See [TypeScript](https://www.typescriptlang.org/) to learn about TypeScript.  This is key to ensuring that this solution stays maintainable and helps reduce runtime errors (don't ignore TS warnings!).  

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
TypeScript warnings must be addressed for a PR to be accepted.  

To toggle between websites for development add a new `.env.development` file as a copy of `.env`.  
This file is listed in `.gitignore` to facilitate different developers working with shared components and separate websites.  

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

# Test setup

I like to keep dependencies to an absolute minimum and all of them as devDependencies:  
- jest - test framework
- ts-jest - allows jest to test TypeScript components
- @types/jest - provides access to useful Jest types
- svelte-jester - handles precompilation, required for testing svelte components
- svelte-testing-library (not yet in use) - svelte-specific testing library
- @testing-library/jest-dom (not yet in use) - provides DOM element matchers, convenience methods

[Official Svelte Testing Library documentation](https://testing-library.com/docs/svelte-testing-library/setup)  
[Introductory blog to configuring SvelteKit with Jest](https://koenvg.medium.com/setting-up-jest-with-sveltekit-4f0a0e379668)  
[Svelte-jester documentation](https://github.com/mihar-22/svelte-jester#typescript)  

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
