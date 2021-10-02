export type JourneyType = {
    title: string;
    pages: PageType[];
    logo?: ImageType;
    cookiepreferences?: CookiePreferenceType;
}
export type PageType = {
    url: string;
    title: string;
    displaytitle?: boolean;
    displayprogress?: boolean;
    sections: SectionType[];
}
export type SectionType = {
    id?: string;
    type?: string;
    title?: string;
    logo?: ImageType;
    maxrepeats?: number;
    collapsible?: boolean;
    components: ComponentType[];
}
export type ComponentType = BaseComponentType
    | AddressComponentType 
    | DisplayComponentType 
    | InputComponentType 
    | ListComponentType 
    | TriBoxDateComponentType
    | VehicleComponentType;

export type BaseComponentType = {
    type?: "Address" 
        | "ButtonSelect"
        | "Colour" 
        | "Date" 
        | "Datetime"
        | "Displayblock"
        | "Displaymodal"
        | "Dropdown" 
        | "Email"
        | "Month" 
        | "Number"
        | "Range" 
        | "Search"
        | "Telephone"
        | "Text" 
        | "Time"
        | "TriBoxDate"
        | "Upper"
        | "Url"
        | "Vehicle" 
        | "Week"
        | "Year"
        | "YesNo";
    id?: string;
    pre?: string;
    post?: string;
    dependsupon?: {
        id: string;
        value: string;
    }
}
export type InputComponentType = BaseComponentType & {    
    label?: string;
    required?: boolean;
    placeholder?: string;
    value?: string;
    errorMessage?: string;
    help?: string;
}
export type ListComponentType = InputComponentType & {
    values?: ValueType[];
    refdata?: string;
    refdataparent?: string;
}
export type DisplayComponentType = BaseComponentType & {
    content?: string;
    collapsible?: boolean;
}
export type ValueType = {
    value: string;
    display: string;
    image?: ImageType;
    textLocation?: string;
}
export type AddressComponentType = BaseComponentType & {
    postcodeLabel?: string;
    postcodePlaceholder?: string;    
    propertyLabel?: string;
    propertyPlaceholder?: string;
    postcodeHelp?: string;
    postcodeError?: string;
}
export type VehicleComponentType = BaseComponentType & {
    regnumLabel?: string;
    regnumPlaceholder?: string;
    buttonLabel?: string;
}
export type CookiePreferenceType = {
    pre?: string;
    post?: string;
    values?: ValueType[];
}
// TODO: Consider icons/fonts vs images - images are content, but icons are styling and don't belong in journey
type ImageType = {
    url: string;
    alt?: string;
    width?: string; // TODO: move to CSS variables - which image/ alt text is content, size is styling
    height?: string; // TODO: move to CSS variables - which image/ alt text is content, size is styling
}
// TODO: Consider removing this with Triboxdate refactor
export type TriBoxDateComponentType = InputComponentType & {
    separator?: string;
    dayPlaceholder: string;
    monthPlaceholder: string;
    yearPlaceholder: string;
    unknownOptionLabel: string;
    //from: string; // TODO: implement date range validation on the component
    //to: string; // TODO: implement date range validation on the component
}