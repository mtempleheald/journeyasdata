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
// TODO: review name of ListComponentType
export type ListComponentType = InputComponentType & {
    values?: ValueType[];
    refdata?: string;
}
export type DisplayComponentType = BaseComponentType & {
    content?: string;
}
export type ValueType = {
    value: string;
    display: string;
    image?: ImageType;
    textLocation?: string;
}
export type TriBoxDateComponentType = InputComponentType & {
    separator?: string;
    dayPlaceholder: string;
    monthPlaceholder: string;
    yearPlaceholder: string;
    unknownOptionLabel: string;
    //from: string; // TODO: implement date range validation on the component
    //to: string; // TODO: implement date range validation on the component
}
export type AddressComponentType = InputComponentType & {
    postcodeLabel?: string;
    postcodePlaceholder?: string;    
    propertyLabel?: string;
    propertyPlaceholder?: string;
    postcodeHelp?: string;
    postcodeError?: string;
}
export type VehicleComponentType = InputComponentType & {
    regnumLabel?: string;
    regnumPlaceholder?: string;
    buttonLabel?: string;
}
export type CookiePreferenceType = {
    pre?: string;
    post?: string;
    values?: ValueType[];
}
type ImageType = {
    url: string;
    alt?: string;
    width?: string; // TODO: move to CSS variables - which image/ alt text is content, size is styling
    height?: string; // TODO: move to CSS variables - which image/ alt text is content, size is styling
}