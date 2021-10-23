export type JourneyType = {
    title: string
    pages: PageType[]
    logo?: ImageType
    cookiepreferences?: CookiePreferenceType
}
export type PageType = {
    url: string
    title: string
    displaytitle?: boolean
    displayprogress?: boolean
    sections: (SectionType|RepeatingGroupType)[]
}
// A repeating group has no presentation elements of its own, it simply wraps one or more sections
export type RepeatingGroupType = {
    type: "repeatinggroup"
    sections: SectionType[]
    summarycontent: string|string[]
    minrepeats?: number
    maxrepeats?: number
    labeladd?: string
    labeledit?: string
    labelremove?: string    
}
export type SectionType = {
    id?: string
    instanceid?: number // used only when section is contained within a repeating group
    type: "section"|null
    title?: string
    logo?: ImageType
    maxrepeats?: number
    collapsible?: boolean
    components: ComponentType[]
}
export type ComponentType = 
      AddressComponentType 
    | DisplayComponentType 
    | InputComponentType 
    | ListComponentType 
    | TriBoxDateComponentType
    | VehicleComponentType

// Every component must have a type or we have no way to render it
interface BaseComponent {
    type: string
    pre?: string
    post?: string
    dependsupon?: {
        id: string
        value: string
    }
}
// Input components must have an identity for their value to be useful
interface InputComponent {    
    id: string // id must not contain a . (full stop) - this is reserved for components within repeating groups
    label?: string
    required?: boolean
    placeholder?: string
    value?: string
    errorMessage?: string
    help?: string
}
export type InputComponentType = BaseComponent & InputComponent & {
    type: "Colour" 
        | "Date" 
        | "Datetime"
        | "Email"
        | "Month" 
        | "Number"
        | "Range" 
        | "Search"
        | "Telephone"
        | "Text" 
        | "Time"
        | "Upper"
        | "Url"
        | "Week"
        | "Year"
}

// List components require a source list to render, which may cascade hierarchically
export type ListComponentType = InputComponent & BaseComponent & {
    type: "ButtonSelect"
        | "Dropdown"
        | "YesNo"
    values?: ValueType[]
    refdata?: string
    refdataparent?: string
}
export type ValueType = {
    value: string
    display: string
    image?: ImageType     // TODO: Consider replacing this with an identifier for an image rather than a url - let styling handle how this is included (e.g. font icons)
    textLocation?: string // TODO: Consider removing this, it is not intuitive and belongs in styling
}

// Display components' main purpose is content display, this field is mandatory
export type DisplayComponentType = BaseComponent & {
    type: "Displayblock"
        | "Displaymodal"
    id?: string
    content?: string | string[] // allow multiple columns by passing multiple content blocks
    collapsible?: boolean
}
export type DisplaySelectionsType = BaseComponent & {
    type: "Displayselections"
    selectedtitle?:string;
    unselectedtitle?:string;
    items: {
        title: string;
        selected: boolean;
        detail?: string;
    }[]
}

// TODO: Consider removing Address composite component in favour of action provider solution
export type AddressComponentType = BaseComponent & InputComponent & {
    type: "Address"
    postcodeLabel?: string
    postcodePlaceholder?: string  
    propertyLabel?: string
    propertyPlaceholder?: string
    postcodeHelp?: string
    postcodeError?: string
}
// TODO: Consider removing Vehicle composite component in favour of action provider solution
export type VehicleComponentType = BaseComponent & InputComponent & {
    type: "Vehicle"
    regnumLabel?: string
    regnumPlaceholder?: string
    buttonLabel?: string
}
export type CookiePreferenceType = {
    pre?: string
    post?: string
    values?: ValueType[]
}
// TODO: Consider icons/fonts vs images - images are content, but icons are styling and don't belong in journey
type ImageType = {
    url: string
    alt?: string
    width?: string // TODO: move to CSS variables - which image/ alt text is content, size is styling
    height?: string // TODO: move to CSS variables - which image/ alt text is content, size is styling
}
// TODO: Consider removing this with Triboxdate refactor, do we really need this level of flexibility?
export type TriBoxDateComponentType = BaseComponent & InputComponent & {
    type: "TriBoxDate"
    separator?: string
    resetLabel: string
    displayFormat: "full"|"long"|"medium"|"short"
    validation?: {
        min?: string // YYYY-MM-DD
        max?: string // YYYY-MM-DD
        minyearsago?: number
        maxyearsago?: number
        minyearsahead?: number
        maxyearsahead?: number
    }
}