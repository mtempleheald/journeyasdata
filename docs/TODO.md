# To do

Central place to capture outstanding work to do, to aid co-ordination.

## Analysis

- [ ] Collate style options from various journeys - different brands, products (car,bike,home,pet...).
  Is there a consistent approach to colour palette?  
  Does border colour always equal primary text colour?  What about border style?  
  Do hyperlinks always match highlight text colour?  
  Where do we need rounded corners?  Does the radius vary much?
- [ ] Deployment/hosting - aiming for Azure initially [Node web app in Azure](https://docs.microsoft.com/en-us/azure/app-service/quickstart-nodejs?pivots=platform-linux) & [Pricing](https://azure.microsoft.com/en-us/pricing/details/app-service/linux/) - Another option is Rod alredy pays for unlimited IONOS hosting and has a domain, registering a new domain would only be about £1 for 12 months.
## Components

- [x] Textbox capture component  
- [x] Email capture component - `<input type="email">`  
- [x] Dropdown capture component
- [x] Address capture component
- [x] Displayblock display component
- [ ] Wizard display component - exists but need to be dynamic - show current page, plus optionally disable previous pages (evil marketing)
- [ ] Vehicle capture component - use smaller question components for consistent look and feel [Vehicle API](https://github.com/rod-laycock/journeyasdata-service/tree/master/data/vehicle)
- [ ] YesNo capture component
- [ ] Radiobutton capture component - a more generalised form of YesNo
- [ ] Iconbutton capture component - Radiobutton with icons instead of words
- [ ] Number capture component - `<input type="number">`, including number validation (min/max)
- [ ] Slider slider component - Number capture displayed differently

## Integration

- [x] External [API stubs](https://github.com/rod-laycock/journeyasdata-service) to use for demo
- [ ] Refdata SvelteKit endpoint - currently hard-coded, use API with fallbacks
- [ ] Address SvelteKit endpoint - currently hard-coded, use API with fallbacks
- [ ] Vehicle SvelteKit endpoint - complete with vehicle component
- [ ] CompleteCapture SvelteKit endpoint - submit all user data to backend API to complete data capture phase of the journey
- [ ] Payment SvelteKit endpoint - this will jump out of the journey so need to implement sessionStorage/localStorage store

## Behaviour

- [x] URL based routing
- [x] CSS Theme basic - demonstrate use of global (brand) styles and scoped (component) styles for best of both
- [ ] CSS theme extraction - following analysis create master brand stylesheet in a separate file for future reference and branding.  Include this in $layout component
- [ ] Extend basic (data) validation to all html5 validation options, only required currently implemented
- [ ] Implement data capture store.  Key/Value dictionary for all data capture components.  
  This will act as a message queue, dependent components [subscribe](https://svelte.dev/tutorial/auto-subscriptions) for updates.  
  Any time someone updates an input the store value is updated (onChange, onBlur...)  

  How do we define stores when components may be optional?  
  `key = writable('value')` would require dynamic JS  
  `data = writable([Dictionary<k,v>])` could be inefficient, filter by key for all components when one changes  
  [Event Dispatcher](https://svelte.dev/docs#createEventDispatcher) may help - parent (pages component) owns the data, children tell it when to update what, children can subscribe to find values of siblings.  Sadly [Context](https://svelte.dev/docs#setContext) can only be set on component initialisation.  

  [The problem, simplified](https://stackoverflow.com/questions/63928002/how-can-i-dynamically-define-a-value-bind-in-svelte)   
  e.g. show this question only if that question has a Yes answer  
  e.g. apply complex validation across multiple inputs  
  e.g. push data to backend once sufficient data captured instead of requiring the user to click submit  

- [ ] Repeating sections - e.g. car insurance multiple drivers or multiple vehicles.  
  This complicates the value storage aspect - array of multivalue or multiple arrays?  Both have issues.  Probably an aspect of the custom data store.