export type JourneyType = {
    title: string;
    pages: PageType[];
    logo?: string;
    logoalt?: string;
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
    logo?: string;
    maxrepeats?: number;
    components: ComponentType[];
}
export type ComponentType = BaseComponentType | AddressComponentType | VehicleComponentType | TriBoxDateComponentType;

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
    label?: string;
    placeholder?: string;
    required?: boolean;
    errorMessage?: string;
    help?: string;
    pre?: string;
    content?: string;
    post?: string;
    value?: string;
    values?: ValueType[];
    refdata?: string;
    dependsupon?: {
        id: string;
        value: string;
    }
}
export type ValueType = {
    value: string;
    display: string;
    image?: string;
    imageWidth?: number;
    imageHeight?: number;
    text?: string;
    textClass?: string;
    textLocation?: string;
}

export type TriBoxDateFieldsType = {
    type: string;
    separator: string;
    dayPlaceholder: string;
    monthPlaceholder: string;
    yearPlaceholder: string;
    unknownOptionLabel: string;
}

export type TriBoxDateValidRange = {
    from: string;
    to: string;
}

export type TriBoxDateComponentType = BaseComponentType & {
    fields?: TriBoxDateFieldsType;
    validRange?: TriBoxDateValidRange;
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